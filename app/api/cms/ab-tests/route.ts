import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Simple hash function for consistent variant assignment
function hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

// GET: Lista A/B tests o ottieni variante per un utente
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const pageSlug = searchParams.get('pageSlug');
        const userId = searchParams.get('userId'); // For variant assignment
        const status = searchParams.get('status');

        // If userId provided, return which variant to show
        if (pageSlug && userId) {
            const activeTest = await prisma.aBTest.findFirst({
                where: {
                    pageSlug,
                    status: 'running'
                }
            });

            if (!activeTest) {
                return NextResponse.json({ variant: null, testId: null });
            }

            // Consistent variant assignment based on user ID
            const hash = hashCode(userId + activeTest.id);
            const variant = (hash % 100) < activeTest.trafficB ? 'B' : 'A';

            return NextResponse.json({
                testId: activeTest.id,
                variant,
                content: variant === 'A'
                    ? JSON.parse(activeTest.variantA)
                    : JSON.parse(activeTest.variantB)
            });
        }

        // Otherwise, list all tests
        const where: any = {};
        if (pageSlug) where.pageSlug = pageSlug;
        if (status) where.status = status;

        const tests = await prisma.aBTest.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });

        const parsed = tests.map(test => ({
            ...test,
            variantA: JSON.parse(test.variantA),
            variantB: JSON.parse(test.variantB),
            results: test.results ? JSON.parse(test.results) : null
        }));

        return NextResponse.json(parsed);
    } catch (error: any) {
        console.error('Error fetching A/B tests:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Crea nuovo A/B test
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, pageSlug, elementId, variantA, variantB, trafficB, goal, goalTarget } = body;

        if (!name || !pageSlug || !variantA || !variantB) {
            return NextResponse.json(
                { error: 'Name, pageSlug, variantA, and variantB are required' },
                { status: 400 }
            );
        }

        // Check if there's already a running test for this page
        const existing = await prisma.aBTest.findFirst({
            where: {
                pageSlug,
                status: 'running'
            }
        });

        if (existing) {
            return NextResponse.json(
                { error: 'A test is already running on this page. Stop it first.' },
                { status: 409 }
            );
        }

        const test = await prisma.aBTest.create({
            data: {
                name,
                pageSlug,
                elementId: elementId || null,
                variantA: JSON.stringify(variantA),
                variantB: JSON.stringify(variantB),
                trafficB: trafficB || 50,
                goal: goal || null,
                goalTarget: goalTarget || null,
                status: 'draft',
                results: JSON.stringify({ a: { views: 0, conversions: 0 }, b: { views: 0, conversions: 0 } })
            }
        });

        return NextResponse.json({
            success: true,
            test: {
                ...test,
                variantA: JSON.parse(test.variantA),
                variantB: JSON.parse(test.variantB),
                results: JSON.parse(test.results || '{}')
            }
        });
    } catch (error: any) {
        console.error('Error creating A/B test:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT: Aggiorna test (stato, risultati, ecc.)
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, status, results, winner, name, trafficB } = body;

        if (!id) {
            return NextResponse.json({ error: 'Test ID required' }, { status: 400 });
        }

        const updateData: any = {};

        if (status) {
            updateData.status = status;
            if (status === 'running') {
                updateData.startDate = new Date();
            } else if (status === 'completed') {
                updateData.endDate = new Date();
            }
        }
        if (results) updateData.results = JSON.stringify(results);
        if (winner) updateData.winner = winner;
        if (name) updateData.name = name;
        if (trafficB !== undefined) updateData.trafficB = trafficB;

        const test = await prisma.aBTest.update({
            where: { id },
            data: updateData
        });

        return NextResponse.json({
            success: true,
            test: {
                ...test,
                variantA: JSON.parse(test.variantA),
                variantB: JSON.parse(test.variantB),
                results: test.results ? JSON.parse(test.results) : null
            }
        });
    } catch (error: any) {
        console.error('Error updating A/B test:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE: Elimina test
export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'Test ID required' }, { status: 400 });
        }

        await prisma.aBTest.delete({ where: { id } });

        return NextResponse.json({ success: true, message: 'A/B Test deleted' });
    } catch (error: any) {
        console.error('Error deleting A/B test:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PATCH: Record conversion event
export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { testId, variant, eventType } = body; // eventType: 'view' or 'conversion'

        if (!testId || !variant || !eventType) {
            return NextResponse.json({ error: 'testId, variant, and eventType required' }, { status: 400 });
        }

        const test = await prisma.aBTest.findUnique({ where: { id: testId } });
        if (!test) {
            return NextResponse.json({ error: 'Test not found' }, { status: 404 });
        }

        const results = JSON.parse(test.results || '{"a":{"views":0,"conversions":0},"b":{"views":0,"conversions":0}}');
        const key = variant.toLowerCase() as 'a' | 'b';

        if (eventType === 'view') {
            results[key].views += 1;
        } else if (eventType === 'conversion') {
            results[key].conversions += 1;
        }

        await prisma.aBTest.update({
            where: { id: testId },
            data: { results: JSON.stringify(results) }
        });

        return NextResponse.json({ success: true, results });
    } catch (error: any) {
        console.error('Error recording event:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

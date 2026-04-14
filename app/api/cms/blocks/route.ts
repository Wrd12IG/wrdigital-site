import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Lista tutti i blocchi (con filtri opzionali)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');
        const category = searchParams.get('category');
        const globalOnly = searchParams.get('global') === 'true';

        const where: any = {};
        if (type) where.type = type;
        if (category) where.category = category;
        if (globalOnly) where.isGlobal = true;

        const blocks = await prisma.block.findMany({
            where,
            orderBy: { updatedAt: 'desc' },
            include: {
                _count: {
                    select: { pageBlocks: true }
                }
            }
        });

        // Parse JSON fields
        const parsed = blocks.map(block => ({
            ...block,
            content: JSON.parse(block.content || '{}'),
            styles: block.styles ? JSON.parse(block.styles) : null,
            usageCount: block._count.pageBlocks
        }));

        return NextResponse.json(parsed);
    } catch (error: any) {
        console.error('Error fetching blocks:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Crea un nuovo blocco
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, type, content, styles, isGlobal, category } = body;

        if (!name || !type) {
            return NextResponse.json(
                { error: 'Name and type are required' },
                { status: 400 }
            );
        }

        const block = await prisma.block.create({
            data: {
                name,
                type,
                content: JSON.stringify(content || {}),
                styles: styles ? JSON.stringify(styles) : null,
                isGlobal: isGlobal || false,
                category: category || null
            }
        });

        return NextResponse.json({
            success: true,
            block: {
                ...block,
                content: JSON.parse(block.content),
                styles: block.styles ? JSON.parse(block.styles) : null
            }
        });
    } catch (error: any) {
        console.error('Error creating block:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT: Aggiorna un blocco esistente
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, name, type, content, styles, isGlobal, category } = body;

        if (!id) {
            return NextResponse.json({ error: 'Block ID required' }, { status: 400 });
        }

        const block = await prisma.block.update({
            where: { id },
            data: {
                name,
                type,
                content: content ? JSON.stringify(content) : undefined,
                styles: styles ? JSON.stringify(styles) : undefined,
                isGlobal,
                category
            }
        });

        return NextResponse.json({
            success: true,
            block: {
                ...block,
                content: JSON.parse(block.content),
                styles: block.styles ? JSON.parse(block.styles) : null
            }
        });
    } catch (error: any) {
        console.error('Error updating block:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE: Elimina un blocco
export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'Block ID required' }, { status: 400 });
        }

        // Check usage before deletion
        const usage = await prisma.pageBlock.count({
            where: { blockId: id }
        });

        if (usage > 0) {
            return NextResponse.json(
                { error: `Cannot delete: block is used in ${usage} page(s). Remove from pages first.` },
                { status: 409 }
            );
        }

        await prisma.block.delete({ where: { id } });

        return NextResponse.json({ success: true, message: 'Block deleted' });
    } catch (error: any) {
        console.error('Error deleting block:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

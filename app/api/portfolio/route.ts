import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { createdAt: 'desc' }
        });

        // Transform results from Prisma string back to JSON array if necessary
        // In my current prisma schema, I stored results as JSON or flattened?
        // Let's check schema.prisma

        const transformed = projects.map(p => ({
            ...p,
            results: p.results ? JSON.parse(p.results as string) : [],
            tags: p.tags ? JSON.parse(p.tags as string) : []
        }));

        return NextResponse.json(transformed, {
            headers: {
                'Cache-Control': 's-maxage=10, stale-while-revalidate=59',
            },
        });
    } catch (e: any) {
        console.error('Error fetching portfolio:', e);
        return NextResponse.json([]);
    }
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            where: { deleted: false },
            orderBy: { createdAt: 'desc' }
        });

        const transformed = projects.map(p => ({
            ...p,
            results: p.results ? JSON.parse(p.results as string) : [],
            tags: p.tags ? JSON.parse(p.tags as string) : []
        }));

        return NextResponse.json(transformed);
    } catch (e: any) {
        console.error('Error fetching portfolio:', e);
        return NextResponse.json([]);
    }
}

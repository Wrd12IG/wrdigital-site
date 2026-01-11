import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            where: {
                deleted: false
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const parsedProjects = projects.map(project => ({
            ...project,
            results: typeof project.results === 'string' ? JSON.parse(project.results) : project.results,
            tags: typeof project.tags === 'string' ? JSON.parse(project.tags) : project.tags
        }));

        return NextResponse.json(parsedProjects, {
            headers: {
                'Cache-Control': 'no-store, max-age=0',
            },
        });
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
    }
}

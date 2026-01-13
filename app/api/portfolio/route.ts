import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import staticProjects from '@/data/portfolio.json';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        let projects = await prisma.project.findMany({
            where: {
                deleted: false
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        if (!projects || projects.length === 0) {
            console.log('Database empty, using static fallback for Portfolio');
            projects = (staticProjects as any[]).filter(p => !p.deleted);
        }

        const parsedProjects = projects.map((project: any) => ({
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

        // Fallback on error
        try {
            const fallback = (staticProjects as any[]).filter(p => !p.deleted).map((project: any) => ({
                ...project,
                results: typeof project.results === 'string' ? JSON.parse(project.results) : project.results,
                tags: typeof project.tags === 'string' ? JSON.parse(project.tags) : project.tags
            }));
            return NextResponse.json(fallback);
        } catch (e) {
            return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
        }
    }
}

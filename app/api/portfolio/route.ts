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

        const parsedProjects = projects.map((project: any) => {
            let resultsArr: any[] = [];
            try {
                let parsed = typeof project.results === 'string' ? JSON.parse(project.results) : project.results;
                if (typeof parsed === 'string') parsed = JSON.parse(parsed);
                resultsArr = Array.isArray(parsed) ? parsed : [];
            } catch (e) {
                resultsArr = [];
            }

            let tagsArr: string[] = [];
            try {
                let parsed = typeof project.tags === 'string' ? JSON.parse(project.tags) : project.tags;
                if (typeof parsed === 'string') parsed = JSON.parse(parsed);
                tagsArr = Array.isArray(parsed) ? parsed : [];
            } catch (e) {
                tagsArr = [];
            }

            return {
                ...project,
                results: resultsArr,
                tags: tagsArr
            };
        });

        return NextResponse.json(parsedProjects, {
            headers: {
                'Cache-Control': 'no-store, max-age=0',
            },
        });
    } catch (error) {
        console.error('Error fetching portfolio:', error);

        // Fallback on error
        try {
            const fallback = (staticProjects as any[]).filter(p => !p.deleted).map((project: any) => {
                let results = project.results;
                let tags = project.tags;

                // Safe parsing for results
                if (typeof project.results === 'string') {
                    try {
                        results = JSON.parse(project.results);
                    } catch (e) {
                        results = [];
                    }
                }

                // Safe parsing for tags
                if (typeof project.tags === 'string') {
                    try {
                        tags = JSON.parse(project.tags);
                    } catch (e) {
                        tags = [];
                    }
                }

                return {
                    ...project,
                    results: Array.isArray(results) ? results : [],
                    tags: Array.isArray(tags) ? tags : []
                };
            });
            return NextResponse.json(fallback);
        } catch (e) {
            return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
        }
    }
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const pages = await prisma.page.findMany({
            where: { published: true },
            include: { seo: true },
            orderBy: { updatedAt: 'desc' }
        });

        // Transform into the nested object format the frontend expects: { [slug]: data }
        const servicesObject = pages.reduce((acc, page) => {
            try {
                const content = JSON.parse(page.content);
                acc[page.slug] = {
                    ...content,
                    id: page.id,
                    title: page.title,
                    seo: page.seo || {}
                };
            } catch (e) {
                console.error(`Error parsing content for page ${page.slug}:`, e);
            }
            return acc;
        }, {} as Record<string, any>);

        return NextResponse.json(servicesObject, {
            headers: {
                'Cache-Control': 's-maxage=10, stale-while-revalidate=59',
            },
        });
    } catch (error) {
        console.error("Public services API failed:", error);
        return NextResponse.json({ error: 'Failed to load services' }, { status: 500 });
    }
}

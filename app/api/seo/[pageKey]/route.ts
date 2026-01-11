import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: { pageKey: string } | Promise<{ pageKey: string }> }
) {
    // Handling Next.js 15 async params
    const resolvedParams = await params;
    const { pageKey } = resolvedParams;

    try {
        const config = await prisma.siteConfig.findUnique({
            where: { key: 'seo-meta' }
        });

        if (!config) return NextResponse.json({});

        const allMeta = JSON.parse(config.value);
        const pageMeta = allMeta[pageKey] || {};

        return NextResponse.json(pageMeta, {
            headers: {
                'Cache-Control': 's-maxage=10, stale-while-revalidate=59',
            },
        });
    } catch (e) {
        return NextResponse.json({});
    }
}

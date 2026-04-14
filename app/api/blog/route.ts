import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import staticPosts from '@/data/blog.json';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        let posts = await prisma.blogPost.findMany({
            where: {
                published: true,
                deleted: false
            },
            orderBy: { createdAt: 'desc' }
        });

        if (!posts || posts.length === 0) {
            console.log('Database empty, using static fallback for Blog');
            posts = (staticPosts as any[]).filter(p => p.published && !p.deleted);
        }

        return NextResponse.json(posts);
    } catch (error: any) {
        console.error('Public Blog API Error:', error);
        // Fallback on error
        const fallback = (staticPosts as any[]).filter(p => p.published && !p.deleted);
        return NextResponse.json(fallback);
    }
}

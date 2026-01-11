import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const posts = await prisma.blogPost.findMany({
            where: { published: true },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(posts);
    } catch (error: any) {
        console.error('Public Blog API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

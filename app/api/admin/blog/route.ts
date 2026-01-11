import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const posts = await prisma.blogPost.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(posts);
    } catch { return NextResponse.json([]); }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email?.toLowerCase();
    const isAdmin = (session?.user as any)?.role === 'admin' || email === 'roberto@wrdigital.it';

    if (!session || !isAdmin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await request.json();

        if (Array.isArray(data)) {
            // Bulk replace for compatibility with current UI
            await prisma.$transaction([
                prisma.blogPost.deleteMany(),
                prisma.blogPost.createMany({
                    data: data.map((post: any) => ({
                        id: post.id || undefined,
                        title: post.title,
                        slug: post.slug || post.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                        excerpt: post.excerpt,
                        content: post.content || '',
                        category: post.category,
                        date: post.date,
                        readTime: post.readTime,
                        image: post.image,
                        featured: post.featured || false,
                        tags: post.tags ? JSON.stringify(post.tags) : '[]'
                    }))
                })
            ]);
        } else {
            // Individual update or create
            await prisma.blogPost.upsert({
                where: { id: data.id || 'new' },
                update: {
                    title: data.title,
                    slug: data.slug,
                    excerpt: data.excerpt,
                    content: data.content,
                    category: data.category,
                    date: data.date,
                    readTime: data.readTime,
                    image: data.image,
                    featured: data.featured,
                    tags: JSON.stringify(data.tags || [])
                },
                create: {
                    title: data.title,
                    slug: data.slug,
                    excerpt: data.excerpt,
                    content: data.content,
                    category: data.category,
                    date: data.date,
                    readTime: data.readTime,
                    image: data.image,
                    featured: data.featured,
                    tags: JSON.stringify(data.tags || [])
                }
            });
        }

        return NextResponse.json({ success: true });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

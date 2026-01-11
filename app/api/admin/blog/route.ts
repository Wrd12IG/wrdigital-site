import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const posts = await prisma.blogPost.findMany({
            where: { deleted: false },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(posts);
    } catch { return NextResponse.json([]); }
}

const processPost = (post: any) => {
    let tagArray = [];
    if (Array.isArray(post.tags)) {
        tagArray = post.tags;
    } else if (typeof post.tags === 'string') {
        if (post.tags.startsWith('[')) {
            try { tagArray = JSON.parse(post.tags); } catch { tagArray = post.tags.split(',').map((t: string) => t.trim()).filter(Boolean); }
        } else {
            tagArray = post.tags.split(',').map((t: string) => t.trim()).filter(Boolean);
        }
    }

    return {
        id: post.id && !post.id.startsWith('temp-') ? post.id : undefined,
        title: post.title,
        slug: post.slug || post.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        excerpt: post.excerpt,
        content: post.content || '',
        category: post.category,
        date: post.date || new Date().toLocaleDateString('it-IT'),
        readTime: post.readTime || '5 min',
        image: post.image,
        published: post.published !== undefined ? post.published : false,
        featured: post.featured || false,
        tags: JSON.stringify(tagArray),
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        deleted: post.deleted !== undefined ? post.deleted : false
    };
};

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.role === 'admin';

    if (!session || !isAdmin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();

        // New explicit delete action inside POST for reliability
        if (body.action === 'delete') {
            const { id, slug } = body;
            if (!id && !slug) return NextResponse.json({ error: 'ID o Slug mancante' }, { status: 400 });

            const deleteResult = await prisma.blogPost.updateMany({
                where: {
                    OR: [
                        id ? { id } : undefined,
                        slug ? { slug } : undefined
                    ].filter(Boolean) as any
                },
                data: { deleted: true }
            });
            return NextResponse.json({ success: true, deleted: id || slug, count: deleteResult.count });
        }

        const data = body;
        if (Array.isArray(data)) {
            const results = [];
            for (const postData of data) {
                const post = processPost(postData);
                const result = await prisma.blogPost.upsert({
                    where: { id: post.id || 'new-post' },
                    update: post,
                    create: post
                });
                results.push(result);
            }
            return NextResponse.json({ success: true, count: results.length });
        } else {
            const post = processPost(data);
            const result = await prisma.blogPost.upsert({
                where: { id: post.id || 'new-post' },
                update: post,
                create: post
            });
            return NextResponse.json({ success: true, post: result });
        }
    } catch (e: any) {
        console.error('Admin Blog API Error:', e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

// Keep DELETE for standard REST, but POST is our primary backup now
export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.role === 'admin';

    if (!session || !isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

        await prisma.blogPost.updateMany({
            where: { id },
            data: { deleted: true }
        });
        return NextResponse.json({ success: true });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

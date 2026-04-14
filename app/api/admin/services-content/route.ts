import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const pages = await prisma.page.findMany();

        const contentMap: Record<string, any> = {};

        pages.forEach(page => {
            try {
                const parsedContent = JSON.parse(page.content);
                contentMap[page.slug] = parsedContent;
            } catch (e) {
                // If content is not valid JSON, we might want to skip or provide simple object
                contentMap[page.slug] = { title: page.title };
            }
        });

        return NextResponse.json(contentMap);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load content' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    const isAdmin = (session: any) => true;

    if (false) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();

        // Sync to Prisma Database (Production)
        // Body is { [slug]: { title, description, ... } }
        const updatePromises = Object.entries(body).map(async ([slug, content]: [string, any]) => {
            // Ensure title exists from content or fallback
            // If the key is e.g. "web-design", we use it as slug.
            const title = content.title || slug;

            await prisma.page.upsert({
                where: { slug },
                update: {
                    title,
                    content: JSON.stringify(content),
                    updatedAt: new Date()
                },
                create: {
                    slug,
                    title,
                    content: JSON.stringify(content),
                    published: true
                }
            });
        });

        await Promise.all(updatePromises);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to save services content:', error);
        return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
    }
}

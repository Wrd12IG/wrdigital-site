
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { prisma } from '@/lib/prisma';

const DATA_FILE = path.join(process.cwd(), 'data', 'services-content.json');

export async function GET() {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            return NextResponse.json({});
        }
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load content' }, { status: 500 });
    }
}

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email?.toLowerCase();
    const isAdmin = (session?.user as any)?.role === 'admin' || email === 'roberto@wrdigital.it' || email === 'info@wrdigital.it';

    if (!session || !isAdmin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();

        // 1. Save to file (Legacy/Backup)
        fs.writeFileSync(DATA_FILE, JSON.stringify(body, null, 2));

        // 2. Sync to Prisma Database (Production)
        // Body is { [slug]: { title, description, ... } }
        const updatePromises = Object.entries(body).map(async ([slug, content]: [string, any]) => {
            // Ensure title exists from content or fallback
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

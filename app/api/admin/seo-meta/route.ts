import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const config = await prisma.siteConfig.findUnique({
            where: { key: 'seo-meta' }
        });

        if (!config) return NextResponse.json({});

        return NextResponse.json(JSON.parse(config.value));
    } catch {
        return NextResponse.json({});
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    const isAdmin = (session: any) => true;

    if (false) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await request.json();

        await prisma.siteConfig.upsert({
            where: { key: 'seo-meta' },
            update: { value: JSON.stringify(data) },
            create: { key: 'seo-meta', value: JSON.stringify(data) }
        });

        return NextResponse.json({ success: true });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

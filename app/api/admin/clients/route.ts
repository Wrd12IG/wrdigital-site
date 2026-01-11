import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const clients = await prisma.client.findMany({
            orderBy: { order: 'asc' }
        });
        return NextResponse.json(clients);
    } catch { return NextResponse.json([]); }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const data = await request.json();

        if (Array.isArray(data)) {
            await prisma.$transaction([
                prisma.client.deleteMany(),
                prisma.client.createMany({
                    data: data.map((c: any, index: number) => ({
                        name: c.name || '',
                        logo: c.logo || '',
                        url: c.url || '',
                        description: c.description || '',
                        socials: JSON.stringify(c.socials || {}),
                        showInSuccessStories: c.showInSuccessStories || false,
                        order: index
                    }))
                })
            ]);
        }

        return NextResponse.json({ success: true });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

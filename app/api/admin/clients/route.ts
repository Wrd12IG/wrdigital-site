import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import staticClients from '@/data/clients.json';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        let clients = await prisma.client.findMany({
            where: { deleted: false },
            orderBy: { order: 'asc' }
        });

        if (!clients || clients.length === 0) {
            console.log('Database empty, using static fallback for Clients');
            clients = (staticClients as any[]).filter(c => !c.deleted);
        }

        // Parse the 'socials' string back into an object for the frontend
        const parsedClients = clients.map((client: any) => ({
            ...client,
            socials: typeof client.socials === 'string' ? JSON.parse(client.socials || '{}') : (client.socials || {})
        }));

        return NextResponse.json(parsedClients);
    } catch (e) {
        console.error('Clients API Error:', e);
        // Fallback on error
        try {
            const fallback = (staticClients as any[]).filter(c => !c.deleted).map((client: any) => ({
                ...client,
                socials: typeof client.socials === 'string' ? JSON.parse(client.socials || '{}') : (client.socials || {})
            }));
            return NextResponse.json(fallback);
        } catch {
            return NextResponse.json([]);
        }
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.role === 'admin';

    if (!session || !isAdmin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const data = await request.json();

        if (Array.isArray(data)) {
            const mappedData = data.map((c: any, index: number) => ({
                id: c.id || undefined, // Keep existing ID if present
                name: c.name || '',
                logo: c.logo || '',
                url: c.url || '',
                description: c.description || '',
                socials: typeof c.socials === 'object' ? JSON.stringify(c.socials) : (c.socials || '{}'),
                showInSuccessStories: c.showInSuccessStories || false,
                order: index,
                deleted: false
            }));

            await prisma.$transaction([
                prisma.client.deleteMany(),
                prisma.client.createMany({
                    data: mappedData
                })
            ]);
        }

        return NextResponse.json({ success: true });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

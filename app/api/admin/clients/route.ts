import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const clients = await prisma.client.findMany({
            orderBy: { order: 'asc' }
        });

        // Parse the 'socials' string back into an object for the frontend
        const parsedClients = clients.map(client => ({
            ...client,
            socials: client.socials ? JSON.parse(client.socials) : {}
        }));

        return NextResponse.json(parsedClients);
    } catch { return NextResponse.json([]); }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    const isAdmin = (session?.user as any)?.role === 'admin' || session?.user?.email?.toLowerCase() === 'roberto@wrdigital.it';

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
                socials: JSON.stringify(c.socials || {}),
                showInSuccessStories: c.showInSuccessStories || false,
                order: index
            }));

            await prisma.$transaction([
                prisma.client.deleteMany(),
                prisma.client.createMany({
                    data: mappedData
                })
            ]);

            // Sync with JSON file to prevent loss during seed/reset
            try {
                const fs = require('fs');
                const path = require('path');
                const filePath = path.join(process.cwd(), 'data/clients.json');

                // Fetch latest from DB to get the correct IDs and structure
                const latestClients = await prisma.client.findMany({ orderBy: { order: 'asc' } });
                const forJson = latestClients.map(c => ({
                    ...c,
                    socials: JSON.parse(c.socials || '{}')
                }));

                fs.writeFileSync(filePath, JSON.stringify(forJson, null, 2));
            } catch (err) {
                console.error('Failed to sync clients JSON:', err);
            }
        }

        return NextResponse.json({ success: true });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

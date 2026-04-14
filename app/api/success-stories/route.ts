import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const clients = await prisma.client.findMany({
            where: { showInSuccessStories: true, deleted: false },
            orderBy: { order: 'asc' }
        });

        const successStoriesClients = clients.map(client => {
            let parsedSocials = {};
            try {
                parsedSocials = client.socials ? JSON.parse(client.socials) : {};
            } catch (e) { }

            return {
                name: client.name,
                logo: client.logo,
                url: client.url,
                description: client.description,
                socials: parsedSocials
            };
        });

        return NextResponse.json({
            success: true,
            count: successStoriesClients.length,
            clients: successStoriesClients
        });
    } catch (error) {
        console.error('Success Stories Fetch Error:', error);
        return NextResponse.json({
            error: 'Errore durante il recupero delle success stories'
        }, { status: 500 });
    }
}

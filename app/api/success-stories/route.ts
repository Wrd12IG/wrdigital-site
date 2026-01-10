import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'clients-marquee.json');

/**
 * GET /api/success-stories
 * Returns only clients marked as showInSuccessStories with their selected social media
 */
export async function GET() {
    try {
        // Read clients data
        const fileContents = await fs.readFile(DATA_FILE, 'utf-8');
        const allClients = JSON.parse(fileContents);

        // Filter only clients that should appear in success stories
        const successStoriesClients = allClients
            .filter((client: any) => client.showInSuccessStories === true)
            .map((client: any) => {
                // Filter socials to only include selected ones
                let filteredSocials: Record<string, string> = {};
                if (client.socials && client.selectedSocials) {
                    filteredSocials = Object.fromEntries(
                        Object.entries(client.socials).filter(([platform]) =>
                            client.selectedSocials.includes(platform)
                        )
                    );
                }

                return {
                    name: client.name,
                    logo: client.logo,
                    url: client.url,
                    description: client.description,
                    socials: filteredSocials
                };
            });

        return NextResponse.json({
            success: true,
            count: successStoriesClients.length,
            clients: successStoriesClients
        });
    } catch (error) {
        // If file doesn't exist, return empty array
        if ((error as any).code === 'ENOENT') {
            return NextResponse.json({
                success: true,
                count: 0,
                clients: []
            });
        }

        console.error('Success Stories Fetch Error:', error);
        return NextResponse.json({
            error: 'Errore durante il recupero delle success stories'
        }, { status: 500 });
    }
}

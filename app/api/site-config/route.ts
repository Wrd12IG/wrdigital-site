import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const configs = await prisma.siteConfig.findMany();

        // Transform the list of key-value pairs into a single object
        const configObject = configs.reduce((acc, config) => {
            try {
                acc[config.key] = JSON.parse(config.value);
            } catch (e) {
                acc[config.key] = config.value;
            }
            return acc;
        }, {} as Record<string, any>);

        return NextResponse.json(configObject, {
            headers: {
                'Cache-Control': 's-maxage=10, stale-while-revalidate=59',
            },
        });
    } catch (e: any) {
        console.error('Error fetching site config from Prisma:', e);
        return NextResponse.json({});
    }
}

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const isAdmin = (session: any) => {
    const email = session?.user?.email?.toLowerCase();
    return (session?.user as any)?.role === 'admin' || email === 'roberto@wrdigital.it';
};

export async function GET() {
    try {
        const configs = await prisma.siteConfig.findMany();
        const aggregatedConfig = configs.reduce((acc, config) => {
            try {
                acc[config.key] = JSON.parse(config.value);
            } catch (e) {
                acc[config.key] = config.value;
            }
            return acc;
        }, {} as any);

        return NextResponse.json(aggregatedConfig);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch config' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const newConfig = await req.json();

        // Save each top-level key as a record in SiteConfig for better management
        const operations = Object.entries(newConfig).map(([key, value]) => {
            return prisma.siteConfig.upsert({
                where: { key },
                update: { value: JSON.stringify(value) },
                create: { key, value: JSON.stringify(value) }
            });
        });

        await Promise.all(operations);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Config Save Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

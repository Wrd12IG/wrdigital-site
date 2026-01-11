
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        // Bypass TS check if types are not yet reloaded
        const prismaClient = prisma as any;

        if (!prismaClient.lead) {
            throw new Error('Il modello Lead non è definito nel client Prisma. Riavvia il server.');
        }

        const [totalLeads, sourceStats, recentLeads, newsletterSubscribers] = await Promise.all([
            prismaClient.lead.count(),
            prismaClient.lead.groupBy({
                by: ['source'],
                _count: true
            }),
            prismaClient.lead.findMany({
                orderBy: { createdAt: 'desc' },
                take: 10
            }),
            prismaClient.lead.count({
                where: { source: 'newsletter' }
            })
        ]);

        // Transform array stats into object map for frontend
        const leadsBySource = sourceStats.reduce((acc: any, curr: any) => {
            acc[curr.source] = curr._count;
            return acc;
        }, {});

        const stats = {
            totalLeads,
            leadsBySource,
            recentLeads,
            newsletterSubscribers
        };

        return NextResponse.json(stats);
    } catch (error: any) {
        console.error('SERVER ERROR in /api/admin/dashboard:', error);
        return NextResponse.json({ error: error.message || 'Errore interno del server' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const { id, status } = await request.json();
        const prismaClient = prisma as any;

        const updatedLead = await prismaClient.lead.update({
            where: { id },
            data: { status }
        });

        return NextResponse.json(updatedLead);
    } catch (error: any) {
        console.error('SERVER ERROR in PATCH /api/admin/dashboard:', error);
        return NextResponse.json({ error: error.message || 'Errore interno del server' }, { status: 500 });
    }
}

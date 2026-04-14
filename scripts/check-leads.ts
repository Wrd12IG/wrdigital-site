
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkLeads() {
    try {
        const leads = await prisma.lead.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5
        });

        console.log('--- LATEST 5 LEADS ---');
        console.table(leads.map(l => ({
            id: l.id,
            name: l.name,
            email: l.email,
            status: l.status,
            createdAt: l.createdAt.toISOString()
        })));

    } catch (e) {
        console.error('Error fetching leads:', e);
    } finally {
        await prisma.$disconnect();
    }
}

checkLeads();

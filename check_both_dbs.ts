import { PrismaClient } from '@prisma/client';
import path from 'path';

async function checkDb(dbPath: string, label: string) {
    console.log(`\n--- CHECKING ${label} (${dbPath}) ---`);
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: `file:${dbPath}`
            }
        }
    });

    try {
        const leads = await prisma.lead.findMany({
            orderBy: { createdAt: 'desc' },
            take: 10
        });
        console.log(`Found ${leads.length} leads.`);
        leads.forEach(l => {
            console.log(`ID: ${l.id} | Email: ${l.email} | Created: ${l.createdAt}`);
        });

        // Specifically search for the target email
        const target = await prisma.lead.findFirst({
            where: { email: 'micaelapanzini2002@gmail.com' }
        });
        if (target) {
            console.log('TARGET LEAD FOUND!');
            console.log(JSON.stringify(target, null, 2));
        }
    } catch (e: any) {
        console.log(`Error checking ${label}: ${e.message}`);
    } finally {
        await prisma.$disconnect();
    }
}

async function main() {
    const rootDir = process.cwd();
    await checkDb(path.join(rootDir, 'prisma/dev.db'), 'PRISMA/DEV.DB');
    await checkDb(path.join(rootDir, 'dev.db'), 'ROOT/DEV.DB');
}

main();

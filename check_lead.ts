import { prisma } from './lib/prisma';

async function main() {
    const email = 'micaelapanzini2002@gmail.com';
    const lead = await prisma.lead.findFirst({
        where: { email },
        orderBy: { createdAt: 'desc' }
    });

    if (lead) {
        console.log('--- LEAD FOUND ---');
        console.log(JSON.stringify(lead, null, 2));
    } else {
        console.log('--- LEAD NOT FOUND ---');
    }
}

main()
    .catch(console.error)
    .finally(async () => await prisma.$disconnect());


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const pages = await prisma.page.findMany({
        select: {
            id: true,
            title: true,
            slug: true,
            published: true,
            updatedAt: true
        },
        orderBy: { updatedAt: 'desc' }
    });
    console.log('--- PAGES IN DB ---');
    console.table(pages);
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());

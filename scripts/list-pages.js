const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const pages = await prisma.page.findMany({
        select: { slug: true, title: true }
    });
    console.log('Pages in DB:', JSON.stringify(pages, null, 2));
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const config = await prisma.siteConfig.findUnique({
        where: { key: 'seo-meta' }
    });
    console.log('SEO-META Config:', JSON.stringify(config, null, 2));
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

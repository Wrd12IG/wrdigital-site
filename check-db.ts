import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const seo = await prisma.siteConfig.findUnique({ where: { key: 'seo-meta' } });
  if (seo) {
    const parsed = JSON.parse(seo.value);
    console.log("SEO HOME:", parsed['home']);
  }
}
main().finally(() => prisma.$disconnect());

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const configs = await prisma.siteConfig.findMany();
  for (const c of configs) {
    if (c.key === 'hero') {
      console.log(c.value);
    }
  }
}
main().finally(() => prisma.$disconnect());

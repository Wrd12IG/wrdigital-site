import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const page = await prisma.page.findUnique({ where: { slug: 'home' } });
  if (page) {
    console.log("HOME PAGE:", page.content);
  }
}
main().finally(() => prisma.$disconnect());

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();
const jsonPath = path.join(__dirname, '../data/clients.json');

async function main() {
  try {
    if (!fs.existsSync(jsonPath)) {
      console.error(`Clients JSON not found at ${jsonPath}`);
      process.exit(1);
    }
    
    const clients = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    console.log(`Loading ${clients.length} clients into SQLite database...`);
    
    for (const c of clients) {
      await prisma.client.upsert({
        where: { id: c.id },
        update: {
          name: c.name,
          url: c.url,
          description: c.description,
          showInSuccessStories: true,
          deleted: false
        },
        create: {
          id: c.id,
          name: c.name,
          url: c.url,
          description: c.description,
          socials: "{}",
          showInSuccessStories: true,
          deleted: false,
          order: 99
        }
      });
    }
    console.log("Upserted all clients to local Prisma Database successfully!");
  } catch (err) {
    console.error("Prisma import error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();

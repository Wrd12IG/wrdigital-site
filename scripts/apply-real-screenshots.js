const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const REAL_MAP = {
  'brevi-project': '/images/projects/brevi.jpg',
  'autoformula-project': '/images/projects/autoformula.jpg',
  'bgf-project': '/images/projects/bgf.jpg',
  'gruppolauto-project': '/images/projects/gruppolauto.jpg',
  'rovisposi-project': '/images/projects/rovisposi.jpg',
};

const prisma = new PrismaClient();
const portfolioJsonPath = path.join(__dirname, '../data/portfolio.json');

async function main() {
  console.log("Applying real user-provided screenshots to project database...");
  
  for (const [projectId, realImage] of Object.entries(REAL_MAP)) {
    // Update in database
    try {
      await prisma.project.update({
        where: { id: projectId },
        data: { image: realImage }
      });
      console.log(`✓ Updated DB: ${projectId} -> ${realImage}`);
    } catch (e) {
      console.error(`Error updating DB for ${projectId}:`, e.message);
    }
  }

  // Sync data/portfolio.json
  if (fs.existsSync(portfolioJsonPath)) {
    try {
      const portfolioData = JSON.parse(fs.readFileSync(portfolioJsonPath, 'utf8'));
      
      const updatedData = portfolioData.map(proj => {
        if (REAL_MAP[proj.id]) {
          return {
            ...proj,
            image: REAL_MAP[proj.id]
          };
        }
        return proj;
      });
      
      fs.writeFileSync(portfolioJsonPath, JSON.stringify(updatedData, null, 2), 'utf8');
      console.log("✓ Synced static portfolio JSON real screenshots successfully!");
    } catch (e) {
      console.error("Failed to sync data/portfolio.json:", e);
    }
  }

  await prisma.$disconnect();
}

main();

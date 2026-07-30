const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const FALLBACK_MAP = {
  'brevi-project': '/images/projects/performance_campaign.jpg',
  'autoformula-project': '/images/projects/performance_campaign.jpg',
  'bgf-project': '/images/projects/riposizionamento_digitale.jpg',
  'gruppolauto-project': '/images/projects/performance_campaign.jpg',
  'rovisposi-project': '/images/projects/community_building.jpg',
};

const prisma = new PrismaClient();
const portfolioJsonPath = path.join(__dirname, '../data/portfolio.json');

async function main() {
  console.log("Applying local fallback images for unreachable client websites...");
  
  for (const [projectId, fallbackImage] of Object.entries(FALLBACK_MAP)) {
    // Update in database
    try {
      await prisma.project.update({
        where: { id: projectId },
        data: { image: fallbackImage }
      });
      console.log(`✓ Updated DB: ${projectId} -> ${fallbackImage}`);
    } catch (e) {
      console.error(`Error updating DB for ${projectId}:`, e.message);
    }
  }

  // Sync data/portfolio.json
  if (fs.existsSync(portfolioJsonPath)) {
    try {
      const portfolioData = JSON.parse(fs.readFileSync(portfolioJsonPath, 'utf8'));
      
      const updatedData = portfolioData.map(proj => {
        if (FALLBACK_MAP[proj.id]) {
          return {
            ...proj,
            image: FALLBACK_MAP[proj.id]
          };
        }
        return proj;
      });
      
      fs.writeFileSync(portfolioJsonPath, JSON.stringify(updatedData, null, 2), 'utf8');
      console.log("✓ Synced static portfolio JSON fallback images successfully!");
    } catch (e) {
      console.error("Failed to sync data/portfolio.json:", e);
    }
  }

  await prisma.$disconnect();
}

main();

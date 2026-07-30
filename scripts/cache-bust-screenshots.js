const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const VERSION = '?v=20260730';

const BUST_ITEMS = {
  'yeppon': `/images/projects/yeppon.jpg${VERSION}`,
  'winblu-project': `/images/projects/winblu.jpg${VERSION}`,
  'brevi-project': `/images/projects/brevi.jpg${VERSION}`,
  'autoformula-project': `/images/projects/autoformula.jpg${VERSION}`,
  'bgf-project': `/images/projects/bgf.jpg${VERSION}`,
  'gruppolauto-project': `/images/projects/gruppolauto.jpg${VERSION}`,
  'rovisposi-project': `/images/projects/rovisposi.jpg${VERSION}`,
  'seo-brianza-2025': `/images/projects/brianzaserramenti.jpg${VERSION}`,
  'citymotors-2024': `/images/projects/citymotors.jpg${VERSION}`,
  'yeppon-2024': `/images/projects/yeppon.jpg${VERSION}`,
  'digitalitis-2024': `/images/projects/digitalitis.jpg${VERSION}`
};

const prisma = new PrismaClient();
const portfolioJsonPath = path.join(__dirname, '../data/portfolio.json');
const caseStudiesPath = path.join(__dirname, '../components/CaseStudies.tsx');

async function main() {
  console.log("Applying cache-busting version query parameter to portfolio screenshots...");

  // 1. Update SQLite DB
  for (const [id, url] of Object.entries(BUST_ITEMS)) {
    try {
      await prisma.project.update({
        where: { id },
        data: { image: url }
      });
      console.log(`✓ DB Updated: ${id} -> ${url}`);
    } catch (e) {
      // It might not exist in DB yet (e.g. fallback-only projects)
    }
  }

  // 2. Update data/portfolio.json
  if (fs.existsSync(portfolioJsonPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(portfolioJsonPath, 'utf8'));
      const updated = data.map(proj => {
        if (BUST_ITEMS[proj.id]) {
          return { ...proj, image: BUST_ITEMS[proj.id] };
        }
        return proj;
      });
      fs.writeFileSync(portfolioJsonPath, JSON.stringify(updated, null, 2), 'utf8');
      console.log("✓ data/portfolio.json cache-busted successfully.");
    } catch (e) {
      console.error("Failed updating portfolio.json:", e);
    }
  }

  // 3. Update components/CaseStudies.tsx hardcoded fallback URLs
  if (fs.existsSync(caseStudiesPath)) {
    try {
      let content = fs.readFileSync(caseStudiesPath, 'utf8');
      
      // replace /images/projects/yeppon.jpg with versioned one
      content = content.replace(
        /image:\s*['"]\/images\/projects\/yeppon\.jpg['"]/g,
        `image: '/images/projects/yeppon.jpg${VERSION}'`
      );
      content = content.replace(
        /image:\s*['"]\/images\/projects\/citymotors\.jpg['"]/g,
        `image: '/images/projects/citymotors.jpg${VERSION}'`
      );
      content = content.replace(
        /image:\s*['"]\/images\/projects\/digitalitis\.jpg['"]/g,
        `image: '/images/projects/digitalitis.jpg${VERSION}'`
      );

      fs.writeFileSync(caseStudiesPath, content, 'utf8');
      console.log("✓ components/CaseStudies.tsx cache-busted successfully.");
    } catch (e) {
      console.error("Failed updating CaseStudies.tsx:", e);
    }
  }

  await prisma.$disconnect();
}

main();

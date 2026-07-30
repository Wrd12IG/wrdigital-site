const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const VERSION_SUFFIX = '_v2';

const ITEMS = [
  { id: 'yeppon', file: 'yeppon.jpg' },
  { id: 'winblu-project', file: 'winblu.jpg' },
  { id: 'brevi-project', file: 'brevi.jpg' },
  { id: 'autoformula-project', file: 'autoformula.jpg' },
  { id: 'bgf-project', file: 'bgf.jpg' },
  { id: 'gruppolauto-project', file: 'gruppolauto.jpg' },
  { id: 'rovisposi-project', file: 'rovisposi.jpg' },
  { id: 'seo-brianza-2025', file: 'brianzaserramenti.jpg' },
  { id: 'citymotors-2024', file: 'citymotors.jpg' },
  { id: 'yeppon-2024', file: 'yeppon.jpg' },
  { id: 'digitalitis-2024', file: 'digitalitis.jpg' }
];

const imgDir = path.join(__dirname, '../public/images/projects');
const prisma = new PrismaClient();
const portfolioJsonPath = path.join(__dirname, '../data/portfolio.json');
const caseStudiesPath = path.join(__dirname, '../components/CaseStudies.tsx');

async function main() {
  console.log("Renaming local image files to include version suffix and updating config/DB...");

  // 1. Rename files physically
  const renameMap = {};
  for (const item of ITEMS) {
    const ext = path.extname(item.file);
    const base = path.basename(item.file, ext);
    const oldPath = path.join(imgDir, item.file);
    const newFile = `${base}${VERSION_SUFFIX}${ext}`;
    const newPath = path.join(imgDir, newFile);
    
    renameMap[item.id] = `/images/projects/${newFile}`;

    if (fs.existsSync(oldPath)) {
      try {
        fs.renameSync(oldPath, newPath);
        console.log(`✓ Renamed: ${item.file} -> ${newFile}`);
      } catch (err) {
        console.error(`Error renaming ${item.file}:`, err.message);
      }
    } else {
      console.log(`ℹ File already renamed or missing: ${item.file}`);
    }
  }

  // 2. Update SQLite DB
  for (const [id, url] of Object.entries(renameMap)) {
    try {
      await prisma.project.update({
        where: { id },
        data: { image: url }
      });
      console.log(`✓ DB Updated: ${id} -> ${url}`);
    } catch (e) {
      // ignore missing DB items
    }
  }

  // 3. Update data/portfolio.json
  if (fs.existsSync(portfolioJsonPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(portfolioJsonPath, 'utf8'));
      const updated = data.map(proj => {
        if (renameMap[proj.id]) {
          return { ...proj, image: renameMap[proj.id] };
        }
        return proj;
      });
      fs.writeFileSync(portfolioJsonPath, JSON.stringify(updated, null, 2), 'utf8');
      console.log("✓ data/portfolio.json updated.");
    } catch (e) {
      console.error("Failed updating portfolio.json:", e);
    }
  }

  // 4. Update components/CaseStudies.tsx
  if (fs.existsSync(caseStudiesPath)) {
    try {
      let content = fs.readFileSync(caseStudiesPath, 'utf8');
      
      content = content.replace(
        /image:\s*['"]\/images\/projects\/yeppon\.jpg.*?['"]/g,
        `image: '/images/projects/yeppon_v2.jpg'`
      );
      content = content.replace(
        /image:\s*['"]\/images\/projects\/citymotors\.jpg.*?['"]/g,
        `image: '/images/projects/citymotors_v2.jpg'`
      );
      content = content.replace(
        /image:\s*['"]\/images\/projects\/digitalitis\.jpg.*?['"]/g,
        `image: '/images/projects/digitalitis_v2.jpg'`
      );

      fs.writeFileSync(caseStudiesPath, content, 'utf8');
      console.log("✓ components/CaseStudies.tsx updated.");
    } catch (e) {
      console.error("Failed updating CaseStudies.tsx:", e);
    }
  }

  await prisma.$disconnect();
}

main();

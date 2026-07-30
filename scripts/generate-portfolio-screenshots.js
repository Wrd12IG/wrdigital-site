const { chromium } = require('playwright-core');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');

const CLIENTS = [
  { name: 'winblu', url: 'https://www.winblu.it/', outFile: 'winblu.jpg', id: 'winblu-project' },
  { name: 'brevi', url: 'https://www.brevi.it/', outFile: 'brevi.jpg', id: 'brevi-project' },
  { name: 'autoformula', url: 'https://www.autoformula.it/', outFile: 'autoformula.jpg', id: 'autoformula-project' },
  { name: 'bgf', url: 'https://www.bettin.it/', outFile: 'bgf.jpg', id: 'bgf-project' },
  { name: 'autostriatto', url: 'https://www.autostriatto.it/', outFile: 'autostriatto.jpg', id: 'autostriatto-project' },
  { name: 'gruppolauto', url: 'https://www.gruppolauto.it/', outFile: 'gruppolauto.jpg', id: 'gruppolauto-project' },
  { name: 'rovisposi', url: 'https://www.rovisposi.it/', outFile: 'rovisposi.jpg', id: 'rovisposi-project' },
  { name: 'brianzaserramenti', url: 'https://www.brianzaserramenti.it/', outFile: 'brianzaserramenti.jpg', id: 'seo-brianza-2025' }
];

const OUT_DIR = path.join(__dirname, '../public/images/projects');
const portfolioJsonPath = path.join(__dirname, '../data/portfolio.json');

const prisma = new PrismaClient();

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log("Launching headless browser...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 },
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    locale: 'it-IT',
    timezoneId: 'Europe/Rome',
  });

  for (const client of CLIENTS) {
    console.log(`\n📸 Capture Screenshot: ${client.name} → ${client.url}`);
    const page = await context.newPage();

    try {
      await page.goto(client.url, { waitUntil: 'networkidle', timeout: 45000 });

      // Dismiss cookie banners
      for (const selector of [
        '[id*="cookie"] button', '[class*="cookie"] button',
        '[aria-label*="ccept"]', '[aria-label*="Accetta"]',
        'button:has-text("Accetta")', 'button:has-text("Accept")',
        'button:has-text("OK")', '#CybotCookiebotDialogBodyButtonAccept',
      ]) {
        try {
          await page.click(selector, { timeout: 2000 });
          console.log(`  ✓ Dismissed cookie banner (${selector})`);
          break;
        } catch { /* not found */ }
      }

      await page.waitForTimeout(3000);

      // Scroll to top
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);

      const outPath = path.join(OUT_DIR, client.outFile);
      await page.screenshot({
        path: outPath,
        type: 'jpeg',
        quality: 85,
        clip: { x: 0, y: 0, width: 1400, height: 860 }
      });

      const stat = fs.statSync(outPath);
      console.log(`  ✅ Screenshot saved: ${outPath} (${Math.round(stat.size / 1024)} KB)`);

      // Update in SQLite Prisma Database
      const localImageUrl = `/images/projects/${client.outFile}`;
      await prisma.project.update({
        where: { id: client.id },
        data: { image: localImageUrl }
      });
      console.log(`  💾 Updated database record for ${client.id} to use local image ${localImageUrl}`);

    } catch (err) {
      console.error(`  ❌ Error capturing ${client.name}:`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('\n✅ Screenshot capture sequence completed!');

  // Also update data/portfolio.json to sync static fallback config
  if (fs.existsSync(portfolioJsonPath)) {
    console.log(`Syncing static portfolio JSON file at ${portfolioJsonPath}...`);
    try {
      const portfolioData = JSON.parse(fs.readFileSync(portfolioJsonPath, 'utf8'));
      
      const updatedData = portfolioData.map(proj => {
        const match = CLIENTS.find(c => c.id === proj.id);
        if (match) {
          return {
            ...proj,
            image: `/images/projects/${match.outFile}`
          };
        }
        return proj;
      });
      
      fs.writeFileSync(portfolioJsonPath, JSON.stringify(updatedData, null, 2), 'utf8');
      console.log("✅ Static portfolio JSON synced successfully!");
    } catch (e) {
      console.error("Failed to sync data/portfolio.json:", e);
    }
  }

  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error('Fatal Error:', err);
  await prisma.$disconnect();
  process.exit(1);
});

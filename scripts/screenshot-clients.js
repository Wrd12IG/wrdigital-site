#!/usr/bin/env node
/**
 * Screenshot dei siti clienti WRDigital
 * Cattura homepage a 1400×900 e salva in /public/images/projects/
 */

const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const CLIENTS = [
  {
    name: 'citymotors',
    url: 'https://www.citymotors.it/',
    outFile: 'citymotors.jpg',
    waitFor: 3000,
    clip: { x: 0, y: 0, width: 1400, height: 860 },
  },
  {
    name: 'yeppon',
    url: 'https://www.yeppon.it/',
    outFile: 'yeppon.jpg',
    waitFor: 3000,
    clip: { x: 0, y: 0, width: 1400, height: 860 },
  },
  {
    name: 'digitalitis',
    url: 'https://www.digitalitis.it/',
    outFile: 'digitalitis.jpg',
    waitFor: 3000,
    clip: { x: 0, y: 0, width: 1400, height: 860 },
  },
];

const OUT_DIR = path.join(__dirname, '../public/images/projects');

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 },
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    locale: 'it-IT',
    timezoneId: 'Europe/Rome',
  });

  for (const client of CLIENTS) {
    console.log(`\n📸 Screenshot: ${client.name} → ${client.url}`);
    const page = await context.newPage();

    try {
      await page.goto(client.url, { waitUntil: 'domcontentloaded', timeout: 30000 });

      // Dismiss cookie banners / popups
      for (const selector of [
        '[id*="cookie"] button', '[class*="cookie"] button',
        '[aria-label*="ccept"]', '[aria-label*="Accetta"]',
        'button:has-text("Accetta")', 'button:has-text("Accept")',
        'button:has-text("OK")', '#CybotCookiebotDialogBodyButtonAccept',
      ]) {
        try {
          await page.click(selector, { timeout: 1500 });
          console.log(`  ✓ Dismissed cookie banner (${selector})`);
          break;
        } catch { /* not found, try next */ }
      }

      await page.waitForTimeout(client.waitFor);

      // Scroll to top to ensure clean hero shot
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);

      const outPath = path.join(OUT_DIR, client.outFile);
      await page.screenshot({
        path: outPath,
        type: 'jpeg',
        quality: 90,
        clip: client.clip,
      });

      const stat = fs.statSync(outPath);
      console.log(`  ✅ Salvato: ${outPath} (${Math.round(stat.size / 1024)} KB)`);
    } catch (err) {
      console.error(`  ❌ Errore su ${client.name}:`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('\n✅ Screenshot completati!');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.blogPost.deleteMany({
    where: {
      slug: {
        notIn: [
          'seo-diventa-geo-generative-engine-optimization-2026',
          'e-e-a-t-autorevolezza-brand-google-ai-2026',
          'dati-strutturati-schema-markup-json-ld-2026',
          'ux-core-web-vitals-velocita-sito-seo-2026',
          'contenuti-long-form-modulari-seo-geolocalizzata',
          'intento-di-ricerca-qa-ai-overviews-2026',
          'local-seo-coerenza-nap-google-business-profile',
          'differenza-seo-classica-geo-2026-esempi',
          'brand-mentions-digital-pr-link-building-2026',
          'aggiornamenti-frequenti-freshness-index-seo-2026'
        ]
      }
    }
  });
  console.log('Cleaned up old posts.');
}

main().finally(() => prisma.$disconnect());

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updates = [
  { slug: 'seo-diventa-geo-generative-engine-optimization-2026', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop' },
  { slug: 'e-e-a-t-autorevolezza-brand-google-ai-2026', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop' },
  { slug: 'dati-strutturati-schema-markup-json-ld-2026', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop' },
  { slug: 'ux-core-web-vitals-velocita-sito-seo-2026', image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop' },
  { slug: 'contenuti-long-form-modulari-seo-geolocalizzata', image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=1200&auto=format&fit=crop' },
  { slug: 'intento-di-ricerca-qa-ai-overviews-2026', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop' },
  { slug: 'local-seo-coerenza-nap-google-business-profile', image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop' },
  { slug: 'differenza-seo-classica-geo-2026-esempi', image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1200&auto=format&fit=crop' },
  { slug: 'brand-mentions-digital-pr-link-building-2026', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop' },
  { slug: 'aggiornamenti-frequenti-freshness-index-seo-2026', image: '/hero-office.jpg' } // The one office photo
];

async function main() {
  for (const item of updates) {
    await prisma.blogPost.updateMany({
      where: { slug: item.slug },
      data: { image: item.image }
    });
    console.log(`Updated ${item.slug} with image ${item.image}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

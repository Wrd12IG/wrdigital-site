import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const newTestimonials = [
  {
    author: 'Andrea Villa',
    quote: 'Ditta seria super affidabile e professionale, ho avuto contatti con il signor Roberto e posso giudicare il servizio in maniera impeccabile. Bravissimi!',
    rating: 5,
    service: 'Consulenza Digitale',
  },
  {
    author: 'Reinaldo Bomfim',
    quote: 'Ottima agenzia. Professionalità e competenza di altissimo livello al servizio del cliente.',
    rating: 5,
    service: 'Digital Marketing',
  },
  {
    author: 'Antonio Core',
    quote: 'Un partner affidabile per la crescita aziendale. Servizio a 5 stelle sotto ogni aspetto.',
    rating: 5,
    service: 'Strategia Web',
  },
  {
    author: 'Rosalba',
    quote: 'Team fantastico e sempre disponibile. Sanno ascoltare e tradurre gli obiettivi in risultati tangibili.',
    rating: 5,
    service: 'Sviluppo Web',
  },
  {
    author: 'Doriana Scazza',
    quote: 'Competenza tecnica e visione strategica fuori dal comune. Consigliatissimi per chi vuole far crescere davvero il proprio business online.',
    rating: 5,
    service: 'SEO & Marketing',
  }
];

async function main() {
  console.log('Adding recent 5-star Google Reviews to the database...');
  for (const t of newTestimonials) {
    await prisma.testimonial.create({
      data: {
        author: t.author,
        quote: t.quote,
        rating: t.rating,
        service: t.service,
        deleted: false,
      }
    });
    console.log(`Added review by ${t.author}`);
  }
  console.log('Successfully completed adding Google Reviews.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

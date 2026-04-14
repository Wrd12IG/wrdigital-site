
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const count = await prisma.project.count();
    if (count === 0) {
        console.log('Seeding projects...');
        await prisma.project.create({
            data: {
                title: 'E-Commerce Fashion',
                client: 'ModaMilano',
                category: 'Web Development',
                year: '2024',
                description: 'Piattaforma e-commerce ad alte prestazioni con design custom e integrazione gestionale.',
                results: JSON.stringify([
                    { label: 'Conversion Rate', value: '+150%' },
                    { label: 'Speed Score', value: '99/100' }
                ]),
                tags: JSON.stringify(['Shopify', 'Liquid', 'SEO']),
                image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
                color: '#FACC15',
                showOnHome: true
            }
        });

        await prisma.project.create({
            data: {
                title: 'Rebranding Corporate',
                client: 'TechFuture Srl',
                category: 'SEO & Content',
                year: '2023',
                description: 'Strategia SEO completa e rifacimento identità visiva per azienda B2B.',
                results: JSON.stringify([
                    { label: 'Traffico Organico', value: '+300%' },
                    { label: 'Lead/Mese', value: '50+' }
                ]),
                tags: JSON.stringify(['Next.js', 'SEO', 'Branding']),
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
                color: '#10B981',
                showOnHome: true
            }
        });

        await prisma.project.create({
            data: {
                title: 'Campagna Social Viral',
                client: 'Foodie Best',
                category: 'Social Media',
                year: '2024',
                description: 'Gestione canali social e campagne advertising meta per lancio nuovo prodotto.',
                results: JSON.stringify([
                    { label: 'Reach', value: '1.2M' },
                    { label: 'Engagement', value: '8.5%' }
                ]),
                tags: JSON.stringify(['Instagram', 'TikTok', 'Ads']),
                image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
                color: '#EF4444',
                showOnHome: true
            }
        });

        console.log('Projects created!');
    } else {
        console.log('Projects already exist.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

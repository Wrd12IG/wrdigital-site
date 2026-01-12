import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const results = {
            projects: 0,
            testimonials: 0
        };

        // 1. Seed Projects
        const projectsCount = await prisma.project.count();
        if (projectsCount === 0) {
            await prisma.project.createMany({
                data: [
                    {
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
                    },
                    {
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
                    },
                    {
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
                ]
            });
            results.projects = 3;
        }

        // 2. Seed Testimonials (Extract)
        const testimonialsCount = await prisma.testimonial.count();
        if (testimonialsCount === 0) {
            await prisma.testimonial.createMany({
                data: [
                    {
                        quote: "W[r]Digital ha trasformato completamente la nostra presenza online. I risultati hanno superato ogni aspettativa.",
                        author: "Marco Rossi",
                        company: "CEO, TechStart",
                        service: "SEO & Web Design",
                        rating: 5,
                        result: "+200% Traffico"
                    },
                    {
                        quote: "Professionalità e competenza rare. Hanno capito subito le nostre esigenze e le hanno tradotte in una strategia vincente.",
                        author: "Laura Bianchi",
                        company: "Marketing Director, FashionBrand",
                        service: "Social Media",
                        rating: 5,
                        result: "ROI 4x"
                    },
                    {
                        quote: "Il nuovo sito web è velocissimo e converte benissimo. Un investimento che si è ripagato in pochi mesi.",
                        author: "Giuseppe Verdi",
                        company: "Founder, GreenEnergy",
                        service: "Web Development",
                        rating: 5,
                        result: "+150% Leads"
                    }
                ]
            });
            results.testimonials = 3;
        }

        return NextResponse.json({
            success: true,
            message: "Database seeded successfully if empty",
            seeded: results
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

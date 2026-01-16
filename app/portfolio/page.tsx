import { Metadata } from 'next';
import PortfolioPageClient from '@/components/PortfolioPage';
import { prisma } from '@/lib/prisma';
import staticProjects from '@/data/portfolio.json';

export const metadata: Metadata = {
    title: 'Portfolio & Case Studies | W[r]Digital',
    description: 'Esplora i nostri progetti di successo. Siti web, campagne SEO e strategie di marketing che hanno generato ROI reali per i nostri clienti.',
    openGraph: {
        title: 'Il Portfolio di W[r]Digital - Risultati che Parlano',
        description: 'Dal Web Design alla SEO avanzata. Scopri come aiutiamo le aziende a crescere.',
        url: 'https://www.wrdigital.it/portfolio',
        images: [{ url: '/og-portfolio.jpg', width: 1200, height: 630 }],
    }
};

export const dynamic = 'force-dynamic';

export default async function Page() {
    let projects: any[] = [];

    try {
        // Try to get projects from database
        projects = await prisma.project.findMany({
            where: { deleted: false },
            orderBy: { createdAt: 'desc' }
        });

        // If database is empty, use static fallback
        if (!projects || projects.length === 0) {
            console.log('Database empty, using static portfolio data');
            projects = (staticProjects as any[]).filter(p => !p.deleted);
        }
    } catch (error) {
        // On database error, use static fallback
        console.error('Database error, using static fallback:', error);
        projects = (staticProjects as any[]).filter(p => !p.deleted);
    }

    // Parse JSON fields
    const formattedProjects = projects.map(p => ({
        ...p,
        results: typeof p.results === 'string' ? JSON.parse(p.results) : (p.results || []),
        tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : (p.tags || [])
    }));

    return <PortfolioPageClient projects={formattedProjects} />;
}

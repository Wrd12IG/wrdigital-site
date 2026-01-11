import { Metadata } from 'next';
import PortfolioPageClient from '@/components/PortfolioPage';
import { prisma } from '@/lib/prisma';

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
    const projects = await prisma.project.findMany({
        where: { deleted: false },
        orderBy: { createdAt: 'desc' }
    });

    // Parse JSON fields
    const formattedProjects = projects.map(p => ({
        ...p,
        results: p.results ? JSON.parse(p.results as string) : [],
        tags: p.tags ? JSON.parse(p.tags as string) : []
    }));

    return <PortfolioPageClient projects={formattedProjects} />;
}

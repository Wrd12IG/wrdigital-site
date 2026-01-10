import { MetadataRoute } from 'next';
import { servicesData } from '@/data/services';
import portfolioData from '@/data/portfolio.json';

const baseUrl = 'https://www.wrdigital.it';

export default function sitemap(): MetadataRoute.Sitemap {
    // Pagine statiche
    const routes = [
        '',
        '/servizi',
        '/chi-siamo',
        '/contatti',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    // Pagine servizi dinamiche
    const serviceRoutes = Object.keys(servicesData).map((slug) => ({
        url: `${baseUrl}/servizi/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Pagine portfolio (se avessero una pagina di dettaglio, per ora metto solo l'ancora se necessario o le filtro)
    // Assumento che per ora il portfolio sia solo in home o modale, se ci fossero pagine dedicate:
    // const projectRoutes = portfolioData.map((project) => ({
    //   url: `${baseUrl}/portfolio/${project.id}`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly' as const,
    //   priority: 0.6,
    // }));

    // Pillar Page e Blog
    const contentRoutes = [
        {
            url: `${baseUrl}/agenzia-marketing-digitale`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9, // Alta priorità per la Pillar Page
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.7,
        },
    ];

    return [...routes, ...serviceRoutes, ...contentRoutes];
}

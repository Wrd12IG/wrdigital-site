import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import comuniData from '@/data/comuni-mb.json';

const baseUrl = 'https://www.wrdigital.it';

const CORE_PAGES_DATE = new Date('2026-05-21T00:00:00.000Z');
const ZONE_PAGES_DATE = new Date('2025-03-01T00:00:00.000Z');
const GEO_PAGES_LAUNCH_DATE = new Date('2024-09-01T00:00:00.000Z');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // 1. Static Pages — date reali specifiche, non new Date() uniforme
    const staticRoutes = [
        { route: '', priority: 1.0, changeFreq: 'weekly' as const, date: CORE_PAGES_DATE },
        { route: '/preventivo', priority: 0.8, changeFreq: 'weekly' as const, date: CORE_PAGES_DATE },
        { route: '/agenzia-marketing-digitale', priority: 0.9, changeFreq: 'weekly' as const, date: CORE_PAGES_DATE },
        { route: '/agenzia-digital-marketing-monza-brianza', priority: 0.85, changeFreq: 'weekly' as const, date: CORE_PAGES_DATE },
        { route: '/agenzia-digital-marketing-milano', priority: 0.85, changeFreq: 'weekly' as const, date: CORE_PAGES_DATE },
        { route: '/consulenza-seo-monza', priority: 0.8, changeFreq: 'weekly' as const, date: CORE_PAGES_DATE },
        { route: '/blog', priority: 0.8, changeFreq: 'weekly' as const, date: CORE_PAGES_DATE },
        { route: '/portfolio', priority: 0.8, changeFreq: 'weekly' as const, date: CORE_PAGES_DATE },
        { route: '/incentivi-2026', priority: 0.7, changeFreq: 'monthly' as const, date: new Date('2026-01-01T00:00:00.000Z') },
        { route: '/privacy-policy', priority: 0.3, changeFreq: 'monthly' as const, date: new Date('2024-05-01T00:00:00.000Z') },
        { route: '/cookie-policy', priority: 0.3, changeFreq: 'monthly' as const, date: new Date('2024-05-01T00:00:00.000Z') },
    ].map(({ route, priority, changeFreq, date }) => ({
        url: `${baseUrl}${route}`,
        lastModified: date,
        changeFrequency: changeFreq,
        priority,
    }));

    // 2. Geo zone pages — data di creazione reale (non oggi)
    const zoneRoutes = comuniData.map(comune => ({
        url: `${baseUrl}/zona/${comune.slug}`,
        lastModified: ZONE_PAGES_DATE,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // 2.1 Geo Service pages — Programmatic SEO (4 services x comuni)
    const serviceGeoRoutes: any[] = [];
    const servicesList = ['seo', 'ads', 'social', 'web'];
    comuniData.forEach(comune => {
        servicesList.forEach(servizio => {
            serviceGeoRoutes.push({
                url: `${baseUrl}/servizi/${servizio}/${comune.slug}`,
                lastModified: GEO_PAGES_LAUNCH_DATE,
                changeFrequency: 'monthly' as const,
                priority: 0.6,
            });
        });
    });

    // 3. Dynamic Services (from DB)
    const services = await prisma.page.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true }
    });

    const serviceRoutes = services.map((service) => ({
        url: `${baseUrl}/servizi/${service.slug}`,
        lastModified: service.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // 4. Dynamic Blog Posts (from DB)
    const posts = await prisma.blogPost.findMany({
        where: { published: true, deleted: false },
        select: { slug: true, id: true, updatedAt: true }
    });

    const blogRoutes = posts
        .filter((post) => post.slug && post.slug.trim() !== '')
        .map((post) => ({
            url: `${baseUrl}/blog/${post.slug || post.id}`,
            lastModified: post.updatedAt,
            changeFrequency: 'daily' as const,
            priority: 0.7,
        }));

    return [...staticRoutes, ...zoneRoutes, ...serviceGeoRoutes, ...serviceRoutes, ...blogRoutes];
}

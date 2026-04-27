import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

const baseUrl = 'https://www.wrdigital.it';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // 1. Static Pages - with correct priorities
    const staticRoutes = [
        { route: '', priority: 1.0, changeFreq: 'weekly' as const },
        { route: '/preventivo', priority: 0.8, changeFreq: 'weekly' as const },
        { route: '/agenzia-marketing-digitale', priority: 0.9, changeFreq: 'weekly' as const },
        { route: '/agenzia-digital-marketing-monza-brianza', priority: 0.85, changeFreq: 'weekly' as const },
        { route: '/consulenza-seo-monza', priority: 0.8, changeFreq: 'weekly' as const },
        { route: '/blog', priority: 0.8, changeFreq: 'weekly' as const },
        { route: '/portfolio', priority: 0.8, changeFreq: 'weekly' as const },
        { route: '/incentivi-2026', priority: 0.7, changeFreq: 'monthly' as const },
        { route: '/privacy-policy', priority: 0.3, changeFreq: 'monthly' as const },
        { route: '/cookie-policy', priority: 0.3, changeFreq: 'monthly' as const },
    ].map(({ route, priority, changeFreq }) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: changeFreq,
        priority,
    }));

    // 2. Dynamic Services (from DB)
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

    // 3. Dynamic Blog Posts (from DB) - use slug for semantic SEO URLs (not random id)
    const posts = await prisma.blogPost.findMany({
        where: { published: true, deleted: false },
        select: { slug: true, id: true, updatedAt: true }
    });

    const blogRoutes = posts
        .filter((post) => post.slug && post.slug.trim() !== '')
        .map((post) => ({
            // Prefer semantic slug; fall back to id only if slug is unavailable
            url: `${baseUrl}/blog/${post.slug || post.id}`,
            lastModified: post.updatedAt,
            changeFrequency: 'daily' as const,
            priority: 0.7,
        }));

    return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}

import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

const baseUrl = 'https://www.wrdigital.it';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // 1. Static Pages
    const staticRoutes = [
        '',
        '/preventivo',
        '/agenzia-marketing-digitale',
        '/blog',
        '/portfolio',
        '/privacy-policy',
        '/cookie-policy'
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1.0 : 0.8,
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

    // 3. Dynamic Blog Posts (from DB)
    const posts = await prisma.blogPost.findMany({
        where: { published: true, deleted: false },
        select: { id: true, updatedAt: true }
    });

    const blogRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.id}`,
        lastModified: post.updatedAt,
        changeFrequency: 'daily' as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}

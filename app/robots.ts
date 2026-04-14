import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/', '/private/', '/checkout/'],
        },
        sitemap: 'https://www.wrdigital.it/sitemap.xml',
    };
}

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/', '/private/', '/checkout/', '/area-clienti/'],
            },
            // Blocca AI training crawlers
            { userAgent: 'GPTBot', disallow: ['/'] },
            { userAgent: 'Google-Extended', disallow: ['/'] },
            { userAgent: 'Bytespider', disallow: ['/'] },
            { userAgent: 'CCBot', disallow: ['/'] },
            // Permetti AI browsing crawlers (visibilità in ChatGPT, Perplexity, Claude)
            { userAgent: 'ChatGPT-User', allow: ['/'] },
            { userAgent: 'PerplexityBot', allow: ['/'] },
            { userAgent: 'ClaudeBot', allow: ['/'] },
        ],
        sitemap: 'https://www.wrdigital.it/sitemap.xml',
    };
}

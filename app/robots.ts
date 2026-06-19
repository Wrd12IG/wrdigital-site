import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/', '/private/', '/checkout/', '/area-clienti/'],
            },
            // Blocca AI training scrapers non autorizzati
            { userAgent: 'Bytespider', disallow: ['/'] },
            { userAgent: 'CCBot', disallow: ['/'] },
            // Permetti AI crawlers autorizzati (visibilità in ChatGPT, Perplexity, Claude, Gemini)
            { userAgent: 'GPTBot', allow: ['/'] },
            { userAgent: 'Google-Extended', allow: ['/'] },
            { userAgent: 'ChatGPT-User', allow: ['/'] },
            { userAgent: 'PerplexityBot', allow: ['/'] },
            { userAgent: 'ClaudeBot', allow: ['/'] },
            { userAgent: 'Anthropic-AI', allow: ['/'] },
        ],
        sitemap: 'https://www.wrdigital.it/sitemap.xml',
    };
}

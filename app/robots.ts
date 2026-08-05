import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const commonDisallow = ['/admin/', '/api/', '/private/', '/checkout/', '/area-clienti/'];
    const aiBots = [
        'GPTBot',
        'ChatGPT-User',
        'Google-Extended',
        'ClaudeBot',
        'Claude-Web',
        'Anthropic-AI',
        'PerplexityBot',
        'CCBot',
        'Bytespider',
        'FacebookBot',
        'Applebot',
        'cohere-ai'
    ];

    return {
        rules: [
            // Regola base per gli utenti/bot generici
            {
                userAgent: '*',
                allow: '/',
                disallow: commonDisallow,
            },
            // Regole specifiche per bot AI/LLM che garantiscono l'esclusione delle aree sensibili
            ...aiBots.map(bot => ({
                userAgent: bot,
                allow: ['/'],
                disallow: commonDisallow,
            }))
        ],
        sitemap: 'https://www.wrdigital.it/sitemap.xml',
    };
}


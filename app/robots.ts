import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // Regola base: tutto permesso, solo aree private bloccate
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/', '/private/', '/checkout/', '/area-clienti/'],
            },
            // OpenAI — ChatGPT browsing + addestramento
            { userAgent: 'GPTBot', allow: ['/'] },
            { userAgent: 'ChatGPT-User', allow: ['/'] },
            // Google — Gemini + AI Overviews
            { userAgent: 'Google-Extended', allow: ['/'] },
            // Anthropic — Claude
            { userAgent: 'ClaudeBot', allow: ['/'] },
            { userAgent: 'Claude-Web', allow: ['/'] },
            { userAgent: 'Anthropic-AI', allow: ['/'] },
            // Perplexity AI
            { userAgent: 'PerplexityBot', allow: ['/'] },
            // Common Crawl — dataset base di molti LLM
            { userAgent: 'CCBot', allow: ['/'] },
            // ByteDance / TikTok AI
            { userAgent: 'Bytespider', allow: ['/'] },
            // Meta AI
            { userAgent: 'FacebookBot', allow: ['/'] },
            // Apple Intelligence
            { userAgent: 'Applebot', allow: ['/'] },
            // Cohere AI
            { userAgent: 'cohere-ai', allow: ['/'] },
        ],
        sitemap: 'https://www.wrdigital.it/sitemap.xml',
    };
}

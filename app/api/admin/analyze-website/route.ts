import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';

const streamPipeline = promisify(pipeline);

/**
 * POST /api/admin/analyze-website
 * Body: { url: string }
 * Returns: { logo, name, description, socials: { facebook, instagram, linkedin, twitter } }
 */
export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    const isAdmin = (session: any) => true;

        return NextResponse.json({
            success: true,
            data: extractedData
        });

    } catch (error: any) {
        console.error('Website Analysis Error:', error);
        return NextResponse.json({
            error: 'Errore durante l\'analisi del sito',
            details: error.message
        }, { status: 500 });
    }
}

// Helper functions to extract data from HTML

function extractName(html: string, url: URL): string {
    // Try og:site_name
    const ogSiteName = html.match(/<meta[^>]*property=["']og:site_name["'][^>]*content=["']([^"']+)["']/i);
    if (ogSiteName) return ogSiteName[1];

    // Try twitter:site
    const twitterSite = html.match(/<meta[^>]*name=["']twitter:site["'][^>]*content=["']([^"']+)["']/i);
    if (twitterSite) return twitterSite[1].replace('@', '');

    // Try title tag
    const title = html.match(/<title>([^<]+)<\/title>/i);
    if (title) return title[1].split('|')[0].split('-')[0].trim();

    // Fallback to domain
    return url.hostname.replace('www.', '');
}

function extractDescription(html: string): string {
    // 1. Try og:description
    const ogDesc = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
    if (ogDesc && ogDesc[1].length > 10) return ogDesc[1];

    // 2. Try meta description
    const metaDesc = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
    if (metaDesc && metaDesc[1].length > 10) return metaDesc[1];

    // 3. Fallback: Try to find the first H2 (often a slogan)
    const h2 = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    if (h2) {
        const text = h2[1].replace(/<[^>]*>/g, '').trim(); // Strip HTML
        if (text.length > 20 && text.length < 200) return text;
    }

    // 4. Fallback: Try to find the first significant paragraph
    const p = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    if (p) {
        const text = p[1].replace(/<[^>]*>/g, '').trim();
        if (text.length > 50 && text.length < 300) return text;
    }

    return '';
}

function extractLogo(html: string, url: URL): string | null {
    // 1. Try JSON-LD structured data (schema.org)
    const jsonLdMatch = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
    if (jsonLdMatch) {
        for (const scriptTag of jsonLdMatch) {
            try {
                const jsonContent = scriptTag.replace(/<script[^>]*>|<\/script>/gi, '').trim();
                const data = JSON.parse(jsonContent);

                // Check for logo in Organization or LocalBusiness schema
                const logo = findLogoInJsonLd(data);
                if (logo) return resolveUrl(logo, url);
            } catch (e) {
                // Invalid JSON, skip
            }
        }
    }

    // 2. Try og:image
    const ogImage = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
    if (ogImage) return resolveUrl(ogImage[1], url);

    // 3. Try twitter:image
    const twitterImage = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i);
    if (twitterImage) return resolveUrl(twitterImage[1], url);

    // 4. Try apple-touch-icon (often used as logo)
    const appleTouchIcon = html.match(/<link[^>]*rel=["']apple-touch-icon["'][^>]*href=["']([^"']+)["']/i);
    if (appleTouchIcon) return resolveUrl(appleTouchIcon[1], url);

    // 5. Try to find logo in common places (including lazy-loading attrs)
    const logoPatterns = [
        /<img[^>]*data-src=["']([^"']*logo[^"']*\.(?:png|jpg|jpeg|svg|webp))["']/i,
        /<img[^>]*src=["']([^"']*logo[^"']*\.(?:png|jpg|jpeg|svg|webp))["']/i,
        /<img[^>]*data-lazy-src=["']([^"']*logo[^"']*\.(?:png|jpg|jpeg|svg|webp))["']/i,
        /<img[^>]*alt=["'][^"']*logo[^"']*["'][^>]*src=["']([^"']+)["']/i,
        /<img[^>]*class=["'][^"']*logo[^"']*["'][^>]*src=["']([^"']+)["']/i,
    ];

    for (const pattern of logoPatterns) {
        const match = html.match(pattern);
        if (match) return resolveUrl(match[1], url);
    }

    // 6. Last resort: check any image with 'logo' in filename or class
    const anyLogo = html.match(/<img[^>]*(?:src|data-src)=["']([^"']+)["'][^>]*(?:class|alt|id)=["'][^"']*logo[^"']*["']/i);
    if (anyLogo) return resolveUrl(anyLogo[1], url);

    return null;
}

// Helper function to recursively find logo in JSON-LD data
function findLogoInJsonLd(data: any): string | null {
    if (!data) return null;

    // Handle arrays
    if (Array.isArray(data)) {
        for (const item of data) {
            const logo = findLogoInJsonLd(item);
            if (logo) return logo;
        }
        return null;
    }

    // Handle objects
    if (typeof data === 'object') {
        // Direct logo property
        if (data.logo) {
            if (typeof data.logo === 'string') return data.logo;
            if (data.logo.url) return data.logo.url;
            if (data.logo['@id']) return data.logo['@id'];
        }

        // Image property (sometimes used as logo)
        if (data.image && (data['@type'] === 'Organization' || data['@type'] === 'LocalBusiness')) {
            if (typeof data.image === 'string') return data.image;
            if (data.image.url) return data.image.url;
            if (data.image['@id']) return data.image['@id'];
        }

        // Recursively check nested objects
        for (const key in data) {
            if (key !== 'logo' && key !== 'image') {
                const logo = findLogoInJsonLd(data[key]);
                if (logo) return logo;
            }
        }
    }

    return null;
}


function extractFavicon(html: string, url: URL): string {
    // Try link rel icon
    const favicon = html.match(/<link[^>]*rel=["'](?:icon|shortcut icon)["'][^>]*href=["']([^"']+)["']/i);
    if (favicon) return resolveUrl(favicon[1], url);

    // Fallback to /favicon.ico
    return `${url.origin}/favicon.ico`;
}

function extractSocials(html: string): Record<string, string> {
    const socials: Record<string, string> = {};

    const patterns = {
        facebook: /(?:https?:\/\/)?(?:www\.)?facebook\.com\/([a-zA-Z0-9._-]+)/gi,
        instagram: /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([a-zA-Z0-9._-]+)/gi,
        twitter: /(?:https?:\/\/)?(?:www\.)?(?:twitter|x)\.com\/([a-zA-Z0-9._-]+)/gi,
        linkedin: /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/(?:company|in)\/([a-zA-Z0-9._-]+)/gi,
        youtube: /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:c\/|channel\/|@)?([a-zA-Z0-9._-]+)/gi,
        tiktok: /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@([a-zA-Z0-9._-]+)/gi,
    };

    for (const [platform, pattern] of Object.entries(patterns)) {
        const matches = html.matchAll(pattern);
        for (const match of matches) {
            if (!socials[platform]) {
                socials[platform] = match[0];
                break;
            }
        }
    }

    return socials;
}

function extractColors(html: string): string[] {
    const colors: string[] = [];

    // Try to extract theme color
    const themeColor = html.match(/<meta[^>]*name=["']theme-color["'][^>]*content=["']([^"']+)["']/i);
    if (themeColor) colors.push(themeColor[1]);

    return colors;
}

function resolveUrl(path: string, baseUrl: URL): string {
    if (path.startsWith('http')) return path;
    if (path.startsWith('//')) return `https:${path}`;
    if (path.startsWith('/')) return `${baseUrl.origin}${path}`;
    return `${baseUrl.origin}/${path}`;
}

function decodeHtml(html: string): string {
    return html
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#039;/g, "'")
        .replace(/&#x27;/g, "'")
        .replace(/&rsquo;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/&ndash;/g, '-')
        .replace(/&mdash;/g, '-')
        .replace(/&hellip;/g, '...');
}

'use client';

import { usePathname } from 'next/navigation';
import { servicesData } from '@/data/services';
import blogPosts from '@/data/blog.json';
import faqData from '@/data/faq.json';
import { COMPANY, ORG_ID, SITE_URL, WEBSITE_ID, orgRef, postalAddress } from '@/lib/company';

// Route che emettono già una BreadcrumbList nel proprio JSON-LD.
const PAGE_LEVEL_BREADCRUMB = [
    /^\/google-ads-monza$/,
    /^\/agenzia-digital-marketing-milano$/,
    /^\/agenzia-digital-marketing-monza-brianza$/,
    /^\/social-media-marketing-monza$/,
    /^\/web-agency-monza$/,
    /^\/zona\/[^/]+$/,
    /^\/servizi\/[^/]+\/[^/]+$/,
];

const humanize = (slug: string) =>
    decodeURIComponent(slug).replace(/-/g, ' ').replace(/^./, c => c.toUpperCase());

function breadcrumbLabel(segments: string[], i: number): string {
    const seg = segments[i];
    if (segments[0] === 'blog' && i === 1) {
        const post = (blogPosts as any[]).find(p => p.slug === seg);
        if (post?.title) return post.title;
    }
    if (segments[0] === 'servizi' && i === 1 && servicesData[seg]?.title) {
        return servicesData[seg].title;
    }
    return humanize(seg);
}

interface StructuredDataProps {
    config?: {
        logo?: string;
        [key: string]: any;
    };
}

export default function StructuredData({ config }: StructuredDataProps) {
    const pathname = usePathname();
    const logoUrl = config?.logo || "https://www.wrdigital.it/logo.png";

    // Entità unica (Organization + LocalBusiness): tutte le pagine la referenziano via ORG_ID.
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": ["ProfessionalService", "LocalBusiness", "Organization"],
        "@id": ORG_ID,
        "name": COMPANY.name,
        "alternateName": COMPANY.alternateName,
        "legalName": COMPANY.legalName,
        "vatID": COMPANY.vatID,
        "url": SITE_URL,
        "logo": logoUrl,
        "image": [logoUrl, `${SITE_URL}/og-image.png`],
        "description": "Agenzia di digital marketing a Monza e Milano: SEO, GEO, Google Ads, social media e siti web per PMI.",
        "foundingDate": String(COMPANY.foundingYear),
        "email": COMPANY.email,
        "telephone": COMPANY.telephone,
        "priceRange": "€€",
        "address": postalAddress(),
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": COMPANY.geo.latitude,
            "longitude": COMPANY.geo.longitude
        },
        "hasMap": "https://www.google.com/maps/place/WRDigital,+Via+Venezia,+2,+20834+Nova+Milanese+MB",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": COMPANY.openingHours.days,
                "opens": COMPANY.openingHours.opens,
                "closes": COMPANY.openingHours.closes
            }
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": COMPANY.telephone,
            "email": COMPANY.email,
            "contactType": "customer service",
            "areaServed": "IT",
            "availableLanguage": "Italian"
        },
        "founder": COMPANY.founders.map(f => ({
            "@type": "Person",
            "name": f.name,
            "jobTitle": f.jobTitle,
            "worksFor": { "@id": ORG_ID }
        })),
        "areaServed": [
            { "@type": "City", "name": "Nova Milanese", "sameAs": "https://www.wikidata.org/wiki/Q40656" },
            { "@type": "City", "name": "Milano", "sameAs": "https://www.wikidata.org/wiki/Q490" },
            { "@type": "City", "name": "Monza", "sameAs": "https://www.wikidata.org/wiki/Q3515" },
            { "@type": "City", "name": "Seregno" },
            { "@type": "City", "name": "Desio" },
            { "@type": "City", "name": "Lissone" },
            { "@type": "City", "name": "Cesano Maderno" },
            { "@type": "City", "name": "Bovisio Masciago" },
            { "@type": "City", "name": "Muggiò" },
            { "@type": "City", "name": "Brugherio" },
            { "@type": "City", "name": "Arcore" },
            { "@type": "City", "name": "Vimercate" },
            { "@type": "City", "name": "Giussano" },
            { "@type": "City", "name": "Meda" },
            { "@type": "City", "name": "Limbiate" },
            { "@type": "City", "name": "Varedo" },
            { "@type": "City", "name": "Concorezzo" },
            { "@type": "City", "name": "Villasanta" },
            { "@type": "City", "name": "Carate Brianza" },
            { "@type": "City", "name": "Biassono" },
            { "@type": "City", "name": "Agrate Brianza" },
            { "@type": "City", "name": "Sovico" },
            { "@type": "AdministrativeArea", "name": "Provincia di Monza e della Brianza" },
            { "@type": "AdministrativeArea", "name": "Provincia di Milano" }
        ],
        "knowsAbout": [
            "SEO",
            "Generative Engine Optimization (GEO)",
            "Google Ads",
            "Social media marketing",
            "Realizzazione siti web",
            "Digital marketing per concessionarie auto"
        ],
        "sameAs": [...COMPANY.sameAs]
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        "name": COMPANY.name,
        "alternateName": COMPANY.alternateName,
        "url": SITE_URL,
        "inLanguage": "it-IT",
        "publisher": { "@id": ORG_ID }
    };

    // BreadcrumbList globale, esclusa la home e le route che la dichiarano già nella propria pagina.
    const getBreadcrumbSchema = () => {
        if (pathname === '/') return null;
        if (PAGE_LEVEL_BREADCRUMB.some(re => re.test(pathname))) return null;

        const segments = pathname.split('/').filter(Boolean);
        const items = [{ name: 'Home', item: SITE_URL }];
        segments.forEach((seg, i) => {
            const path = '/' + segments.slice(0, i + 1).join('/');
            items.push({ name: breadcrumbLabel(segments, i), item: `${SITE_URL}${path}` });
        });

        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": items.map((it, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "name": it.name,
                "item": it.item
            }))
        };
    };

    // Homepage FAQ Schema — top FAQ geo-locali (priorità 11 > 10)
    const homepageFaqSchema = pathname === '/' ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": (faqData as any[])
            .sort((a, b) => (b.priority || 0) - (a.priority || 0))
            .slice(0, 6)
            .map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.answer
                }
            }))
    } : null;



    // Service Schema (Rich Snippets: Stars & Price)
    const getServiceSchema = () => {
        if (!pathname.startsWith('/servizi/')) return null;

        const slug = pathname.split('/').pop();
        const service = servicesData[slug || ''];

        if (!service) return null;

        return {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": service.title,
            "provider": orgRef(),
            "description": service.description,
            "areaServed": "Italy",
            "offers": {
                "@type": "Offer",
                "url": `https://www.wrdigital.it${pathname}`,
                "priceCurrency": "EUR",
                "price": "1500.00",
                "priceValidUntil": `${new Date().getFullYear()}-12-31`,
                "availability": "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition"
            }
        };
    };

    // FAQ Schema
    const getFAQSchema = () => {
        if (!pathname.startsWith('/servizi/')) return null;

        const slug = pathname.split('/').pop();
        const service = servicesData[slug || ''];

        if (!service || !service.faq) return null;

        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": service.faq.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.answer
                }
            }))
        };
    };

    const getArticleSchema = () => {
        if (!pathname.startsWith('/blog/')) return null;

        const slug = pathname.split('/').pop();
        const post = blogPosts.find(p => p.slug === slug);

        if (!post) return null;

        return {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt || post.metaDescription,
            "image": post.image,
            "author": (post as any).authorName
                ? [{ "@type": "Person", "name": (post as any).authorName, "worksFor": { "@id": ORG_ID } }]
                : [orgRef()],
            "publisher": orgRef(),
            "datePublished": post.createdAt || "2026-01-01",
            "dateModified": post.updatedAt || post.createdAt || "2026-01-01",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://www.wrdigital.it${pathname}`
            },
            "keywords": Array.isArray(post.tags) ? post.tags.join(', ') : post.tags
        };
    };

    const serviceSchema = getServiceSchema();
    const faqSchema = getFAQSchema();
    const articleSchema = getArticleSchema();
    const breadcrumbSchema = getBreadcrumbSchema();

    return (
        <div id="structured-data-container" style={{ display: 'none' }}>
            {/* Organization + LocalBusiness (entità unica) */}
            <script
                key="schema-org"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />

            {breadcrumbSchema && (
                <script
                    key="schema-breadcrumb"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                />
            )}

            {/* WebSite Schema */}
            <script
                key="schema-website"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />

            {/* Homepage FAQ Schema */}
            {homepageFaqSchema && (
                <script
                    key="schema-faq-home"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }}
                />
            )}

            {/* Service Schema (Rich Snippets) */}
            {serviceSchema && (
                <script
                    key="schema-service"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
                />
            )}

            {/* FAQ Schema (Service Pages) */}
            {faqSchema && (
                <script
                    key="schema-faq-service"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}

            {/* Article Schema (Blog Posts) */}
            {articleSchema && (
                <script
                    key="schema-article"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
                />
            )}
        </div>
    );
}

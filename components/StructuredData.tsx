'use client';

import { usePathname } from 'next/navigation';
import { servicesData } from '@/data/services';

interface StructuredDataProps {
    config?: {
        logo?: string;
        [key: string]: any;
    };
}

export default function StructuredData({ config }: StructuredDataProps) {
    const pathname = usePathname();
    const logoUrl = config?.logo || "https://www.wrdigital.it/logo.png";

    // Organization Schema (Global)
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "WRDigital S.r.l.",
        "alternateName": "W[r]Digital",
        "url": "https://www.wrdigital.it",
        "logo": logoUrl,
        "description": "Digital agency specializzata in SEO, Social Media Marketing, Web Development e Advertising a Milano",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Via Venezia, 2",
            "addressLocality": "Nova Milanese",
            "addressRegion": "MB",
            "postalCode": "20834",
            "addressCountry": "IT"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+39-340-120-4651",
            "contactType": "customer service",
            "areaServed": "IT",
            "availableLanguage": "Italian"
        },
        "sameAs": [
            "https://www.instagram.com/wrdigital",
            "https://www.linkedin.com/company/wrdigital",
            "https://www.facebook.com/wrdigital",
            "https://www.youtube.com/@wrdigital.agency"
        ]
    };

    // Enhanced LocalBusiness Schema
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "ProfessionalService", "DigitalMarketingAgency"], // Multi-type for better categorization
        "name": "W[r]Digital - Agenzia Digital Marketing",
        "image": logoUrl,
        "@id": "https://www.wrdigital.it",
        "url": "https://www.wrdigital.it",
        "telephone": "+39-340-120-4651",
        "priceRange": "€€",
        "email": "info@wrdigital.it",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Via Venezia, 2",
            "addressLocality": "Nova Milanese",
            "addressRegion": "MB",
            "postalCode": "20834",
            "addressCountry": "IT"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 45.5898, // Verified Coords for Via Venezia 2, Nova Milanese
            "longitude": 9.1995
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
            }
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "58",
            "bestRating": "5",
            "worstRating": "1"
        },
        "areaServed": {
            "@type": "GeoCircle",
            "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 45.4642,
                "longitude": 9.1900
            },
            "geoRadius": "50000" // Serve Milan area + 50km
        },
        "sameAs": [
            "https://www.instagram.com/wrdigital",
            "https://www.linkedin.com/company/wrdigital",
            "https://www.facebook.com/wrdigital"
        ]
    };

    // Breadcrumb Schema (only for non-homepage)
    const getBreadcrumbSchema = () => {
        if (pathname === '/') return null;

        const pathSegments = pathname.split('/').filter(Boolean);
        const items = [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.wrdigital.it"
            }
        ];

        let currentPath = '';
        pathSegments.forEach((segment, index) => {
            currentPath += `/${segment}`;
            items.push({
                "@type": "ListItem",
                "position": index + 2,
                "name": segment.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                "item": `https://www.wrdigital.it${currentPath}`
            });
        });

        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": items
        };
    };

    // WebSite Schema (per Google Sitelinks Search Box)
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "W[r]Digital - Agenzia Digital Marketing Milano",
        "url": "https://www.wrdigital.it",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.wrdigital.it/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    };

    const homepageFaqSchema = null;

    const breadcrumbSchema = getBreadcrumbSchema();

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
            "provider": {
                "@type": "LocalBusiness",
                "name": "WRDigital S.r.l.",
                "image": logoUrl,
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Via Venezia, 2",
                    "addressLocality": "Nova Milanese",
                    "addressRegion": "MB",
                    "postalCode": "20834",
                    "addressCountry": "IT"
                }
            },
            "description": service.description,
            "areaServed": "Italy",
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Servizi Digitali",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": service.title
                        }
                    }
                ]
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": service.clientCount > 0 ? service.clientCount : 50,
                "bestRating": "5",
                "worstRating": "1"
            },
            "offers": {
                "@type": "Offer",
                "url": `https://www.wrdigital.it${pathname}`,
                "priceCurrency": "EUR",
                "price": "1500.00",
                "priceValidUntil": "2025-12-31",
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

    const serviceSchema = getServiceSchema();
    const faqSchema = getFAQSchema();

    return (
        <div id="structured-data-container" style={{ display: 'none' }}>
            {/* Organization Schema */}
            <script
                key="schema-org"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />

            {/* LocalBusiness Schema */}
            <script
                key="schema-local"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />

            {/* WebSite Schema (per Sitelinks Search Box) */}
            <script
                key="schema-website"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />

            {/* Breadcrumb Schema (non-homepage) */}
            {breadcrumbSchema && (
                <script
                    key="schema-breadcrumb"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                />
            )}

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
        </div>
    );
}

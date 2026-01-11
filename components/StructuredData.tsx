'use client';

import { usePathname } from 'next/navigation';
import { servicesData } from '@/data/services';

export default function StructuredData() {
    const pathname = usePathname();

    // Organization Schema (Global)
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "WRDigital S.r.l.",
        "alternateName": "W[r]Digital",
        "url": "https://www.wrdigital.it",
        "logo": "https://www.wrdigital.it/logo.png",
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

    // LocalBusiness Schema
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "WRDigital S.r.l.",
        "image": "https://www.wrdigital.it/logo.png",
        "@id": "https://www.wrdigital.it",
        "url": "https://www.wrdigital.it",
        "telephone": "+39-340-120-4651",
        "priceRange": "€€",
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
            "latitude": 45.5877,
            "longitude": 9.2004
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "09:00",
            "closes": "18:00"
        },
        "sameAs": [
            "https://www.instagram.com/wrdigital",
            "https://www.linkedin.com/company/wrdigital"
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

    // Homepage FAQ Schema
    const homepageFaqSchema = pathname === '/' ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Quali servizi offre W[r]Digital?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "W[r]Digital offre servizi completi di digital marketing: SEO (ottimizzazione per motori di ricerca), Social Media Marketing, Web Development, Advertising (Google Ads, Meta Ads), Content Marketing e Branding. Ogni strategia è personalizzata e data-driven per massimizzare il ROI."
                }
            },
            {
                "@type": "Question",
                "name": "Dove si trova W[r]Digital?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "W[r]Digital ha sede a Nova Milanese (MB), in Via Venezia 2. Operiamo principalmente nell'area di Milano e provincia, ma serviamo clienti in tutta Italia grazie al nostro approccio digitale."
                }
            },
            {
                "@type": "Question",
                "name": "Quanto costa una consulenza SEO?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "I costi variano in base alle esigenze specifiche del progetto. Offriamo pacchetti SEO a partire da €500/mese per PMI e soluzioni enterprise personalizzate. La prima consulenza strategica è gratuita e senza impegno."
                }
            },
            {
                "@type": "Question",
                "name": "In quanto tempo si vedono i risultati SEO?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "I primi risultati SEO sono tipicamente visibili dopo 3-6 mesi, con miglioramenti significativi entro 6-12 mesi. Forniamo report mensili dettagliati per monitorare i progressi e ottimizzare la strategia."
                }
            },
            {
                "@type": "Question",
                "name": "W[r]Digital lavora con startup e PMI?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Assolutamente sì! Lavoriamo con aziende di ogni dimensione, dalle startup innovative alle PMI e grandi aziende. Adattiamo le nostre strategie e i budget alle specifiche esigenze di ogni cliente."
                }
            }
        ]
    } : null;

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
                "image": "https://www.wrdigital.it/logo.png",
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

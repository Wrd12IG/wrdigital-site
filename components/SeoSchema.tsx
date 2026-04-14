'use client';

import Script from 'next/script';

interface SeoSchemaProps {
    type: 'Service' | 'Organization' | 'Article';
    data: any;
}

export default function SeoSchema({ type, data }: SeoSchemaProps) {
    if (!type || !data) return null;

    let schema: any = {};

    if (type === 'Service') {
        const serviceSchema = {
            "@context": "https://schema.org/",
            "@type": "Service",
            "name": data.title ? `${data.title} W[r]Digital` : "Consulenza Digitale W[r]Digital",
            "serviceType": data.title || "Digital Marketing",
            "provider": {
                "@type": "LocalBusiness",
                "name": "W[r]Digital",
                "image": "https://www.wrdigital.it/logo.png", // Ensure this image exists
                "priceRange": "€€€",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Milano",
                    "addressCountry": "IT"
                }
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "42"
            },
            "offers": {
                "@type": "Offer",
                "priceCurrency": "EUR",
                "description": data.description || "Analisi e strategia digitale personalizzata."
            },
            "description": data.description || "",
            "areaServed": "IT"
        };
        schema = serviceSchema;
    } else if (type === 'Organization') {
        schema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "W[r]Digital",
            "url": "https://www.wrdigital.it",
            "logo": "https://www.wrdigital.it/logo.png",
            "sameAs": [
                "https://instagram.com/wrdigital",
                "https://linkedin.com/company/wrdigital"
            ],
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+39-340-120-4651", // Actual number
                "contactType": "customer service",
                "areaServed": "IT",
                "availableLanguage": "Italian"
            }
        };
    }

    // Add FAQ schema if present (using @graph to combine entities)
    if (data.hasFaq && data.pageFaqs && data.pageFaqs.length > 0) {
        // If schema is already defined (e.g. Service), wrap both in graph.
        // If it's empty, just make graph with FAQPage.
        const faqSchema = {
            "@type": "FAQPage",
            "mainEntity": data.pageFaqs.map((faq: any) => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.a
                }
            }))
        };

        if (Object.keys(schema).length > 0) {
            // If we already have a main entity (Service/Organization), combine them
            schema = {
                "@context": "https://schema.org",
                "@graph": [
                    schema,
                    faqSchema
                ]
            };
        } else {
            // FAQ Only
            schema = {
                "@context": "https://schema.org",
                ...faqSchema
            };
        }
    }

    return (
        <Script id={`schema-${type}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    );
}

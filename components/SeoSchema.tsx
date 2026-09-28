'use client';

import Script from 'next/script';
import { COMPANY, orgRef } from '@/lib/company';

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
            "name": data.title ? `${data.title} | ${COMPANY.name}` : `Consulenza Digitale ${COMPANY.name}`,
            "serviceType": data.title || "Digital Marketing",
            "provider": orgRef(),
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
        schema = { "@context": "https://schema.org", ...orgRef() };
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

import { Metadata } from 'next';
import ServicePageClient from './ServicePageClient';
import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';

export async function generateStaticParams() {
    const pages = await prisma.page.findMany({ select: { slug: true } });
    return pages.map((page) => ({
        slug: page.slug,
    }));
}

// Helper: Check for 301 Redirects if page not found
async function getPageOrRedirect(slug: string) {
    const page = await prisma.page.findUnique({
        where: { slug },
        include: { seo: true }
    });

    if (page) return page;

    // "Slug Lock" Logic: Check if this URL was moved
    // Assuming DB stores full path or partial. Let's use full path '/servizi/slug'
    const redirectRecord = await prisma.redirect.findFirst({
        where: { oldUrl: `/servizi/${slug}`, active: true }
    });

    if (redirectRecord) {
        // Permanent Redirect (301) to preserve SEO ranking
        redirect(redirectRecord.newUrl);
    }

    return null;
}

// Funzione SEO Dinamica "Bridge"
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;

    // 1. Recupero dati con Redirect Check
    const page = await getPageOrRedirect(slug);

    if (!page) {
        return {
            title: 'Servizio non trovato | W[r]Digital',
            robots: { index: false }
        };
    }

    const valueProp = "W[r]Digital | Agenzia Milano";
    const seo = (page.seo || {}) as any;

    // 2. Costruzione Metadati Ottimizzati
    return {
        title: seo.metaTitle || `${page.title} - ${valueProp}`,
        description: seo.metaDescription || '',
        alternates: {
            canonical: seo.canonicalUrl || `https://www.wrdigital.it/servizi/${slug}`,
        },
        openGraph: {
            title: seo.ogTitle || seo.metaTitle || page.title,
            description: seo.ogDescription || seo.metaDescription || '',
            siteName: 'W[r]Digital Agency',
            locale: 'it_IT',
            type: 'website',
            images: [
                {
                    url: seo.ogImage || '/images/og-default.jpg',
                    width: 1200,
                    height: 630,
                    alt: page.title,
                },
            ],
        },
        robots: {
            index: seo.robotsIndex ?? true,
            follow: seo.robotsFollow ?? true,
            googleBot: {
                index: seo.robotsIndex ?? true,
                follow: seo.robotsFollow ?? true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Fetch Page or Trigger Redirect
    const page = await getPageOrRedirect(slug);

    if (!page) notFound();

    let content: any = {};
    try {
        content = JSON.parse(page.content);
    } catch (e) { console.error('JSON parse error', e); }

    // Costruzione Dati Strutturati (JSON-LD) Server-Side
    // 1. Service Schema
    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": page.title,
        "description": content.description || page.seo?.metaDescription || '',
        "provider": {
            "@type": "Organization",
            "name": "W[r]Digital",
            "url": "https://www.wrdigital.it",
            "logo": "https://www.wrdigital.it/logo.png",
            "sameAs": [
                "https://www.linkedin.com/company/wrdigital",
                "https://www.instagram.com/wrdigital.it"
            ]
        },
        "areaServed": {
            "@type": "City",
            "name": "Milano"
        },
        "url": `https://www.wrdigital.it/servizi/${slug}`,
        "image": page.seo?.ogImage || "https://www.wrdigital.it/images/og-default.jpg"
    };

    // 2. FAQ Schema (separato per Rich Results)
    const hasFaq = content.faq && content.faq.length > 0;
    const faqJsonLd = hasFaq ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": content.faq.map((f: any) => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
            }
        }))
    } : null;

    // Merge dati per idratazione client
    const fullData = {
        ...content,
        metaTitle: page.seo?.metaTitle,
        metaDescription: page.seo?.metaDescription,
        heroImage: page.seo?.ogImage,
        _dbId: page.id
    };

    return (
        <>
            {/* Service JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
            />

            {/* FAQ JSON-LD (solo se presenti FAQ) */}
            {faqJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            )}

            <ServicePageClient initialData={fullData} slug={slug} />
        </>
    );
}

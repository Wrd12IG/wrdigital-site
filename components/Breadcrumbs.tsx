'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { servicesData } from '@/data/services';
import { useEffect, useState } from 'react';

const STATIC_LABELS: Record<string, string> = {
    'chi-siamo': 'Chi Siamo',
    'contatti': 'Contatti',
    'portfolio': 'Portfolio',
    'blog': 'Blog',
    'servizi': 'Servizi',
    'privacy-policy': 'Privacy Policy',
    'cookie-policy': 'Cookie Policy',
    'agenzia-marketing-digitale': 'Agenzia', // Pillar Page
    'admin': 'Area Riservata',
    'projects': 'Progetti',
    'team': 'Team'
};

export default function Breadcrumbs() {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Evita hydration mismatch e nascondi su Home
    if (!mounted) return null;
    if (pathname === '/') return null;

    // Filtra segmenti vuoti
    const segments = pathname.split('/').filter(Boolean);

    // Genera JSON-LD Schema.org per SEO Rich Snippets
    const generateJsonLd = () => {
        const itemListElement = [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.wrdigital.it"
            },
            ...segments.map((segment, index) => {
                const url = `/${segments.slice(0, index + 1).join('/')}`;
                return {
                    "@type": "ListItem",
                    "position": index + 2,
                    "name": getLabel(segment),
                    "item": `https://www.wrdigital.it${url}`
                };
            })
        ];

        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": itemListElement
        };
    };

    // Helper per ottenere label leggibile da slug
    function getLabel(segment: string) {
        if (STATIC_LABELS[segment]) return STATIC_LABELS[segment];

        // Cerca nei dati dei servizi
        if (servicesData[segment]) return servicesData[segment].title;

        // Fallback: Humanize slug (es. "web-design" -> "Web Design")
        return segment
            .replace(/-/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase());
    }

    return (
        <>
            {/* SEO Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd()) }}
            />

            {/* Visual Breadcrumb Navigation */}
            <nav
                aria-label="Breadcrumb"
                className="absolute top-[85px] left-0 w-full z-40 px-4 md:px-8 pointer-events-none animate-in fade-in slide-in-from-top-2 duration-500"
            >
                <ol className="flex items-center space-x-2 text-xs md:text-sm text-gray-300 font-medium max-w-7xl mx-auto pointer-events-auto flex-wrap">
                    <li>
                        <Link href="/" className="hover:text-yellow-400 transition-colors flex items-center gap-1 bg-black/30 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/5 hover:border-yellow-400/30 hover:bg-black/50 shadow-lg">
                            <Home className="w-3.5 h-3.5" />
                            <span className="sr-only">Home</span>
                        </Link>
                    </li>
                    {segments.map((segment, index) => {
                        const isLast = index === segments.length - 1;
                        const url = `/${segments.slice(0, index + 1).join('/')}`;
                        const label = getLabel(segment);

                        return (
                            <li key={url} className="flex items-center space-x-2">
                                <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                                {isLast ? (
                                    <span
                                        className="text-white bg-black/30 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10 shadow-lg cursor-default"
                                        aria-current="page"
                                    >
                                        {label}
                                    </span>
                                ) : (
                                    <Link
                                        href={url}
                                        className="hover:text-yellow-400 transition-colors bg-black/30 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/5 hover:border-yellow-400/30 hover:bg-black/50 shadow-lg"
                                    >
                                        {label}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
}

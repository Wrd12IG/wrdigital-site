import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import comuniData from '@/data/comuni-mb.json';

// Statically pre-render all zone pages at build time
export const dynamicParams = false;

type Comune = typeof comuniData[0];

function getComune(slug: string): Comune | undefined {
    return comuniData.find(c => c.slug === slug);
}

export async function generateStaticParams() {
    return comuniData.map(c => ({ citta: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ citta: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const comune = getComune(resolvedParams.citta);
    if (!comune) return { title: 'Pagina non trovata' };

    return {
        title: `Agenzia Digital Marketing ${comune.name} | SEO, Ads e Web | W[r]Digital`,
        description: `W[r]Digital — agenzia marketing digitale per le PMI di ${comune.name}. SEO locale, Google Ads e siti web ottimizzati. A soli ${comune.distanceKm} km dal tuo ufficio. Audit gratuita.`,
        alternates: {
            canonical: `https://www.wrdigital.it/zona/${comune.slug}`,
        },
        openGraph: {
            title: `Agenzia Digital Marketing ${comune.name} | W[r]Digital`,
            description: `Strategie SEO, Ads e Web per le PMI di ${comune.name} e della Brianza. Audit gratuita, risultati misurabili.`,
            url: `https://www.wrdigital.it/zona/${comune.slug}`,
            locale: 'it_IT',
            type: 'website',
            images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `Digital Marketing ${comune.name}` }],
        },
    };
}

const SERVICES = [
    { slug: 'seo', label: 'SEO Locale', desc: (c: Comune) => `Posizionamento Google per le keyword del tuo settore a ${c.name} e nel territorio circostante.` },
    { slug: 'ads', label: 'Google Ads & Meta Ads', desc: (c: Comune) => `Campagne geolocalizzate su ${c.name} e Provincia MB con budget ottimizzato e ROAS tracciato.` },
    { slug: 'social', label: 'Social Media', desc: (c: Comune) => `Gestione social professionale per raggiungere i clienti di ${c.name} su Instagram, Facebook e LinkedIn.` },
    { slug: 'web', label: 'Siti Web', desc: (c: Comune) => `Realizzazione siti web veloci, mobile-first e ottimizzati SEO per le PMI di ${c.name}.` },
];

export default async function CittaPage({ params }: { params: Promise<{ citta: string }> }) {
    const resolvedParams = await params;
    const comune = getComune(resolvedParams.citta);
    if (!comune) notFound();

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                "name": `Digital Marketing per ${comune.name}`,
                "description": `Servizi di digital marketing (SEO, Ads, Social, Web) per aziende e PMI di ${comune.name}, Provincia di Monza e Brianza.`,
                "provider": {
                    "@type": "LocalBusiness",
                    "name": "W[r]Digital",
                    "url": "https://www.wrdigital.it",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Via Venezia, 2",
                        "addressLocality": "Nova Milanese",
                        "addressRegion": "MB",
                        "postalCode": "20834",
                        "addressCountry": "IT"
                    },
                    "telephone": "+393401204651"
                },
                "areaServed": [
                    { "@type": "City", "name": comune.name },
                    { "@type": "AdministrativeArea", "name": "Provincia di Monza e della Brianza" }
                ],
                "url": `https://www.wrdigital.it/zona/${comune.slug}`
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.wrdigital.it" },
                    { "@type": "ListItem", "position": 2, "name": "Zone", "item": "https://www.wrdigital.it/agenzia-digital-marketing-monza-brianza" },
                    { "@type": "ListItem", "position": 3, "name": comune.name, "item": `https://www.wrdigital.it/zona/${comune.slug}` }
                ]
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": comune.cityFaq.q,
                        "acceptedAnswer": { "@type": "Answer", "text": comune.cityFaq.a }
                    },
                    {
                        "@type": "Question",
                        "name": `Dove si trova l'agenzia rispetto a ${comune.name}?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `Il nostro ufficio è a Nova Milanese (MB), a soli ${comune.distanceKm} km da ${comune.name}. Siamo disponibili per incontri di persona o chiamate video.`
                        }
                    }
                ]
            }
        ]
    };

    return (
        <main className="bg-black text-white min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Breadcrumb */}
            <div className="pt-24 pb-2 px-6 max-w-5xl mx-auto">
                <nav className="text-xs text-gray-600 font-mono flex gap-2">
                    <Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/agenzia-digital-marketing-monza-brianza" className="hover:text-yellow-400 transition-colors">Monza Brianza</Link>
                    <span>/</span>
                    <span className="text-gray-400">{comune.name}</span>
                </nav>
            </div>

            {/* HERO */}
            <section className="relative pt-16 pb-24 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/5 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <span className="inline-block text-yellow-400 text-xs font-mono uppercase tracking-[0.3em] mb-6 border border-yellow-400/30 px-4 py-2 rounded-full">
                        📍 {comune.name} (MB) — {comune.distanceKm} km da noi
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Agenzia Digital Marketing<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                            {comune.name}
                        </span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
                        {comune.uniqueIntro}
                    </p>
                    <p className="text-gray-500 text-sm mb-10">
                        Settori principali: <span className="text-gray-400">{comune.sectors.join(', ')}</span>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/#contatti" className="bg-yellow-400 text-black font-bold px-8 py-4 rounded-full hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20">
                            Audit Gratuita per {comune.name}
                        </Link>
                        <Link href="/agenzia-digital-marketing-monza-brianza" className="border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:border-white/40 transition-colors">
                            Tutti i comuni →
                        </Link>
                    </div>
                </div>
            </section>

            {/* CONTESTO LOCALE */}
            <section className="py-16 border-y border-white/10 bg-white/2">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="text-3xl font-black text-yellow-400 mb-2">{comune.population.toLocaleString('it-IT')}</div>
                            <div className="text-white font-bold mb-1">abitanti</div>
                            <div className="text-gray-500 text-sm">mercato locale di riferimento</div>
                        </div>
                        <div className="p-6">
                            <div className="text-3xl font-black text-yellow-400 mb-2">{comune.distanceKm} km</div>
                            <div className="text-white font-bold mb-1">dal nostro ufficio</div>
                            <div className="text-gray-500 text-sm">disponibili per incontri di persona</div>
                        </div>
                        <div className="p-6">
                            <div className="text-3xl font-black text-yellow-400 mb-2">24h</div>
                            <div className="text-white font-bold mb-1">risposta garantita</div>
                            <div className="text-gray-500 text-sm">audit gratuita, nessun impegno</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTESTO ECONOMICO */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                        Il mercato digitale a <span className="text-yellow-400">{comune.name}</span>
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                        {comune.name} è un comune con un tessuto economico caratterizzato da {comune.economy}
                    </p>
                    <p className="text-gray-400 leading-relaxed">
                        Per le imprese di {comune.name} che operano in questi settori, la presenza digitale è diventata un requisito fondamentale: i clienti cercano online prima di acquistare, i competitor investono in SEO e Ads. W[r]Digital ti aiuta a presidiare ogni canale con una strategia data-driven e risultati misurabili.
                    </p>
                </div>
            </section>

            {/* SERVIZI */}
            <section className="py-20 px-6 bg-white/2 border-y border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
                        Servizi per le aziende di {comune.name}
                    </h2>
                    <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
                        Ogni servizio è calibrato sulla realtà del mercato di {comune.name} e del territorio di Monza e Brianza.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {SERVICES.map(s => (
                            <Link key={s.slug} href={`/servizi/${s.slug}`} className="group p-7 bg-black border border-white/10 rounded-2xl hover:border-yellow-400/40 transition-all duration-300">
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">{s.label}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.desc(comune)}</p>
                                <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">Scopri →</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-white text-center mb-12">
                        Domande frequenti — {comune.name}
                    </h2>
                    <div className="space-y-5">
                        {[
                            { q: comune.cityFaq.q, a: comune.cityFaq.a },
                            {
                                q: `Quanto siete distanti da ${comune.name}?`,
                                a: `Il nostro ufficio è a Nova Milanese (MB), a ${comune.distanceKm} km da ${comune.name}. Siamo disponibili per incontri di persona o call video. Serviamo tutto il territorio di Monza e Brianza.`
                            },
                            {
                                q: `Quanto costa il digital marketing per una PMI di ${comune.name}?`,
                                a: `I piani partono da €900/mese per la SEO locale. Il costo dipende dagli obiettivi e dalla competitività del settore. La prima audit è gratuita e senza impegno.`
                            }
                        ].map((faq, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-yellow-400/20 transition-colors">
                                <h3 className="text-white font-bold mb-3">{faq.q}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* COMUNI VICINI */}
            <section className="py-16 px-6 border-t border-white/10">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-gray-500 text-sm uppercase tracking-widest mb-6 font-mono">Comuni vicini</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {comune.nearby.map(slug => {
                            const c = getComune(slug);
                            if (!c) return null;
                            return (
                                <Link key={slug} href={`/zona/${slug}`} className="text-sm text-gray-300 bg-white/5 border border-white/10 px-5 py-2 rounded-full hover:border-yellow-400/40 hover:text-yellow-400 transition-colors">
                                    {c.name}
                                </Link>
                            );
                        })}
                        <Link href="/agenzia-digital-marketing-monza-brianza" className="text-sm text-gray-500 bg-white/2 border border-white/5 px-5 py-2 rounded-full hover:text-gray-300 transition-colors">
                            Tutti i comuni →
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        Pronti a crescere a {comune.name}?
                    </h2>
                    <p className="text-gray-400 mb-10">Audit gratuita · Risposta in 24h · Nessun impegno</p>
                    <Link href="/#contatti" className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-black px-10 py-5 rounded-full text-lg hover:scale-105 transition-transform shadow-xl shadow-yellow-400/20">
                        Richiedi Audit Gratuita
                    </Link>
                    <p className="mt-6 text-gray-600 text-sm">
                        📍 WRDigital S.r.l. — Via Venezia 2, Nova Milanese (MB) · a {comune.distanceKm} km da {comune.name}
                    </p>
                </div>
            </section>
        </main>
    );
}

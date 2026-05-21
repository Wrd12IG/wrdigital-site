import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Agenzia Digital Marketing Milano | SEO, Ads e Web Design | W[r]Digital',
    description: 'W[r]Digital — agenzia digital marketing a Milano. SEO, Google Ads, Social Media e Web Design per aziende e PMI milanesi. Risultati misurabili e ROI garantito. Preventivo gratuito.',
    alternates: {
        canonical: 'https://www.wrdigital.it/agenzia-digital-marketing-milano',
    },
    openGraph: {
        title: 'Agenzia Digital Marketing Milano | W[r]Digital',
        description: 'La tua agenzia digital marketing di fiducia a Milano. SEO, Ads, Social Media e Web Design con ROI garantito e trasparenza totale.',
        url: 'https://www.wrdigital.it/agenzia-digital-marketing-milano',
        locale: 'it_IT',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Agenzia Digital Marketing Milano — W[r]Digital' }],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": ["LocalBusiness", "MarketingAgency"],
            "@id": "https://www.wrdigital.it/#business",
            "name": "W[r]Digital — Agenzia Digital Marketing Milano",
            "url": "https://www.wrdigital.it",
            "logo": "https://www.wrdigital.it/logo.png",
            "image": "https://www.wrdigital.it/og-image.png",
            "telephone": "+393401204651",
            "email": "info@wrdigital.it",
            "foundingDate": "2019",
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
                "latitude": 45.5898,
                "longitude": 9.1995
            },
            "areaServed": [
                { "@type": "City", "name": "Milano", "sameAs": "https://www.wikidata.org/wiki/Q490" },
                { "@type": "AdministrativeArea", "name": "Città Metropolitana di Milano" },
                { "@type": "City", "name": "Nova Milanese" },
                { "@type": "AdministrativeArea", "name": "Provincia di Monza e della Brianza" }
            ],
            "knowsAbout": [
                "SEO Milano",
                "Google Ads Milano",
                "Agenzia digital marketing Milano",
                "Social media marketing Milano",
                "Creazione siti web Milano",
                "Consulenza digital marketing Milano"
            ],
            "openingHoursSpecification": [
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    "opens": "09:00",
                    "closes": "18:00"
                }
            ],
            "sameAs": [
                "https://www.instagram.com/wrdigital.it",
                "https://www.linkedin.com/company/wrdigital",
                "https://www.facebook.com/wrdigital"
            ]
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "W[r]Digital lavora con aziende di Milano?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sì. W[r]Digital è a pochi minuti da Milano e lavora attivamente con aziende, startup e PMI del territorio milanese. Gestiamo campagne SEO, Google Ads e Social Media per imprese di tutti i settori nel capoluogo lombardo."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Quanto costa un'agenzia SEO a Milano?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "I nostri piani SEO per aziende milanesi partono da €1.200/mese per PMI. Il costo varia in base alla competitività del settore, al numero di keyword target e agli obiettivi di crescita. Offriamo un audit SEO gratuito prima di qualsiasi impegno."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Offrite servizi Google Ads per aziende a Milano?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Assolutamente sì. Il team di W[r]Digital è certificato Google Ads (Search, Shopping, Measurement) e gestisce campagne PPC per aziende milanesi con un focus sul massimo ROAS. Gestiamo anche campagne Meta Ads e LinkedIn Ads."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Perché scegliere W[r]Digital rispetto a una grande agenzia milanese?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Perché a W[r]Digital il tuo progetto non finisce a un junior. Ogni cliente ha accesso diretto al team senior, dashboard real-time e report chiari. Costi da boutique agency, risultati da grandi agenzie. Dal 2019 al fianco delle PMI lombarde."
                    }
                }
            ]
        }
    ]
};

const SERVICES = [
    {
        slug: 'seo',
        label: 'SEO a Milano',
        icon: '🔍',
        desc: 'Scalare Google per keyword come "agenzia marketing Milano" o "consulente SEO Milano" richiede un approccio tecnico e contenutistico rigoroso. Il nostro team lavora su link building, architettura e contenuti geo-targeted.',
        cta: 'Analisi SEO gratuita'
    },
    {
        slug: 'ads',
        label: 'Google Ads & Meta Ads',
        icon: '📢',
        desc: 'Campagne PPC a Milano: keyword geolocalizzate, targeting per CAP, annunci per stagione e settore. Ogni euro investito è tracciato con Google Tag Manager e reporting settimanale.',
        cta: 'Ottimizza le tue campagne'
    },
    {
        slug: 'social',
        label: 'Social Media Milano',
        icon: '📱',
        desc: 'Gestione social per aziende milanesi: contenuti che parlano alla tua audience locale, community management e advertising su Instagram, LinkedIn e TikTok.',
        cta: 'Cresci sui social'
    },
    {
        slug: 'web',
        label: 'Siti Web & E-commerce',
        icon: '💻',
        desc: 'Realizziamo siti web ad alte performance per aziende di Milano: velocità, mobile-first, SEO-ready. Dal sito vetrina all\'e-commerce completo con gestione magazzino.',
        cta: 'Richiedi preventivo web'
    },
];

const DIFFERENTIATORS = [
    {
        title: 'Certificazione Google',
        desc: 'Team certificato su Google Ads Search, Shopping e Measurement. Non improvvisiamo — seguiamo le best practice ufficiali.',
        icon: '🏆'
    },
    {
        title: 'Prossimità a Milano',
        desc: 'Siamo a Nova Milanese, 20 minuti dal centro di Milano. Incontri di persona, nessuna call infinita.',
        icon: '📍'
    },
    {
        title: 'ROI Tracciato',
        desc: 'Dashboard real-time con metriche chiare: traffico, conversioni, ROAS. Sai sempre dove vanno i tuoi soldi.',
        icon: '📊'
    },
    {
        title: 'Dal 2019',
        desc: 'Oltre 6 anni di esperienza nel digital marketing lombardo. 50+ clienti soddisfatti tra Milano e Brianza.',
        icon: '🚀'
    },
];

export default function MilanoPage() {
    return (
        <main className="bg-black text-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* HERO */}
            <section className="relative pt-40 pb-24 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/5 via-transparent to-transparent pointer-events-none" />
                {/* Subtle Milano skyline effect */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,204,21,0.04)_0%,transparent_70%)] pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <span className="inline-block text-yellow-400 text-xs font-mono uppercase tracking-[0.3em] mb-6 border border-yellow-400/30 px-4 py-2 rounded-full">
                        🏙️ Agenzia Digital Marketing — Milano
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Digital Marketing{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                            Milano
                        </span>
                        <br />
                        che produce risultati.
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        W[r]Digital è l&apos;agenzia di digital marketing per le aziende di Milano che vogliono
                        scalare Google, dominare i social e trasformare il loro sito in un generatore di clienti.
                        Strategie data-driven, risultati misurabili — senza fumo.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/preventivo"
                            className="bg-yellow-400 text-black font-bold px-8 py-4 rounded-full hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20"
                        >
                            Preventivo Gratuito →
                        </Link>
                        <Link
                            href="/agenzia-marketing-digitale"
                            className="border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:border-white/40 transition-colors"
                        >
                            Il Nostro Approccio
                        </Link>
                    </div>
                </div>
            </section>

            {/* STATS BAR */}
            <section className="py-12 border-y border-white/10 bg-white/2">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { num: '+300%', label: 'Traffico organico medio' },
                            { num: '50+', label: 'Clienti a Milano e Brianza' },
                            { num: '4x', label: 'ROI medio garantito' },
                            { num: '2019', label: 'Anno di fondazione' },
                        ].map(stat => (
                            <div key={stat.num}>
                                <div className="text-3xl font-black text-yellow-400 mb-1">{stat.num}</div>
                                <div className="text-gray-400 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                        Servizi Digital Marketing per Milano
                    </h2>
                    <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
                        Dal posizionamento SEO alle campagne ads, dalla gestione social al web design —
                        ogni servizio è progettato per il mercato milanese.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {SERVICES.map(s => (
                            <Link
                                key={s.slug}
                                href={`/servizi/${s.slug}`}
                                className="group p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-yellow-400/40 transition-all duration-300"
                            >
                                <span className="text-3xl mb-4 block">{s.icon}</span>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                                    {s.label}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.desc}</p>
                                <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">{s.cta} →</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHY US */}
            <section className="py-24 px-6 bg-white/2 border-y border-white/5">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-16">
                        Perché W[r]Digital per il tuo business a <span className="text-yellow-400">Milano</span>?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {DIFFERENTIATORS.map(d => (
                            <div key={d.title} className="flex gap-6 p-6 bg-white/3 border border-white/10 rounded-2xl">
                                <span className="text-4xl flex-shrink-0">{d.icon}</span>
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-2">{d.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{d.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONTENT SECTION — unico, non duplicato */}
            <section className="py-24 px-6">
                <div className="max-w-3xl mx-auto prose prose-invert prose-yellow">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">
                        La realtà del digital marketing a Milano
                    </h2>
                    <p className="text-gray-400 leading-relaxed mb-6">
                        Milano è il mercato digitale più competitivo d&apos;Italia. Posizionarsi su Google per keyword come
                        &quot;agenzia marketing Milano&quot;, &quot;consulente SEO Milano&quot; o &quot;web agency Milano&quot;
                        richiede un approccio tecnico e strategico che le agenzie generaliste non possono garantire.
                    </p>
                    <p className="text-gray-400 leading-relaxed mb-6">
                        In W[r]Digital lavoriamo con un metodo che parte dai dati: analisi della concorrenza SERP,
                        keyword research con intent clustering, ottimizzazione tecnica del sito, link building mirato
                        e content strategy geo-localizzata. Il risultato? Aziende milanesi che scalano Google e
                        convertono il traffico in clienti paganti.
                    </p>
                    <p className="text-gray-400 leading-relaxed">
                        La nostra sede operativa è a Nova Milanese, nel cuore della Brianza — a 20 minuti dal centro
                        di Milano. Questo ci permette di offrire la prossimità di un&apos;agenzia locale con l&apos;expertise
                        di un team che ha lavorato su mercati nazionali e internazionali.
                    </p>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 px-6 bg-white/2 border-t border-white/5">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-16">Domande Frequenti — Milano</h2>
                    <div className="space-y-6">
                        {[
                            {
                                q: 'W[r]Digital lavora con aziende di Milano?',
                                a: 'Sì. Gestiamo campagne SEO, Google Ads e Social Media per imprese milanesi di tutti i settori. La nostra sede a Nova Milanese è raggiungibile in 20 minuti dal centro di Milano.'
                            },
                            {
                                q: 'Quanto costa un\'agenzia SEO a Milano?',
                                a: 'I nostri piani SEO per aziende milanesi partono da €1.200/mese. Il costo dipende da competitività del settore e obiettivi. Offriamo audit gratuita prima di qualsiasi impegno.'
                            },
                            {
                                q: 'Offrite servizi Google Ads per aziende a Milano?',
                                a: 'Sì, il team è certificato Google Ads e gestisce campagne PPC geolocalizzate per il mercato milanese con focus sul ROAS.'
                            },
                            {
                                q: 'Perché scegliere W[r]Digital rispetto a una grande agenzia milanese?',
                                a: 'Perché non passi dal junior. Accesso diretto al team senior, dashboard real-time, report chiari. Costi da boutique agency, risultati da grandi agenzie.'
                            },
                        ].map((faq, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-yellow-400/20 transition-colors">
                                <h3 className="text-white font-bold mb-3">{faq.q}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* INTERNAL LINKS — collegamento alla pagina Monza Brianza */}
            <section className="py-16 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <p className="text-center text-gray-500 text-sm uppercase tracking-widest mb-6 font-mono">Serviamo anche</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/agenzia-digital-marketing-monza-brianza" className="text-sm text-gray-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:border-yellow-400/50 hover:text-yellow-400 transition-all">
                            Monza Brianza
                        </Link>
                        <Link href="/consulenza-seo-monza" className="text-sm text-gray-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:border-yellow-400/50 hover:text-yellow-400 transition-all">
                            SEO Monza
                        </Link>
                        <Link href="/servizi/seo" className="text-sm text-gray-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:border-yellow-400/50 hover:text-yellow-400 transition-all">
                            Servizio SEO
                        </Link>
                        <Link href="/servizi/ads" className="text-sm text-gray-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:border-yellow-400/50 hover:text-yellow-400 transition-all">
                            Google Ads
                        </Link>
                        <Link href="/servizi/web" className="text-sm text-gray-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:border-yellow-400/50 hover:text-yellow-400 transition-all">
                            Web Design
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA FINALE */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Porta il tuo brand di Milano al livello successivo.
                    </h2>
                    <p className="text-gray-400 mb-10">
                        Audit SEO gratuita. Risposta entro 24h. Nessun impegno.
                    </p>
                    <Link
                        href="/preventivo"
                        className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-black px-10 py-5 rounded-full text-lg hover:scale-105 transition-transform shadow-xl shadow-yellow-400/20"
                    >
                        Richiedi Preventivo Gratuito
                    </Link>
                    <p className="mt-6 text-gray-600 text-sm">
                        📍 WRDigital S.r.l. — Via Venezia 2, Nova Milanese (MB) ·{' '}
                        <a href="tel:+393401204651" className="hover:text-yellow-400 transition-colors">
                            +39 340 120 4651
                        </a>
                    </p>
                </div>
            </section>
        </main>
    );
}

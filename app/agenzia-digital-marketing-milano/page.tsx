import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Agenzia Digital Marketing Milano | SEO, Ads, Web | W[r]Digital',
    description: 'Agenzia digital marketing a Milano: SEO, Google Ads e Web Design per PMI milanesi. Sede a Nova Milanese, 20 min dal centro. +300% traffico organico. Preventivo gratuito.',
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
    twitter: {
        card: 'summary_large_image',
        title: 'Agenzia Digital Marketing Milano | W[r]Digital',
        description: 'SEO, Google Ads e Web Design per PMI milanesi. Sede a Nova Milanese. Preventivo gratuito.',
        images: ['/og-image.png'],
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
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "47",
                "bestRating": "5"
            },
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
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.wrdigital.it" },
                { "@type": "ListItem", "position": 2, "name": "Agenzia Digital Marketing Milano", "item": "https://www.wrdigital.it/agenzia-digital-marketing-milano" }
            ]
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Cos'è un'agenzia digital marketing a Milano?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Un'agenzia digital marketing a Milano è una struttura specializzata che gestisce la presenza online delle aziende — dalla SEO alle campagne Google Ads, dai social media al web design — con l'obiettivo di generare lead qualificati e fatturato misurabile nel mercato milanese."
                    }
                },
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
        features: ['Keyword research geo-locale', 'SEO on-page e tecnica', 'Link building autorità', 'Contenuti ottimizzati Milano'],
        cta: 'Analisi SEO gratuita'
    },
    {
        slug: 'ads',
        label: 'Google Ads & Meta Ads per Milano',
        icon: '📢',
        desc: 'Campagne PPC a Milano: keyword geolocalizzate, targeting per CAP, annunci per stagione e settore. Ogni euro investito è tracciato con Google Tag Manager e reporting settimanale.',
        features: ['Campagne Search geolocalizzate', 'Meta Ads per aziende milanesi', 'Ottimizzazione ROAS', 'Reporting settimanale'],
        cta: 'Ottimizza le tue campagne'
    },
    {
        slug: 'social',
        label: 'Social Media Marketing Milano',
        icon: '📱',
        desc: 'Gestione social per aziende milanesi: contenuti che parlano alla tua audience locale, community management e advertising su Instagram, LinkedIn e TikTok.',
        features: ['Content plan mensile', 'Community management', 'LinkedIn B2B Milano', 'TikTok e Instagram Ads'],
        cta: 'Cresci sui social'
    },
    {
        slug: 'web',
        label: 'Siti Web & E-commerce per Milano',
        icon: '💻',
        desc: 'Realizziamo siti web ad alte performance per aziende di Milano: velocità, mobile-first, SEO-ready. Dal sito vetrina all\'e-commerce completo con gestione magazzino.',
        features: ['Design mobile-first', 'Performance Core Web Vitals', 'SEO tecnica integrata', 'E-commerce WooCommerce/Shopify'],
        cta: 'Richiedi preventivo web'
    },
];

const DIFFERENTIATORS = [
    { title: 'Certificazione Google', desc: 'Team certificato su Google Ads Search, Shopping e Measurement. Seguiamo le best practice ufficiali Google.', icon: '🏆' },
    { title: 'Prossimità a Milano', desc: 'Siamo a Nova Milanese, 20 minuti dal centro di Milano. Incontri di persona, nessuna call infinita.', icon: '📍' },
    { title: 'ROI Tracciato', desc: 'Dashboard real-time con metriche chiare: traffico, conversioni, ROAS. Sai sempre dove vanno i tuoi soldi.', icon: '📊' },
    { title: 'Dal 2019', desc: 'Oltre 6 anni di esperienza nel digital marketing lombardo. 50+ clienti soddisfatti tra Milano e Brianza.', icon: '🚀' },
];

const SECTORS = [
    { icon: '🏗️', name: 'Costruzioni & Edilizia' },
    { icon: '⚖️', name: 'Studi Legali & Professionisti' },
    { icon: '🍽️', name: 'Ristorazione & Hospitality' },
    { icon: '🏥', name: 'Cliniche & Salute' },
    { icon: '🏠', name: 'Immobiliare & Real Estate' },
    { icon: '🏭', name: 'Manifatturiero & B2B' },
    { icon: '🛍️', name: 'Retail & E-commerce' },
    { icon: '💼', name: 'Consulenza & Finance' },
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
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,204,21,0.04)_0%,transparent_70%)] pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <span className="inline-block text-yellow-400 text-xs font-mono uppercase tracking-[0.3em] mb-6 border border-yellow-400/30 px-4 py-2 rounded-full">
                        🏙️ Agenzia Digital Marketing — Milano
                    </span>
                    {/* H1 con keyword esatta */}
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Agenzia Digital Marketing{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                            Milano
                        </span>
                        <br />
                        <span className="text-3xl md:text-4xl font-bold">che produce risultati reali.</span>
                    </h1>

                    {/* TL;DR / Definition block — AEO: risposta diretta per Google AI Overviews */}
                    <div className="bg-yellow-400/5 border-l-4 border-yellow-400 rounded-r-xl p-5 mb-8 text-left max-w-2xl mx-auto">
                        <p className="text-gray-200 leading-relaxed text-base">
                            <strong className="text-white">W[r]Digital è l&apos;agenzia digital marketing a Milano</strong> specializzata in SEO, Google Ads, Social Media e Web Design
                            per PMI e aziende della città metropolitana. Con sede a Nova Milanese (20 min dal centro),
                            offriamo risultati misurabili con dashboard real-time e contratti flessibili — dal 2019.
                        </p>
                    </div>

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
                            { num: '+300%', label: 'Traffico organico medio', note: 'media clienti 2022–2026' },
                            { num: '50+', label: 'Clienti a Milano e Brianza', note: 'attivi o completati' },
                            { num: '4x', label: 'ROI medio', note: 'su campagne Ads gestite' },
                            { num: '2019', label: 'Anno di fondazione', note: '6+ anni di esperienza' },
                        ].map(stat => (
                            <div key={stat.num}>
                                <div className="text-3xl font-black text-yellow-400 mb-1">{stat.num}</div>
                                <div className="text-gray-300 text-sm font-semibold">{stat.label}</div>
                                <div className="text-gray-600 text-xs mt-0.5">{stat.note}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                        Servizi Digital Marketing per Aziende di Milano
                    </h2>
                    <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
                        Dal posizionamento SEO alle campagne ads, dalla gestione social al web design —
                        ogni servizio è progettato per competere nel mercato milanese.
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
                                {/* Lista semantica <ul> per AEO */}
                                <ul className="text-gray-500 text-xs space-y-1 mb-4 list-none">
                                    {s.features.map(f => (
                                        <li key={f} className="flex items-center gap-2">
                                            <span className="text-yellow-400">✓</span> {f}
                                        </li>
                                    ))}
                                </ul>
                                <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">{s.cta} →</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* COMPARISON TABLE — AEO segnale forte */}
            <section className="py-24 px-6 bg-white/2 border-y border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">
                        W[r]Digital vs. la concorrenza a Milano
                    </h2>
                    <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
                        Non tutte le agenzie digital marketing a Milano sono uguali. Ecco perché le PMI scelgono noi.
                    </p>
                    <div className="overflow-x-auto rounded-2xl border border-white/10">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/5">
                                    <th className="text-left px-6 py-4 text-gray-400 font-semibold">Caratteristica</th>
                                    <th className="px-6 py-4 text-yellow-400 font-bold text-center">W[r]Digital</th>
                                    <th className="px-6 py-4 text-gray-500 font-semibold text-center">Grande Agenzia</th>
                                    <th className="px-6 py-4 text-gray-500 font-semibold text-center">Freelance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ['Sede a Milano/Brianza', '✅ Nova Milanese', '❌ Spesso remota', '❓ Variabile'],
                                    ['Incontri di persona', '✅ Sempre', '❌ Raro', '❓ Dipende'],
                                    ['Accesso a team senior', '✅ Garantito', '❌ Junior dedicato', '✅'],
                                    ['Dashboard real-time', '✅ Inclusa', '❌ Extra', '❌'],
                                    ['Specializzazione PMI', '✅ Core business', '❌ Focus enterprise', '❓'],
                                    ['Certificazione Google', '✅ Tutto il team', '✅', '❓'],
                                    ['Contratti flessibili', '✅ No lock-in', '❌ Minimi annuali', '✅'],
                                    ['Pricing trasparente', '✅ Prezzi pubblici', '❌ Su richiesta', '❓'],
                                ].map(([feat, wrd, grande, free]) => (
                                    <tr key={feat} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                                        <td className="px-6 py-3 text-gray-300">{feat}</td>
                                        <td className="px-6 py-3 text-center font-semibold text-yellow-400">{wrd}</td>
                                        <td className="px-6 py-3 text-center text-gray-500">{grande}</td>
                                        <td className="px-6 py-3 text-center text-gray-500">{free}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* WHY US */}
            <section className="py-24 px-6">
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

            {/* CONTENT SECTION — 400+ parole ottimizzate */}
            <section className="py-24 px-6 bg-white/2 border-y border-white/5">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">
                        La realtà del digital marketing a Milano nel 2026
                    </h2>

                    <p className="text-gray-300 leading-relaxed mb-6">
                        <strong className="text-white">L&apos;agenzia digital marketing a Milano</strong> che scegli fa tutta la differenza.
                        Milano è il mercato digitale più competitivo d&apos;Italia: posizionarsi su Google per keyword come
                        &quot;agenzia marketing Milano&quot;, &quot;consulente SEO Milano&quot; o &quot;web agency Milano&quot;
                        richiede un approccio tecnico e strategico che le agenzie generaliste non possono garantire.
                    </p>

                    <p className="text-gray-400 leading-relaxed mb-6">
                        In W[r]Digital, il nostro metodo parte sempre dai dati. Nello specifico, lavoriamo su:
                    </p>

                    {/* Lista semantica <ul> — AEO e featured snippet */}
                    <ul className="text-gray-400 space-y-3 mb-8 pl-2">
                        <li className="flex items-start gap-3">
                            <span className="text-yellow-400 font-bold mt-0.5">→</span>
                            <span><strong className="text-white">Analisi della concorrenza SERP</strong> — capiamo chi domina Google nel tuo settore a Milano e perché</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-yellow-400 font-bold mt-0.5">→</span>
                            <span><strong className="text-white">Keyword research con intent clustering</strong> — identifichiamo le query ad alto volume e alto intento commerciale per il mercato milanese</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-yellow-400 font-bold mt-0.5">→</span>
                            <span><strong className="text-white">SEO tecnica del sito</strong> — velocità, Core Web Vitals, architettura URL, dati strutturati</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-yellow-400 font-bold mt-0.5">→</span>
                            <span><strong className="text-white">Link building mirato</strong> — acquisizione di backlink autorevoli da fonti italiane e di settore</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-yellow-400 font-bold mt-0.5">→</span>
                            <span><strong className="text-white">Content strategy geo-localizzata</strong> — contenuti che Google associa esplicitamente a Milano e alla tua zona</span>
                        </li>
                    </ul>

                    <p className="text-gray-400 leading-relaxed mb-6">
                        Il risultato concreto? Aziende milanesi che scalano Google, aumentano il traffico organico del 300% in media
                        e trasformano i visitatori in clienti paganti. Inoltre, grazie alla nostra expertise in Google Ads,
                        gestiamo campagne PPC geolocalizzate su Milano con budget ottimizzati e tracciamento completo delle conversioni.
                    </p>

                    <p className="text-gray-400 leading-relaxed mb-8">
                        La nostra sede operativa è a Nova Milanese, nel cuore della Brianza — a soli 20 minuti dal centro
                        di Milano. Di conseguenza, possiamo offrire la prossimità di un&apos;agenzia locale con l&apos;expertise
                        di un team che ha lavorato su mercati nazionali e internazionali. In particolare, siamo specializzati
                        nel supporto alle PMI lombarde che vogliono competere online senza sprecare budget.
                    </p>

                    {/* Processo in 4 step */}
                    <h3 className="text-xl font-bold text-white mb-6">Come lavoriamo con le aziende di Milano</h3>
                    <ol className="text-gray-400 space-y-4 mb-8 list-none">
                        {[
                            { n: '01', title: 'Audit gratuita', desc: 'Analizziamo il tuo sito, i competitor milanesi e le opportunità SEO del tuo settore.' },
                            { n: '02', title: 'Strategia personalizzata', desc: 'Definiamo obiettivi, KPI, budget e piano editoriale su misura per il mercato di Milano.' },
                            { n: '03', title: 'Implementazione', desc: 'Il team senior esegue — dalla SEO tecnica alle campagne Ads, dal web design ai contenuti.' },
                            { n: '04', title: 'Report mensile', desc: 'Dashboard real-time + report mensile trasparente con tutte le metriche che contano.' },
                        ].map(step => (
                            <li key={step.n} className="flex gap-4 p-4 bg-white/3 rounded-xl border border-white/5">
                                <span className="text-2xl font-black text-yellow-400/30 flex-shrink-0 font-mono">{step.n}</span>
                                <div>
                                    <span className="text-white font-bold block mb-1">{step.title}</span>
                                    <span className="text-sm">{step.desc}</span>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* SETTORI SERVITI — long-tail keyword opportunity */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-white text-center mb-4">
                        Settori che serviamo a Milano
                    </h2>
                    <p className="text-gray-500 text-center text-sm mb-10">
                        Lavoriamo con PMI e aziende di ogni settore nel mercato milanese.
                        <Link href="/portfolio" className="text-yellow-400 ml-1 hover:underline">Vedi i nostri casi studio →</Link>
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {SECTORS.map(s => (
                            <div key={s.name} className="p-4 bg-white/3 border border-white/8 rounded-xl text-center hover:border-yellow-400/30 transition-colors">
                                <span className="text-2xl block mb-2">{s.icon}</span>
                                <span className="text-gray-300 text-xs font-medium">{s.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 px-6 bg-white/2 border-t border-white/5">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-16">
                        FAQ: Agenzia Digital Marketing Milano
                    </h2>
                    <div className="space-y-4">
                        {[
                            {
                                q: "Cos'è un'agenzia digital marketing a Milano?",
                                a: "Un'agenzia digital marketing a Milano è una struttura specializzata che gestisce la presenza online delle aziende — dalla SEO alle campagne Google Ads, dai social media al web design — con l'obiettivo di generare lead qualificati e fatturato misurabile."
                            },
                            {
                                q: 'W[r]Digital lavora con aziende di Milano?',
                                a: 'Sì. Gestiamo campagne SEO, Google Ads e Social Media per imprese milanesi di tutti i settori. La nostra sede a Nova Milanese è raggiungibile in 20 minuti dal centro di Milano.'
                            },
                            {
                                q: "Quanto costa un'agenzia SEO a Milano?",
                                a: 'I nostri piani SEO per aziende milanesi partono da €1.200/mese. Il costo dipende da competitività del settore e obiettivi. Offriamo audit gratuita prima di qualsiasi impegno.'
                            },
                            {
                                q: 'Offrite servizi Google Ads per aziende a Milano?',
                                a: 'Sì, il team è certificato Google Ads e gestisce campagne PPC geolocalizzate per il mercato milanese con focus sul ROAS e tracciamento completo delle conversioni.'
                            },
                            {
                                q: 'Perché scegliere W[r]Digital rispetto a una grande agenzia milanese?',
                                a: 'Perché non passi dal junior. Accesso diretto al team senior, dashboard real-time, report chiari. Costi da boutique agency, risultati da grandi agenzie. Dal 2019 al fianco delle PMI lombarde.'
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

            {/* INTERNAL LINKS */}
            <section className="py-16 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <p className="text-center text-gray-500 text-sm uppercase tracking-widest mb-6 font-mono">Serviamo anche</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/agenzia-digital-marketing-monza-brianza" className="text-sm text-gray-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:border-yellow-400/50 hover:text-yellow-400 transition-all">Monza Brianza</Link>
                        <Link href="/consulenza-seo-monza" className="text-sm text-gray-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:border-yellow-400/50 hover:text-yellow-400 transition-all">SEO Monza</Link>
                        <Link href="/servizi/seo" className="text-sm text-gray-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:border-yellow-400/50 hover:text-yellow-400 transition-all">Servizio SEO</Link>
                        <Link href="/servizi/ads" className="text-sm text-gray-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:border-yellow-400/50 hover:text-yellow-400 transition-all">Google Ads</Link>
                        <Link href="/servizi/web" className="text-sm text-gray-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:border-yellow-400/50 hover:text-yellow-400 transition-all">Web Design</Link>
                        <Link href="/servizi/social" className="text-sm text-gray-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:border-yellow-400/50 hover:text-yellow-400 transition-all">Social Media</Link>
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
                        Audit SEO gratuita. Risposta entro 24h. Nessun impegno. Parli direttamente con il team senior.
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

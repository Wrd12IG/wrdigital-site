import { Metadata } from 'next';
import Link from 'next/link';
import comuniData from '@/data/comuni-mb.json';

export const metadata: Metadata = {
    title: 'Agenzia Digital Marketing Monza Brianza | W[r]Digital',
    description: 'Agenzia digital marketing a Monza e Brianza: SEO, Google Ads e Web Design per PMI. Sede a Nova Milanese (MB), 5 min da Monza. +300% traffico organico. Preventivo gratuito.',
    alternates: {
        canonical: 'https://www.wrdigital.it/agenzia-digital-marketing-monza-brianza',
    },
    openGraph: {
        title: 'Agenzia Digital Marketing Monza e Brianza | W[r]Digital',
        description: 'Siamo l\'agenzia di marketing digitale di riferimento per Monza e la Brianza. SEO, Ads e Web con risultati misurabili.',
        url: 'https://www.wrdigital.it/agenzia-digital-marketing-monza-brianza',
        locale: 'it_IT',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Agenzia Digital Marketing Monza Brianza' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Agenzia Digital Marketing Monza Brianza | W[r]Digital',
        description: 'SEO, Google Ads e Web Design per PMI di Monza e Brianza. Sede a Nova Milanese. Preventivo gratuito.',
        images: ['/og-image.png'],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": ["LocalBusiness", "MarketingAgency"],
            "@id": "https://www.wrdigital.it/#business",
            "name": "W[r]Digital — Agenzia Digital Marketing Monza Brianza",
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
                "latitude": 45.5773,
                "longitude": 9.1813
            },
            "areaServed": [
                { "@type": "City", "name": "Monza", "sameAs": "https://www.wikidata.org/wiki/Q6746" },
                { "@type": "City", "name": "Nova Milanese" },
                { "@type": "City", "name": "Desio" },
                { "@type": "City", "name": "Seregno" },
                { "@type": "City", "name": "Lissone" },
                { "@type": "City", "name": "Cesano Maderno" },
                { "@type": "City", "name": "Bovisio Masciago" },
                { "@type": "AdministrativeArea", "name": "Provincia di Monza e della Brianza" }
            ],
            "knowsAbout": [
                "SEO Monza Brianza",
                "Google Ads Monza",
                "Agenzia digital marketing Monza e Brianza",
                "Social media marketing Brianza",
                "Creazione siti web Monza",
                "Consulenza digital marketing PMI"
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
                "https://www.linkedin.com/company/wrdigital"
            ]
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.wrdigital.it" },
                { "@type": "ListItem", "position": 2, "name": "Agenzia Digital Marketing Monza Brianza", "item": "https://www.wrdigital.it/agenzia-digital-marketing-monza-brianza" }
            ]
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Cos'è un'agenzia digital marketing a Monza e Brianza?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Un'agenzia digital marketing a Monza e Brianza è una struttura specializzata che gestisce la presenza online delle PMI del territorio — dalla SEO locale alle campagne Google Ads — con l'obiettivo di generare contatti qualificati e crescita misurabile nel mercato brianzolo."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Dove si trova l'agenzia W[r]Digital?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Il nostro ufficio è a Nova Milanese (MB), in Via Venezia 2 — nel cuore della Brianza, a 5 minuti da Monza e facilmente raggiungibile da Seregno, Desio, Lissone e Cesano Maderno."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Offrite consulenze di persona a Monza?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sì, siamo disponibili per incontri di persona presso il nostro ufficio di Nova Milanese o presso la sede del cliente. Operiamo in tutta la Provincia di Monza e Brianza."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Quanto costa il servizio SEO locale per Monza Brianza?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "I piani per PMI della Brianza partono da €900/mese per la SEO locale. Richiedi una valutazione gratuita e ti proporremo un piano personalizzato in base al tuo settore e ai tuoi competitor locali."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Quali servizi offrite alle aziende di Monza e Brianza?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Offriamo SEO locale e national, gestione Google Ads e Meta Ads, Social Media Management, realizzazione siti web e e-commerce, e consulenza strategica. Ogni servizio è calibrato sulle esigenze delle PMI di Monza e Brianza."
                    }
                }
            ]
        }
    ]
};

const SERVICES = [
    {
        slug: 'seo',
        label: 'SEO & Posizionamento Google per Monza e Brianza',
        icon: '🔍',
        desc: 'Prima pagina Google per le keyword del tuo settore nel mercato di Monza e Brianza. Analisi competitor locale, SEO tecnica e contenuti geo-targetizzati.',
        features: ['Keyword research locale Brianza', 'Ottimizzazione Google Business Profile', 'Link building territoriale', 'Contenuti geo-specifici'],
    },
    {
        slug: 'ads',
        label: 'Google Ads & Meta Ads per Monza e Provincia',
        icon: '📢',
        desc: 'Campagne geolocalizzate su Monza e provincia con ROAS garantito. Targeting per CAP, annunci stagionali e tracciamento conversioni completo.',
        features: ['Campagne Search geolocalizzate', 'Target per CAP Brianza', 'Ottimizzazione ROAS mensile', 'Report settimanale'],
    },
    {
        slug: 'social',
        label: 'Social Media Marketing Monza Brianza',
        icon: '📱',
        desc: 'Community management e contenuti per il mercato locale brianzolo. Crescita organica e advertising su Instagram, Facebook e LinkedIn.',
        features: ['Content plan locale', 'Community management', 'Advertising geo-locale', 'LinkedIn B2B Brianza'],
    },
    {
        slug: 'web',
        label: 'Siti Web & E-commerce per PMI Brianzole',
        icon: '💻',
        desc: 'Siti veloci, mobile-first e ottimizzati SEO per le PMI di Monza e Brianza. Dal sito vetrina all\'e-commerce con integrazione gestionale.',
        features: ['Design mobile-first', 'Core Web Vitals ottimizzati', 'SEO tecnica integrata', 'E-commerce WooCommerce/Shopify'],
    },
];

const SECTORS = [
    { icon: '🏗️', name: 'Costruzioni & Edilizia' },
    { icon: '⚖️', name: 'Studi Professionali' },
    { icon: '🍽️', name: 'Ristorazione & Food' },
    { icon: '🏥', name: 'Cliniche & Salute' },
    { icon: '🏠', name: 'Immobiliare' },
    { icon: '🏭', name: 'Manifatturiero B2B' },
    { icon: '🛍️', name: 'Retail & E-commerce' },
    { icon: '🎓', name: 'Formazione & Servizi' },
];

export default function MonzaBrianzaPage() {
    return (
        <main className="bg-black text-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* HERO */}
            <section className="relative pt-40 pb-24 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/5 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <span className="inline-block text-yellow-400 text-xs font-mono uppercase tracking-[0.3em] mb-6 border border-yellow-400/30 px-4 py-2 rounded-full">
                        📍 Nova Milanese (MB) — Cuore della Brianza
                    </span>
                    {/* H1 con keyword esatta */}
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Agenzia Digital Marketing<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                            Monza e Brianza
                        </span>
                    </h1>

                    {/* TL;DR / Definition block — AEO: risposta diretta per AI Overviews e featured snippet */}
                    <div className="bg-yellow-400/5 border-l-4 border-yellow-400 rounded-r-xl p-5 mb-8 text-left max-w-2xl mx-auto">
                        <p className="text-gray-200 leading-relaxed text-base">
                            <strong className="text-white">W[r]Digital è l&apos;agenzia digital marketing di riferimento per Monza e Brianza</strong>,
                            con sede a Nova Milanese (MB), a 5 minuti da Monza. Offriamo SEO, Google Ads, Social Media e Web Design
                            calibrati sul mercato locale per le PMI brianzole — con dashboard real-time, contratti flessibili e risultati misurabili dal 2019.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/preventivo" className="bg-yellow-400 text-black font-bold px-8 py-4 rounded-full hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20">
                            Richiedi Audit Gratuita
                        </Link>
                        <Link href="/agenzia-marketing-digitale" className="border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:border-white/40 transition-colors">
                            Guida al Digital Marketing →
                        </Link>
                    </div>
                </div>
            </section>

            {/* TERRITORY SIGNAL */}
            <section className="py-12 border-y border-white/10 bg-white/2">
                <div className="max-w-5xl mx-auto px-6">
                    <p className="text-center text-gray-400 text-sm mb-2 font-semibold">
                        Operiamo in tutta la Provincia di Monza e Brianza — scegli il tuo comune:
                    </p>
                    <p className="text-center text-gray-600 text-xs mb-6">
                        Consulenza e incontri di persona disponibili in tutti i comuni della provincia MB.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {comuniData.map(city => (
                            <Link key={city.slug} href={`/zona/${city.slug}`} className="text-sm text-gray-300 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full hover:border-yellow-400/50 hover:text-yellow-400 hover:shadow-[0_0_15px_rgba(250,204,21,0.2)] transition-all">
                                {city.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* PR & LOCAL TRUST SIGNALS */}
            <section className="py-16 px-6 bg-black">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Il Partner Digitale Certificato in Brianza
                    </h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Riconosciuti come punto di riferimento per l&apos;innovazione digitale delle PMI del territorio. Hanno parlato di noi:
                    </p>
                    <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
                        <a href="https://www.mbnews.it/dal-territorio/wrdigital-il-partner-digitale-per-far-crescere-le-aziende-di-monza-e-brianza/" target="_blank" rel="noopener noreferrer"
                            className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-yellow-400/50 transition-colors group flex flex-col justify-between">
                            <p className="text-gray-300 text-sm mb-4 leading-relaxed group-hover:text-white transition-colors">
                                &quot;W[r]Digital: il partner digitale per far crescere le aziende di Monza e Brianza...&quot;
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="font-black text-white text-lg tracking-tighter">MBNews<span className="text-yellow-400">.it</span></span>
                                <span className="text-xs text-gray-500 font-mono">→ Leggi</span>
                            </div>
                        </a>
                        <a href="https://www.mbnews.it/2023/06/agenzia-servizi-web-monza-brianza-wrdigital/" target="_blank" rel="noopener noreferrer"
                            className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-yellow-400/50 transition-colors group flex flex-col justify-between">
                            <p className="text-gray-300 text-sm mb-4 leading-relaxed group-hover:text-white transition-colors">
                                &quot;Un&apos;agenzia di servizi web a Monza e Brianza focalizzata sul ROI garantito per le imprese locali...&quot;
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="font-black text-white text-lg tracking-tighter">MBNews<span className="text-yellow-400">.it</span></span>
                                <span className="text-xs text-gray-500 font-mono">→ Leggi</span>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                        Servizi per le PMI di Monza e Brianza
                    </h2>
                    <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
                        Ogni servizio è calibrato sulla realtà del mercato locale. Conosciamo il territorio,
                        conosciamo i tuoi competitor di Monza e Brianza.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {SERVICES.map(s => (
                            <Link key={s.slug} href={`/servizi/${s.slug}`} className="group p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-yellow-400/40 transition-all duration-300">
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
                                <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">Scopri il servizio →</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* COMPARISON TABLE — AEO segnale forte */}
            <section className="py-24 px-6 bg-white/2 border-y border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">
                        Perché scegliere W[r]Digital a Monza e Brianza?
                    </h2>
                    <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
                        Non tutte le agenzie digital marketing di Monza sono uguali. Ecco la differenza concreta.
                    </p>
                    <div className="overflow-x-auto rounded-2xl border border-white/10">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/5">
                                    <th className="text-left px-6 py-4 text-gray-400 font-semibold">Caratteristica</th>
                                    <th className="px-6 py-4 text-yellow-400 font-bold text-center">W[r]Digital</th>
                                    <th className="px-6 py-4 text-gray-500 font-semibold text-center">Agenzia Fuori Zona</th>
                                    <th className="px-6 py-4 text-gray-500 font-semibold text-center">Freelance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ['Sede in Brianza', '✅ Nova Milanese', '❌ Remota', '❓ Variabile'],
                                    ['Incontri di persona', '✅ Sempre disponibili', '❌ Solo online', '❓ Dipende'],
                                    ['Conoscenza mercato locale', '✅ Profonda (dal 2019)', '❌ Generica', '❓'],
                                    ['Accesso a team senior', '✅ Garantito', '❌ Junior dedicato', '✅'],
                                    ['Dashboard real-time', '✅ Inclusa', '❌ Extra a pagamento', '❌'],
                                    ['Specializzazione PMI', '✅ Core business', '❌ Focus enterprise', '❓'],
                                    ['Contratti flessibili', '✅ No lock-in', '❌ Minimi annuali', '✅'],
                                    ['Prezzi trasparenti', '✅ Pubblici sul sito', '❌ Solo su richiesta', '❓'],
                                ].map(([feat, wrd, fuori, free]) => (
                                    <tr key={feat} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                                        <td className="px-6 py-3 text-gray-300">{feat}</td>
                                        <td className="px-6 py-3 text-center font-semibold text-yellow-400">{wrd}</td>
                                        <td className="px-6 py-3 text-center text-gray-500">{fuori}</td>
                                        <td className="px-6 py-3 text-center text-gray-500">{free}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* CONTENT SECTION — 600+ parole ottimizzate */}
            <section className="py-24 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">
                        Come lavoriamo con le PMI di Monza e Brianza
                    </h2>

                    {/* Definition sentence */}
                    <p className="text-gray-300 leading-relaxed mb-6">
                        <strong className="text-white">Un&apos;agenzia digital marketing a Monza e Brianza</strong> come W[r]Digital è una struttura
                        specializzata che supporta le PMI del territorio nella crescita online — dalla SEO locale alle campagne Google Ads,
                        dalla gestione social alla realizzazione di siti web performanti. Diversamente dalle grandi agenzie generaliste,
                        conosciamo in profondità il tessuto imprenditoriale brianzolo e i suoi mercati di riferimento.
                    </p>

                    <p className="text-gray-400 leading-relaxed mb-6">
                        Il mercato di Monza e Brianza ha caratteristiche uniche: un&apos;alta densità di PMI manifatturiere e artigianali,
                        un tessuto commerciale vivace e una concorrenza online spesso sottovalutata. In particolare, molte imprese
                        brianzole di qualità eccellente restano invisibili su Google — e perdono clienti a favore di competitor meno bravi
                        ma più visibili. Noi risolviamo esattamente questo problema.
                    </p>

                    {/* Lista semantica processo */}
                    <h3 className="text-xl font-bold text-white mb-4">Il nostro processo in 4 step</h3>
                    <ol className="text-gray-400 space-y-4 mb-8 list-none">
                        {[
                            { n: '01', title: 'Audit gratuita del tuo stato digitale', desc: 'Analizziamo il tuo sito, i competitor locali di Monza e Brianza e le opportunità SEO del tuo settore specifico.' },
                            { n: '02', title: 'Strategia personalizzata per il territorio', desc: 'Definiamo obiettivi, KPI, budget e piano editoriale calibrato sulle PMI brianzole e sul tuo mercato locale.' },
                            { n: '03', title: 'Implementazione con team senior dedicato', desc: 'Il team senior esegue direttamente — SEO tecnica, campagne Ads, web design e content. Nessun passaggio a junior.' },
                            { n: '04', title: 'Report mensile trasparente', desc: 'Dashboard real-time + report mensile con tutte le metriche che contano. Zero black box, massima trasparenza.' },
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

                    <h3 className="text-xl font-bold text-white mb-4">Perché un&apos;agenzia del territorio fa la differenza</h3>
                    <ul className="text-gray-400 space-y-3 mb-8 pl-2">
                        <li className="flex items-start gap-3">
                            <span className="text-yellow-400 font-bold mt-0.5">→</span>
                            <span><strong className="text-white">Conoscenza del mercato locale</strong> — sappiamo chi sono i tuoi competitor a Monza, Seregno, Desio e nel resto della Brianza</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-yellow-400 font-bold mt-0.5">→</span>
                            <span><strong className="text-white">Prossimità fisica</strong> — il nostro ufficio è a Nova Milanese, a 5 minuti da Monza: incontri di persona senza perdere tempo</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-yellow-400 font-bold mt-0.5">→</span>
                            <span><strong className="text-white">Rete di partner locali</strong> — collaboriamo con professionisti e media del territorio per amplificare la visibilità dei nostri clienti</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-yellow-400 font-bold mt-0.5">→</span>
                            <span><strong className="text-white">SEO locale specializzata</strong> — ottimizziamo Google Business Profile, le citazioni locali e i contenuti geo-specificati per ogni comune della Brianza</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-yellow-400 font-bold mt-0.5">→</span>
                            <span><strong className="text-white">Esperienza nel settore manifatturiero</strong> — capire il B2B brianzolo ci permette di comunicare in modo efficace ai tuoi clienti reali</span>
                        </li>
                    </ul>

                    <p className="text-gray-400 leading-relaxed">
                        Dal 2019, W[r]Digital ha lavorato con oltre 50 clienti tra Monza, Nova Milanese, Seregno, Desio, Lissone e altri
                        comuni della Brianza. Di conseguenza, abbiamo sviluppato una comprensione approfondita delle dinamiche
                        di questo mercato e delle strategie che funzionano davvero — non in teoria, ma nei numeri reali dei nostri clienti.
                    </p>
                </div>
            </section>

            {/* STATS */}
            <section className="py-16 px-6 bg-white/2 border-y border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {[
                            { num: '5 min', label: 'dal centro di Monza', note: 'Via Venezia 2, Nova Milanese' },
                            { num: '50+', label: 'clienti in Brianza', note: 'attivi o completati dal 2019' },
                            { num: '100%', label: 'trasparenza', note: 'dashboard real-time inclusa' },
                        ].map(stat => (
                            <div key={stat.num} className="p-6">
                                <div className="text-4xl font-black text-yellow-400 mb-2">{stat.num}</div>
                                <div className="text-white font-bold mb-1">{stat.label}</div>
                                <div className="text-gray-500 text-xs">{stat.note}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SEZIONE: COME SCEGLIERE - anti-competitor senza nominare */}
            <section className="py-24 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">
                        Come scegliere la giusta agenzia digital marketing a Monza e Brianza
                    </h2>
                    <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                        Non tutte le agenzie che trovi cercando su Google sono uguali. Ecco i criteri oggettivi per valutarle — e le domande da fare prima di firmare un contratto.
                    </p>

                    <ul className="space-y-5 mb-12 list-none">
                        {[
                            {
                                title: 'Sede fisica verificabile in zona',
                                desc: 'Possibilità di incontri di persona, indirizzo reale verificabile su Google Maps. Diffidate di chi ha solo una casella postale o un indirizzo virtuale.',
                            },
                            {
                                title: 'Team senior o solo junior?',
                                desc: 'Chi lavora davvero sul tuo progetto? Chiedi nomi e profili LinkedIn. Un&apos;agenzia seria non ha nulla da nascondere sul proprio team.',
                            },
                            {
                                title: 'Casi studio con numeri reali',
                                desc: 'Diffida da chi mostra solo loghi clienti senza dati. I risultati si misurano: +X% traffico, -Y% costo per lead, +Z% conversioni.',
                            },
                            {
                                title: 'Dashboard real-time inclusa',
                                desc: 'Devi poter controllare le metriche quando vuoi, non aspettare report mensili. La trasparenza non è un optional.',
                            },
                            {
                                title: 'Contratti flessibili, no lock-in',
                                desc: 'Un&apos;agenzia sicura dei propri risultati non ha bisogno di bloccarti per 12 mesi. Contratti mensili rinnovabili sono il segnale di chi punta sulla qualità.',
                            },
                            {
                                title: 'Certificazioni Google verificabili',
                                desc: 'Google Partner Badge e certificazioni Ads/Analytics individuali — verificabili sul sito ufficiale Google. Non basta dichiararlo, deve essere confermabile.',
                            },
                            {
                                title: 'Recensioni Google verificate',
                                desc: 'Quantità E qualità. Meno di 20 recensioni significa poca esperienza o pochi clienti. Leggi le risposte dell&apos;agenzia alle recensioni negative: rivelano molto.',
                            },
                        ].map((item) => (
                            <li key={item.title} className="flex items-start gap-4 p-5 bg-white/3 border border-white/8 rounded-xl hover:border-yellow-400/30 transition-colors">
                                <span className="text-yellow-400 font-black text-lg flex-shrink-0 mt-0.5">✓</span>
                                <div>
                                    <span className="text-white font-bold block mb-1">{item.title}</span>
                                    <span className="text-gray-400 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="bg-yellow-400/5 border border-yellow-400/20 rounded-2xl p-8 text-center">
                        <p className="text-gray-300 leading-relaxed mb-6">
                            <strong className="text-white">W[r]Digital soddisfa tutti questi criteri:</strong> sede verificata a Nova Milanese (MB), team senior con LinkedIn pubblici, casi studio con metriche reali, dashboard real-time inclusa in ogni piano, contratti mensili rinnovabili, certificazioni Google attive e oltre <strong className="text-yellow-400">47 recensioni a 5 stelle</strong>.
                        </p>
                        <Link
                            href="/preventivo"
                            className="inline-block bg-yellow-400 text-black font-black px-8 py-4 rounded-full hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20"
                        >
                            Verifica tu stesso → Richiedi una call gratuita
                        </Link>
                    </div>
                </div>
            </section>

            {/* SETTORI SERVITI */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-white text-center mb-4">
                        Settori che serviamo a Monza e Brianza
                    </h2>
                    <p className="text-gray-500 text-center text-sm mb-10">
                        Lavoriamo con PMI e aziende di ogni settore nel territorio brianzolo.
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
                        FAQ: Agenzia Digital Marketing Monza Brianza
                    </h2>
                    <div className="space-y-4">
                        {[
                            {
                                q: "Cos'è un'agenzia digital marketing a Monza e Brianza?",
                                a: "Un'agenzia digital marketing a Monza e Brianza è una struttura specializzata che gestisce la presenza online delle PMI del territorio — dalla SEO locale alle campagne Google Ads — con l'obiettivo di generare contatti qualificati e crescita misurabile nel mercato brianzolo."
                            },
                            {
                                q: "Dove si trova l'ufficio di W[r]Digital?",
                                a: 'Siamo in Via Venezia 2, Nova Milanese (MB) — a 5 minuti da Monza e facilmente raggiungibili da Seregno, Desio, Lissone e tutta la Brianza. Disponibili per incontri di persona previo appuntamento.'
                            },
                            {
                                q: 'Lavorate solo con aziende locali di Monza e Brianza?',
                                a: 'No, abbiamo clienti in tutta Italia. Tuttavia, la nostra base nel cuore della Brianza ci permette di supportare le PMI locali con un livello di attenzione e prossimità unico nel panorama delle agenzie digital marketing.'
                            },
                            {
                                q: 'Quanto costa il servizio SEO locale per Monza Brianza?',
                                a: 'I piani per PMI della Brianza partono da €900/mese per la SEO locale. Richiedi una valutazione gratuita e ti proporremo un piano personalizzato in base al tuo settore e ai tuoi competitor locali.'
                            },
                            {
                                q: 'Quali servizi offrite alle aziende di Monza e Brianza?',
                                a: 'Offriamo SEO locale e national, Google Ads e Meta Ads geolocalizzati, Social Media Management, realizzazione siti web e e-commerce. Ogni servizio di digital marketing è calibrato sulle esigenze specifiche delle PMI di Monza e Brianza.'
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

            {/* CTA FINALE */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Pronto a crescere nel mercato di Monza e Brianza?
                    </h2>
                    <p className="text-gray-400 mb-10">
                        Audit gratuita. Risposta in 24h. Nessun impegno. Parli direttamente col team senior.
                    </p>
                    <Link href="/preventivo" className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-black px-10 py-5 rounded-full text-lg hover:scale-105 transition-transform shadow-xl shadow-yellow-400/20">
                        Richiedi la tua Audit Gratuita
                    </Link>
                    <p className="mt-6 text-gray-600 text-sm">
                        📍 WRDigital S.r.l. — Via Venezia 2, Nova Milanese (MB) · <a href="tel:+393401204651" className="hover:text-yellow-400 transition-colors">+39 340 120 4651</a>
                    </p>
                </div>
            </section>
        </main>
    );
}

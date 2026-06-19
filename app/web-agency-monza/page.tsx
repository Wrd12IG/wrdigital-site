import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Web Agency Monza | Siti Web Professionali | W[r]Digital',
    description: 'Web agency a Monza con sede a Nova Milanese: siti web professionali, e-commerce e landing page ottimizzate SEO per PMI di Monza e Brianza. Preventivo gratuito.',
    alternates: {
        canonical: 'https://www.wrdigital.it/web-agency-monza',
    },
    openGraph: {
        title: 'Web Agency Monza | Siti Web Professionali | W[r]Digital',
        description: 'Web agency a Monza con sede a Nova Milanese: siti web professionali, e-commerce e landing page ottimizzate SEO per PMI di Monza e Brianza. Preventivo gratuito.',
        url: 'https://www.wrdigital.it/web-agency-monza',
        locale: 'it_IT',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Web Agency Monza' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Web Agency Monza | Siti Web Professionali | W[r]Digital',
        description: 'Web agency a Monza: siti web professionali, e-commerce e landing page SEO per PMI di Monza e Brianza.',
        images: ['/og-image.png'],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": ["LocalBusiness", "MarketingAgency"],
            "@id": "https://www.wrdigital.it/#business",
            "name": "W[r]Digital — Web Agency Monza",
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
                { "@type": "AdministrativeArea", "name": "Provincia di Monza e della Brianza" }
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
                { "@type": "ListItem", "position": 2, "name": "Web Agency Monza", "item": "https://www.wrdigital.it/web-agency-monza" }
            ]
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Quanto tempo ci vuole per fare un sito web a Monza?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "I tempi dipendono dalla complessità del progetto. Un sito vetrina richiede mediamente 3-4 settimane, un e-commerce 6-10 settimane. Dopo un briefing iniziale, forniamo sempre una timeline dettagliata e un piano di lavoro preciso."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Che differenza c'è tra web agency e freelance?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Una web agency come W[r]Digital mette a disposizione un team completo — designer, sviluppatore, SEO specialist e project manager — con continuità di servizio garantita. Un freelance lavora in solitaria: se è malato o impegnato, il progetto si ferma. Con noi hai un team senior disponibile, dashboard real-time e supporto post-lancio incluso."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Il sito è ottimizzato SEO fin dall'inizio?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sì. Ogni sito che realizziamo include SEO tecnica integrata sin dalla fase di sviluppo: struttura URL ottimizzata, dati strutturati (Schema.org), Core Web Vitals ottimizzati, sitemap XML, robots.txt configurato e ottimizzazione per la SEO locale di Monza e Brianza."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Offrite manutenzione e aggiornamenti?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sì, tutti i nostri siti includono un piano di manutenzione. Gestiamo aggiornamenti del CMS, backup periodici, monitoraggio uptime e piccole modifiche mensili. Puoi scegliere tra manutenzione base, standard e avanzata in base alle tue esigenze."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Posso vedere esempi di siti web realizzati per aziende di Monza?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Certo. Visita la nostra pagina Portfolio per vedere i casi studio con risultati reali (traffico, conversioni, posizionamento Google) dei siti che abbiamo realizzato per aziende di Monza, Brianza e provincia."
                    }
                }
            ]
        }
    ]
};

const STATS = [
    { value: '+300%', label: 'traffico organico medio' },
    { value: '50+', label: 'siti realizzati' },
    { value: '2019', label: 'anno di fondazione' },
    { value: '100%', label: 'mobile-first' },
];

const SERVICES_LIST = [
    'Analisi UX e architettura dell\'informazione',
    'Design mobile-first responsive',
    'SEO tecnica integrata dalla fase zero',
    'Core Web Vitals ottimizzati (LCP, CLS, INP)',
    'CMS personalizzabile e facile da gestire',
    'E-commerce WooCommerce e Shopify',
    'Hosting ottimizzato e CDN incluso',
    'Manutenzione e aggiornamenti post-lancio',
];

const PROCESS_STEPS = [
    { n: '01', title: 'Discovery & Briefing', desc: 'Incontro gratuito per capire obiettivi, target e competitor. Definiamo insieme la struttura del sito e le keyword da presidiare a Monza e Brianza.' },
    { n: '02', title: 'UX Design & Wireframing', desc: 'Progettiamo l\'architettura dell\'informazione e i wireframe. Ogni sezione è pensata per guidare l\'utente verso la conversione.' },
    { n: '03', title: 'Sviluppo & Integrazione CMS', desc: 'Sviluppiamo il sito con le tecnologie più performanti (Next.js, WordPress, Shopify). Integriamo CRM, form e strumenti di analytics.' },
    { n: '04', title: 'Test & Ottimizzazione', desc: 'Test cross-browser, mobile-first, velocità (Core Web Vitals), accessibilità WCAG e revisione SEO tecnica prima del lancio.' },
    { n: '05', title: 'Go-Live & Supporto', desc: 'Lancio del sito, setup Google Search Console, Analytics e consegna delle credenziali. Supporto dedicato nelle prime 4 settimane post-lancio.' },
];

const WHY_CARDS = [
    {
        icon: '📍',
        title: 'Sede in Brianza',
        desc: 'Il nostro studio è a Nova Milanese, a soli 5 minuti da Monza. Incontri di persona, visite in sede, nessuna videochiamata obbligatoria.'
    },
    {
        icon: '👥',
        title: 'Team senior dedicato',
        desc: 'Nessun passaggio a junior o a subappaltatori. Il team che segue il tuo sito è lo stesso che l\'ha progettato e sviluppato.'
    },
    {
        icon: '🔍',
        title: 'SEO-first approach',
        desc: 'Ogni sito che realizziamo nasce già ottimizzato per Google. La SEO non è un add-on: è integrata nell\'architettura tecnica dalla prima riga di codice.'
    },
    {
        icon: '📊',
        title: 'Dashboard post-lancio',
        desc: 'Accesso a dashboard real-time con traffico, conversioni, posizionamento keyword e Core Web Vitals. Dati tuoi, trasparenti, sempre disponibili.'
    },
];

export default function WebAgencyMonzaPage() {
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
                        📍 Web Agency · Nova Milanese (MB) · 5 min da Monza
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Web Agency Monza<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                            — Siti Web che Convertono
                        </span>
                    </h1>

                    {/* TL;DR block giallo — AEO featured snippet */}
                    <div className="bg-yellow-400/8 border-l-4 border-yellow-400 rounded-r-xl p-5 mb-8 text-left max-w-2xl mx-auto">
                        <p className="text-gray-200 leading-relaxed text-base">
                            <strong className="text-white">W[r]Digital è la web agency di riferimento per Monza e Brianza</strong>,
                            con sede a Nova Milanese (MB). Realizziamo siti web professionali, e-commerce e landing page
                            ottimizzate SEO per le PMI del territorio — con design mobile-first, Core Web Vitals ottimizzati
                            e SEO tecnica integrata fin dall&apos;inizio. Attivi dal 2019, 50+ siti consegnati, team senior dedicato.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/preventivo" className="bg-yellow-400 text-black font-bold px-8 py-4 rounded-full hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20">
                            Richiedi Preventivo Gratuito →
                        </Link>
                        <Link href="/portfolio" className="border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:border-white/40 transition-colors">
                            Vedi il Portfolio
                        </Link>
                    </div>
                </div>
            </section>

            {/* STATS BAR */}
            <section className="py-16 border-y border-white/10">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {STATS.map(s => (
                        <div key={s.value}>
                            <div className="text-3xl md:text-4xl font-black text-yellow-400 mb-2">{s.value}</div>
                            <div className="text-gray-400 text-sm">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* H2: COSA INCLUDE */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                        Realizzazione Siti Web a Monza: cosa include il nostro servizio
                    </h2>
                    <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                        Realizziamo siti web professionali per PMI di Monza e Brianza con un approccio completo
                        che comprende design, sviluppo, SEO e supporto. Non vendiamo siti: consegniamo strumenti di business.
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none">
                        {SERVICES_LIST.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 p-5 bg-white/5 border border-white/10 rounded-xl hover:border-yellow-400/20 transition-colors">
                                <span className="text-yellow-400 font-bold text-lg flex-shrink-0">✓</span>
                                <span className="text-gray-300 leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-12 p-6 bg-yellow-400/5 border border-yellow-400/20 rounded-2xl">
                        <p className="text-gray-300 leading-relaxed">
                            Ogni progetto web inizia con una <strong className="text-white">fase di discovery gratuita</strong> durante la quale analizziamo
                            i tuoi competitor a Monza, le keyword di settore più rilevanti e le opportunità di conversione sul tuo mercato locale.
                            Il risultato è un sito web che non solo è bello da vedere, ma che porta visitatori qualificati e li trasforma in clienti.
                            Utilizziamo tecnologie moderne come Next.js per performance superiori, garantendo tempi di caricamento sotto i 2 secondi
                            e un punteggio Core Web Vitals verde — fattori chiave per il posizionamento su Google nel 2025.
                        </p>
                    </div>
                </div>
            </section>

            {/* H2: COMPARISON TABLE */}
            <section className="py-24 px-6 bg-white/2 border-y border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">
                        Web Agency Monza vs Freelance vs Template: il confronto
                    </h2>
                    <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
                        Non tutte le soluzioni per creare un sito web sono uguali. Ecco una comparazione onesta e trasparente
                        per aiutarti a scegliere la soluzione giusta per la tua azienda di Monza.
                    </p>
                    <div className="overflow-x-auto rounded-2xl border border-white/10">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/5">
                                    <th className="text-left px-6 py-4 text-gray-400 font-semibold">Caratteristica</th>
                                    <th className="px-6 py-4 text-yellow-400 font-bold text-center">W[r]Digital</th>
                                    <th className="px-6 py-4 text-gray-500 font-semibold text-center">Freelance</th>
                                    <th className="px-6 py-4 text-gray-500 font-semibold text-center">Template Builder</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ['Design custom', '✅ Unico e su misura', '✅ Spesso personalizzato', '❌ Template preimpostato'],
                                    ['SEO integrata', '✅ Dalla prima riga di codice', '❓ Dipende dal professionista', '❌ Limitata e generica'],
                                    ['Supporto post-lancio', '✅ Incluso nel piano', '❓ Extra a pagamento', '❌ Solo selfservice'],
                                    ['Tempi', '✅ 3-8 settimane pianificate', '❓ Variabili e a rischio', '✅ 1-2 giorni (ma risultato scarso)'],
                                    ['Prezzi', '✅ Trasparenti e pubblicati', '❓ Variabili, no garanzie', '💰 Bassi ma canone fisso'],
                                    ['Portfolio reale', '✅ 50+ siti con risultati', '❓ Dipende', '❌ Nessuna prova di ROI'],
                                ].map(([feat, wrd, free, tmpl]) => (
                                    <tr key={feat} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                                        <td className="px-6 py-3 text-gray-300 font-medium">{feat}</td>
                                        <td className="px-6 py-3 text-center text-yellow-400 font-semibold">{wrd}</td>
                                        <td className="px-6 py-3 text-center text-gray-500">{free}</td>
                                        <td className="px-6 py-3 text-center text-gray-500">{tmpl}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* H2: PREZZI */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">
                        Quanto costa un sito web professionale a Monza?
                    </h2>
                    <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                        La trasparenza è uno dei nostri valori fondamentali. Pubblichiamo i prezzi orientativi
                        per ogni tipologia di sito web professionale per PMI di Monza e Brianza.
                        Ogni progetto include SEO tecnica integrata senza costi aggiuntivi.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {[
                            {
                                type: 'Sito Vetrina',
                                price: 'da €2.500',
                                ideal: 'Professionisti, studi, PMI locali',
                                features: [
                                    'Design responsive mobile-first',
                                    'Fino a 8 pagine ottimizzate',
                                    'SEO tecnica on-page',
                                    'Form contatti e Google Maps',
                                    'Google Analytics + Search Console',
                                    '3 mesi di manutenzione inclusa',
                                ]
                            },
                            {
                                type: 'E-commerce',
                                price: 'da €4.500',
                                ideal: 'Retailer, B2B, artigiani',
                                features: [
                                    'WooCommerce o Shopify custom',
                                    'Catalogo prodotti illimitato',
                                    'SEO per categorie e prodotti',
                                    'Integrazione pagamenti sicuri',
                                    'Gestionale magazzino',
                                    '6 mesi di supporto dedicato',
                                ]
                            },
                            {
                                type: 'Landing Page',
                                price: 'da €900',
                                ideal: 'Campagne Ads, eventi, offerte',
                                features: [
                                    'Design focalizzato alla conversione',
                                    'A/B test ready',
                                    'SEO e velocità ottimizzate',
                                    'Form + CRM integration',
                                    'Tracciamento conversioni GA4',
                                    'Consegna in 2 settimane',
                                ]
                            },
                        ].map((pkg) => (
                            <div key={pkg.type} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-yellow-400/30 transition-colors flex flex-col">
                                <div className="mb-4">
                                    <h3 className="text-white font-bold text-lg mb-1">{pkg.type}</h3>
                                    <div className="text-yellow-400 font-black text-2xl mb-1">{pkg.price}</div>
                                    <p className="text-gray-500 text-xs">Ideale per: {pkg.ideal}</p>
                                </div>
                                <ul className="space-y-2 flex-1">
                                    {pkg.features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                                            <span className="text-yellow-400 flex-shrink-0">✓</span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <p className="text-gray-500 text-sm text-center">
                        Tutti i prezzi includono SEO tecnica integrata, hosting del primo anno e 30 giorni di supporto post-lancio.
                        Per progetti complessi, richiedi un preventivo personalizzato gratuito.
                    </p>
                </div>
            </section>

            {/* H2: PERCHÉ W[r]DIGITAL */}
            <section className="py-24 px-6 bg-white/2 border-y border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">
                        Perché scegliere W[r]Digital come web agency a Monza?
                    </h2>
                    <p className="text-gray-400 text-center mb-14 max-w-xl mx-auto">
                        Siamo una web agency nata in Brianza, per le aziende della Brianza. Conosciamo il mercato locale,
                        i tuoi competitor e le dinamiche di acquisto dei consumatori di Monza e provincia.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {WHY_CARDS.map((card) => (
                            <div key={card.title} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-yellow-400/20 transition-colors">
                                <span className="text-3xl block mb-3">{card.icon}</span>
                                <h3 className="text-white font-bold text-lg mb-2">{card.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-6 bg-black border border-white/10 rounded-2xl">
                        <p className="text-gray-300 leading-relaxed mb-4">
                            Dal 2019, W[r]Digital ha realizzato oltre <strong className="text-white">50 siti web professionali</strong> per PMI
                            di Monza, Nova Milanese, Seregno, Desio, Lissone, Cesano Maderno e tutta la provincia di Monza e Brianza.
                            Ogni progetto è un caso di studio: monitoriamo il traffico organico, il tasso di conversione e il posizionamento
                            su Google per ciascun sito che consegniamo, e condividiamo i dati reali con i nostri clienti.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            La nostra filosofia è semplice: un sito web professionale non è un costo, è un investimento.
                            Per le PMI di Monza e Brianza, avere un sito visibile su Google e ottimizzato per le conversioni
                            significa acquisire nuovi clienti in modo costante e prevedibile, senza dipendere esclusivamente dal passaparola.
                            Ogni sito che realizziamo è costruito per <strong className="text-white">generare ROI misurabile</strong> nel tempo.
                        </p>
                    </div>
                </div>
            </section>

            {/* H2: PROCESSO */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">
                        Il processo di realizzazione sito web
                    </h2>
                    <p className="text-gray-400 text-center mb-14 max-w-xl mx-auto">
                        Un processo strutturato e trasparente dalla prima call fino al go-live.
                        Sai sempre a che punto siamo e cosa succederà dopo.
                    </p>
                    <ol className="space-y-4 list-none">
                        {PROCESS_STEPS.map((step) => (
                            <li key={step.n} className="flex gap-5 p-6 bg-white/5 border border-white/10 rounded-xl hover:border-yellow-400/20 transition-colors">
                                <span className="text-3xl font-black text-yellow-400/40 flex-shrink-0 font-mono leading-none">{step.n}</span>
                                <div>
                                    <h3 className="text-white font-bold mb-2">{step.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* FAQ con <details><summary> — sempre nel DOM, semantico, accessibile */}
            <section className="py-24 px-6 bg-white/2 border-y border-white/5">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-16">
                        FAQ — Web Agency Monza
                    </h2>
                    <div className="space-y-4">
                        {[
                            {
                                q: 'Quanto tempo ci vuole per fare un sito web a Monza?',
                                a: 'I tempi dipendono dalla complessità del progetto. Un sito vetrina richiede mediamente 3-4 settimane, un e-commerce 6-10 settimane. Dopo un briefing iniziale, forniamo sempre una timeline dettagliata e un piano di lavoro preciso con milestone condivise. La nostra politica è consegnare nei tempi pattuiti, sempre.'
                            },
                            {
                                q: 'Che differenza c\'è tra web agency e freelance?',
                                a: 'Una web agency come W[r]Digital mette a disposizione un team completo — designer, sviluppatore, SEO specialist e project manager — con continuità di servizio garantita. Un freelance lavora in solitaria: se è malato o sovraccarico, il progetto rallenta o si ferma. Con noi hai un team senior disponibile, dashboard real-time e supporto post-lancio incluso nel piano. Nessun extra a sorpresa.'
                            },
                            {
                                q: 'Il sito è ottimizzato SEO fin dall\'inizio?',
                                a: 'Sì, assolutamente. Ogni sito che realizziamo include SEO tecnica integrata dalla fase di sviluppo: struttura URL SEO-friendly, dati strutturati Schema.org, Core Web Vitals ottimizzati (LCP, CLS, INP), sitemap XML automatica, robots.txt configurato, meta tag e Open Graph per ogni pagina. La SEO non è un optional aggiuntivo: è parte integrante della nostra metodologia di sviluppo.'
                            },
                            {
                                q: 'Offrite manutenzione e aggiornamenti?',
                                a: 'Sì, tutti i nostri siti includono un piano di manutenzione. Gestiamo aggiornamenti del CMS e dei plugin, backup giornalieri automatici, monitoraggio uptime 24/7 e piccole modifiche mensili senza costi aggiuntivi. Puoi scegliere tra piani di manutenzione base, standard e avanzata in base alle tue esigenze e alla frequenza degli aggiornamenti necessari.'
                            },
                            {
                                q: 'Posso vedere esempi di siti web realizzati per aziende di Monza?',
                                a: 'Certo! Visita la nostra pagina Portfolio per vedere i casi studio completi con risultati reali — traffico organico, tasso di conversione, posizionamento su Google — dei siti realizzati per aziende di Monza, Brianza e provincia. Siamo orgogliosi di condividere i numeri reali perché crediamo nella trasparenza totale con i nostri clienti.'
                            },
                        ].map((faq, i) => (
                            <details
                                key={i}
                                className="bg-black border border-white/10 rounded-2xl group hover:border-yellow-400/20 transition-colors"
                            >
                                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none select-none">
                                    <h3 className="text-white font-bold pr-4">{faq.q}</h3>
                                    <span className="text-yellow-400 flex-shrink-0 text-xl transition-transform group-open:rotate-45">+</span>
                                </summary>
                                <div className="px-6 pb-6">
                                    <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* LINK INTERNI */}
            <section className="py-16 px-6 border-b border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-white font-bold text-center mb-8 text-lg">Esplora gli altri servizi W[r]Digital per Monza e Brianza</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/agenzia-digital-marketing-monza-brianza" className="text-sm text-gray-300 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:border-yellow-400/50 hover:text-yellow-400 transition-all">
                            → Agenzia Digital Marketing Monza Brianza
                        </Link>
                        <Link href="/servizi/seo" className="text-sm text-gray-300 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:border-yellow-400/50 hover:text-yellow-400 transition-all">
                            → SEO e Posizionamento Google
                        </Link>
                        <Link href="/servizi/ads" className="text-sm text-gray-300 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:border-yellow-400/50 hover:text-yellow-400 transition-all">
                            → Google Ads e PPC
                        </Link>
                        <Link href="/consulenza-seo-monza" className="text-sm text-gray-300 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:border-yellow-400/50 hover:text-yellow-400 transition-all">
                            → Consulenza SEO Monza
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA FINALE */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Pronto a costruire il tuo sito web a Monza?
                    </h2>
                    <p className="text-gray-400 mb-10">
                        Preventivo gratuito · Risposta in 24h · Nessun impegno · Team senior dedicato
                    </p>
                    <Link
                        href="/preventivo"
                        className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-black px-10 py-5 rounded-full text-lg hover:scale-105 transition-transform shadow-xl shadow-yellow-400/20"
                    >
                        Richiedi Preventivo Gratuito →
                    </Link>
                    <p className="mt-6 text-gray-600 text-sm">
                        📍 WRDigital S.r.l. — Via Venezia 2, Nova Milanese (MB) · <a href="tel:+393401204651" className="hover:text-yellow-400 transition-colors">+39 340 120 4651</a>
                    </p>
                </div>
            </section>
        </main>
    );
}

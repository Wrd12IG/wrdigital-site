import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Google Ads Monza & Brianza | Campagne PPC | W[r]Digital',
    description: 'Gestione Google Ads a Monza e Brianza: campagne PPC geolocalizzate, ROAS garantito e tracciamento conversioni completo. Team certificato Google. Preventivo gratuito.',
    alternates: {
        canonical: 'https://www.wrdigital.it/google-ads-monza',
    },
    openGraph: {
        title: 'Google Ads Monza & Brianza | Campagne PPC | W[r]Digital',
        description: 'Gestione Google Ads a Monza e Brianza: campagne PPC geolocalizzate, ROAS garantito e tracciamento conversioni completo. Team certificato Google. Preventivo gratuito.',
        url: 'https://www.wrdigital.it/google-ads-monza',
        locale: 'it_IT',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Google Ads Monza Brianza' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Google Ads Monza & Brianza | Campagne PPC | W[r]Digital',
        description: 'Campagne Google Ads per aziende di Monza e Brianza. ROAS medio 4x, team certificato, zero sprechi.',
        images: ['/og-image.png'],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": ["LocalBusiness", "MarketingAgency"],
            "@id": "https://www.wrdigital.it/#business",
            "name": "W[r]Digital — Google Ads Monza",
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
            ]
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.wrdigital.it" },
                { "@type": "ListItem", "position": 2, "name": "Google Ads Monza", "item": "https://www.wrdigital.it/google-ads-monza" }
            ]
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Quanto costa la gestione Google Ads a Monza?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Il costo di gestione Google Ads a Monza dipende dalla complessità dell'account e dal budget pubblicitario. W[r]Digital lavora con fee di gestione a partire da €300/mese per PMI locali, con budget Ads separato consigliato da €500/mese. Il primo mese include audit gratuita dell'account esistente."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Quali tipi di campagne Google Ads gestite per le aziende di Monza?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Gestiamo tutti i tipi di campagne Google Ads: Search (annunci testuali), Display (banner), Shopping (e-commerce), YouTube, Performance Max e Retargeting. Per le aziende di Monza e Brianza, privilegiamo le campagne Search geolocalizzate per CAP e le campagne Local per le attività con sede fisica."
                    }
                },
                {
                    "@type": "Question",
                    "name": "In quanto tempo si vedono i risultati di Google Ads?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A differenza della SEO, con Google Ads i risultati sono immediati: dal giorno del lancio le campagne iniziano a portare traffico qualificato. Il ROAS ottimale si raggiunge tipicamente dopo 4-8 settimane di ottimizzazione continua, quando l'algoritmo ha accumulato dati sufficienti."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Cosa significa ROAS e come lo calcolate?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Il ROAS (Return on Ad Spend) è il rapporto tra il ricavo generato dalle campagne e il budget investito in pubblicità. Un ROAS di 4x significa che per ogni €1 investito in Ads ottieni €4 di ricavo. Lo calcoliamo tramite tracciamento conversioni completo su Google Analytics 4 e Google Ads, includendo chiamate, form e acquisti."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Gestite anche le campagne per attività locali di Monza?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sì, siamo specializzati nelle campagne Google Ads Local per attività fisiche di Monza e Brianza. Configuriamo estensioni di luogo, chiamata e percorso, impostiamo il targeting per CAP e orari di apertura, e ottimizziamo per conversioni offline (visite in negozio, chiamate telefoniche)."
                    }
                }
            ]
        }
    ]
};

const STATS = [
    { value: '4x', label: 'ROAS medio delle campagne' },
    { value: 'Google', label: 'Partner certificato' },
    { value: '0', label: 'sprechi di budget' },
    { value: '7 gg', label: 'setup campagne' },
];

const CAMPAIGN_TYPES = [
    { icon: '🔍', name: 'Search (Rete Ricerca)', desc: 'Annunci testuali mostrati quando i tuoi potenziali clienti di Monza cercano attivamente i tuoi prodotti o servizi su Google.' },
    { icon: '🖼️', name: 'Display (Banner)', desc: 'Banner visivi su milioni di siti partner di Google. Ideale per aumentare la brand awareness nel territorio di Monza e Brianza.' },
    { icon: '🛒', name: 'Shopping (E-commerce)', desc: 'Annunci prodotto con foto e prezzo nella SERP di Google. Fondamentale per e-commerce che vogliono vendere a Monza e provincia.' },
    { icon: '▶️', name: 'YouTube Ads', desc: 'Video annunci pre-roll e discovery per intercettare il tuo pubblico di Monza su YouTube, la seconda piattaforma di ricerca al mondo.' },
    { icon: '⚡', name: 'Performance Max', desc: 'Campagne AI-driven che ottimizzano su tutti i canali Google in automatico. Massima performance con budget contenuto per le PMI di Brianza.' },
    { icon: '🎯', name: 'Retargeting', desc: 'Raggiungi di nuovo chi ha già visitato il tuo sito senza convertire. Tasso di conversione fino a 3x superiore alla campagna fredda.' },
];

const PROCESS_STEPS = [
    { n: '01', title: 'Audit Account Google Ads', desc: 'Analizziamo il tuo account esistente (o lo creiamo da zero) identificando sprechi, opportunità e keyword da presidiare nel mercato di Monza e Brianza.' },
    { n: '02', title: 'Keyword Research Locale', desc: 'Ricerca keyword geolocalizzata su Monza, Brianza e provincia. Identifichiamo i termini con miglior rapporto volume/CPC/intent di conversione.' },
    { n: '03', title: 'Setup Campagne e Tracciamento', desc: 'Configuriamo campagne, gruppi di annunci, estensioni e — fondamentale — il tracciamento completo delle conversioni su GA4 e Google Ads.' },
    { n: '04', title: 'Ottimizzazione Settimanale', desc: 'Ogni settimana ottimizziamo bid strategy, negative keyword, orari di pubblicazione, audience e annunci. Nessuna campagna viene lasciata girare senza controllo.' },
    { n: '05', title: 'Report Mensile', desc: 'Report mensile dettagliato con spesa, impression, click, conversioni, ROAS e raccomandazioni per il mese successivo. Dashboard real-time sempre accessibile.' },
];

export default function GoogleAdsMonzaPage() {
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
                        📍 Google Ads · Monza e Brianza · Partner Certificato
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Google Ads Monza<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                            — Campagne PPC che generano clienti
                        </span>
                    </h1>

                    {/* TL;DR block */}
                    <div className="bg-yellow-400/8 border-l-4 border-yellow-400 rounded-r-xl p-5 mb-8 text-left max-w-2xl mx-auto">
                        <p className="text-gray-200 leading-relaxed text-base">
                            <strong className="text-white">W[r]Digital gestisce campagne Google Ads per PMI di Monza e Brianza</strong> con
                            un approccio data-driven: nessuno spreco di budget, tracciamento conversioni completo e ROAS
                            medio di 4x. Team certificato Google, setup in 7 giorni, report mensile trasparente.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/preventivo" className="bg-yellow-400 text-black font-bold px-8 py-4 rounded-full hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20">
                            Ottimizza le tue campagne →
                        </Link>
                        <Link href="/servizi/ads" className="border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:border-white/40 transition-colors">
                            Scopri il servizio Ads
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

            {/* H2: COS'È GOOGLE ADS */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-8">
                        Cos&apos;è Google Ads e perché serve a un&apos;azienda di Monza
                    </h2>

                    <div className="prose prose-invert max-w-none">
                        <p className="text-gray-300 leading-relaxed mb-6 text-base">
                            <strong className="text-white">Google Ads (ex Google AdWords) è la piattaforma di pubblicità online di Google</strong> che
                            permette alle aziende di Monza e Brianza di comparire in cima ai risultati di ricerca quando i potenziali clienti
                            cercano prodotti o servizi correlati alla propria attività. A differenza della SEO organica, che richiede mesi per
                            produrre risultati, con Google Ads puoi intercettare clienti attivamente in cerca di ciò che offri già dal primo giorno.
                        </p>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Per una PMI di Monza, Google Ads rappresenta uno strumento straordinariamente potente di acquisizione clienti locali.
                            Il targeting geografico permette di mostrare i tuoi annunci esclusivamente agli utenti che si trovano o cercano
                            servizi a Monza, Seregno, Desio, Lissone, Cesano Maderno e in tutta la provincia di Monza e Brianza — eliminando
                            completamente gli sprechi di budget su audience non pertinenti.
                        </p>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Il meccanismo di pagamento è il PPC (Pay Per Click): paghi solo quando qualcuno clicca sul tuo annuncio, non
                            per le semplici visualizzazioni. Questo rende Google Ads uno degli strumenti di marketing digitale a più alto ROI
                            per le imprese locali del territorio brianzolo, a patto che le campagne siano configurate e ottimizzate correttamente.
                            Un account Ads mal configurato può bruciare budget senza produrre risultati; un account ottimizzato da professionisti
                            certificati può generare un ROAS (Return on Ad Spend) di 3-8x, a seconda del settore.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            W[r]Digital gestisce campagne Google Ads per PMI di Monza e Brianza dal 2019, con specializzazione verticale
                            sui settori più presenti nel territorio: manifatturiero B2B, servizi professionali, retail, ristorazione e
                            cliniche. Conoscere il mercato locale significa saper scegliere le keyword giuste, impostare il targeting
                            geografico preciso e costruire landing page ottimizzate per le conversioni locali.
                        </p>
                    </div>

                    <h3 className="text-xl font-bold text-white mt-12 mb-6">Tipologie di campagne Google Ads che gestiamo</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none">
                        {CAMPAIGN_TYPES.map((type) => (
                            <li key={type.name} className="flex gap-4 p-5 bg-white/5 border border-white/10 rounded-xl hover:border-yellow-400/20 transition-colors">
                                <span className="text-2xl flex-shrink-0">{type.icon}</span>
                                <div>
                                    <h4 className="text-white font-bold mb-1 text-sm">{type.name}</h4>
                                    <p className="text-gray-400 text-xs leading-relaxed">{type.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* H2: COME GESTIAMO */}
            <section className="py-24 px-6 bg-white/2 border-y border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">
                        Come gestiamo le campagne Google Ads per aziende di Monza e Brianza
                    </h2>
                    <p className="text-gray-400 text-center mb-14 max-w-2xl mx-auto">
                        Un processo rigoroso e trasparente in 5 fasi. Ogni decisione è basata sui dati,
                        non sulle intuizioni. Ogni euro di budget è monitorato.
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

            {/* H2: BUDGET */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">
                        Quanto spendere in Google Ads a Monza? Budget consigliati
                    </h2>
                    <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                        Non esiste un budget universale: dipende dal settore, dalla concorrenza locale e dagli obiettivi.
                        Ecco i range consigliati per i settori più comuni a Monza e Brianza.
                    </p>

                    <div className="overflow-x-auto rounded-2xl border border-white/10 mb-10">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/5">
                                    <th className="text-left px-6 py-4 text-gray-400 font-semibold">Settore</th>
                                    <th className="px-6 py-4 text-yellow-400 font-bold text-center">Budget mensile consigliato</th>
                                    <th className="px-6 py-4 text-gray-400 font-semibold text-center">ROAS atteso</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ['PMI locale (servizi)', '€500 – €1.500', '3-5x'],
                                    ['E-commerce', '€1.500 – €5.000', '4-8x'],
                                    ['Professionisti (avvocati, medici, commercialisti)', '€300 – €800', '2-4x'],
                                    ['Costruzioni & Edilizia', '€800 – €2.000', '3-6x'],
                                    ['Ristorazione & Food', '€400 – €1.200', '2-4x'],
                                    ['B2B Manifatturiero', '€1.000 – €3.000', '4-7x'],
                                ].map(([settore, budget, roas]) => (
                                    <tr key={settore} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                                        <td className="px-6 py-3 text-gray-300">{settore}</td>
                                        <td className="px-6 py-3 text-center text-yellow-400 font-semibold">{budget}</td>
                                        <td className="px-6 py-3 text-center text-gray-400">{roas}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-6 bg-yellow-400/5 border border-yellow-400/20 rounded-2xl">
                        <p className="text-gray-300 text-sm leading-relaxed">
                            <strong className="text-white">Nota importante:</strong> questi valori sono stime orientative basate sulla nostra esperienza con PMI di Monza e Brianza.
                            Il ROAS reale dipende dalla qualità della landing page, dalla stagionalità, dalla concorrenza
                            locale e dalla struttura dell&apos;account. La fee di gestione W[r]Digital è separata dal budget Ads
                            e parte da €300/mese. Richiedi un&apos;analisi gratuita del tuo settore per una stima personalizzata.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ con <details><summary> */}
            <section className="py-24 px-6 bg-white/2 border-y border-white/5">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-16">
                        Google Ads Monza: domande frequenti
                    </h2>
                    <div className="space-y-4">
                        {[
                            {
                                q: 'Quanto costa la gestione Google Ads a Monza?',
                                a: 'Il costo di gestione Google Ads per PMI di Monza parte da €300/mese (fee di gestione), con budget pubblicitario separato consigliato da €500/mese. Il costo finale dipende dalla complessità dell\'account, dal numero di campagne e dal volume di keyword gestite. Il primo audit dell\'account è sempre gratuito.'
                            },
                            {
                                q: 'Quali tipi di campagne Google Ads gestite per le aziende di Monza?',
                                a: 'Gestiamo tutti i tipi di campagne: Search (annunci testuali), Display (banner), Shopping per e-commerce, YouTube, Performance Max e Retargeting. Per le PMI di Monza privilegiamo le campagne Search geolocalizzate per CAP e le campagne Local per attività con sede fisica nel territorio brianzolo.'
                            },
                            {
                                q: 'In quanto tempo si vedono i risultati di Google Ads?',
                                a: 'Con Google Ads i risultati sono immediati dal giorno del lancio: le campagne iniziano a portare traffico qualificato sin dalla prima pubblicazione. Il ROAS ottimale si raggiunge dopo 4-8 settimane di ottimizzazione continua, quando l\'algoritmo ha accumulato dati sufficienti sulle conversioni.'
                            },
                            {
                                q: 'Cosa significa ROAS e come lo calcolate?',
                                a: 'Il ROAS (Return on Ad Spend) è il rapporto tra il ricavo generato e il budget investito in pubblicità. Un ROAS di 4x significa €4 di ricavo per ogni €1 investito. Lo misuriamo tramite tracciamento conversioni completo su GA4 e Google Ads, includendo chiamate telefoniche, compilazioni form, acquisti e-commerce e visite in negozio (offline conversion).'
                            },
                            {
                                q: 'Gestite anche le campagne per attività locali di Monza?',
                                a: 'Sì, siamo specializzati nelle campagne Google Ads Local per attività fisiche di Monza e Brianza. Configuriamo estensioni di luogo, chiamata e percorso, impostiamo il targeting per CAP e orari di apertura, e ottimizziamo per le conversioni offline più rilevanti per le attività locali: chiamate, visite in store e prenotazioni.'
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
                    <h3 className="text-white font-bold text-center mb-8 text-lg">Esplora tutti i servizi W[r]Digital per Monza e Brianza</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/agenzia-digital-marketing-monza-brianza" className="text-sm text-gray-300 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:border-yellow-400/50 hover:text-yellow-400 transition-all">
                            → Agenzia Digital Marketing Monza Brianza
                        </Link>
                        <Link href="/servizi/ads" className="text-sm text-gray-300 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:border-yellow-400/50 hover:text-yellow-400 transition-all">
                            → Servizio Google Ads
                        </Link>
                        <Link href="/consulenza-seo-monza" className="text-sm text-gray-300 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:border-yellow-400/50 hover:text-yellow-400 transition-all">
                            → Consulenza SEO Monza
                        </Link>
                        <Link href="/web-agency-monza" className="text-sm text-gray-300 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:border-yellow-400/50 hover:text-yellow-400 transition-all">
                            → Web Agency Monza
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA FINALE */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Inizia a generare clienti con Google Ads a Monza
                    </h2>
                    <p className="text-gray-400 mb-10">
                        Audit gratuita dell&apos;account · Setup in 7 giorni · ROAS monitorato · Nessun lock-in
                    </p>
                    <Link
                        href="/preventivo"
                        className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-black px-10 py-5 rounded-full text-lg hover:scale-105 transition-transform shadow-xl shadow-yellow-400/20"
                    >
                        Ottimizza le tue campagne →
                    </Link>
                    <p className="mt-6 text-gray-600 text-sm">
                        📍 WRDigital S.r.l. — Via Venezia 2, Nova Milanese (MB) · <a href="tel:+393401204651" className="hover:text-yellow-400 transition-colors">+39 340 120 4651</a>
                    </p>
                </div>
            </section>
        </main>
    );
}

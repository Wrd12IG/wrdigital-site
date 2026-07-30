import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Realizzazione E-commerce a Desio e in Brianza | W[r]Digital',
    description: 'Realizziamo e-commerce per aziende di Desio e della Brianza: catalogo, SEO prodotto e campagne. Progetti che vendono, non solo cataloghi online.',
    alternates: {
        canonical: 'https://www.wrdigital.it/realizzazione-ecommerce-desio-brianza',
    },
    openGraph: {
        title: 'Realizzazione E-commerce a Desio e in Brianza | W[r]Digital',
        description: 'Realizziamo e-commerce per aziende di Desio e della Brianza: catalogo, SEO prodotto e campagne. Progetti che vendono, non solo cataloghi online.',
        url: 'https://www.wrdigital.it/realizzazione-ecommerce-desio-brianza',
        locale: 'it_IT',
        type: 'website',
        images: [{ url: '/og-ecommerce.png', width: 1200, height: 630, alt: 'Realizzazione E-commerce Desio' }],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Service",
            "name": "Realizzazione E-commerce Desio",
            "description": "Sviluppo e realizzazione siti e-commerce professionali per aziende e PMI a Desio, Monza e Brianza. Gestione cataloghi complessi, ottimizzazione SEO delle schede prodotto e campagne di vendita online.",
            "provider": {
                "@type": "LocalBusiness",
                "name": "W[r]Digital",
                "url": "https://www.wrdigital.it",
                "logo": "https://www.wrdigital.it/logo.png",
                "image": "https://www.wrdigital.it/og-image.png",
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
                { "@type": "City", "name": "Desio" },
                { "@type": "City", "name": "Nova Milanese" },
                { "@type": "City", "name": "Muggiò" },
                { "@type": "City", "name": "Monza" },
                { "@type": "AdministrativeArea", "name": "Provincia di Monza e della Brianza" }
            ],
            "url": "https://www.wrdigital.it/realizzazione-ecommerce-desio-brianza"
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Quale piattaforma usate?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Dipende dal catalogo, dalla logistica e da chi lo gestirà internamente. Lavoriamo principalmente con Shopify (consigliato per la maggior parte dei progetti per stabilità e semplicità di gestione interna) e WooCommerce (ottimo per progetti con alta personalizzazione e integrazione con WordPress). Per progetti enterprise ad altissimo traffico o catalogo massivo valutiamo soluzioni custom headless in Next.js."
                    }
                },
                {
                    "@type": "Question",
                    "name": "In quanto tempo posso vendere?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Online in 2–3 mesi per un progetto standard. I primi ordini organici in modo stabile richiedono più tempo: per questo si parte quasi sempre in parallelo con le campagne."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Si collega al mio gestionale?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Nella maggior parte dei casi sì. È una delle prime cose da verificare, perché condiziona la scelta della piattaforma."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Gestite anche i marketplace?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sì. Non ci occupiamo della logistica o del customer care sui marketplace, ma gestiamo l'integrazione tecnica dei cataloghi con Amazon ed eBay direttamente dal tuo pannello e-commerce principale, oltre a ottimizzare le campagne di advertising all'interno di Amazon Seller Central."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Cosa succede dopo il lancio?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Il lavoro vero inizia lì: ottimizzazione delle schede, campagne, analisi di cosa vende e cosa resta fermo. Offriamo piani di supporto continuativi che includono manutenzione tecnica, monitoraggio delle conversioni (CRO), ottimizzazione continua dei flussi di acquisto e gestione delle campagne Google Ads/Meta. I piani partono da €900/mese in base alla complessità e alle ore dedicate."
                    }
                }
            ]
        }
    ]
};

const STATS = [
    { value: '+180%', label: 'Crescita vendite da advertising' },
    { value: '-41%', label: 'Riduzione del costo di acquisizione (CPA)' },
    { value: '50.000+', label: 'SKU e varianti gestite a catalogo' },
    { value: 'Shopify / Woo', label: 'Piattaforme di riferimento integrate' },
];

export default function EcommerceDesioPage() {
    return (
        <main className="bg-black text-white min-h-screen relative overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* GLOWS */}
            <div className="absolute top-10 left-1/4 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-[160px] pointer-events-none" />

            {/* HERO */}
            <section className="relative pt-44 pb-24 px-6 text-center">
                <div className="max-w-4xl mx-auto relative z-10">
                    <span className="inline-block text-purple-400 text-xs font-mono uppercase tracking-[0.25em] mb-6 border border-purple-400/20 bg-purple-950/20 backdrop-blur-md px-5 py-2.5 rounded-full">
                        E-commerce Agency · Desio & Brianza
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight uppercase tracking-tight">
                        Un e-commerce non è un sito con il carrello<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
                            Vendere online in Brianza: cosa serve davvero
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-light">
                        Un e-commerce non è un semplice sito vetrina con un pulsante &quot;acquista&quot;. È un&apos;attività commerciale a tutti gli effetti, provvista di magazzino, logistica, customer service e costi di acquisizione. Il sito rappresenta solo il 30% del lavoro.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/preventivo" className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-extrabold px-9 py-4.5 rounded-full hover:scale-105 transition-all duration-300 shadow-xl shadow-yellow-400/10">
                            Parla con un Esperto →
                        </Link>
                        <Link href="/portfolio" className="border border-white/10 bg-white/5 backdrop-blur-md text-white font-bold px-9 py-4.5 rounded-full hover:border-white/30 hover:bg-white/10 transition-all duration-300">
                            Vedi i Nostri Progetti
                        </Link>
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="relative py-16 border-y border-white/10 bg-white/[0.02] backdrop-blur-md z-10">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {STATS.map(r => (
                        <div key={r.value} className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                            <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-2">{r.value}</div>
                            <div className="text-gray-400 text-sm font-medium">{r.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CONTENUTI A GRIGLIA */}
            <section className="py-24 px-6 max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* SINISTRA: FOCUS E COSTRUZIONE */}
                    <div className="lg:col-span-7 space-y-12">
                        
                        {/* IL MALINTESO */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white tracking-tight">Il malinteso che fa fallire metà dei progetti e-commerce</h2>
                            <p className="text-gray-300 leading-relaxed font-light text-lg">
                                La prima conversazione che facciamo non verte mai sulla pura scelta tecnologica della piattaforma. Analizziamo tre numeri fondamentali: <strong>margine per singolo ordine, scontrino medio e frequenza di riacquisto dei clienti.</strong> Se questi parametri non sono sostenibili, l&apos;e-commerce non genererà profitti, indipendentemente dal volume di visitatori inviati sul sito.
                            </p>
                        </div>

                        {/* COSA FACCIAMO */}
                        <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] space-y-6">
                            <h2 className="text-2xl font-bold text-white tracking-tight">Cosa costruiamo</h2>
                            <div className="space-y-4">
                                {[
                                    { title: "L'infrastruttura di vendita", desc: "Schede prodotto che convertono, checkout fluido, integrazioni di pagamento e logistica configurate e pannello di gestione accessibile." },
                                    { title: "Posizionamento del catalogo", desc: "Architettura delle categorie, gestione filtri e riscrittura schede prodotto per differenziarsi dai cataloghi duplicati dei concorrenti." },
                                    { title: "Campagne Performance", desc: "Ottimizzazione di campagne Google Shopping e Performance Max per catturare la domanda transazionale immediata." },
                                    { title: "Contenuti a supporto delle vendite", desc: "Guide alle taglie, tabelle comparative ed approfondimenti che intercettano gli utenti pronti all'acquisto." }
                                ].map((step, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <span className="w-6 h-6 rounded-full bg-purple-400/10 border border-purple-400/20 text-purple-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-1">
                                            {idx + 1}
                                        </span>
                                        <div>
                                            <h4 className="text-white font-bold mb-1">{step.title}</h4>
                                            <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CASE STUDY IN EVIDENZA */}
                        <div className="p-8 rounded-2xl border border-purple-400/20 bg-purple-400/[0.01] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-400/10 rounded-full blur-xl pointer-events-none" />
                            <span className="text-xs font-mono uppercase text-purple-400 tracking-wider">In Evidenza · Case Study Yeppon.it</span>
                            <h3 className="text-xl font-bold text-white mt-2 mb-4">Ottimizzazione Feed & Campagne per 50.000+ SKU</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                Per il portale di elettronica consumer <strong>Yeppon.it</strong> abbiamo strutturato campagne Google Ads e Performance Max dinamiche con priorità calibrate sul margine, incrementando le conversioni da advertising del <strong>+180%</strong> e riducendo il costo di acquisizione del <strong>41%</strong>.
                            </p>
                        </div>
                    </div>

                    {/* DESTRA: PREZZI, SETTORI E PIATTAFORME */}
                    <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
                        
                        {/* LISTINO PREZZI */}
                        <div className="p-8 rounded-2xl border border-purple-400/20 bg-purple-400/[0.02] backdrop-blur-md shadow-2xl space-y-6">
                            <h3 className="text-xl font-bold text-white">Tariffe e-commerce</h3>
                            <div className="space-y-3 font-mono text-sm">
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-gray-400">Shopify Standard</span>
                                    <span className="text-purple-400 font-bold">da €4.500</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-gray-400">Shopify Plus / Woo</span>
                                    <span className="text-purple-400 font-bold">da €8.000</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-gray-400">Headless Custom</span>
                                    <span className="text-purple-400 font-bold">da €15.000</span>
                                </div>
                                <div className="flex justify-between pb-2">
                                    <span className="text-gray-400">Gestione e CRO</span>
                                    <span className="text-purple-400 font-bold">da €1.200/m</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed font-sans">
                                Il budget promozionale per farsi trovare nei primi sei mesi di attività è fondamentale per la riuscita del progetto.
                            </p>
                            <Link href="/blog/quanto-costa-un-sito-web" className="block text-center text-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full py-3 transition-colors font-semibold">
                                Come si calcola un preventivo? →
                            </Link>
                        </div>

                        {/* APRIRE UN E-COMMERCE OGGI */}
                        <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.01] space-y-4 text-sm leading-relaxed">
                            <h4 className="text-white font-bold">Ha senso aprire un e-commerce?</h4>
                            <p className="text-gray-400 font-light">
                                <strong>Ha senso</strong> se hai un margine sufficiente per sostenere il costo pubblicitario per ordine, un fattore differenziante chiaro e la capacità di gestire flussi logistici ricorrenti.
                            </p>
                            <p className="text-gray-400 font-light">
                                <strong>Non ha senso</strong> se rivendi prodotti di terzi facilmente reperibili ovunque alle stesse condizioni dei grandi marketplace generalisti.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 px-6 bg-white/[0.01] border-y border-white/10 relative z-10">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-16 uppercase tracking-tight">Domande Frequenti</h2>
                    <div className="space-y-6">
                        {[
                            {
                                q: 'Quale piattaforma usate?',
                                a: 'Dipende dal catalogo, dalla logistica e da chi lo gestirà internamente. Lavoriamo principalmente con Shopify (consigliato per la maggior parte dei progetti per stabilità e semplicità di gestione interna) e WooCommerce (ottimo per progetti con alta personalizzazione e integrazione con WordPress). Per progetti enterprise ad altissimo traffico o catalogo massivo valutiamo soluzioni custom headless in Next.js.'
                            },
                            {
                                q: 'In quanto tempo posso vendere?',
                                a: 'Online in 2–3 mesi per un progetto standard. I primi ordini organici in modo stabile richiedono più tempo: per questo si parte quasi sempre in parallelo con le campagne.'
                            },
                            {
                                q: 'Si collega al mio gestionale?',
                                a: 'Nella maggior parte dei casi sì. È una delle prime cose da verificare, perché condiziona la scelta della piattaforma.'
                            },
                            {
                                q: 'Gestite anche i marketplace?',
                                a: 'Sì. Non ci occupiamo della logistica o del customer care sui marketplace, ma gestiamo l\'integrazione tecnica dei cataloghi con Amazon ed eBay direttamente dal tuo pannello e-commerce principale, oltre a ottimizzare le campagne di advertising all\'interno di Amazon Seller Central.'
                            },
                            {
                                q: 'Cosa succede dopo il lancio?',
                                a: 'Il lavoro vero inizia lì: ottimizzazione delle schede, campagne, analisi di cosa vende e cosa resta fermo. Offriamo piani di supporto continuativi che includono manutenzione tecnica, monitoraggio delle conversioni (CRO), ottimizzazione continua dei flussi di acquisto e gestione delle campagne Google Ads/Meta. I piani partono da €900/mese in base alla complessità e alle ore dedicate.'
                            }
                        ].map((faq, i) => (
                            <div key={i} className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-purple-400/30 transition-all duration-300">
                                <h3 className="text-white font-bold mb-3">{faq.q}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-28 px-6 text-center relative z-10">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-tight">
                        Partiamo dai numeri, non dalla piattaforma
                    </h2>
                    <p className="text-gray-300 mb-6 font-light">
                        Scrivici indicando cosa vendi, quanti articoli hai a catalogo e il margine medio per prodotto. Ti diciamo se il progetto ha le basi per essere sostenibile.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link href="/preventivo" className="inline-block bg-gradient-to-r from-purple-400 to-purple-500 text-white font-black px-10 py-5 rounded-full text-lg hover:scale-105 transition-transform shadow-xl shadow-purple-400/20">
                            Analisi Fattibilità E-commerce
                        </Link>
                        <a href="tel:+393401204651" className="text-purple-400 font-bold hover:underline text-lg">
                            Chiama: 340 120 4651
                        </a>
                    </div>
                    <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center text-sm text-gray-500">
                        <Link href="/" className="hover:text-purple-400 transition-colors">
                            ← Torna alla Homepage
                        </Link>
                        <Link href="/consulenza-seo-nova-milanese" className="hover:text-purple-400 transition-colors">
                            Consulenza SEO locale →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

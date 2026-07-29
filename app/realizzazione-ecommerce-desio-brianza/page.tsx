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
        <main className="bg-black text-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* HERO */}
            <section className="relative pt-40 pb-24 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-400/5 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <span className="inline-block text-purple-400 text-xs font-mono uppercase tracking-[0.3em] mb-6 border border-purple-400/30 px-4 py-2 rounded-full">
                        E-commerce Agency · Desio & Brianza
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight uppercase">
                        Un e-commerce non è un sito con il carrello<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            Vendere online in Brianza: cosa serve davvero
                        </span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
                        Un e-commerce non è un sito vetrina con il pulsante &quot;acquista&quot;. È un&apos;attività commerciale complessa con magazzino, logistica, assistenza clienti e un costo di acquisizione per ogni ordine. Il sito è solo il 30% del lavoro. Il restante 70% è strategia di acquisizione.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/preventivo" className="bg-yellow-400 text-black font-bold px-8 py-4 rounded-full hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20">
                            Parla con un Esperto →
                        </Link>
                        <Link href="/portfolio" className="border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:border-white/40 transition-colors">
                            Vedi i Nostri Progetti
                        </Link>
                    </div>
                </div>
            </section>

            {/* RISULTATI / CASE STUDY */}
            <section className="py-16 border-y border-white/10 bg-white/5">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {STATS.map(r => (
                        <div key={r.value}>
                            <div className="text-3xl md:text-4xl font-black text-purple-400 mb-2">{r.value}</div>
                            <div className="text-gray-400 text-sm">{r.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CONTENUTO ARTICOLO */}
            <section className="py-24 px-6 max-w-4xl mx-auto leading-relaxed text-gray-300 space-y-12">
                <div className="prose prose-invert max-w-none">
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Il malinteso che fa fallire metà dei progetti e-commerce</h2>
                    <p>
                        Per questo la prima conversazione che facciamo non è sulla scelta tecnologica della piattaforma. È incentrata su tre numeri essenziali: <strong>margine per ordine, scontrino medio e frequenza di riacquisto dei clienti.</strong> Se questi tre parametri non sono in equilibrio, l&apos;e-commerce genererà perdite a prescindere dal traffico inviato — e preferiamo dirtelo prima di farti spendere budget inutilmente.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">Cosa costruiamo</h2>
                    <ul className="list-disc pl-6 space-y-3 mt-4">
                        <li>
                            <strong>L&apos;e-commerce.</strong> Piattaforma selezionata in base al catalogo reale, schede prodotto ottimizzate per convertire, checkout fluido e senza attriti, integrazione logistica e sistemi di pagamento configurati. Il tutto gestibile facilmente da un pannello di controllo intuitivo.
                        </li>
                        <li>
                            <strong>Il posizionamento del catalogo.</strong> Architettura delle categorie, gestione logica dei filtri di navigazione e riscrittura di schede prodotto per evitare il contenuto duplicato dei cataloghi fornitori — che Google tende a penalizzare o ignorare a favore di un solo rivenditore.
                        </li>
                        <li>
                            <strong>Le campagne.</strong> Struttura di campagne Google Shopping e Performance Max per intercettare l&apos;intenzione d&apos;acquisto immediata, e campagne social (Meta/TikTok) per fare conoscere i tuoi prodotti a chi non li sta ancora cercando direttamente.
                        </li>
                        <li>
                            <strong>I contenuti che fanno comprare.</strong> Guide all&apos;uso, tabelle comparative, FAQ e risposte immediate sui prodotti per convertire le ricerche informazionali in acquisti transazionali.
                        </li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">Il problema specifico dei cataloghi grandi</h2>
                    <p>
                        Se hai centinaia o migliaia di codici a catalogo, affronti sfide uniche che un negozio con 50 prodotti non ha:
                    </p>
                    <ul className="list-disc pl-6 space-y-3 mt-4">
                        <li><strong>I prodotti competono tra loro:</strong> varianti dello stesso articolo rischiano di cannibalizzarsi su Google.</li>
                        <li><strong>I filtri generano URL infinite:</strong> combinazioni di taglie, colori e marche creano duplicati tecnici che diluiscono l&apos;authority del sito.</li>
                        <li><strong>Le schede sono duplicate:</strong> le descrizioni standard dei produttori sono identiche in rete. È fondamentale definire una priorità d&apos;intervento per riscrivere quelle che generano l&apos;80% del tuo margine.</li>
                    </ul>
                    <p className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-6">
                        <strong>L&apos;esperienza reale di W[r]Digital:</strong> Per l&apos;e-commerce nazionale di elettronica di consumo <strong>Yeppon.it</strong>, abbiamo affrontato proprio questa complessità gestendo un feed di oltre <strong>50.000 SKU</strong> con una struttura Performance Max dinamica e ottimizzando l&apos;architettura di scansione di Google, incrementando le conversioni da advertising del <strong>+180%</strong>.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">Aprire un e-commerce oggi ha ancora senso?</h2>
                    <p>Sì, ma non per tutti. Analizziamo onestamente i casi reali:</p>
                    <ul className="list-disc pl-6 space-y-3 mt-4">
                        <li>
                            <strong>Ha senso</strong> se il margine copre ampiamente il costo di acquisizione cliente, se possiedi un&apos;esclusiva territoriale o di prodotto, o se offri un&apos;assistenza specializzata che fa la differenza rispetto a player massivi.
                        </li>
                        <li>
                            <strong>Ha senso ma in forma ibrida</strong> se sei un produttore B2B: spesso una piattaforma di ordini digitali con area riservata per rivenditori genera un ritorno sull&apos;investimento molto più alto di un carrello pubblico classico.
                        </li>
                        <li>
                            <strong>Non ha senso</strong> se rivendi prodotti terzi non differenziati disponibili ovunque e allo stesso prezzo. In quel segmento competi direttamente con Amazon, e i costi di acquisizione supereranno sempre i ricavi.
                        </li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">Quanto costa</h2>
                    <p>
                        I progetti e-commerce richiedono setup tecnici stabili. Le nostre fasce di partenza indicative sono:
                    </p>
                    <p className="mt-4 font-semibold text-white">
                        E-commerce base (es. Shopify standard): da €4.500 · E-commerce avanzato / catalogo medio (Shopify Plus / WooCommerce): da €8.000 · Progetti custom enterprise / headless: da €15.000 · Supporto mensile e campagne (CRO + Ads): da €1.200/mese.
                    </p>
                    <p className="mt-4">
                        Il costo che quasi tutti dimenticano non è la piattaforma: è <strong>il budget per farsi trovare nei primi sei mesi.</strong> Un e-commerce senza pubblicità o posizionamento SEO iniziale è come un negozio fisico aperto in una via senza passanti.
                    </p>
                    <p className="mt-4">
                        Se vuoi valutare le differenze e capire dove finiscono gli investimenti di sviluppo, leggi il nostro approfondimento: <Link href="/blog/quanto-costa-un-sito-web" className="text-purple-400 hover:underline font-semibold">Quanto costa un sito web per una PMI (e perché i preventivi variano) →</Link>
                    </p>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 px-6 bg-white/5 border-y border-white/10">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-16">Domande Frequenti</h2>
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
                            <div key={i} className="bg-black border border-white/10 rounded-2xl p-6 hover:border-purple-400/20 transition-colors">
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
                    <h2 className="text-3xl font-bold text-white mb-6">
                        Partiamo dai numeri, non dalla piattaforma
                    </h2>
                    <p className="text-gray-300 mb-6">
                        Scrivici con tre informazioni: cosa vendi, quanti prodotti hai a catalogo e qual è il margine medio.
                    </p>
                    <p className="text-gray-400 mb-10">
                        Con quelle tre righe ti diciamo se il progetto sta in piedi — e se non sta in piedi, perché.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link href="/preventivo" className="inline-block bg-gradient-to-r from-purple-400 to-purple-500 text-white font-black px-10 py-5 rounded-full text-lg hover:scale-105 transition-transform shadow-xl shadow-purple-400/20">
                            Analisi Fattibilità E-commerce
                        </Link>
                        <a href="tel:+393401204651" className="text-purple-400 font-bold hover:underline text-lg">
                            Chiama: 340 120 4651
                        </a>
                    </div>
                    <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center text-sm text-gray-500">
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

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Realizzazione Siti Web Nova Milanese e Brianza | W[r]Digital',
    description: 'Realizziamo siti web per PMI a Nova Milanese, Desio e in Monza Brianza. Progettati per portare richieste di contatto, non solo per essere belli. Parliamone.',
    alternates: {
        canonical: 'https://www.wrdigital.it/realizzazione-siti-web-nova-milanese',
    },
    openGraph: {
        title: 'Realizzazione Siti Web Nova Milanese e Brianza | W[r]Digital',
        description: 'Realizziamo siti web per PMI a Nova Milanese, Desio e in Monza Brianza. Progettati per portare richieste di contatto, non solo per essere belli. Parliamone.',
        url: 'https://www.wrdigital.it/realizzazione-siti-web-nova-milanese',
        locale: 'it_IT',
        type: 'website',
        images: [{ url: '/og-web.png', width: 1200, height: 630, alt: 'Realizzazione Siti Web Nova Milanese' }],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Service",
            "name": "Realizzazione Siti Web Nova Milanese",
            "description": "Servizio professionale di sviluppo e realizzazione siti web per PMI e aziende a Nova Milanese, Desio e in Monza Brianza. Ottimizzazione SEO, mobile-first e velocità Core Web Vitals.",
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
                { "@type": "City", "name": "Nova Milanese" },
                { "@type": "City", "name": "Desio" },
                { "@type": "City", "name": "Muggiò" },
                { "@type": "City", "name": "Monza" },
                { "@type": "AdministrativeArea", "name": "Provincia di Monza e della Brianza" }
            ],
            "url": "https://www.wrdigital.it/realizzazione-siti-web-nova-milanese"
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "In quanto tempo è online?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Un sito vetrina, dai 30 ai 45 giorni. La variabile non siamo noi: sono i contenuti. Se testi, foto e materiali arrivano in tempo, si sta nei tempi."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Chi scrive i testi?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Li scriviamo noi, sulla base di un'intervista con chi conosce il prodotto. Il modello 'mandami tu i testi' funziona quasi mai, perché scrivere di sé è difficile e nessuno ha tempo."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Il sito è mio o vostro?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Tuo. Dominio, hosting e tutti gli account dei vari strumenti di tracciamento sono registrati a tuo nome. Al termine del progetto ti consegniamo tutte le chiavi di accesso. Non sarai mai vincolato a noi."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Posso aggiornarlo da solo?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sì. Consegniamo con un pannello di gestione e una sessione di formazione registrata."
                    }
                }
            ]
        }
    ]
};

const RESULTS = [
    { value: '< 1 sec', label: 'Tempo di caricamento medio delle pagine' },
    { value: '98%', label: 'PageSpeed Score mobile/desktop' },
    { value: '+65%', label: 'Conversione contatti medi del sito' },
    { value: '47+', label: 'PMI e brand serviti nel territorio' },
];

export default function WebNovaPage() {
    return (
        <main className="bg-black text-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* HERO */}
            <section className="relative pt-40 pb-24 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-400/5 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <span className="inline-block text-blue-400 text-xs font-mono uppercase tracking-[0.3em] mb-6 border border-blue-400/30 px-4 py-2 rounded-full">
                        Web Agency · Nova Milanese & Brianza
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight uppercase">
                        Il tuo sito attuale ti porta clienti?<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                            Se la risposta è &quot;non lo so&quot;, il problema è quello
                        </span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
                        Quando un&apos;azienda ci chiede la realizzazione di un sito web, la conversazione parte quasi sempre da lì: colori, foto, &quot;vorrei qualcosa di più moderno&quot;. La domanda che invece decide tutto è un&apos;altra: quante richieste di contatto ti arrivano oggi dal sito?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/preventivo" className="bg-yellow-400 text-black font-bold px-8 py-4 rounded-full hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20">
                            Preventivo Gratuito →
                        </Link>
                        <Link href="/servizi/realizzazione-siti-web" className="border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:border-white/40 transition-colors">
                            Scopri il servizio Web Design
                        </Link>
                    </div>
                </div>
            </section>

            {/* RISULTATI */}
            <section className="py-16 border-y border-white/10 bg-white/5">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {RESULTS.map(r => (
                        <div key={r.value}>
                            <div className="text-3xl md:text-4xl font-black text-blue-400 mb-2">{r.value}</div>
                            <div className="text-gray-400 text-sm">{r.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ARTICOLO PRINCIPALE */}
            <section className="py-24 px-6 max-w-4xl mx-auto leading-relaxed text-gray-300 space-y-12">
                <div className="prose prose-invert max-w-none">
                    <p className="text-lg">
                        Se non hai la risposta a questa domanda, non è colpa tua. È che il sito precedente è stato consegnato senza uno strumento per misurarlo. Ed è il motivo per cui tante aziende rifanno il sito ogni tre anni e ogni volta hanno la stessa sensazione: più bello, stessi risultati. Noi partiamo da lì.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">Cosa facciamo, concretamente</h2>
                    <ul className="list-disc pl-6 space-y-3 mt-4">
                        <li>
                            <strong>Siti vetrina per PMI e studi professionali.</strong> Da cinque a venti pagine, struttura pensata su come le persone cercano davvero il tuo servizio, form che funzionano, tracciamento attivo dal primo giorno.
                        </li>
                        <li>
                            <strong>Siti multiservizio e multi-sede.</strong> Quando hai più linee di business o più punti vendita e ogni servizio deve avere la sua pagina — perché una pagina &quot;Servizi&quot; con dieci paragrafi non si posiziona per nessuno di quei dieci.
                        </li>
                        <li>
                            <strong>Restyling.</strong> Non sempre serve rifare tutto. Spesso si recupera l&apos;esistente su struttura, velocità e contenuti a un terzo del costo.
                        </li>
                        <li>
                            <strong>Landing page per campagne.</strong> Pagine singole ad alta conversione, pensate per il traffico a pagamento. Sono un lavoro diverso da un sito: hanno altre regole.
                        </li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">Come lavoriamo (e perché la SEO viene prima del design)</h2>
                    <ol className="list-decimal pl-6 space-y-4 mt-4">
                        <li>
                            <strong>1. Capiamo cosa cercano i tuoi clienti.</strong> Prima di disegnare qualsiasi cosa guardiamo le ricerche reali del tuo settore sul tuo territorio. Da lì esce la mappa delle pagine: non &quot;chi siamo, servizi, contatti&quot;, ma le pagine che qualcuno sta effettivamente cercando (ad esempio, le query transazionali per <Link href="/consulenza-seo-nova-milanese" className="text-blue-400 hover:underline">consulenza SEO Nova Milanese</Link>).
                        </li>
                        <li>
                            <strong>2. Struttura e testi.</strong> I contenuti prima della grafica. Un design costruito su testi finti (Lorem Ipsum) va sempre rifatto quando arrivano quelli veri.
                        </li>
                        <li>
                            <strong>3. Design.</strong> Sul contenuto reale, con un&apos;attenzione ossessiva al mobile: per la maggior parte dei settori locali il traffico da telefono supera il 70%.
                        </li>
                        <li>
                            <strong>4. Sviluppo e velocità.</strong> Un sito lento perde visitatori prima ancora che leggano, e Google lo sa. Configurando tecnologie headless Next.js manteniamo la velocità ideale.
                        </li>
                        <li>
                            <strong>5. Misurazione.</strong> Consegniamo con analytics e tracciamento delle conversioni già configurati. Dal giorno uno sai quante richieste arrivano e da dove.
                        </li>
                        <li>
                            <strong>6. Dopo la consegna.</strong> Il sito non è un quadro da appendere. Serve manutenzione, aggiornamenti, e contenuti che crescono.
                        </li>
                    </ol>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">Perché una web agency della Brianza e non una a caso su internet</h2>
                    <p>Non è campanilismo, sono tre cose pratiche:</p>
                    <ul className="list-disc pl-6 space-y-3 mt-4">
                        <li>
                            <strong>Ci si vede.</strong> Le decisioni importanti su un sito si prendono meglio in mezz&apos;ora attorno a un tavolo che in tre settimane di email. Siamo in Via Venezia 2 a Nova Milanese: Desio, Muggiò, Varedo, Bovisio, Lissone, Seregno, Monza sono tutte a pochi minuti.
                        </li>
                        <li>
                            <strong>Conosciamo il tessuto.</strong> Il produttore di arredo di Lissone, lo studio professionale per la <Link href="/servizi/realizzazione-siti-web" className="text-blue-400 hover:underline">realizzazione siti Desio</Link> e l&apos;e-commerce che spedisce in tutta Italia hanno tre problemi completamente diversi. Averli già visti accorcia i tempi.
                        </li>
                        <li>
                            <strong>Rispondiamo.</strong> Quando il form si rompe di venerdì pomeriggio, c&apos;è qualcuno che risponde. Sembra banale finché non ti serve.
                        </li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">Quanto costa</h2>
                    <p>
                        I prezzi per la realizzazione del tuo progetto dipendono dalla complessità strutturale e dai requisiti tecnologici:
                    </p>
                    <p className="mt-4 font-semibold text-white">
                        Sito vetrina a partire da €1.500 · Sito multiservizio a partire da €2.500 · E-commerce a partire da €4.500 · Restyling a partire da €900.
                    </p>
                    <p className="mt-4">
                        Quello che possiamo dire in generale: il prezzo di un sito dipende quasi tutto da quante pagine devono essere scritte davvero e da quanto lavoro serve sui contenuti. La grafica è la parte che si vede, non quella che costa. Diffida di chi ti dà un prezzo prima di aver chiesto cosa vendi e a chi.
                    </p>
                    <p className="mt-4">
                        Se vuoi capire come si compone un preventivo, ne abbiamo scritto qui: <Link href="/blog/agenzia-web-monza-brianza-realizzazione-siti" className="text-blue-400 hover:underline font-semibold">Quanto costa un sito web per una PMI →</Link>
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
                                q: 'In quanto tempo è online?',
                                a: 'Un sito vetrina, dai 30 ai 45 giorni. La variabile non siamo noi: sono i contenuti. Se testi, foto e materiali arrivano in tempo, si sta nei tempi.'
                            },
                            {
                                q: 'Chi scrive i testi?',
                                a: 'Li scriviamo noi, sulla base di un\'intervista con chi conosce il prodotto. Il modello "mandami tu i testi" funziona quasi mai, perché scrivere di sé è difficile e nessuno ha tempo.'
                            },
                            {
                                q: 'Il sito è mio o vostro?',
                                a: 'Tuo. Dominio, hosting e tutti gli account dei vari strumenti di tracciamento sono registrati a tuo nome. Al termine del progetto ti consegniamo tutte le chiavi di accesso. Non sarai mai vincolato a noi.'
                            },
                            {
                                q: 'Posso aggiornarlo da solo?',
                                a: 'Sì. Consegniamo con un pannello di gestione e una sessione di formazione registrata.'
                            },
                            {
                                q: 'Fate anche e-commerce?',
                                a: <>Sì, ma è un progetto diverso per complessità e costi. Abbiamo gestito l&apos;ottimizzazione di flussi di checkout e carrelli di vendita complessi nel territorio di <Link href="/zona/desio" className="text-blue-400 hover:underline">Desio</Link> e Monza.</>
                            },
                            {
                                q: 'Avete lavorato con aziende del mio settore?',
                                a: <>Sì. Abbiamo lavorato con clienti nel settore Automotive & Concessionarie (es. <Link href="/portfolio" className="text-blue-400 hover:underline">CityMotors</Link>), E-commerce & Retail di grandi dimensioni (es. <Link href="/portfolio" className="text-blue-400 hover:underline">Yeppon.it</Link>), e diverse PMI locali di produzione manifatturiera e serramenti.</>
                            }
                        ].map((faq, i) => (
                            <div key={i} className="bg-black border border-white/10 rounded-2xl p-6 hover:border-blue-400/20 transition-colors">
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
                        Iniziamo dalla domanda giusta
                    </h2>
                    <p className="text-gray-300 mb-6">
                        Mandaci il link del tuo sito attuale e una riga su cosa vorresti succedesse di diverso.
                    </p>
                    <p className="text-gray-400 mb-10">
                        Ti diciamo cosa vediamo — se serve rifarlo o se basta sistemarlo. Capita spesso che basti sistemarlo, e te lo diciamo lo stesso.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link href="/preventivo" className="inline-block bg-gradient-to-r from-blue-400 to-blue-500 text-black font-black px-10 py-5 rounded-full text-lg hover:scale-105 transition-transform shadow-xl shadow-blue-400/20">
                            Richiedi Analisi Sito
                        </Link>
                        <a href="tel:+393401204651" className="text-blue-400 font-bold hover:underline text-lg">
                            Chiama: 340 120 4651
                        </a>
                    </div>
                    <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center text-sm text-gray-500">
                        <Link href="/" className="hover:text-blue-400 transition-colors">
                            ← Torna alla Homepage
                        </Link>
                        <Link href="/servizi/realizzazione-siti-web" className="hover:text-blue-400 transition-colors">
                            Tutti i servizi Web Design →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

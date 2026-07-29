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
        <main className="bg-black text-white min-h-screen relative overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* GLOWS */}
            <div className="absolute top-10 right-1/4 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

            {/* HERO */}
            <section className="relative pt-44 pb-24 px-6 text-center">
                <div className="max-w-4xl mx-auto relative z-10">
                    <span className="inline-block text-blue-400 text-xs font-mono uppercase tracking-[0.25em] mb-6 border border-blue-400/20 bg-blue-950/20 backdrop-blur-md px-5 py-2.5 rounded-full">
                        Web Agency · Nova Milanese & Brianza
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight uppercase tracking-tight">
                        Il tuo sito attuale ti porta clienti?<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">
                            Se la risposta è &quot;non lo so&quot;, il problema è quello
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-light">
                        Quando un&apos;azienda ci chiede la realizzazione di un sito web, la conversazione parte quasi sempre da lì: colori, foto, &quot;vorrei qualcosa di più moderno&quot;. La domanda che invece decide tutto è un&apos;altra: quante richieste di contatto ti arrivano oggi?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/preventivo" className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-extrabold px-9 py-4.5 rounded-full hover:scale-105 transition-all duration-300 shadow-xl shadow-yellow-400/10">
                            Preventivo Gratuito →
                        </Link>
                        <Link href="/servizi/realizzazione-siti-web" className="border border-white/10 bg-white/5 backdrop-blur-md text-white font-bold px-9 py-4.5 rounded-full hover:border-white/30 hover:bg-white/10 transition-all duration-300">
                            Servizio Web Design
                        </Link>
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="relative py-16 border-y border-white/10 bg-white/[0.02] backdrop-blur-md z-10">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {RESULTS.map(r => (
                        <div key={r.value} className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                            <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-2">{r.value}</div>
                            <div className="text-gray-400 text-sm font-medium">{r.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ARTICOLO PRINCIPALE & SERVIZI */}
            <section className="py-24 px-6 max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* SINISTRA: DETTAGLI & SERVIZI */}
                    <div className="lg:col-span-7 space-y-12">
                        <div>
                            <p className="text-xl text-gray-300 leading-relaxed font-light">
                                Se non hai la risposta a questa domanda, non è colpa tua. È che il sito precedente è stato consegnato senza uno strumento per misurarlo. Ed è il motivo per cui tante aziende rifanno il sito ogni tre anni ottenendo la stessa sensazione: più bello visivamente, ma con gli stessi risultati di prima. Noi partiamo da lì.
                            </p>
                        </div>

                        {/* COSA FACCIAMO */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white tracking-tight">Cosa facciamo, concretamente</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { title: "Siti vetrina per PMI", desc: "Da 5 a 20 pagine, struttura incentrata sulle ricerche degli utenti, form ottimizzati e tracciamento attivo dal primo giorno." },
                                    { title: "Siti multi-servizio", desc: "Per attività con più linee di business o sedi sul territorio. Ogni servizio ha la sua pagina specifica per posizionarsi su Google." },
                                    { title: "Restyling tecnico", desc: "Non serve sempre rifare tutto. Interveniamo su struttura, velocità e contenuti dell'esistente abbattendo i costi di sviluppo." },
                                    { title: "Landing page dedicate", desc: "Pagine singole studiate per campagne pubblicitarie a pagamento, ottimizzate per massimizzare il tasso di conversione." }
                                ].map((item, idx) => (
                                    <div key={idx} className="p-5 rounded-xl border border-white/5 bg-black/40">
                                        <h4 className="text-white font-bold mb-2">{item.title}</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* COME LAVORIAMO */}
                        <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] space-y-6">
                            <h2 className="text-2xl font-bold text-white tracking-tight">Il nostro metodo di sviluppo (SEO-first)</h2>
                            <div className="space-y-4">
                                {[
                                    { title: "Studio degli intenti di ricerca", desc: "Mappiamo le parole chiave reali del tuo settore nella provincia di Monza e Brianza prima di disegnare le bozze." },
                                    { title: "Contenuti prima del design", desc: "Progettiamo l'UX e i wireframe basandoci sui testi finali approvati, non su Lorem Ipsum fittizio." },
                                    { title: "Focalizzazione sul mobile", desc: "Sviluppo reattivo mobile-first, considerando che oltre il 70% delle ricerche locali avviene da smartphone." },
                                    { title: "Velocità e ottimizzazione", desc: "Sviluppiamo in Next.js garantendo punteggi PageSpeed elevati per non perdere utenti durante il caricamento." },
                                    { title: "Tracciamento integrato", desc: "Integrazione di Google Analytics e tracciamento eventi per misurare chiamate, form compilati e conversioni." }
                                ].map((step, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <span className="w-6 h-6 rounded-full bg-blue-400/10 border border-blue-400/20 text-blue-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-1">
                                            {idx + 1}
                                        </span>
                                        <div>
                                            <h5 className="text-white font-bold mb-1">{step.title}</h5>
                                            <p className="text-gray-400 text-sm">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* DESTRA: PREZZI & CASI STUDIO */}
                    <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
                        
                        {/* LISTA PREZZI */}
                        <div className="p-8 rounded-2xl border border-blue-400/20 bg-blue-400/[0.02] backdrop-blur-md shadow-2xl space-y-6">
                            <h3 className="text-xl font-bold text-white">Tariffe di Riferimento</h3>
                            <div className="space-y-3 font-mono text-sm">
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-gray-400">Sito Vetrina</span>
                                    <span className="text-blue-400 font-bold">da €1.500</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-gray-400">Sito Multiservizio</span>
                                    <span className="text-blue-400 font-bold">da €2.500</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-gray-400">E-commerce</span>
                                    <span className="text-blue-400 font-bold">da €4.500</span>
                                </div>
                                <div className="flex justify-between pb-2">
                                    <span className="text-gray-400">Restyling</span>
                                    <span className="text-blue-400 font-bold">da €900</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed font-sans">
                                Il prezzo finale dipende dal numero di pagine da redigere e dalla complessità dei contenuti.
                            </p>
                            <Link href="/blog/quanto-costa-un-sito-web" className="block text-center text-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full py-3 transition-colors font-semibold">
                                Come si calcola un preventivo? →
                            </Link>
                        </div>

                        {/* PARTNER LOCALE */}
                        <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.01] space-y-4">
                            <h4 className="text-base font-bold text-white">Perché una web agency della Brianza?</h4>
                            <p className="text-sm text-gray-400 leading-relaxed font-light">
                                Siamo a <strong>Nova Milanese, in Via Venezia 2</strong>. Questo ci permette di fare incontri fisici periodici con le aziende di Desio, Muggiò, Varedo, Seregno e Monza, comprendendo meglio i bisogni del tessuto produttivo della Brianza.
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
                                a: <>Sì, ma è un progetto diverso per complessità e costi. <Link href="/realizzazione-ecommerce-desio-brianza" className="text-blue-400 hover:underline font-semibold">Vedi la pagina dedicata →</Link></>
                            },
                            {
                                q: 'Avete lavorato con aziende del mio settore?',
                                a: <>Sì. Abbiamo lavorato con clienti nel settore Automotive & Concessionarie (es. <Link href="/portfolio" className="text-blue-400 hover:underline">CityMotors</Link>), E-commerce & Retail di grandi dimensioni (es. <Link href="/portfolio" className="text-blue-400 hover:underline">Yeppon.it</Link>), e diverse PMI locali di produzione manifatturiera e serramenti.</>
                            }
                        ].map((faq, i) => (
                            <div key={i} className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-blue-400/30 transition-all duration-300">
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
                        Iniziamo dalla domanda giusta
                    </h2>
                    <p className="text-gray-300 mb-6 font-light">
                        Mandaci il link del tuo sito attuale e una riga su cosa vorresti succedesse di diverso. Ti diciamo cosa vediamo — se serve rifarlo o se basta semplicemente ottimizzarlo.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link href="/preventivo" className="inline-block bg-gradient-to-r from-blue-400 to-blue-500 text-white font-black px-10 py-5 rounded-full text-lg hover:scale-105 transition-transform shadow-xl shadow-blue-400/20">
                            Richiedi Analisi Sito
                        </Link>
                        <a href="tel:+393401204651" className="text-blue-400 font-bold hover:underline text-lg">
                            Chiama: 340 120 4651
                        </a>
                    </div>
                    <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center text-sm text-gray-500">
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

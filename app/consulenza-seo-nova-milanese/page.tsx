import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Consulenza SEO Nova Milanese e Brianza | W[r]Digital',
    description: 'Consulenza SEO per PMI a Nova Milanese, Desio e in Monza Brianza. Analisi, SEO locale e contenuti che portano clienti, non solo visite. Primo confronto gratuito.',
    alternates: {
        canonical: 'https://www.wrdigital.it/consulenza-seo-nova-milanese',
    },
    openGraph: {
        title: 'Consulenza SEO Nova Milanese e Brianza | W[r]Digital',
        description: 'Consulenza SEO per PMI a Nova Milanese, Desio e in Monza Brianza. Analisi, SEO locale e contenuti che portano clienti, non solo visite. Primo confronto gratuito.',
        url: 'https://www.wrdigital.it/consulenza-seo-nova-milanese',
        locale: 'it_IT',
        type: 'website',
        images: [{ url: '/og-seo.png', width: 1200, height: 630, alt: 'SEO Nova Milanese' }],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Service",
            "name": "Consulenza SEO Nova Milanese",
            "description": "Servizio di ottimizzazione per i motori di ricerca (SEO) per aziende e PMI di Nova Milanese, Desio e in Monza Brianza. Include audit tecnica, local SEO e content strategy.",
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
            "url": "https://www.wrdigital.it/consulenza-seo-nova-milanese"
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "In quanto tempo si vedono i risultati?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "I primi movimenti di posizione in 2–3 mesi. Contatti in modo stabile, realisticamente, dal sesto mese in avanti. Su nicchie locali poco competitive può andare più veloce; su settori affollati serve più tempo."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Lavorate solo con aziende di Nova Milanese?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "No, seguiamo clienti in tutta la Lombardia e fuori. Ma sul territorio di Monza e Brianza abbiamo un vantaggio pratico: possiamo vederci di persona, e per il lavoro sulla SEO locale conoscere il territorio conta."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Ho già un sito. Va rifatto?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Nella maggior parte dei casi no. Si interviene su struttura e contenuti. Se invece il sito è costruito su una tecnologia che Google non riesce a leggere, o è lentissimo su mobile, te lo diciamo subito — ma è la minoranza dei casi."
                    }
                },
                {
                    "@type": "Question",
                    "name": "La SEO serve ancora con l'intelligenza artificiale?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sì. I sistemi di AI costruiscono le risposte partendo dalle stesse fonti che Google considera autorevoli. Il lavoro di fondo — essere la pagina che risponde meglio a una domanda — è ciò che serve per essere citati anche lì."
                    }
                }
            ]
        }
    ]
};

const RESULTS = [
    { value: '+145%', label: 'Traffico organico medio in 6 mesi' },
    { value: '3.8x', label: 'ROI medio sulle campagne SEO' },
    { value: '4 mesi', label: 'Tempo medio per i primi risultati' },
    { value: '4.9/5', label: 'Rating delle nostre PMI clienti' },
];

export default function SeoNovaPage() {
    return (
        <main className="bg-black text-white min-h-screen relative overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* BACKGROUND GLOWS */}
            <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[180px] pointer-events-none" />

            {/* HERO */}
            <section className="relative pt-44 pb-24 px-6 text-center">
                <div className="max-w-4xl mx-auto relative z-10">
                    <span className="inline-block text-green-400 text-xs font-mono uppercase tracking-[0.25em] mb-6 border border-green-400/20 bg-green-950/20 backdrop-blur-md px-5 py-2.5 rounded-full">
                        Local SEO · Nova Milanese & Brianza
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight uppercase tracking-tight">
                        Consulenza SEO a Nova Milanese:<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-yellow-400">
                            Far trovare la tua azienda
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-light">
                        Ci sono due modi in cui un&apos;azienda della Brianza trova nuovi clienti online. Il primo è pagare per farsi vedere: campagne, sponsorizzate, budget mensile. Funziona finché c&apos;è budget. Il secondo è <strong>essere già lì</strong> quando qualcuno digita esattamente il problema che risolvi.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/preventivo" className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-extrabold px-9 py-4.5 rounded-full hover:scale-105 transition-all duration-300 shadow-xl shadow-yellow-400/10">
                            Audit SEO Gratuita →
                        </Link>
                        <Link href="/servizi/seo" className="border border-white/10 bg-white/5 backdrop-blur-md text-white font-bold px-9 py-4.5 rounded-full hover:border-white/30 hover:bg-white/10 transition-all duration-300">
                            Scopri il servizio SEO
                        </Link>
                    </div>
                </div>
            </section>

            {/* RISULTATI */}
            <section className="relative py-16 border-y border-white/10 bg-white/[0.02] backdrop-blur-md z-10">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {RESULTS.map(r => (
                        <div key={r.value} className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                            <div className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-300 mb-2">{r.value}</div>
                            <div className="text-gray-400 text-sm font-medium">{r.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SEZIONE CONTENUTI A GRIGLIA */}
            <section className="py-24 px-6 max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* COLONNA SINISTRA: INTRO & CARD PRINCIPALI */}
                    <div className="lg:col-span-7 space-y-12">
                        <div>
                            <p className="text-xl text-gray-300 leading-relaxed font-light">
                                Il posizionamento sui motori di ricerca si chiama <strong>SEO (Search Engine Optimization)</strong>. Questa pagina spiega come lavoriamo sul territorio lombardo, per quali realtà ha senso investire e quando invece è più onesto sconsigliarlo.
                            </p>
                        </div>

                        {/* COSA È DAVVERO LA SEO */}
                        <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-2xl space-y-6">
                            <h2 className="text-2xl font-bold text-white tracking-tight">Cos&apos;è davvero una consulenza SEO (e cosa non è)</h2>
                            <p className="text-gray-400 leading-relaxed">
                                Una consulenza SEO non è la semplice inserzione di parole chiave nel sito. È un lavoro di tre pezzi che devono muoversi in sincrono:
                            </p>
                            
                            <div className="space-y-4">
                                {[
                                    { title: "Capire cosa cercano le persone", desc: "Analisi dei dati reali: volumi di ricerca ed intenzioni d'acquisto. Chi cerca 'consulenza SEO Nova Milanese' è già pronto a scegliere un partner." },
                                    { title: "Rendere il sito comprensibile a Google", desc: "La struttura invisibile: velocità, dati strutturati, architettura interna ed eliminazione degli errori di scansione." },
                                    { title: "Fornire le risposte migliori", desc: "Contenuti di valore scritti per le persone, che Google apprezza per la completezza e l'utilità delle informazioni." }
                                ].map((step, idx) => (
                                    <div key={idx} className="flex gap-4 p-4 rounded-xl bg-black/40 border border-white/5">
                                        <span className="w-8 h-8 rounded-full bg-green-400/10 border border-green-400/30 text-green-400 font-bold flex items-center justify-center flex-shrink-0 text-sm">
                                            {idx + 1}
                                        </span>
                                        <div>
                                            <h4 className="text-white font-bold text-base mb-1">{step.title}</h4>
                                            <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SEO LOCALE */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white tracking-tight">SEO locale: farsi trovare a Nova Milanese, Desio e Muggiò</h2>
                            <p className="text-gray-400 leading-relaxed">
                                Per un&apos;azienda con una sede sul territorio, la partita si gioca soprattutto sulle mappe. Quando qualcuno cerca un servizio da smartphone, Google mostra per primi i risultati locali geografici.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                Il bacino non è l&apos;Italia intera. Sono <strong>Nova Milanese, Desio, Muggiò, Varedo, Bovisio, Seregno, Lissone, Monza</strong>. Clienti pronti a lavorare con chi è a soli venti minuti di distanza.
                            </p>
                        </div>
                    </div>

                    {/* COLONNA DESTRA: COMPARAZIONI, PREZZI E LINK */}
                    <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
                        
                        {/* CARD PREZZI */}
                        <div className="p-8 rounded-2xl border border-yellow-400/20 bg-yellow-400/[0.02] backdrop-blur-md shadow-2xl space-y-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/10 rounded-full blur-xl pointer-events-none" />
                            <h3 className="text-xl font-bold text-white">Investimento Trasparente</h3>
                            <div className="space-y-4">
                                <div className="border-b border-white/5 pb-4">
                                    <div className="text-xs text-gray-500 uppercase tracking-wider font-mono">Audit SEO Tecnica Una Tantum</div>
                                    <div className="text-2xl font-black text-yellow-400 mt-1">€600</div>
                                    <div className="text-xs text-gray-400 mt-1">Analisi completa preliminare delle problematiche e opportunità.</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider font-mono">Ottimizzazione Mensile PMI</div>
                                    <div className="text-2xl font-black text-yellow-400 mt-1">da €900/mese</div>
                                    <div className="text-xs text-gray-400 mt-1">Presidio locale continuo, contenuti focalizzati e ottimizzazioni strutturali.</div>
                                </div>
                            </div>
                        </div>

                        {/* CASE STUDY HIGHLIGHT */}
                        <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.01] space-y-4">
                            <span className="text-xs font-mono uppercase text-green-400 tracking-wider">Caso di Successo E-commerce</span>
                            <h4 className="text-lg font-bold text-white">Yeppon.it</h4>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Strategia di SEO tecnica e architettura delle categorie di prodotto che ha portato a una crescita del <strong>+380% del traffico organico</strong> nei primi 12 mesi.
                            </p>
                        </div>

                        {/* LINK WEB DESIGN */}
                        <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
                            <h4 className="text-lg font-bold text-white">Devi creare un nuovo sito?</h4>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Se stai valutando la <Link href="/realizzazione-siti-web-nova-milanese" className="text-yellow-400 hover:underline font-semibold">realizzazione di un sito a Nova Milanese o a Desio</Link>, la SEO va pensata prima di disegnare i layout grafici per evitare costi di rifacimento.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TABELLA COMPARATIVA MULTI-CANALE */}
            <section className="py-20 px-6 max-w-5xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight uppercase">SEO, Google Ads e Social</h2>
                    <p className="text-gray-400 text-sm mt-2">Come lavorano in sinergia i canali digitali per una PMI</p>
                </div>
                
                <div className="p-1 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/[0.04]">
                                    <th className="p-5 font-bold text-white">Canale</th>
                                    <th className="p-5 font-bold text-white">A cosa serve</th>
                                    <th className="p-5 font-bold text-white">Tempi di risposta</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <tr className="hover:bg-white/[0.02] transition-colors">
                                    <td className="p-5 font-semibold text-white">
                                        <Link href="/servizi/ads" className="text-green-400 hover:underline">Google Ads</Link>
                                    </td>
                                    <td className="p-5 text-gray-300">Contatti immediati e test rapido del mercato</td>
                                    <td className="p-5 text-yellow-400 font-mono">Giorni</td>
                                </tr>
                                <tr className="hover:bg-white/[0.02] transition-colors bg-white/[0.005]">
                                    <td className="p-5 font-semibold text-white">
                                        <Link href="/servizi/seo" className="text-green-400 hover:underline">SEO</Link>
                                    </td>
                                    <td className="p-5 text-gray-300">Rendere gratuito e stabile il flusso di contatti</td>
                                    <td className="p-5 text-yellow-400 font-mono">Mesi</td>
                                </tr>
                                <tr className="hover:bg-white/[0.02] transition-colors">
                                    <td className="p-5 font-semibold text-white">
                                        <Link href="/servizi/social" className="text-green-400 hover:underline">Social</Link>
                                    </td>
                                    <td className="p-5 text-gray-300">Restare in testa a chi non ti cerca attivamente</td>
                                    <td className="p-5 text-yellow-400 font-mono">Continuo</td>
                                </tr>
                            </tbody>
                        </table>
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
                                q: 'In quanto tempo si vedono i risultati?',
                                a: 'I primi movimenti di posizione in 2–3 mesi. Contatti in modo stabile, realisticamente, dal sesto mese in avanti. Su nicchie locali poco competitive può andare più veloce; su settori affollati serve più tempo.'
                            },
                            {
                                q: 'Lavorate solo con aziende di Nova Milanese?',
                                a: 'No, seguiamo clienti in tutta la Lombardia e fuori. Ma sul territorio di Monza e Brianza abbiamo un vantaggio pratico: possiamo vederci di persona, e per il lavoro sulla SEO locale conoscere il territorio conta.'
                            },
                            {
                                q: 'Ho già un sito. Va rifatto?',
                                a: 'Nella maggior parte dei casi no. Si interviene su struttura e contenuti. Se invece il sito è costruito su una tecnologia che Google non riesce a leggere, o è lentissimo su mobile, te lo diciamo subito — ma è la minoranza dei casi.'
                            },
                            {
                                q: 'La SEO serve ancora, con le risposte generate dall\'intelligenza artificiale?',
                                a: 'Sì, e cambia forma. I sistemi di AI costruiscono le risposte partendo dalle stesse fonti che Google considera autorevoli. Il lavoro di fondo — essere la pagina che risponde meglio a una domanda — è esattamente ciò che serve per essere citati anche lì. Quello che cambia è che valgono meno i contenuti generici e di più quelli con dati, esperienza diretta e posizioni chiare.'
                            },
                            {
                                q: 'Vi occupate anche di Google Ads e social?',
                                a: 'Sì. Vedi la sezione sull\'integrazione tra canali.'
                            }
                        ].map((faq, i) => (
                            <div key={i} className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-green-400/30 transition-all duration-300">
                                <h3 className="text-white font-bold mb-3">{faq.q}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA FINALE */}
            <section className="py-28 px-6 text-center relative z-10">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-tight">
                        Parliamone
                    </h2>
                    <p className="text-gray-300 mb-6 font-light">
                        Se stai cercando una consulenza SEO a Nova Milanese o in Monza Brianza, il primo passo è capire se ha senso — e a volte la risposta è no.
                    </p>
                    <p className="text-gray-400 mb-10 text-sm">
                        Raccontaci in due righe cosa fai e cosa vorresti succedesse. Ti diciamo cosa vediamo, senza preventivo preconfezionato.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link href="/preventivo" className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-black px-10 py-5 rounded-full text-lg hover:scale-105 transition-transform shadow-xl shadow-yellow-400/20">
                            Richiedi Preventivo Gratuito
                        </Link>
                        <a href="tel:+393401204651" className="text-yellow-400 font-bold hover:underline text-lg">
                            Chiama: 340 120 4651
                        </a>
                    </div>
                    <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center text-sm text-gray-500">
                        <Link href="/" className="hover:text-yellow-400 transition-colors">
                            ← Torna alla Homepage
                        </Link>
                        <Link href="/servizi/seo" className="hover:text-yellow-400 transition-colors">
                            Servizio SEO completo →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Agenzia SEO Monza Brianza: Prima Pagina Google Garantita | W[r]Digital',
    description: 'W[r]Digital — consulenza SEO a Monza e Brianza. Audit tecnica gratuita, link building, content strategy e posizionamento Google per PMI del territorio. Risultati in 4-6 mesi.',
    alternates: {
        canonical: 'https://www.wrdigital.it/consulenza-seo-monza',
    },
    openGraph: {
        title: 'Consulenza SEO Monza Brianza | Prima Pagina Google | W[r]Digital',
        description: 'Scala la SERP con W[r]Digital. Specialisti SEO per le PMI di Monza e Brianza. Audit gratuita, metodo scientifico, risultati misurabili.',
        url: 'https://www.wrdigital.it/consulenza-seo-monza',
        locale: 'it_IT',
        type: 'website',
        images: [{ url: '/og-seo.png', width: 1200, height: 630, alt: 'SEO Monza Brianza' }],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Service",
            "name": "Consulenza SEO — Monza e Brianza",
            "description": "Servizio di ottimizzazione per i motori di ricerca (SEO) per aziende e PMI della Provincia di Monza e Brianza. Include audit tecnica, link building locale e content strategy.",
            "provider": {
                "@type": "LocalBusiness",
                "name": "W[r]Digital",
                "url": "https://www.wrdigital.it",
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
                { "@type": "City", "name": "Monza" },
                { "@type": "City", "name": "Nova Milanese" },
                { "@type": "AdministrativeArea", "name": "Provincia di Monza e della Brianza" }
            ],
            "url": "https://www.wrdigital.it/consulenza-seo-monza",
            "offers": {
                "@type": "Offer",
                "priceCurrency": "EUR",
                "price": "900.00",
                "priceValidUntil": `${new Date().getFullYear()}-12-31`,
                "availability": "https://schema.org/InStock"
            }
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Quanto costa la consulenza SEO a Monza e Brianza?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "I nostri piani SEO per PMI di Monza e Brianza partono da €900/mese. Il costo finale dipende dalla competitività del settore e dagli obiettivi. La prima audit è gratuita."
                    }
                },
                {
                    "@type": "Question",
                    "name": "In quanto tempo vedo i risultati SEO a Monza?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "I primi miglioramenti di posizionamento sono visibili in 2-3 mesi. Risultati significativi in 4-6 mesi. Per la SEO locale a Monza, con meno concorrenza rispetto a Milano, spesso i tempi si accorciano."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Fate SEO locale per attività di Monza?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sì, siamo specializzati nella SEO locale per il territorio di Monza e Brianza. Ottimizziamo Google Business Profile, costruiamo citazioni locali e creiamo contenuti geo-targetizzati per farti trovare dai clienti vicini a te."
                    }
                }
            ]
        }
    ]
};

const RESULTS = [
    { value: '+180%', label: 'Traffico organico medio in 6 mesi' },
    { value: '95%', label: 'Clienti in prima pagina Google' },
    { value: '4 mesi', label: 'Tempo medio per i primi risultati' },
    { value: '3.8x', label: 'ROI medio sulle campagne SEO' },
];

export default function SeoMonzaPage() {
    return (
        <main className="bg-black text-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* HERO */}
            <section className="relative pt-40 pb-24 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-green-400/5 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <span className="inline-block text-green-400 text-xs font-mono uppercase tracking-[0.3em] mb-6 border border-green-400/30 px-4 py-2 rounded-full">
                        SEO · Monza e Brianza
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Consulenza SEO<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-400">
                            Monza e Brianza
                        </span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        Posizionati in prima pagina su Google per le keyword della tua zona.
                        Audit tecnica gratuita, link building e content strategy per le PMI di Monza e Brianza.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/#contatti" className="bg-yellow-400 text-black font-bold px-8 py-4 rounded-full hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20">
                            Audit SEO Gratuita →
                        </Link>
                        <Link href="/servizi/seo" className="border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:border-white/40 transition-colors">
                            Scopri il servizio SEO
                        </Link>
                    </div>
                </div>
            </section>

            {/* RISULTATI */}
            <section className="py-16 border-y border-white/10">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {RESULTS.map(r => (
                        <div key={r.value}>
                            <div className="text-3xl md:text-4xl font-black text-yellow-400 mb-2">{r.value}</div>
                            <div className="text-gray-400 text-sm">{r.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* COSA OFFRIAMO */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">
                        Cosa include la consulenza SEO per Monza
                    </h2>
                    <p className="text-gray-400 text-center mb-16 max-w-xl mx-auto">
                        Un approccio completo al posizionamento organico, dall&apos;analisi tecnica alla costruzione di autorità nel territorio.
                    </p>
                    <div className="space-y-4">
                        {[
                            { title: 'Audit SEO Tecnica', desc: 'Analisi di 200+ fattori: velocità, Core Web Vitals, struttura URL, dati strutturati e profilo backlink.' },
                            { title: 'SEO Locale Monza Brianza', desc: 'Ottimizzazione Google Business Profile, citazioni NAP locali e contenuti geo-targetizzati per il territorio.' },
                            { title: 'Keyword Research Settoriale', desc: 'Identificazione delle keyword ad alto intento di acquisto nel tuo settore nella provincia di Monza.' },
                            { title: 'Link Building Territoriale', desc: 'Acquisizione backlink da siti locali, associazioni di categoria e media del territorio brianzolo.' },
                            { title: 'Content Strategy ROI', desc: 'Piano editoriale basato su dati reali per costruire topical authority nel tuo settore.' },
                            { title: 'Reporting Mensile Trasparente', desc: 'Dashboard in tempo reale con keyword posizionate, traffico organico e valore stimato dei lead acquisiti.' },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 p-6 bg-white/5 border border-white/10 rounded-xl hover:border-yellow-400/20 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center flex-shrink-0 text-yellow-400 font-bold text-sm">
                                    {i + 1}
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">{item.title}</h3>
                                    <p className="text-gray-400 text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 px-6 bg-white/2 border-y border-white/5">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-16">FAQ — SEO a Monza e Brianza</h2>
                    <div className="space-y-6">
                        {[
                            { q: 'Quanto costa la consulenza SEO a Monza?', a: 'I piani partono da €900/mese per PMI della Brianza. Il costo dipende dalla competitività del settore. La prima audit è sempre gratuita.' },
                            { q: 'In quanto tempo vedo risultati?', a: 'I primi segnali in 2-3 mesi. Risultati significativi in 4-6 mesi. Per la SEO locale nel territorio di Monza, spesso i tempi si accorciano rispetto a Milano.' },
                            { q: 'Fate anche SEO per e-commerce monzesi?', a: 'Sì, abbiamo esperienza verticale in SEO per e-commerce su Google Shopping, product schema e content strategy per categorie di prodotto.' },
                            { q: 'Come funziona la prima consulenza?', a: 'È gratuita e dura 30 minuti. Analizziamo il tuo sito, i competitor locali e ti presentiamo le opportunità concrete di crescita organica nel territorio.' },
                        ].map((faq, i) => (
                            <div key={i} className="bg-black border border-white/10 rounded-2xl p-6 hover:border-yellow-400/20 transition-colors">
                                <h3 className="text-white font-bold mb-3">{faq.q}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        Inizia a scalare Google a Monza
                    </h2>
                    <p className="text-gray-400 mb-10">Audit gratuita · Nessun impegno · Risposta in 24h</p>
                    <Link href="/#contatti" className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-black px-10 py-5 rounded-full text-lg hover:scale-105 transition-transform shadow-xl shadow-yellow-400/20">
                        Richiedi Audit SEO Gratuita
                    </Link>
                    <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center text-sm text-gray-500">
                        <Link href="/agenzia-digital-marketing-monza-brianza" className="hover:text-yellow-400 transition-colors">
                            ← Agenzia Marketing Monza Brianza
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

import { Metadata } from 'next';
import Link from 'next/link';
import comuniData from '@/data/comuni-mb.json';

export const metadata: Metadata = {
    title: 'Agenzia Digital Marketing Monza Brianza | SEO, Ads e Web | W[r]Digital',
    description: 'W[r]Digital — agenzia marketing digitale con sede a Nova Milanese, nel cuore della Brianza. SEO, Google Ads, Social Media e Web Design per PMI di Monza e Brianza. Preventivo gratuito.',
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
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "LocalBusiness",
            "@id": "https://www.wrdigital.it/#business",
            "name": "W[r]Digital — Agenzia Digital Marketing Monza Brianza",
            "url": "https://www.wrdigital.it",
            "logo": "https://www.wrdigital.it/logo.png",
            "image": "https://www.wrdigital.it/og-image.png",
            "telephone": "+393401204651",
            "email": "info@wrdigital.it",
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
                { "@type": "City", "name": "Monza" },
                { "@type": "City", "name": "Nova Milanese" },
                { "@type": "City", "name": "Desio" },
                { "@type": "City", "name": "Seregno" },
                { "@type": "City", "name": "Lissone" },
                { "@type": "City", "name": "Cesano Maderno" },
                { "@type": "City", "name": "Bovisio Masciago" },
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
            "@type": "FAQPage",
            "mainEntity": [
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
                    "name": "Quali servizi offrite alle aziende di Monza e Brianza?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Offriamo SEO locale e national, gestione Google Ads e Meta Ads, Social Media Management, realizzazione siti web e e-commerce, e consulenza strategica. Ogni servizio è calibrato sulle esigenze delle PMI del territorio."
                    }
                }
            ]
        }
    ]
};

const CITIES = [
    'Monza', 'Nova Milanese', 'Desio', 'Seregno', 'Lissone',
    'Cesano Maderno', 'Bovisio Masciago', 'Muggiò', 'Brugherio',
    'Villasanta', 'Arcore', 'Vimercate', 'Carate Brianza', 'Giussano'
];

const SERVICES = [
    { slug: 'seo', label: 'SEO & Posizionamento Google', desc: 'Prima pagina per le keyword del tuo settore nella Brianza.' },
    { slug: 'ads', label: 'Google Ads & Meta Ads', desc: 'Campagne geolocalizzate su Monza e provincia con ROAS garantito.' },
    { slug: 'social', label: 'Social Media Marketing', desc: 'Community management e contenuti per il mercato locale.' },
    { slug: 'web', label: 'Realizzazione Siti Web', desc: 'Siti veloci, mobile-first e ottimizzati SEO per le PMI brianzole.' },
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
                        📍 Nova Milanese (MB) — Brianza
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Agenzia Digital Marketing<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                            Monza e Brianza
                        </span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        Siamo l&apos;agenzia di marketing digitale di riferimento per le PMI di Monza, Nova Milanese
                        e tutta la Brianza. Strategie SEO, Ads e Web con ROI misurabile — a 5 minuti da te.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/#contatti" className="bg-yellow-400 text-black font-bold px-8 py-4 rounded-full hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20">
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
                    <p className="text-center text-gray-500 text-sm uppercase tracking-widest mb-6 font-mono">Scegli il tuo comune in provincia di Monza e Brianza</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {comuniData.map(city => (
                            <Link key={city.slug} href={`/zona/${city.slug}`} className="text-sm text-gray-300 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full hover:border-yellow-400/50 hover:text-yellow-400 hover:shadow-[0_0_15px_rgba(250,204,21,0.2)] transition-all">
                                {city.name}
                            </Link>
                        ))}
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
                        Ogni servizio è calibrato sulla realtà del mercato locale. Conosciamo il territorio, conosciamo i tuoi competitor.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {SERVICES.map(s => (
                            <Link key={s.slug} href={`/servizi/${s.slug}`} className="group p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-yellow-400/40 transition-all duration-300">
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                                    {s.label}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.desc}</p>
                                <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">Scopri il servizio →</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHY US - LOCAL */}
            <section className="py-24 px-6 bg-white/2 border-y border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-16">
                        Perché scegliere un&apos;agenzia <span className="text-yellow-400">del territorio</span>?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {[
                            { num: '5 min', label: 'dal centro di Monza', desc: 'Incontri di persona, senza perdere tempo.' },
                            { num: '50+', label: 'clienti in Brianza', desc: 'Conosciamo il mercato locale in profondità.' },
                            { num: '100%', label: 'trasparenza', desc: 'Dashboard real-time, nessuna scatola nera.' },
                        ].map(stat => (
                            <div key={stat.num} className="p-6">
                                <div className="text-4xl font-black text-yellow-400 mb-2">{stat.num}</div>
                                <div className="text-white font-bold mb-2">{stat.label}</div>
                                <div className="text-gray-500 text-sm">{stat.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-16">Domande Frequenti</h2>
                    <div className="space-y-6">
                        {[
                            {
                                q: 'Dove si trova l\'ufficio di W[r]Digital?',
                                a: 'Siamo in Via Venezia 2, Nova Milanese (MB) — a 5 minuti da Monza e facilmente raggiungibili da Seregno, Desio, Lissone e tutta la Brianza.'
                            },
                            {
                                q: 'Lavorate solo con aziende locali?',
                                a: 'No, abbiamo clienti in tutta Italia. Ma la nostra base nel cuore della Brianza ci permette di supportare le PMI locali con un livello di attenzione e prossimità unico.'
                            },
                            {
                                q: 'Offrite consulenze di persona a Monza?',
                                a: 'Sì. Siamo disponibili per incontri presso il nostro ufficio o presso la sede del cliente in tutta la Provincia di Monza e Brianza.'
                            },
                            {
                                q: 'Quanto costa il servizio SEO locale per Monza Brianza?',
                                a: 'I piani per PMI della Brianza partono da €900/mese per la SEO locale. Richiedi una valutazione gratuita e ti proporremo un piano personalizzato in base al tuo settore e ai tuoi competitor locali.'
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
                        Audit gratuita. Risposta in 24h. Nessun impegno.
                    </p>
                    <Link href="/#contatti" className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-black px-10 py-5 rounded-full text-lg hover:scale-105 transition-transform shadow-xl shadow-yellow-400/20">
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

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Social Media Marketing Monza & Brianza | W[r]Digital',
    description: 'Gestione social media per aziende di Monza e Brianza: Instagram, Facebook, LinkedIn e TikTok. Content plan, community management e advertising. Preventivo gratuito.',
    alternates: {
        canonical: 'https://www.wrdigital.it/social-media-marketing-monza',
    },
    openGraph: {
        title: 'Social Media Marketing Monza & Brianza | W[r]Digital',
        description: 'Gestione social media per aziende di Monza e Brianza: Instagram, Facebook, LinkedIn e TikTok. Content plan, community management e advertising. Preventivo gratuito.',
        url: 'https://www.wrdigital.it/social-media-marketing-monza',
        locale: 'it_IT',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Social Media Marketing Monza Brianza' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Social Media Marketing Monza & Brianza | W[r]Digital',
        description: 'Gestione social media per PMI di Monza: Instagram, Facebook, LinkedIn, TikTok. Content plan e community management.',
        images: ['/og-image.png'],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": ["LocalBusiness", "MarketingAgency"],
            "@id": "https://www.wrdigital.it/#business",
            "name": "W[r]Digital — Social Media Marketing Monza",
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
                { "@type": "ListItem", "position": 2, "name": "Social Media Marketing Monza", "item": "https://www.wrdigital.it/social-media-marketing-monza" }
            ]
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Quanto costa la gestione social media a Monza?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "I piani di gestione social media per PMI di Monza e Brianza partono da €600/mese per 1 piattaforma (12 post + community management). I piani multi-piattaforma con social advertising partono da €1.200/mese. Il primo mese include audit gratuita dei profili social esistenti."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Quali social network gestite per le aziende di Monza?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Gestiamo Instagram, Facebook, LinkedIn (B2B), TikTok, YouTube Shorts e Pinterest. Per le PMI di Monza e Brianza, la scelta delle piattaforme dipende dal target: LinkedIn per B2B manifatturiero, Instagram per retail e food, TikTok per brand con target under 35, Facebook per local marketing con community consolidata."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Producete anche i contenuti visivi o solo la gestione?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sì, offriamo un servizio completo che include la produzione di contenuti: copywriting, grafica, video e Reels. Operiamo con un team creativo interno che conosce il mercato di Monza e Brianza e sa come comunicare efficacemente al pubblico locale. Nessun utilizzo di template generici."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Come funziona il piano editoriale mensile?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Ogni mese prepariamo un piano editoriale completo con tutti i post pianificati — testi, grafica, hashtag e orari di pubblicazione — che condividiamo con il cliente per approvazione. Una volta approvato, gestiamo la pubblicazione e il community management in autonomia, con report settimanale delle metriche principali."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Gestite anche le campagne Meta Ads (Facebook e Instagram)?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sì, gestiamo campagne Meta Ads (Facebook e Instagram Ads) geolocalizzate su Monza e Brianza, con targeting avanzato per interesse, demografica e lookalike audience. Configuriamo il Pixel Meta, il tracciamento conversioni e le campagne di retargeting per massimizzare il ROI del budget pubblicitario."
                    }
                }
            ]
        }
    ]
};

const PLATFORMS = [
    { icon: '📸', name: 'Instagram', desc: 'Feed, Stories, Reels e Shopping. Ideale per retail, food, moda e servizi consumer nel territorio di Monza.' },
    { icon: '👥', name: 'Facebook', desc: 'Community, eventi locali, Facebook Ads geolocalizzati. Ancora strategico per raggiungere il pubblico adulto di Monza e Brianza.' },
    { icon: '💼', name: 'LinkedIn B2B', desc: 'Fundamental per PMI manifatturiere e B2B della Brianza. Lead generation, employer branding e content thought leadership.' },
    { icon: '🎵', name: 'TikTok', desc: 'Video brevi ad alta viralità organica. Perfetto per brand di Monza che vogliono intercettare le generazioni Z e Millennial.' },
    { icon: '▶️', name: 'YouTube Shorts', desc: 'Formati video brevi con forte distribuzione algortimica. Ideale per tutorial, dietro le quinte e branded content.' },
    { icon: '📌', name: 'Pinterest', desc: 'Piattaforma visiva con alta intent di acquisto. Strategica per artigianato, interior design, food e retail di Monza.' },
];

const SERVICE_STEPS = [
    { n: '01', title: 'Analisi competitor e audit profili', desc: 'Analizziamo i tuoi competitor social a Monza e Brianza, auditiamo i tuoi profili esistenti e identifichiamo le opportunità di crescita organica nel tuo settore.' },
    { n: '02', title: 'Strategia contenuti e tone of voice', desc: 'Definiamo la strategia editoriale, il tono di voce, i pillar dei contenuti e gli obiettivi di crescita per ciascuna piattaforma social selezionata.' },
    { n: '03', title: 'Piano editoriale mensile', desc: 'Ogni mese prepariamo un piano editoriale con tutti i contenuti pianificati — testi, visual, hashtag e call-to-action — e lo condividiamo per approvazione.' },
    { n: '04', title: 'Produzione contenuti', desc: 'Grafica professionale, copywriting, video e Reels prodotti internamente dal nostro team creativo con conoscenza del mercato locale di Monza.' },
    { n: '05', title: 'Pubblicazione e community management', desc: 'Pubblichiamo nei momenti di maggiore engagement e gestiamo i commenti, i DM e le interazioni con la community in modo tempestivo e professionale.' },
    { n: '06', title: 'Report mensile e ottimizzazione', desc: 'Report dettagliato con reach, engagement, follower growth, click e conversioni. Ogni mese ottimizziamo la strategia sulla base dei dati reali.' },
];

export default function SocialMediaMarketingMonzaPage() {
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
                        📍 Social Media · Monza e Brianza · Instagram · LinkedIn · TikTok
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Social Media Marketing Monza<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                            — Cresci online con contenuti che convertono
                        </span>
                    </h1>

                    {/* TL;DR block */}
                    <div className="bg-yellow-400/8 border-l-4 border-yellow-400 rounded-r-xl p-5 mb-8 text-left max-w-2xl mx-auto">
                        <p className="text-gray-200 leading-relaxed text-base">
                            <strong className="text-white">W[r]Digital gestisce i social media delle PMI di Monza e Brianza</strong> con
                            un approccio strategico e data-driven: piano editoriale mensile, produzione contenuti originali,
                            community management e social advertising su Instagram, Facebook, LinkedIn e TikTok.
                            Dal 2019, risultati misurabili per il mercato locale brianzolo.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/preventivo" className="bg-yellow-400 text-black font-bold px-8 py-4 rounded-full hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20">
                            Richiedi Preventivo Gratuito →
                        </Link>
                        <Link href="/agenzia-digital-marketing-monza-brianza" className="border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:border-white/40 transition-colors">
                            Scopri tutti i servizi
                        </Link>
                    </div>
                </div>
            </section>

            {/* H2: GESTIONE SOCIAL MONZA */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">
                        Gestione social media per PMI di Monza e Brianza
                    </h2>
                    <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                        Il social media marketing per le aziende di Monza non è semplicemente postare foto su Instagram.
                        È una strategia integrata che trasforma i follower in clienti attraverso contenuti rilevanti,
                        community management professionale e campagne advertising geolocalizzate.
                    </p>

                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none">
                        {PLATFORMS.map((p) => (
                            <li key={p.name} className="p-5 bg-white/5 border border-white/10 rounded-xl hover:border-yellow-400/20 transition-colors">
                                <span className="text-3xl block mb-3">{p.icon}</span>
                                <h3 className="text-white font-bold mb-2">{p.name}</h3>
                                <p className="text-gray-400 text-xs leading-relaxed">{p.desc}</p>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-12 p-6 bg-yellow-400/5 border border-yellow-400/20 rounded-2xl">
                        <p className="text-gray-300 leading-relaxed text-sm">
                            <strong className="text-white">La scelta delle piattaforme è cruciale.</strong> Non tutte le PMI di Monza e Brianza
                            devono essere presenti su tutti i social. W[r]Digital analizza il tuo target, il tuo settore e i tuoi competitor
                            locali per identificare le piattaforme con il miglior ROI per la tua azienda specifica. Un&apos;azienda manifatturiera B2B
                            della Brianza trarrà molto più valore da una presenza LinkedIn ottimizzata che da 10 post Instagram al mese.
                        </p>
                    </div>
                </div>
            </section>

            {/* H2: COSA INCLUDE */}
            <section className="py-24 px-6 bg-white/2 border-y border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">
                        Cosa include il servizio social media a Monza
                    </h2>
                    <p className="text-gray-400 text-center mb-14 max-w-xl mx-auto">
                        Un servizio completo che copre ogni aspetto della presenza social della tua azienda,
                        dalla strategia alla produzione, dalla pubblicazione al reporting.
                    </p>
                    <ol className="space-y-4 list-none">
                        {SERVICE_STEPS.map((step) => (
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

            {/* H2: SOCIAL ADS */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-8">
                        Social Ads a Monza: Meta Ads e LinkedIn Ads
                    </h2>

                    <p className="text-gray-300 leading-relaxed mb-6">
                        <strong className="text-white">Le campagne Social Ads</strong> sono lo strumento più efficace per accelerare la crescita
                        dei profili social e generare lead qualificati per le PMI di Monza e Brianza. A differenza della crescita organica,
                        che richiede tempo e costanza, l&apos;advertising sui social permette di raggiungere audience precise nel territorio
                        monzese con messaggi targettizzati, portando risultati misurabili già nelle prime settimane.
                    </p>
                    <p className="text-gray-400 leading-relaxed mb-6">
                        W[r]Digital gestisce campagne Meta Ads (Facebook e Instagram) e LinkedIn Ads per aziende di Monza e Brianza
                        con un approccio data-driven: definiamo audience personalizzate basate su interessi, dati demografici,
                        comportamenti online e lookalike audience dei tuoi migliori clienti attuali. Configuriamo il Meta Pixel
                        e le conversioni API per un tracciamento accurato, e ottimizziamo le campagne settimanalmente sulla base dei dati reali.
                    </p>
                    <p className="text-gray-400 leading-relaxed mb-10">
                        Per le aziende B2B di Monza con clienti in altri settori manifatturieri brianzoli, LinkedIn Ads rappresenta
                        lo strumento più potente: targeting per settore aziendale, dimensione dell&apos;impresa, ruolo professionale e
                        area geografica (Provincia di Monza e Brianza) permette di raggiungere i decision maker con un livello
                        di precisione impossibile su qualsiasi altra piattaforma social.
                    </p>

                    <div className="overflow-x-auto rounded-2xl border border-white/10">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/5">
                                    <th className="text-left px-6 py-4 text-gray-400 font-semibold">Piattaforma</th>
                                    <th className="px-5 py-4 text-yellow-400 font-bold text-center">Ideale per</th>
                                    <th className="px-5 py-4 text-gray-400 font-semibold text-center">Budget minimo</th>
                                    <th className="px-5 py-4 text-gray-400 font-semibold text-center">CPC medio Monza</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ['Meta Ads (Facebook)', 'Retail, food, servizi consumer', '€300/mese', '€0,30 – €1,20'],
                                    ['Instagram Ads', 'Fashion, beauty, hospitality', '€300/mese', '€0,50 – €1,50'],
                                    ['LinkedIn Ads', 'B2B manifatturiero, servizi aziendali', '€800/mese', '€3,00 – €8,00'],
                                    ['TikTok Ads', 'Brand awareness under 35', '€500/mese', '€0,20 – €0,80'],
                                ].map(([platform, ideal, budget, cpc]) => (
                                    <tr key={platform} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                                        <td className="px-6 py-3 text-gray-300 font-medium">{platform}</td>
                                        <td className="px-5 py-3 text-center text-gray-400 text-xs">{ideal}</td>
                                        <td className="px-5 py-3 text-center text-yellow-400 font-semibold">{budget}</td>
                                        <td className="px-5 py-3 text-center text-gray-400">{cpc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-gray-600 text-xs mt-4 text-center">
                        * Stime orientative basate su campagne gestite per PMI del territorio. CPC effettivo dipende da creatività, settore e targeting.
                    </p>
                </div>
            </section>

            {/* FAQ con <details><summary> */}
            <section className="py-24 px-6 bg-white/2 border-y border-white/5">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-16">
                        FAQ — Social Media Marketing Monza
                    </h2>
                    <div className="space-y-4">
                        {[
                            {
                                q: 'Quanto costa la gestione social media a Monza?',
                                a: 'I piani di gestione social media per PMI di Monza e Brianza partono da €600/mese per 1 piattaforma (inclusi 12 post + community management base). I piani multi-piattaforma con produzione contenuti avanzata e social advertising partono da €1.200/mese. Il primo mese include un\'audit gratuita dei profili social esistenti.'
                            },
                            {
                                q: 'Quali social network gestite per le aziende di Monza?',
                                a: 'Gestiamo Instagram, Facebook, LinkedIn, TikTok, YouTube Shorts e Pinterest. Per le PMI di Monza e Brianza, selezioniamo le piattaforme in base al settore e al target: LinkedIn per B2B manifatturiero, Instagram per retail e food, TikTok per brand con target under 35, Facebook per community consolidate e local marketing.'
                            },
                            {
                                q: 'Producete anche i contenuti visivi o solo la gestione?',
                                a: 'Sì, offriamo un servizio completo di produzione contenuti: copywriting professionale, grafica, video e Reels. Lavoriamo con un team creativo interno che conosce il mercato di Monza e Brianza e sa come comunicare efficacemente al pubblico locale, senza template generici o contenuti stock anonimi.'
                            },
                            {
                                q: 'Come funziona il piano editoriale mensile?',
                                a: 'Ogni mese prepariamo un piano editoriale con tutti i contenuti pianificati — testi, grafica, hashtag, call-to-action e orari di pubblicazione ottimali — e lo condividiamo con te per approvazione. Una volta approvato, gestiamo la pubblicazione e il community management in autonomia, con report settimanale delle metriche principali.'
                            },
                            {
                                q: 'Gestite anche le campagne Meta Ads e LinkedIn Ads?',
                                a: 'Sì, gestiamo campagne Meta Ads (Facebook e Instagram) e LinkedIn Ads geolocalizzate su Monza e Brianza, con targeting avanzato per interesse, demografica e lookalike audience. Configuriamo il Meta Pixel, le conversioni API e le campagne di retargeting per massimizzare il ROI del budget pubblicitario social.'
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
                        <Link href="/google-ads-monza" className="text-sm text-gray-300 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:border-yellow-400/50 hover:text-yellow-400 transition-all">
                            → Google Ads Monza
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
                        Inizia a crescere sui social a Monza
                    </h2>
                    <p className="text-gray-400 mb-10">
                        Audit gratuita dei profili · Piano editoriale personalizzato · Nessun contratto annuale
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

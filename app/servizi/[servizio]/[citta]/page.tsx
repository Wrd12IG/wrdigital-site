import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import comuniData from '@/data/comuni-mb.json';

// Statically pre-render all permutations at build time
export const dynamicParams = false;

type Comune = typeof comuniData[0];

const SERVICES_DATA = {
    'seo': {
        name: 'Consulenza SEO Locale',
        shortName: 'SEO',
        icon: '🔍',
        desc: (c: Comune) => `Posizionamento organico su Google per le aziende di ${c.name}. Raggiungi la prima pagina per le keyword del tuo settore a ${c.name} e provincia.`,
        benefits: [
            'Aumento del traffico organico qualificato',
            'Ottimizzazione Google Business Profile',
            'Ricerca keyword geolocalizzate su Monza e Brianza',
            'Risultati misurabili nel lungo termine'
        ]
    },
    'ads': {
        name: 'Campagne Google & Meta Ads',
        shortName: 'Ads',
        icon: '📈',
        desc: (c: Comune) => `Gestione professionale campagne pubblicitarie per PMI di ${c.name}. Intercetta i clienti pronti all'acquisto nel territorio della Brianza.`,
        benefits: [
            'Lead generation B2B e B2C locale',
            'Ottimizzazione budget (ROAS garantito)',
            'Campagne Google Search e Shopping',
            'Retargeting sui visitatori del sito'
        ]
    },
    'social': {
        name: 'Social Media Marketing',
        shortName: 'Social',
        icon: '📱',
        desc: (c: Comune) => `Strategie social su Instagram, Facebook e LinkedIn per attività di ${c.name}. Costruisci la tua community e aumenta la brand awareness.`,
        benefits: [
            'Gestione editoriale professionale',
            'Creazione contenuti visivi e copy',
            'Campagne Meta Ads integrate',
            'Incremento interazioni e follower reali'
        ]
    },
    'web': {
        name: 'Realizzazione Siti Web',
        shortName: 'Web',
        icon: '💻',
        desc: (c: Comune) => `Creazione siti web aziendali ed e-commerce performanti per le imprese di ${c.name}. Design premium, veloci e mobile-first.`,
        benefits: [
            'Design personalizzato e UI/UX avanzata',
            'Ottimizzazione tecnica Core Web Vitals',
            'Struttura predisposta per la SEO locale',
            'Integrazione con CRM e Analytics'
        ]
    }
};

type ServiceSlug = keyof typeof SERVICES_DATA;

function getComune(slug: string): Comune | undefined {
    return comuniData.find(c => c.slug === slug);
}

export async function generateStaticParams() {
    const params: { servizio: string; citta: string }[] = [];
    const services = Object.keys(SERVICES_DATA);
    
    comuniData.forEach(c => {
        services.forEach(s => {
            params.push({ servizio: s, citta: c.slug });
        });
    });
    
    return params;
}

export async function generateMetadata({ params }: { params: Promise<{ servizio: string, citta: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const comune = getComune(resolvedParams.citta);
    const serviceData = SERVICES_DATA[resolvedParams.servizio as ServiceSlug];
    
    if (!comune || !serviceData) return { title: 'Pagina non trovata' };

    const title = `${serviceData.name} a ${comune.name} | Agenzia W[r]Digital`;
    const description = `Servizio professionale di ${serviceData.name.toLowerCase()} per aziende e PMI di ${comune.name} (MB). Strategia data-driven, risultati misurabili. A soli ${comune.distanceKm} km.`;

    return {
        title,
        description,
        alternates: {
            canonical: `https://www.wrdigital.it/servizi/${resolvedParams.servizio}/${comune.slug}`,
        },
        openGraph: {
            title,
            description,
            url: `https://www.wrdigital.it/servizi/${resolvedParams.servizio}/${comune.slug}`,
            locale: 'it_IT',
            type: 'website',
            images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
        },
    };
}

export default async function ServizioCittaPage({ params }: { params: Promise<{ servizio: string, citta: string }> }) {
    const resolvedParams = await params;
    const comune = getComune(resolvedParams.citta);
    const serviceKey = resolvedParams.servizio as ServiceSlug;
    const serviceData = SERVICES_DATA[serviceKey];
    
    if (!comune || !serviceData) notFound();

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                "name": `${serviceData.name} a ${comune.name}`,
                "description": serviceData.desc(comune),
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
                    { "@type": "City", "name": comune.name },
                    { "@type": "AdministrativeArea", "name": "Provincia di Monza e della Brianza" }
                ],
                "url": `https://www.wrdigital.it/servizi/${serviceKey}/${comune.slug}`
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.wrdigital.it" },
                    { "@type": "ListItem", "position": 2, "name": "Servizi", "item": `https://www.wrdigital.it/servizi/${serviceKey}` },
                    { "@type": "ListItem", "position": 3, "name": comune.name, "item": `https://www.wrdigital.it/servizi/${serviceKey}/${comune.slug}` }
                ]
            }
        ]
    };

    return (
        <main className="bg-black text-white min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Breadcrumb */}
            <div className="pt-24 pb-2 px-6 max-w-5xl mx-auto">
                <nav className="text-xs text-gray-600 font-mono flex gap-2">
                    <Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/agenzia-digital-marketing-monza-brianza" className="hover:text-yellow-400 transition-colors">Zone</Link>
                    <span>/</span>
                    <Link href={`/zona/${comune.slug}`} className="hover:text-yellow-400 transition-colors">{comune.name}</Link>
                    <span>/</span>
                    <span className="text-gray-400">{serviceData.shortName}</span>
                </nav>
            </div>

            {/* HERO */}
            <section className="relative pt-16 pb-24 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/5 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <span className="inline-block text-yellow-400 text-xs font-mono uppercase tracking-[0.3em] mb-6 border border-yellow-400/30 px-4 py-2 rounded-full">
                        {serviceData.icon} Agenzia {serviceData.shortName} a {comune.name} (MB)
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        {serviceData.name.replace('a ', '')}<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                            a {comune.name}
                        </span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        {serviceData.desc(comune)} Unisciti alle aziende di {comune.name} che già collaborano con noi per dominare il mercato digitale.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/#contatti" className="bg-yellow-400 text-black font-bold px-8 py-4 rounded-full hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20">
                            Richiedi Preventivo per {comune.name}
                        </Link>
                    </div>
                </div>
            </section>

            {/* BENEFITS */}
            <section className="py-20 px-6 bg-white/2 border-y border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
                        Perché investire in {serviceData.shortName} a {comune.name}?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {serviceData.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-start gap-4 p-6 bg-black border border-white/10 rounded-2xl">
                                <span className="text-yellow-400 text-xl mt-1">✓</span>
                                <p className="text-gray-300 leading-relaxed">{benefit}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONTESTO LOCALE (Dynamic from JSON) */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-white mb-6">
                        Il tuo partner digitale a {comune.distanceKm} km da {comune.name}
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                        Lavorare con un&apos;agenzia sul territorio significa incontri di persona, zero ritardi e una conoscenza reale del tuo mercato. A {comune.name} ({comune.population.toLocaleString('it-IT')} abitanti), i settori principali sono {comune.sectors.join(', ')}. Noi sappiamo come raggiungere i tuoi clienti qui in Brianza.
                    </p>
                    <Link href={`/zona/${comune.slug}`} className="text-yellow-400 font-bold hover:text-yellow-300 transition-colors border-b border-yellow-400/30 hover:border-yellow-300 pb-1">
                        Scopri di più sui nostri servizi a {comune.name} →
                    </Link>
                </div>
            </section>

            {/* ALTRI SERVIZI */}
            <section className="py-16 px-6 bg-white/2 border-t border-white/10">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-gray-500 text-sm uppercase tracking-widest mb-8 font-mono">Altri servizi per {comune.name}</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {Object.entries(SERVICES_DATA).map(([key, data]) => {
                            if (key === serviceKey) return null;
                            return (
                                <Link key={key} href={`/servizi/${key}/${comune.slug}`} className="text-sm text-gray-300 bg-white/5 border border-white/10 px-5 py-2 rounded-full hover:border-yellow-400/40 hover:text-yellow-400 transition-colors">
                                    {data.shortName}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>
        </main>
    );
}

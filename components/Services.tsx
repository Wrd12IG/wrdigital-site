'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useModal } from './ModalContext';
import styles from './Services.module.css';

interface Service {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    features: string[];
    accent: string;
}

// Enhanced Service Data with Pillar Links
const services: (Service & { pillarText: string; pillarLink: string })[] = [
    {
        id: 'seo',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                <path d="M10 7v6m-3-3h6" />
            </svg>
        ),
        title: 'SEO & Content',
        description: 'Essere in seconda pagina su Google significa essere invisibili. Scaliamo i motori di ricerca con un approccio tecnico e contenuti ROI-oriented.',
        features: ['Audit Tecnica Profonda', 'Link Building Autorità', 'Content Strategy', 'Local SEO'],
        accent: '#00d4ff',
        pillarText: 'Vuoi sapere come dominiamo gli algoritmi? Scopri la nostra [r]icerca tecnica nella [Guida al Marketing 2026].',
        pillarLink: '/agenzia-marketing-digitale#pilastri'
    },
    {
        id: 'web',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
        ),
        title: 'Web Design',
        description: 'Un sito lento allontana i clienti. Progettiamo esperienze web ultra-veloci, moderne e ottimizzate per convertire ogni visita.',
        features: ['Mobile-First Design', 'Velocità < 2s', 'UX Conversion-Focused', 'E-Commerce'],
        accent: '#10b981',
        pillarText: 'Non è solo estetica. Leggi come progettiamo architetture ad alte performance nel nostro [Manuale Strategico].',
        pillarLink: '/agenzia-marketing-digitale#pilastri' // Linking Technical Realization
    },
    {
        id: 'social',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 2h4v4M7 22H3v-4" />
                <path d="M21 6l-9.5 9.5L8 12l-5 5" />
                <path d="M3 18l5-5 3.5 3.5L21 7" />
            </svg>
        ),
        title: 'Social Media',
        description: 'I "like" non pagano le bollette. Creiamo narrazioni visive e piani editoriali che trasformano gli utenti distratti in ambasciatori fedeli.',
        features: ['Visual Storytelling', 'Community Management', 'Social Ads', 'Influencer Marketing'],
        accent: '#7c3aed',
        pillarText: 'Oltre i Like: ecco come trasformiamo l\'attenzione in asset nel nostro [Approfondimento Strategico].',
        pillarLink: '/agenzia-marketing-digitale#pilastri'
    },
    {
        id: 'ads',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
            </svg>
        ),
        title: 'Advertising',
        description: 'Smetti di bruciare budget. Campagne PPC chirurgiche su Google e Meta dove paghi solo per risultati misurabili.',
        features: ['Google Ads', 'Meta Ads', 'Programmatic', 'Retargeting'],
        accent: '#f59e0b',
        pillarText: 'Smetti di bruciare budget. Scopri il metodo [r]eale per campagne ROI-positive.',
        pillarLink: '/agenzia-marketing-digitale'
    },
    {
        id: 'strategy',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L14 4m0 13V4" />
            </svg>
        ),
        title: 'Marketing Strategy',
        description: 'Senza una mappa, ti perdi. Trasformiamo obiettivi aziendali in piani d\'azione concreti e ROI-oriented.',
        features: ['Analisi Competitiva', 'Brand Positioning', 'Funnel Design', 'Action Plan'],
        accent: '#f43f5e',
        pillarText: 'Analisi profonda del mercato nel nostro [Manuale Strategico].',
        pillarLink: '/agenzia-marketing-digitale'
    },
];

export default function Services() {
    const router = useRouter();
    const { openContactModal } = useModal();
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    // Helper to render branded text
    const renderBrandedText = (text: string) => {
        const parts = text.split(/(\[.*?\])/);
        return parts.map((part, i) => {
            if (part.startsWith('[') && part.endsWith(']')) {
                // Check for [r] pattern
                if (part.includes('[r]')) {
                    // Simple text replacement for [r] inside []
                    const content = part.slice(1, -1).replace('[r]', '___R___');
                    // This is a bit hacky for the simple requirement. 
                    // Let's do a cleaner replacement: matches "[Guida al Marketing 2026]" or "[r]icerca"
                    // The user prompt specifically highlighted [Guida...], [Manuale...].
                    // And [r]icerca is branded.

                    // Let's just return the part as a highlighted Link if it's the link part, or branded text if it's just Branding.
                    // Actually, the user wants the WHOLE bracketed part to be the link text usually? 
                    // No, "Scopri la nostra [r]icerca tecnica nella [Guida al Marketing 2026]."
                    // The second bracket is the link anchor? Or the whole sentence?
                    // User said: Link testuale (Secondario): "Come integriamo..." (Punta al capitolo...).
                    // The visual example: "Approfondisci la nostra metodologia [r]eale." linking the whole thing.
                    // Let's simplify: Render the whole text as a link, but style the [r] parts.
                }
                return <span key={i} className="font-semibold text-yellow-400">{part.slice(1, -1)}</span>;
            }
            return part;
        });
    };

    return (
        <section id="servizi" ref={sectionRef} className={styles.section}>
            <div className={styles.container}>
                {/* Section Header */}
                <motion.div
                    className={`${styles.header} text-center mb-16`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.label}>I nostri servizi</span>
                    <h2 className={styles.title}>
                        Tutto ciò che serve <br />
                        per <span className="text-gradient">dominare online.</span>
                    </h2>
                </motion.div>

                {/* Services Grid */}
                <div className={styles.grid}>
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className={styles.card}
                            style={{ '--service-accent': service.accent, cursor: 'default' } as React.CSSProperties}
                        >
                            <motion.div
                                className="h-full w-full flex flex-col"
                                initial={{ opacity: 0, y: 40 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                            >
                                {/* Main Service Link Area */}
                                <Link href={`/servizi/${service.id}`} className="block flex-1">
                                    {/* Icon */}
                                    <div className={styles.iconWrapper}>
                                        <div className={styles.icon}>{service.icon}</div>
                                        <div className={styles.iconGlow} />
                                    </div>

                                    {/* Content */}
                                    <h3 className={styles.cardTitle}>{service.title}</h3>
                                    <p className={styles.cardDescription}>{service.description}</p>
                                </Link>

                                {/* Features */}
                                <ul className={styles.features}>
                                    {service.features.map((feature) => (
                                        <li key={feature} className={styles.feature}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Primary */}
                                <div className="relative z-10">
                                    <Link href={`/servizi/${service.id}`}>
                                        <button className={styles.cardCta}>
                                            <span>Scopri il Servizio</span>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </Link>
                                </div>

                                {/* Decorative gradient */}
                                <div className={styles.cardGradient} />

                                {/* Secondary Pillar Link */}
                                <div className="mt-6 pt-4 border-t border-white/10 text-sm text-gray-400 relative z-10">
                                    <Link href={service.pillarLink} className="hover:text-yellow-400 transition-colors duration-300">
                                        {/* We do a raw HTML replacement for [r] to match brand style if it appears in text */}
                                        <span dangerouslySetInnerHTML={{
                                            __html: service.pillarText
                                                .replace(/\[r\]/g, '<span style="color:#FACC15; font-weight:700">W[r]</span>'.replace('W', '')) // Quick hack to get the bracket style? No, let's just use simple brackets. 
                                                .replace(/\[/g, '<span style="color:#FACC15; font-weight:700">[</span><span style="color:white">')
                                                .replace(/\]/g, '</span><span style="color:#FACC15; font-weight:700">]</span>')
                                        }} />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className={styles.bottomCta}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <p className={styles.ctaText}>
                        Non sai da dove iniziare? Parliamone insieme.
                    </p>
                    <button
                        onClick={openContactModal}
                        className="btn btn-primary"
                        data-cursor="Contatti"
                    >
                        Richiedi una consulenza gratuita
                    </button>
                </motion.div>
            </div>
        </section>
    );
}

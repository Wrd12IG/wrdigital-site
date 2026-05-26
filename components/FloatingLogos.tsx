'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './FloatingLogos.module.css';

interface ClientAchievement {
    name: string;
    industry: string;
    metric: string;
    metricLabel: string;
    tag: string;
    link: string;
    svgIcon: React.ReactNode;
}

const achievements: ClientAchievement[] = [
    {
        name: 'Yeppon.it',
        industry: 'E-Commerce Tech & Consumer Electronics',
        metric: '+380%',
        metricLabel: 'Crescita Traffico Organico SEO',
        tag: 'SEO & Content Strategy',
        link: '/servizi/seo',
        svgIcon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
            </svg>
        )
    },
    {
        name: 'Brianza Serramenti',
        industry: 'Produzione & Vendita Serramenti B2C',
        metric: '2.5x',
        metricLabel: 'Tasso di Conversione contatti',
        tag: 'Local SEO & Web Design',
        link: '/servizi/web',
        svgIcon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        )
    },
    {
        name: 'Automotive Partners',
        industry: 'Concessionarie Toyota / Volkswagen / Renault',
        metric: '4x',
        metricLabel: 'ROI medio Campagne Performance',
        tag: 'Google & Meta Ads',
        link: '/servizi/ads',
        svgIcon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 001 13v3c0 .6.4 1 1 1h2" />
                <circle cx="7" cy="17" r="2" />
                <circle cx="17" cy="17" r="2" />
            </svg>
        )
    },
    {
        name: 'Brevi S.p.A.',
        industry: 'Distribuzione B2B Prodotti per l\'Infanzia',
        metric: '-40%',
        metricLabel: 'Costo di acquisizione Lead qualificate',
        tag: 'Marketing Automation',
        link: '/servizi/strategy',
        svgIcon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M12 2a14.5 14.5 0 000 20M12 2a14.5 14.5 0 010 20M2 12h20" />
            </svg>
        )
    }
];

export default function FloatingLogos({ initialClients }: { initialClients?: any } = {}) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.label}>Casi di Successo Reali</span>
                    <h2 className={styles.title}>
                        HANNO SCELTO LA CRESCITA <span className={styles.highlight}>W[r]Digital</span>
                    </h2>
                    <p className={styles.description}>
                        Smettila di contare solo le visualizzazioni. Ecco i risultati quantificabili e le performance storiche ottenute dai marchi e concessionarie che si sono affidati alla nostra direzione strategica.
                    </p>
                </div>

                <div className={styles.grid}>
                    {achievements.map((item, index) => (
                        <Link href={item.link} key={item.name} className="block no-underline">
                            <motion.div
                                className={`${styles.card} ${hoveredIndex === index ? styles.activeCard : ''}`}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                whileHover={{ y: -8 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            >
                                {/* Card Glow Spotlight */}
                                <div 
                                    className={styles.cardGlow}
                                    style={{
                                        opacity: hoveredIndex === index ? 0.15 : 0.02
                                    }}
                                />

                                {/* Badge Tag */}
                                <span className={styles.cardTag}>{item.tag}</span>

                                {/* Logo Row */}
                                <div className={styles.brandRow}>
                                    <div className={styles.brandIcon}>
                                        {item.svgIcon}
                                    </div>
                                    <div className={styles.brandMeta}>
                                        <h3 className={styles.brandName}>{item.name}</h3>
                                        <span className={styles.brandIndustry}>{item.industry}</span>
                                    </div>
                                </div>

                                {/* Big Metric Display */}
                                <div className={styles.metricBlock}>
                                    <span className={styles.metricValue}>{item.metric}</span>
                                    <span className={styles.metricLabel}>{item.metricLabel}</span>
                                </div>

                                {/* Arrow decoration */}
                                <svg className={styles.cardArrow} width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

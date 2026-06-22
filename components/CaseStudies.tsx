'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useModal } from './ModalContext';
import ScrollReveal from './ScrollReveal';
import styles from './CaseStudies.module.css';

interface Project {
    id: string;
    title: string;
    client: string;
    category: string;
    year: string;
    description: string;
    results: { label: string; value: string }[];
    tags: string[];
    image: string;
    color: string;
    showOnHome?: boolean;
    url?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
    'SEO & Content':   '#a78bfa',
    'Social Media':    '#34d399',
    'Advertising':     '#facc15',
    'Web Development': '#60a5fa',
};

const FALLBACK_PROJECTS: Project[] = [
    {
        id: 'citymotors',
        title: 'Digital Marketing 360°',
        client: 'CityMotors',
        category: 'Social Media',
        year: '2024',
        description: 'Dal brand awareness alla lead generation qualificata nel settore automotive. Meta Ads geolocalizzate e gestione social integrata.',
        results: [
            { value: '+220%', label: 'Lead qualificati' },
            { value: '5.8x',  label: 'ROAS campagne' },
        ],
        tags: ['Social Media', 'Meta Ads', 'Content', 'Automotive'],
        image: '/images/projects/citymotors.jpg',
        color: '#facc15',
        showOnHome: true,
        url: 'https://www.citymotors.it/',
    },
    {
        id: 'yeppon',
        title: 'Performance Ads E-commerce',
        client: 'Yeppon.it',
        category: 'Advertising',
        year: '2024',
        description: 'Google Ads e Shopping per uno dei principali e-commerce italiani di elettronica. 50.000+ SKU ottimizzati con Performance Max.',
        results: [
            { value: '4.2x', label: 'ROAS medio' },
            { value: '-41%', label: 'CPA vs benchmark' },
        ],
        tags: ['Google Ads', 'Shopping', 'Performance Max', 'E-commerce'],
        image: '/images/projects/yeppon.jpg',
        color: '#facc15',
        showOnHome: true,
        url: 'https://www.yeppon.it/',
    },
    {
        id: 'digitalitis',
        title: 'SEO & 6 Pillar Strategy',
        client: 'Digitalitis',
        category: 'SEO & Content',
        year: '2024',
        description: 'Audit SEO, architettura contenuti e 6 Pillar Strategy. Da zero visibilità a leader di nicchia in 8 mesi con +48 keyword in Top 3.',
        results: [
            { value: '+340%', label: 'Traffico organico' },
            { value: 'Top 3', label: '48 keyword' },
        ],
        tags: ['SEO', 'Content Strategy', 'Link Building', '6 Strategy'],
        image: '/images/projects/digitalitis.jpg',
        color: '#a78bfa',
        showOnHome: true,
        url: 'https://www.digitalitis.it/',
    },
];

export default function CaseStudies({ initialProjects }: { initialProjects?: Project[] }) {
    const { openContactModal } = useModal();
    const [projects] = useState<Project[]>(() => {
        if (initialProjects && initialProjects.length > 0) return initialProjects;
        return FALLBACK_PROJECTS;
    });
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    let displayed = projects.filter(p => p.showOnHome).slice(0, 3);
    if (displayed.length === 0) displayed = FALLBACK_PROJECTS;

    const statsRow = [
        { value: '50+',   label: 'Clienti soddisfatti' },
        { value: '+300%', label: 'Traffico medio' },
        { value: '4x',    label: 'ROAS garantito' },
    ];

    return (
        <section id="lavori" className={styles.section}>
            <div className={styles.container}>

                {/* HEADER */}
                <ScrollReveal direction="up">
                    <div className={styles.headerRow}>
                        <div className={styles.headerLeft}>
                            <span className={styles.label}>Portfolio e Risultati</span>
                            <h2 className={styles.title}>
                                STORIE DI{' '}
                                <span className={styles.titleAccent}>SUCCESSO.</span>
                            </h2>
                        </div>
                        <div className={styles.headerRight}>
                            {statsRow.map((s, i) => (
                                <div key={i} className={styles.statItem}>
                                    <span className={styles.statValue}>{s.value}</span>
                                    <span className={styles.statLabel}>{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                {/* CARDS */}
                <div className={styles.cardsGrid}>
                    {displayed.map((project, index) => {
                        const accent = CATEGORY_COLORS[project.category] || '#facc15';
                        const primary   = project.results?.[0];
                        const secondary = project.results?.[1];

                        return (
                            <ScrollReveal key={project.id} direction="up" delay={index * 0.1}>
                                <motion.article
                                    className={styles.card}
                                    style={{ '--accent': accent } as React.CSSProperties}
                                    whileHover={{ y: -6 }}
                                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                                    onClick={() => setSelectedProject(project)}
                                    aria-label={`Caso studio: ${project.client}`}
                                >
                                    {/*
                                     * ─── IMAGE CONTAINER ────────────────────────────
                                     * overflow: visible so the arrow button can sit
                                     * visually at the corner, outside the clipped image.
                                     * The image itself is inside a child with overflow:hidden.
                                     * ────────────────────────────────────────────────
                                     */}
                                    <div className={styles.imageOuter}>
                                        {/* Clipped image (overflow hidden, corners top+bot-left) */}
                                        <div className={styles.imageInner}>
                                            <Image
                                                src={project.image}
                                                alt={`Caso studio ${project.client}`}
                                                fill
                                                className={styles.cardImg}
                                                style={{ objectFit: 'cover' }}
                                                sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,400px"
                                            />
                                            {/* Gradient overlay */}
                                            <div className={styles.imgOverlay} />
                                            {/* Accent glow */}
                                            <div
                                                className={styles.imgGlow}
                                                style={{ background: `radial-gradient(ellipse at 85% 10%, ${accent}40 0%, transparent 60%)` }}
                                            />
                                        </div>

                                        {/* Arrow button — positioned at the bottom-right corner
                                            of imageOuter, on top of the card padding area.
                                            This creates the inverted-corner visual effect. */}
                                        <motion.button
                                            className={styles.arrowBtn}
                                            aria-label="Apri caso studio"
                                            whileHover={{ scale: 1.12 }}
                                            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                                            onClick={e => { e.stopPropagation(); setSelectedProject(project); }}
                                        >
                                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                                            </svg>
                                        </motion.button>
                                    </div>

                                    {/* CARD BODY */}
                                    <div className={styles.cardBody}>
                                        <span
                                            className={styles.categoryTag}
                                            style={{ color: accent, borderColor: `${accent}55`, background: `${accent}14` }}
                                        >
                                            {project.category}
                                        </span>

                                        <h3 className={styles.clientName}>{project.client}</h3>

                                        {primary && (
                                            <div className={styles.metricBlock}>
                                                <span className={styles.metricValue} style={{ color: accent }}>
                                                    {primary.value}
                                                </span>
                                                <span className={styles.metricLabel}>{primary.label}</span>
                                                {secondary && (
                                                    <span className={styles.metricSecondary}>
                                                        <span style={{ color: `${accent}cc` }}>{secondary.value}</span>
                                                        {' '}{secondary.label}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        <p className={styles.cardDesc}>{project.description}</p>
                                    </div>
                                </motion.article>
                            </ScrollReveal>
                        );
                    })}
                </div>

                {/* CTA */}
                <ScrollReveal direction="fade" delay={0.3}>
                    <div className={styles.ctaRow}>
                        <a href="/portfolio" className={styles.viewAllBtn}>
                            <span>Vedi tutti i progetti</span>
                            <svg className={styles.viewAllArrow} width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </ScrollReveal>
            </div>

            {/* MODAL */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className={styles.modalBackdrop}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            className={styles.modal}
                            role="dialog" aria-modal="true"
                            aria-label={`Caso studio: ${selectedProject.client}`}
                            initial={{ opacity: 0, scale: 0.95, y: 24 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 24 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button className={styles.closeBtn} onClick={() => setSelectedProject(null)} aria-label="Chiudi">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                            </button>
                            <div className={styles.modalImage}>
                                <Image src={selectedProject.image} alt={selectedProject.client} fill style={{ objectFit: 'cover' }} sizes="500px" priority />
                                <div className={styles.modalImageOverlay} />
                            </div>
                            <div className={styles.modalInfo}>
                                <span className={styles.modalCategory} style={{ color: CATEGORY_COLORS[selectedProject.category] || '#facc15' }}>{selectedProject.category}</span>
                                <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
                                <p className={styles.modalMeta}>{selectedProject.client} · {selectedProject.year}</p>
                                <p className={styles.modalDesc}>{selectedProject.description}</p>
                                <div className={styles.modalMetrics}>
                                    {selectedProject.results.map((r, i) => (
                                        <div key={i} className={styles.modalMetric}>
                                            <span className={styles.modalMetricValue} style={{ color: CATEGORY_COLORS[selectedProject.category] || '#facc15' }}>{r.value}</span>
                                            <span className={styles.modalMetricLabel}>{r.label}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.modalTags}>{selectedProject.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}</div>
                                <button className={styles.modalCta} onClick={() => { setSelectedProject(null); openContactModal(); }}>
                                    Richiedi Analisi Simile
                                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

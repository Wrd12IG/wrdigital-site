'use client';

import { useRef, useState } from 'react';
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
}

const CATEGORY_COLORS: Record<string, string> = {
    'SEO & Content':   '#a78bfa',
    'Social Media':    '#34d399',
    'Advertising':     '#f59e0b',
    'Web Development': '#60a5fa',
};

// Fallback projects shown when DB is empty
const FALLBACK_PROJECTS: Project[] = [
    {
        id: 'fb1',
        title: 'Dominanza SEO Locale',
        client: 'Brianza Serramenti',
        category: 'SEO & Content',
        year: '2024',
        description: 'Strategia SEO locale integrata per azienda di serramenti nel Monzese. Da invisibile a prima posizione per tutte le query locali rilevanti.',
        results: [
            { value: '+300%', label: 'Traffico organico' },
            { value: '#1', label: 'Posizione Google locale' },
        ],
        tags: ['SEO', 'Local SEO', 'Content'],
        image: '/og-image.png',
        color: '#a78bfa',
        showOnHome: true,
    },
    {
        id: 'fb2',
        title: 'Campagna Google Ads',
        client: 'Cliente Automotive',
        category: 'Advertising',
        year: '2024',
        description: 'Campagne Google Ads ottimizzate per concessionario auto con targeting geografico su Milano e Brianza.',
        results: [
            { value: '4x', label: 'ROAS medio' },
            { value: '-38%', label: 'CPA rispetto benchmark' },
        ],
        tags: ['Google Ads', 'PPC', 'Automotive'],
        image: '/og-image.png',
        color: '#f59e0b',
        showOnHome: true,
    },
    {
        id: 'fb3',
        title: 'Social Media Growth',
        client: 'E-commerce Fashion',
        category: 'Social Media',
        year: '2023',
        description: 'Strategia social media per brand fashion emergente: contenuti organici + Meta Ads.',
        results: [
            { value: '+180%', label: 'Follower organici' },
            { value: '6.2%', label: 'Engagement rate' },
        ],
        tags: ['Instagram', 'Meta Ads', 'Fashion'],
        image: '/og-image.png',
        color: '#34d399',
        showOnHome: true,
    },
    {
        id: 'fb4',
        title: 'Web App B2B',
        client: 'SaaS Gestionale',
        category: 'Web Development',
        year: '2024',
        description: 'Sviluppo web app B2B per piattaforma gestionale con dashboard dati e integrazione API.',
        results: [
            { value: '98%', label: 'Performance score' },
            { value: '2.1s', label: 'LCP medio' },
        ],
        tags: ['Next.js', 'TypeScript', 'B2B'],
        image: '/og-image.png',
        color: '#60a5fa',
        showOnHome: true,
    },
];

export default function CaseStudies({ initialProjects }: { initialProjects?: Project[] }) {
    const sectionRef = useRef<HTMLElement>(null);
    const { openContactModal } = useModal();

    const [projects] = useState<Project[]>(() => {
        if (initialProjects && initialProjects.length > 0) return initialProjects;
        return FALLBACK_PROJECTS;
    });
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    // Priority: showOnHome first, fallback one-per-category, max 4
    let displayed = projects.filter(p => p.showOnHome);
    if (displayed.length === 0) {
        const cats = ['SEO & Content', 'Social Media', 'Advertising', 'Web Development'];
        displayed = cats.map(c => projects.find(p => p.category === c)).filter(Boolean) as Project[];
    }
    displayed = displayed.slice(0, 4);

    // Aggregate stats from actual data
    const statsRow = [
        { value: '50+',   label: 'Clienti soddisfatti' },
        { value: '+300%', label: 'Traffico medio' },
        { value: '4x',    label: 'ROAS garantito' },
    ];

    // Bento layout map: card index → CSS class
    // applied to ScrollReveal (= direct grid child)
    const cellClasses = [
        styles.cellLarge,
        styles.cellSmallTop,
        styles.cellSmallBottom,
        styles.cellAccent,
    ];

    return (
        <section id="lavori" ref={sectionRef} className={styles.section}>
            <div className={styles.container}>

                {/* ── HEADER ── */}
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

                {/* ── BENTO GRID ── */}
                <div className={styles.bentoGrid}>
                    {displayed.map((project, index) => {
                        const accent = CATEGORY_COLORS[project.category] || '#facc15';
                        const primaryMetric = project.results?.[0];
                        const secondaryMetric = project.results?.[1];
                        const isHovered = hoveredId === project.id;

                        return (
                            <ScrollReveal key={project.id} direction="up" delay={index * 0.08} className={cellClasses[index] || ''}>
                                <motion.article
                                    className={styles.bentoCard}
                                    style={{ '--accent': accent } as React.CSSProperties}
                                    onClick={() => setSelectedProject(project)}
                                    onMouseEnter={() => setHoveredId(project.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    whileHover={{ y: -4 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                                    aria-label={`Caso studio: ${project.title}`}
                                >
                                    {/* Background image — subtle, always present */}
                                    <div className={styles.bgImage}>
                                        <Image
                                            src={project.image}
                                            alt=""
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            className={styles.bgImageEl}
                                            aria-hidden="true"
                                        />
                                        <div className={styles.bgOverlay} />
                                        <div
                                            className={styles.bgAccentGlow}
                                            style={{ background: `radial-gradient(ellipse at 80% 20%, ${accent}18 0%, transparent 65%)` }}
                                        />
                                    </div>

                                    {/* Content layer */}
                                    <div className={styles.bentoContent}>

                                        {/* Top row: category badge + year */}
                                        <div className={styles.bentoTop}>
                                            <span
                                                className={styles.categoryBadge}
                                                style={{ color: accent, borderColor: `${accent}40` }}
                                            >
                                                {project.category}
                                            </span>
                                            <span className={styles.yearBadge}>{project.year}</span>
                                        </div>

                                        {/* HERO METRIC — always visible, center stage */}
                                        {primaryMetric && (
                                            <div className={styles.heroMetric}>
                                                <span
                                                    className={styles.heroMetricValue}
                                                    style={{ color: accent }}
                                                >
                                                    {primaryMetric.value}
                                                </span>
                                                <span className={styles.heroMetricLabel}>
                                                    {primaryMetric.label}
                                                </span>
                                            </div>
                                        )}

                                        {/* Bottom: title + client + secondary metric */}
                                        <div className={styles.bentoBottom}>
                                            <div className={styles.bentoCopy}>
                                                <h3 className={styles.bentoTitle}>{project.title}</h3>
                                                <p className={styles.bentoClient}>{project.client}</p>
                                            </div>

                                            {/* Secondary metric chip */}
                                            {secondaryMetric && (
                                                <div className={styles.secondaryMetric}>
                                                    <span className={styles.secondaryValue} style={{ color: accent }}>
                                                        {secondaryMetric.value}
                                                    </span>
                                                    <span className={styles.secondaryLabel}>
                                                        {secondaryMetric.label}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Hover CTA pill */}
                                        <motion.div
                                            className={styles.hoverCta}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
                                            transition={{ duration: 0.2 }}
                                            aria-hidden="true"
                                        >
                                            Apri caso studio
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                                            </svg>
                                        </motion.div>
                                    </div>
                                </motion.article>
                            </ScrollReveal>
                        );
                    })}
                </div>

                {/* ── VIEW ALL CTA ── */}
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

            {/* ── PROJECT MODAL ── */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className={styles.modalBackdrop}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            className={styles.modal}
                            role="dialog"
                            aria-modal="true"
                            aria-label={`Caso studio: ${selectedProject.title}`}
                            initial={{ opacity: 0, scale: 0.95, y: 24 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 24 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                className={styles.closeBtn}
                                onClick={() => setSelectedProject(null)}
                                aria-label="Chiudi caso studio"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>

                            <div className={styles.modalImage}>
                                <Image src={selectedProject.image} alt={selectedProject.title} fill style={{ objectFit: 'cover' }} />
                                <div className={styles.modalImageOverlay} />
                            </div>

                            <div className={styles.modalInfo}>
                                <span
                                    className={styles.modalCategory}
                                    style={{ color: CATEGORY_COLORS[selectedProject.category] || '#facc15' }}
                                >
                                    {selectedProject.category}
                                </span>
                                <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
                                <p className={styles.modalMeta}>{selectedProject.client} · {selectedProject.year}</p>
                                <p className={styles.modalDesc}>{selectedProject.description}</p>

                                <div className={styles.modalMetrics}>
                                    {(Array.isArray(selectedProject.results) ? selectedProject.results : []).map((r, i) => (
                                        <div key={i} className={styles.modalMetric}>
                                            <span
                                                className={styles.modalMetricValue}
                                                style={{ color: CATEGORY_COLORS[selectedProject.category] || '#facc15' }}
                                            >
                                                {r.value}
                                            </span>
                                            <span className={styles.modalMetricLabel}>{r.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.modalTags}>
                                    {selectedProject.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                                </div>

                                <button
                                    className={styles.modalCta}
                                    onClick={() => { setSelectedProject(null); openContactModal(); }}
                                >
                                    Richiedi Analisi Simile
                                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

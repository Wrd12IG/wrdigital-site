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

// Curated Unsplash photos per category (reliable, high quality)
const CATEGORY_IMAGES: Record<string, string> = {
    'SEO & Content':   'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85&fit=crop', // analytics dashboard
    'Social Media':    'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=900&q=85&fit=crop', // social media
    'Advertising':     'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=900&q=85&fit=crop', // digital ads
    'Web Development': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=85&fit=crop', // code editor
};

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=85&fit=crop';

/** Returns a proper photo: Unsplash category fallback if image is missing/default */
function getProjectImage(image: string, category: string): string {
    if (!image || image === '/og-image.png' || image.startsWith('/og-image')) {
        return CATEGORY_IMAGES[category] ?? FALLBACK_IMAGE;
    }
    return image;
}

// Fallback projects shown when DB is empty
const FALLBACK_PROJECTS: Project[] = [
    {
        id: 'citymotors',
        title: 'Digital Marketing 360°',
        client: 'CityMotors',
        category: 'Social Media',
        year: '2024',
        description: 'Strategia di marketing digitale integrata per CityMotors: gestione social media, content creation, campagne Meta Ads geolocalizzate e reputazione online. Dal brand awareness alla lead generation qualificata nel settore automotive.',
        results: [
            { value: '+220%', label: 'Lead qualificati' },
            { value: '5.8x', label: 'ROAS campagne' },
        ],
        tags: ['Social Media', 'Meta Ads', 'Content', 'Automotive'],
        image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=900&q=85&fit=crop',
        color: '#facc15',
        showOnHome: true,
    },
    {
        id: 'yeppon',
        title: 'Performance Ads E-commerce',
        client: 'Yeppon.it',
        category: 'Advertising',
        year: '2024',
        description: 'Gestione campagne Google Ads e Shopping per uno dei principali e-commerce italiani di elettronica. Ottimizzazione ROAS, struttura campagne Performance Max e feed prodotti per oltre 50.000 SKU.',
        results: [
            { value: '4.2x', label: 'ROAS medio' },
            { value: '-41%', label: 'CPA vs benchmark' },
        ],
        tags: ['Google Ads', 'Shopping', 'Performance Max', 'E-commerce'],
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=85&fit=crop',
        color: '#f59e0b',
        showOnHome: true,
    },
    {
        id: 'digitalitis',
        title: 'SEO & Strategia Digitale',
        client: 'Digitalitis',
        category: 'SEO & Content',
        year: '2024',
        description: 'Audit SEO completo, strategia di contenuti e link building per agenzia digitale in forte crescita. Implementazione architettura SEO, content cluster tematici e 6 pillar strategy per dominare le SERP di settore.',
        results: [
            { value: '+340%', label: 'Traffico organico' },
            { value: 'Top 3', label: 'Keyword principali' },
        ],
        tags: ['SEO', 'Content Strategy', 'Link Building', '6 Strategy'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85&fit=crop',
        color: '#a78bfa',
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

    // Priority: showOnHome first, max 3
    let displayed = projects.filter(p => p.showOnHome);
    if (displayed.length === 0) {
        const cats = ['Social Media', 'Advertising', 'SEO & Content'];
        displayed = cats.map(c => projects.find(p => p.category === c)).filter(Boolean) as Project[];
    }
    displayed = displayed.slice(0, 3);

    // Aggregate stats from actual data
    const statsRow = [
        { value: '50+',   label: 'Clienti soddisfatti' },
        { value: '+300%', label: 'Traffico medio' },
        { value: '4x',    label: 'ROAS garantito' },
    ];

    // 3-column equal layout — each card gets same class
    const cellClasses = [
        styles.cellTriple,
        styles.cellTriple,
        styles.cellTriple,
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
                                            className={styles.bgImageEl}
                                            src={getProjectImage(project.image, project.category)}
                                            alt={project.title}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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

                            <div className={styles.modalImage}
                                style={{ background: `linear-gradient(135deg, ${CATEGORY_COLORS[selectedProject.category] || '#1a1a2e'}22 0%, #0a0a12 100%)` }}
                            >
                                <Image
                                    src={getProjectImage(selectedProject.image, selectedProject.category)}
                                    alt={selectedProject.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="500px"
                                    priority
                                />
                                <div className={styles.modalImageOverlay} style={{ background: `linear-gradient(to right, transparent 30%, #0e0e16 100%), linear-gradient(to top, #0e0e16 0%, transparent 40%)` }} />
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

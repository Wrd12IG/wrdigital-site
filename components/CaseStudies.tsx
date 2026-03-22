'use client';

import { useRef, useState, useEffect } from 'react';
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

// Category → accent color
const CATEGORY_COLORS: Record<string, string> = {
    'SEO & Content':  '#a78bfa',
    'Social Media':   '#34d399',
    'Advertising':    '#f59e0b',
    'Web Development':'#60a5fa',
};

export default function CaseStudies({ initialProjects }: { initialProjects?: Project[] }) {
    const sectionRef = useRef<HTMLElement>(null);
    const { openContactModal } = useModal();

    const [projects, setProjects] = useState<Project[]>(initialProjects || []);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        if (initialProjects && initialProjects.length > 0) return;
        fetch(`/api/portfolio?t=${new Date().getTime()}`)
            .then(r => r.ok ? r.json() : [])
            .then((data: Project[]) => { if (data.length > 0) setProjects(data); })
            .catch(() => {});
    }, [initialProjects]);

    // Priority logic: showOnHome first, fallback to one-per-category
    let displayed = projects.filter(p => p.showOnHome);
    if (displayed.length === 0) {
        const cats = ['SEO & Content', 'Social Media', 'Advertising', 'Web Development'];
        displayed = cats.map(c => projects.find(p => p.category === c)).filter(Boolean) as Project[];
    }
    displayed = displayed.slice(0, 4);

    // Summary stats row
    const statsRow = [
        { value: '50+',   label: 'Clienti soddisfatti' },
        { value: '+300%', label: 'Traffico medio' },
        { value: '4x',    label: 'ROI garantito' },
    ];

    return (
        <section id="lavori" ref={sectionRef} className={styles.section}>
            <div className={styles.container}>

                {/* ── HEADER: Title left · Stats right ── */}
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
                <div className={styles.grid}>
                    {displayed.map((project, index) => {
                        // Layout: 0→wide(7), 1→narrow(5), 2→narrow(5), 3→wide(7)
                        const isWide = index === 0 || index === 3;
                        const accent = CATEGORY_COLORS[project.category] || '#facc15';

                        return (
                            <ScrollReveal key={project.id} direction="up" delay={index * 0.1}>
                                <motion.article
                                    className={`${styles.card} ${isWide ? styles.cardWide : styles.cardNarrow}`}
                                    whileHover={{ y: -6, scale: 1.01 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    onClick={() => setSelectedProject(project)}
                                    style={{ '--accent': accent, '--img-scale': '1' } as React.CSSProperties}
                                >
                                    {/* Background Image */}
                                    <div className={styles.cardImg}>
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            className={styles.cardImgEl}
                                        />
                                    </div>

                                    {/* Gradient overlay */}
                                    <div className={styles.cardOverlay} />
                                    <div className={styles.cardOverlayAccent} style={{ background: `radial-gradient(ellipse at 0% 100%, ${accent}22 0%, transparent 60%)` }} />

                                    {/* Category badge */}
                                    <div className={styles.cardBadge} style={{ borderColor: `${accent}55`, color: accent }}>
                                        {project.category}
                                    </div>

                                    {/* Bottom content */}
                                    <div className={styles.cardContent}>
                                        <h3 className={styles.cardTitle}>{project.title}</h3>
                                        <p className={styles.cardClient}>{project.client} · {project.year}</p>

                                        {/* Metrics row */}
                                        <div className={styles.metrics}>
                                            {(Array.isArray(project.results) ? project.results : []).slice(0, 2).map((r, i) => (
                                                <div key={i} className={styles.metric}>
                                                    <span className={styles.metricValue} style={{ color: accent }}>{r.value}</span>
                                                    <span className={styles.metricLabel}>{r.label}</span>
                                                </div>
                                            ))}
                                            <div className={styles.metricCta}>
                                                <span>Apri caso studio</span>
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                                </svg>
                                            </div>
                                        </div>
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
                            initial={{ opacity: 0, scale: 0.95, y: 24 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 24 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button className={styles.closeBtn} onClick={() => setSelectedProject(null)} aria-label="Chiudi">✕</button>

                            <div className={styles.modalImage}>
                                <Image src={selectedProject.image} alt={selectedProject.title} fill style={{ objectFit: 'cover' }} />
                                <div className={styles.modalImageOverlay} />
                            </div>

                            <div className={styles.modalInfo}>
                                <span className={styles.modalCategory} style={{ color: CATEGORY_COLORS[selectedProject.category] || '#facc15' }}>
                                    {selectedProject.category}
                                </span>
                                <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
                                <p className={styles.modalMeta}>{selectedProject.client} · {selectedProject.year}</p>
                                <p className={styles.modalDesc}>{selectedProject.description}</p>

                                <div className={styles.modalMetrics}>
                                    {(Array.isArray(selectedProject.results) ? selectedProject.results : []).map((r, i) => (
                                        <div key={i} className={styles.modalMetric}>
                                            <span className={styles.modalMetricValue}>{r.value}</span>
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

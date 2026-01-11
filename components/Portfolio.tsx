'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useModal } from './ModalContext'; // Import Modal
import styles from './Portfolio.module.css';

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
}

// ... (interfaces remain)

export default function Portfolio() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    // State
    const [projects, setProjects] = useState<Project[]>([]); // Dynamic Data
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [filter, setFilter] = useState('Tutti');
    const { openContactModal } = useModal();

    // Fetch Data
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch(`/api/portfolio?t=${new Date().getTime()}`);
                if (res.ok) {
                    const data = await res.json();
                    setProjects(data);
                }
            } catch (e) {
                console.error("Failed to load portfolio", e);
            }
        };
        fetchProjects();
    }, []);

    const categories = ['Tutti', 'SEO & Content', 'Social Media', 'Advertising', 'Web Development'];

    const filteredProjects = filter === 'Tutti'
        ? projects
        : projects.filter(p => p.category === filter);

    // ... (UI filtering logic)

    return (
        <section id="portfolio" ref={sectionRef} className={styles.section}>
            <div className={styles.container}>
                {/* Header */}
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.label}>Il nostro lavoro</span>
                    <h2 className={styles.title}>
                        PORTFOLIO <span className="text-gradient">COMPLETO.</span>
                    </h2>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    className={styles.filters}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`${styles.filterButton} ${filter === cat ? styles.active : ''}`}
                            onClick={() => setFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <div className={styles.grid}>
                    <AnimatePresence mode="wait">
                        {filteredProjects.map((project, index) => {
                            const isWide = index % 4 === 1 || index % 4 === 2;
                            return (
                                <motion.article
                                    key={project.id}
                                    className={`${styles.projectCard} ${isWide ? styles.wide : ''}`}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    onClick={() => setSelectedProject(project)}
                                    data-cursor="Apri"
                                    style={{ '--accent-color': project.color } as React.CSSProperties}
                                >
                                    {/* Image */}
                                    <div className={styles.projectImage}>
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <div className={styles.projectOverlay}>
                                            <span className={styles.viewMore}>Visualizza Progetto</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className={styles.projectContent}>
                                        <div className={styles.projectMeta}>
                                            <span className={styles.projectCategory}>{project.category}</span>
                                            <span className={styles.projectYear}>{project.year}</span>
                                        </div>
                                        <h3 className={styles.projectTitle}>{project.title}</h3>
                                        <p className={styles.projectClient}>{project.client}</p>

                                        {/* Results Preview */}
                                        <div className={styles.resultsPreview}>
                                            {project.results.slice(0, 2).map((result, i) => (
                                                <div key={i} className={styles.resultItem}>
                                                    <span className={styles.resultValue}>{result.value}</span>
                                                    <span className={styles.resultLabel}>{result.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Project Modal */}
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
                                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    className={styles.closeButton}
                                    onClick={() => setSelectedProject(null)}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </button>

                                <div className={styles.modalContent}>
                                    <div className={styles.modalImage}>
                                        <Image
                                            src={selectedProject.image}
                                            alt={selectedProject.title}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>

                                    <div className={styles.modalInfo}>
                                        <span className={styles.modalCategory}>{selectedProject.category}</span>
                                        <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
                                        <p className={styles.modalClient}>{selectedProject.client} • {selectedProject.year}</p>
                                        <p className={styles.modalDescription}>{selectedProject.description}</p>

                                        {/* Results */}
                                        <div className={styles.modalResults}>
                                            <h4>Risultati</h4>
                                            <div className={styles.resultsGrid}>
                                                {selectedProject.results.map((result, i) => (
                                                    <div key={i} className={styles.modalResultItem}>
                                                        <span className={styles.modalResultValue}>{result.value}</span>
                                                        <span className={styles.modalResultLabel}>{result.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        <div className={styles.modalTags}>
                                            {selectedProject.tags.map((tag) => (
                                                <span key={tag} className={styles.tag}>{tag}</span>
                                            ))}
                                        </div>

                                        <button
                                            className={styles.ctaButton}
                                            onClick={() => {
                                                setSelectedProject(null); // Chiude il modal del progetto
                                                openContactModal(); // Apre il form contatti
                                            }}
                                        >
                                            <span>Richiedi Info</span>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

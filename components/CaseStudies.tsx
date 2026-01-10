'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useModal } from './ModalContext';
import styles from './CaseStudies.module.css';

// Project Interface (matching Portfolio)
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

export default function CaseStudies() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const { openContactModal } = useModal();

    // State
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Fetch Data
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('/api/portfolio');
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

    // Priority Logic: Show projects explicitly marked for Homepage. 
    // If none are marked, fallback to default categories to prevent empty section.
    let displayedProjects = projects.filter(p => p.showOnHome);

    if (displayedProjects.length === 0) {
        const categories = ['SEO & Content', 'Social Media', 'Advertising', 'Web Development'];
        displayedProjects = categories.map(cat => projects.find(p => p.category === cat)).filter(Boolean) as Project[];
    }

    // Ensure we stick to the grid layout's capacity (max 4)
    displayedProjects = displayedProjects.slice(0, 4);

    return (
        <section id="lavori" ref={sectionRef} className={styles.section}>
            <div className={styles.container}>
                {/* Section Header */}
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.label}>Portfolio e Risultati</span>
                    <h2 className={styles.title}>
                        STORIE DI <span className="text-gradient">SUCCESSO.</span>
                    </h2>
                </motion.div>

                {/* Main Layout: Bento Grid Only (Full Width) */}
                <div className={styles.mainLayout} style={{ display: 'block' }}>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-[1400px] mx-auto">
                        {displayedProjects.map((project, index) => {
                            // Logic for alternating layout:
                            // Row 1: Narrow (5) - Wide (7)
                            // Row 2: Wide (7) - Narrow (5)
                            const isWide = index === 1 || index === 2;
                            const colSpanClass = isWide ? "md:col-span-7" : "md:col-span-5";

                            return (
                                <motion.article
                                    key={project.id}
                                    className={`${styles.card} col-span-1 ${colSpanClass} min-h-[400px] relative overflow-hidden rounded-2xl group border border-white/10`}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 * index }}
                                    onClick={() => setSelectedProject(project)}
                                >
                                    {/* Project Image as Background */}
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="transition-transform duration-700 hover:scale-105"
                                    />

                                    {/* Dark Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity hover:opacity-100" />

                                    {/* Content (Absolute positioning like a card layer) */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end items-start z-10 w-full">
                                        <span
                                            className="text-xs font-bold uppercase tracking-widest mb-2 px-2 py-1 rounded bg-white/10 border border-white/10 backdrop-blur-md"
                                            style={{ color: project.color || '#fff' }}
                                        >
                                            {project.category}
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight">{project.title}</h3>
                                        <p className="text-sm text-gray-300 line-clamp-2 md:w-4/5 mb-4">{project.description}</p>

                                        {/* Results Snippet */}
                                        <div className="flex gap-6 border-t border-white/10 pt-4 w-full">
                                            {project.results.slice(0, 2).map((r, i) => (
                                                <div key={i}>
                                                    <div className="text-xl font-bold text-white leading-none">{r.value}</div>
                                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">{r.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                </div>

                {/* Project Modal (Copied/Adapted from Portfolio.tsx) */}
                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                        >
                            <motion.div
                                className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl relative"
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-white text-white hover:text-black w-10 h-10 rounded-full flex items-center justify-center transition-all border border-white/10"
                                    onClick={() => setSelectedProject(null)}
                                >
                                    ✕
                                </button>

                                {/* Modal Image Side */}
                                <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full">
                                    <Image
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent md:hidden" />
                                </div>

                                {/* Modal Infos Side */}
                                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
                                    <span className="text-purple-400 font-bold tracking-widest text-xs uppercase mb-2">{selectedProject.category}</span>
                                    <h3 className="text-3xl md:text-4xl font-black text-white mb-2">{selectedProject.title}</h3>
                                    <p className="text-sm text-gray-500 mb-6">{selectedProject.client} • {selectedProject.year}</p>

                                    <div className="prose prose-invert prose-sm mb-8 text-gray-300 leading-relaxed">
                                        {selectedProject.description}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-8 bg-white/5 p-4 rounded-xl border border-white/5">
                                        {selectedProject.results.map((result, i) => (
                                            <div key={i}>
                                                <div className="text-2xl font-bold text-white">{result.value}</div>
                                                <div className="text-xs text-gray-500 uppercase">{result.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {selectedProject.tags.map((tag) => (
                                            <span key={tag} className="text-[10px] bg-white/10 text-gray-300 px-2 py-1 rounded border border-white/5">{tag}</span>
                                        ))}
                                    </div>

                                    <button
                                        className="mt-auto w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 uppercase tracking-wide text-sm"
                                        onClick={() => {
                                            setSelectedProject(null);
                                            openContactModal();
                                        }}
                                    >
                                        Richiedi Analisi Simile
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

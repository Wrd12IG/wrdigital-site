'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Trophy, BarChart3, Rocket, X } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useModal } from './ModalContext';

interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    results: { label: string; value: string }[];
    year?: string;
    client?: string;
}

interface PortfolioPageProps {
    projects: Project[];
}

export default function PortfolioPage({ projects }: PortfolioPageProps) {
    const [filter, setFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const { openContactModal } = useModal();

    const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-500/30">
            <Navbar isDarkMode={true} />

            {/* Hero Section */}
            <section className="relative pt-48 pb-24 px-6 md:px-12 w-full overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.1),transparent_70%)] opacity-70" />
                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Work</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Progetti che lasciano il segno. Esplora come trasformiamo sfide complesse in risultati misurabili e design memorabile.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter Bar */}
            <section className="px-6 md:px-12 mb-16">
                <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border border-transparent ${filter === cat
                                ? 'bg-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.4)]'
                                : 'bg-white/5 text-gray-400 border-white/10 hover:border-yellow-500/50 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Portfolio Grid */}
            <section className="px-6 md:px-12 pb-32">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="group relative bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/10 hover:border-yellow-500/30 transition-all cursor-pointer"
                                onClick={() => setSelectedProject(project)}
                            >
                                {/* Image */}
                                <div className="relative h-[300px] w-full overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                                    <Image
                                        src={project.image || '/hero-bg.png'}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs text-white border border-white/10">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-yellow-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm line-clamp-2 mb-6">
                                        {project.description}
                                    </p>

                                    {/* Mini Results */}
                                    <div className="flex gap-4">
                                        {project.results.slice(0, 2).map((res, i) => (
                                            <div key={i} className="flex flex-col">
                                                <span className="text-yellow-500 font-bold text-lg">{res.value}</span>
                                                <span className="text-[10px] text-gray-500 uppercase tracking-wider">{res.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="absolute bottom-8 right-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                        <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black">
                                            <ArrowRight size={20} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </section>

            {/* Modal Detail */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0f0f0f] w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 shadow-2xl relative"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-6 right-6 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-white/20 transition-all"
                            >
                                <X size={24} />
                            </button>

                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                {/* Left: Image */}
                                <div className="relative h-[400px] lg:h-full min-h-[500px]">
                                    <Image
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent lg:bg-gradient-to-r" />
                                </div>

                                {/* Right: Content */}
                                <div className="p-10 lg:p-16 flex flex-col justify-center">
                                    <div className="mb-6 flex items-center gap-3">
                                        <span className="text-yellow-500 text-sm font-mono tracking-widest uppercase">{selectedProject.client || 'Cliente riservato'}</span>
                                        <div className="h-px bg-white/20 w-12" />
                                        <span className="text-gray-500 text-sm">{selectedProject.year || '2025'}</span>
                                    </div>

                                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                        {selectedProject.title}
                                    </h2>

                                    <p className="text-gray-300 text-lg leading-relaxed mb-10">
                                        {selectedProject.description}
                                    </p>

                                    {/* Results Grid */}
                                    <div className="grid grid-cols-2 gap-6 mb-12">
                                        {selectedProject.results.map((res, i) => (
                                            <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                                <div className="flex items-center gap-2 mb-2 text-yellow-500/80">
                                                    {i === 0 ? <Trophy size={18} /> : i === 1 ? <BarChart3 size={18} /> : <Rocket size={18} />}
                                                </div>
                                                <div className="text-3xl font-bold text-white mb-1">{res.value}</div>
                                                <div className="text-xs text-gray-500 uppercase tracking-wide">{res.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => {
                                            setSelectedProject(null);
                                            openContactModal();
                                        }}
                                        className="w-full bg-yellow-500 text-black font-bold py-4 rounded-xl hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
                                    >
                                        Richiedi Progetto Simile <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CTA Footer */}
            <section className="py-24 border-t border-white/10 bg-gradient-to-b from-black to-[#0a0a0a]">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Pronto a scalare?</h2>
                    <p className="text-xl text-gray-400 mb-10">
                        Ogni grande storia di successo inizia con una conversazione. Parliamo del tuo prossimo progetto.
                    </p>
                    <Link href="/preventivo" className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-all transform hover:scale-105">
                        Inizia il tuo Progetto <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            <Footer isDarkMode={true} />
        </div>
    );
}

// Add metadata here

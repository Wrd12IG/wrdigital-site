'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Contact from '@/components/Contact';

// --- ANIMATIONS ---

// Funding Matrix Rain (Golden)
function FundingRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let dpr = window.devicePixelRatio || 1;

        // State for logical dimensions
        let logicalWidth = 0;
        let logicalHeight = 0;

        // State for animation
        const fontSize = 16;
        let columns = 0;
        let drops: number[] = [];
        const chars = '€%+$2026GROWTH'.split('');

        // Init/Resize function
        const setCanvasSize = () => {
            dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();

            // Update logical dimensions for drawing
            logicalWidth = rect.width;
            logicalHeight = rect.height;

            // Update physical dimensions
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            // Scale context
            ctx.scale(dpr, dpr);

            // Re-calc columns
            const newColumns = Math.ceil(logicalWidth / fontSize);

            // Preserve existing drops if possible, extend if wider
            if (newColumns !== columns) {
                const newDrops = Array(newColumns).fill(1).map((_, i) => {
                    return drops[i] || Math.floor(Math.random() * -20); // Randomize start for new drops
                });
                drops = newDrops;
                columns = newColumns;
            }
            if (drops.length === 0) drops = Array(newColumns).fill(1); // Fallback
        };

        // Initial set
        setCanvasSize();

        const draw = () => {
            // Trail effect (using logical dimensions)
            ctx.fillStyle = 'rgba(0,0,0,0.05)';
            ctx.fillRect(0, 0, logicalWidth, logicalHeight);

            ctx.fillStyle = '#FACC15'; // Yellow
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reset drop to top randomly
                if (drops[i] * fontSize > logicalHeight && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 50);
        window.addEventListener('resize', setCanvasSize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', setCanvasSize);
        };
    }, []);

    // Canvas is now Z-Indexed between bg color and content, but specifically AFTER the blobs in DOM order
    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" style={{ width: '100%', height: '100%' }} />;
}

export default function BandoPageClient({ bando }: { bando: any }) {

    // Background parallax or other effects can be added here
    const { scrollYProgress } = useScroll();
    const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

    return (
        <main className="min-h-screen pt-24 pb-16 overflow-hidden relative">
            {/* Background Decor */}
            <div className="fixed inset-0 z-[-1] bg-black">
                {/* Blobs first (Layer 0) - will be behind the rain */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

                {/* FundingRain (Layer 1) - draws ON TOP of blobs so it's always visible */}
                <FundingRain />
            </div>

            <div className="container mx-auto px-4 relative z-10">

                {/* Breadcrumb / Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <Link href="/incentivi-2026" className="text-sm text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2">
                        ← Torna agli Incentivi
                    </Link>
                </motion.div>

                {/* HERO SECTION */}
                <section className="relative mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="inline-block px-4 py-1 mb-6 rounded-full border border-yellow-500/30 bg-yellow-500/10 backdrop-blur-md"
                    >
                        <span className="text-yellow-400 text-sm font-semibold tracking-wider uppercase">Fondi 2026 Disponibili</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-4xl md:text-6xl font-bold mb-6"
                    >
                        <span className="block text-white mb-2">{bando.title}</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600">
                            {bando.subtitle}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        {bando.description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <a href="#contact-form" className="btn btn-primary px-8 py-4 text-black font-bold rounded-lg shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 transition-all text-lg hover:scale-105 active:scale-95">
                            {bando.cta}
                        </a>
                        <Link href="/incentivi-2026" className="px-8 py-4 rounded-lg border border-white/10 hover:bg-white/5 transition-all text-white hover:border-white/20">
                            Scopri altri bandi
                        </Link>
                    </motion.div>
                </section>

                {/* KEY BENEFITS GRID (Bento Style) */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    {/* Benefit 1: Max Amount */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="glass p-8 rounded-2xl md:col-span-2 relative overflow-hidden group border border-white/5 hover:border-yellow-500/30 transition-colors"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl -mr-16 -mt-16 transition-all group-hover:bg-yellow-500/20" />
                        <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-2">Massimale di Spesa / Contributo</h3>
                        <div className="text-5xl md:text-6xl font-bold text-white mb-2 group-hover:scale-105 transition-transform origin-left">
                            {bando.max_amount}
                        </div>
                        <p className="text-yellow-400/80 font-medium">Fondi disponibili per la tua crescita</p>
                    </motion.div>

                    {/* Benefit 2: Highlight */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="glass p-8 rounded-2xl relative overflow-hidden group border border-white/5 hover:border-yellow-500/30 transition-colors"
                    >
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-transparent" />
                        <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-2">Agevolazione</h3>
                        <div className="text-3xl font-bold text-white mb-4">
                            {bando.benefit_highlight}
                        </div>
                        <motion.div
                            className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400"
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        </motion.div>
                    </motion.div>

                    {/* Benefit 3: Target */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="glass p-8 rounded-2xl md:col-span-1 relative overflow-hidden border border-white/5 hover:border-yellow-500/30 transition-colors"
                    >
                        <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-2">Destinatari</h3>
                        <div className="text-2xl font-bold text-white mb-2">
                            {bando.target}
                        </div>
                        <p className="text-sm text-gray-400">Verifica se la tua azienda rientra nei requisiti.</p>
                    </motion.div>

                    {/* Benefit 4: Categories */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="glass p-8 rounded-2xl md:col-span-2 flex flex-col justify-center border border-white/5 hover:border-yellow-500/30 transition-colors"
                    >
                        <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-4">Spese Ammissibili</h3>
                        <div className="flex flex-wrap gap-2">
                            {bando.categories.map((cat: string, i: number) => (
                                <motion.span
                                    key={i}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.4 + (i * 0.05) }}
                                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 transition-colors"
                                >
                                    {cat}
                                </motion.span>
                            ))}
                            <span className="px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm">
                                + Altro
                            </span>
                        </div>
                    </motion.div>
                </section>

                {/* ELIGIBLE EXPENSES SECTION */}
                {bando.eligible_expenses_list && (
                    <section className="mb-24 max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl font-bold text-white mb-4">Spese Ammissibili</h2>
                            <p className="text-gray-400">Ecco cosa puoi finanziare con questo bando.</p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {bando.eligible_expenses_list.map((expense: string, index: number) => {
                                // Simple parser to make **bold** text work
                                const parts = expense.split(/(\*\*.*?\*\*)/g);
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="glass p-6 rounded-xl border-l-4 border-yellow-500 flex items-start gap-4 hover:bg-white/5 transition-colors"
                                    >
                                        <div className="flex-shrink-0 mt-1 text-yellow-400">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </div>
                                        <p className="text-gray-200">
                                            {parts.map((part, i) =>
                                                part.startsWith('**') && part.endsWith('**')
                                                    ? <strong key={i} className="text-white font-semibold block mb-1 text-lg">{part.slice(2, -2)}</strong>
                                                    : <span key={i}>{part}</span>
                                            )}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* DETAILS LIST */}
                <section className="mb-24 max-w-4xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-white mb-8 text-center"
                    >
                        Dettagli del Bando
                    </motion.h2>
                    <div className="space-y-4">
                        {bando.details.map((detail: string, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-4 p-6 glass rounded-xl hover:bg-white/5 transition-colors group"
                            >
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mt-1 group-hover:scale-110 transition-transform">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <p className="text-lg text-gray-200">{detail}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CTA FORM SECTION */}
                <section id="contact-form" className="scroll-mt-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Non perdere l'opportunità</h2>
                        <p className="text-gray-400">I fondi sono limitati. Contattaci oggi per preparare la tua domanda.</p>
                    </motion.div>

                    {/* Contact Component Wrapper */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass p-8 md:p-12 rounded-3xl border border-yellow-500/20 shadow-2xl shadow-yellow-500/5"
                    >
                        <Contact />
                    </motion.div>
                </section>

            </div>
        </main>
    );
}

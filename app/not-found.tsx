'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft, Zap } from 'lucide-react';

export default function NotFound() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [glitchActive, setGlitchActive] = useState(false);

    const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 }); // Default for SSR

    const [particles, setParticles] = useState<any[]>([]);

    useEffect(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });

        // Generate particles only on client side to avoid hydration mismatch
        setParticles([...Array(20)].map(() => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            duration: Math.random() * 5 + 5,
            targetY: Math.random() * window.innerHeight
        })));

        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        // Glitch effect ogni 3 secondi
        const glitchInterval = setInterval(() => {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 200);
        }, 3000);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            clearInterval(glitchInterval);
        };
    }, []);

    const parallaxOffset = {
        x: (mousePosition.x - windowSize.width / 2) / 50,
        y: (mousePosition.y - windowSize.height / 2) / 50,
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center pt-24">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(#FACC15 1px, transparent 1px), linear-gradient(90deg, #FACC15 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                    transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`,
                }}></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map((p, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-[#FACC15] rounded-full"
                        initial={{
                            x: p.x,
                            y: p.y,
                            opacity: 0,
                        }}
                        animate={{
                            y: [null, p.targetY],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                {/* Glitch 404 */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative mb-8"
                >
                    <h1
                        className={`text-[12rem] md:text-[20rem] font-black leading-none ${glitchActive ? 'glitch' : ''}`}
                        style={{
                            background: 'linear-gradient(45deg, #FACC15, #fff, #FACC15)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: glitchActive ? '0 0 30px rgba(250, 204, 21, 0.5)' : 'none',
                        }}
                        data-text="404"
                    >
                        404
                    </h1>
                    <motion.div
                        className="absolute -top-10 -right-10 w-20 h-20"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                        <Zap size={80} className="text-[#FACC15] opacity-20" />
                    </motion.div>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-6"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Oops! <span className="text-[#FACC15]">Pagina Non Trovata</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Sembra che tu abbia trovato un glitch nella matrice digitale.
                        Questa pagina non esiste... o forse non esiste <em>ancora</em>. 🤔
                    </p>
                </motion.div>

                {/* Fun Facts */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-12 p-6 bg-white/5 border border-[#FACC15]/20 rounded-2xl backdrop-blur-sm max-w-2xl mx-auto"
                >
                    <p className="text-sm text-gray-400 mb-2">💡 <strong>Lo sapevi?</strong></p>
                    <p className="text-gray-300">
                        Nel tempo che hai impiegato a leggere questo messaggio,
                        W[r]Digital ha ottimizzato altri 3 siti web per la prima pagina di Google.
                    </p>
                </motion.div>

                {/* Quick Service Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 w-full"
                >
                    {[
                        { label: 'SEO & Content', href: '/servizi/seo', icon: '🔍' },
                        { label: 'Web Design', href: '/servizi/web', icon: '💻' },
                        { label: 'Social Media', href: '/servizi/social', icon: '📱' },
                        { label: 'Advertising', href: '/servizi/ads', icon: '📢' },
                    ].map((service) => (
                        <Link
                            key={service.label}
                            href={service.href}
                            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#FACC15] hover:bg-white/10 transition-all group"
                        >
                            <span className="text-2xl group-hover:scale-110 transition-transform">{service.icon}</span>
                            <span className="text-sm font-bold text-gray-300 group-hover:text-white">{service.label}</span>
                        </Link>
                    ))}
                </motion.div>

                {/* Primary Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 bg-[#FACC15] text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all shadow-[0_0_30px_rgba(250,204,21,0.3)] hover:shadow-[0_0_50px_rgba(250,204,21,0.5)] hover:scale-105 transform"
                    >
                        <Home size={20} />
                        Torna alla Home Page
                    </Link>
                </motion.div>

                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-8"
                >
                    <button
                        onClick={() => window.history.back()}
                        className="text-gray-400 hover:text-[#FACC15] transition-colors flex items-center gap-2 mx-auto group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Oppure torna indietro
                    </button>
                </motion.div>
            </div>

            {/* Animated Corner Accents */}
            <motion.div
                className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-[#FACC15] opacity-30"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-[#FACC15] opacity-30"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            />

            <style jsx>{`
                @keyframes glitch {
                    0% { transform: translate(0); }
                    20% { transform: translate(-2px, 2px); }
                    40% { transform: translate(-2px, -2px); }
                    60% { transform: translate(2px, 2px); }
                    80% { transform: translate(2px, -2px); }
                    100% { transform: translate(0); }
                }

                .glitch {
                    animation: glitch 0.3s infinite;
                }

                .glitch::before,
                .glitch::after {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }

                .glitch::before {
                    background: linear-gradient(45deg, #FACC15, #fff, #FACC15);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    left: 2px;
                    text-shadow: -2px 0 #ff00de;
                    animation: glitch 0.3s infinite;
                }

                .glitch::after {
                    background: linear-gradient(45deg, #FACC15, #fff, #FACC15);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    left: -2px;
                    text-shadow: -2px 0 #00fff9;
                    animation: glitch 0.3s infinite reverse;
                }
            `}</style>
        </div>
    );
}

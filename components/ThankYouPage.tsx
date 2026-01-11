'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle, ArrowRight, Video, Calendar, MapPin } from 'lucide-react';
import ReactConfetti from 'react-confetti';

export default function ThankYouPage() {
    const searchParams = useSearchParams();
    const name = searchParams.get('name') || '';
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        // Set initial size safely
        handleResize();

        window.addEventListener('resize', handleResize);

        // Stop confetti after 5 seconds
        const timer = setTimeout(() => setShowConfetti(false), 5000);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timer);
        };
    }, []);

    // Conversion tracking event (Example: Google Ads / GA4 logic)
    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'conversion', {
                'send_to': 'AW-XXXXXXXX/YYYYYYYYYY', // Replace with real ID
            });
        }
    }, []);

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-500/30 overflow-hidden">
            {showConfetti && <ReactConfetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} />}

            <Navbar isDarkMode={true} />

            <main className="relative pt-32 pb-20 px-6">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-yellow-500/10 rounded-full blur-[100px] -z-10" />

                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                        className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 mb-8 shadow-[0_0_40px_rgba(234,179,8,0.5)]"
                    >
                        <CheckCircle size={48} className="text-black" />
                    </motion.div>

                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
                    >
                        Grazie <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 capitalize">{name || 'Mille'}</span>!
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
                    >
                        Abbiamo ricevuto la tua richiesta. Il nostro team sta già analizzando il tuo progetto e ti contatterà entro <span className="text-yellow-400 font-bold">24 ore</span>.
                    </motion.p>

                    {/* What's Next Steps */}
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-16"
                    >
                        <div className="bg-[#0f0f0f] border border-white/10 p-8 rounded-3xl relative overflow-hidden group hover:border-yellow-500/30 transition-colors">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/5 rounded-bl-full" />
                            <div className="bg-white/5 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-yellow-500">
                                <Video size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">1. Analisi Preliminare</h3>
                            <p className="text-gray-400 text-sm">Studiamo la tua presenza online attuale e identifichiamo le prime opportunità di crescita.</p>
                        </div>

                        <div className="bg-[#0f0f0f] border border-white/10 p-8 rounded-3xl relative overflow-hidden group hover:border-yellow-500/30 transition-colors">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/5 rounded-bl-full" />
                            <div className="bg-white/5 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-yellow-500">
                                <Calendar size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">2. Chiamata Strategica</h3>
                            <p className="text-gray-400 text-sm">Fisseremo una call conoscitiva per approfondire i tuoi obiettivi e le tue sfide.</p>
                        </div>

                        <div className="bg-[#0f0f0f] border border-white/10 p-8 rounded-3xl relative overflow-hidden group hover:border-yellow-500/30 transition-colors">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/5 rounded-bl-full" />
                            <div className="bg-white/5 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-yellow-500">
                                <MapPin size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">3. Proposta su Misura</h3>
                            <p className="text-gray-400 text-sm">Riceverai un piano d'azione dettagliato, costruito specificamente per il tuo business.</p>
                        </div>
                    </motion.div>

                    {/* CTA Actions */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link href="/blog" className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold hover:bg-white/10 transition-all flex items-center gap-2">
                            Leggi il Blog <ArrowRight size={18} />
                        </Link>
                        <Link href="/" className="px-8 py-4 bg-yellow-500 text-black rounded-full font-bold hover:bg-yellow-400 transition-all hover:scale-105 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                            Torna alla Home
                        </Link>
                    </div>
                </div>
            </main>

            <Footer isDarkMode={true} />
        </div>
    );
}

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FileText, CheckCircle } from 'lucide-react';

export default function Sidebar() {
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleDownload = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => {
                setShowModal(false);
                setStatus('idle');
                setEmail('');
            }, 3000);
        }, 1500);
    };

    return (
        <aside className="hidden lg:block w-80 sticky top-32 space-y-8 h-fit">
            {/* LEAD MAGNET */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/50 to-black border border-purple-500/30 p-6 text-center group"
            >
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl -mr-10 -mt-10" />

                <h4 className="text-white font-bold text-lg mb-2">SCARICA IL REPORT</h4>
                <p className="text-purple-200 text-sm mb-6">
                    "SEO nel 2026: L'era dell'AI Generativa"
                </p>
                <div className="w-20 h-28 mx-auto bg-white/10 rounded mb-6 flex items-center justify-center border border-white/10 shadow-xl rotate-3 group-hover:rotate-0 transition-transform">
                    <FileText className="w-10 h-10 text-white/70" />
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="w-full py-3 bg-white text-black font-bold text-sm rounded-lg hover:bg-gray-200 transition-colors uppercase tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]"
                >
                    Download [PDF]
                </button>
            </motion.div>

            {/* TESTIMONIAL */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm"
            >
                <div className="text-yellow-500 text-4xl font-serif leading-none mb-4">"</div>
                <p className="text-gray-300 text-sm italic mb-4 leading-relaxed">
                    W[r]Digital non scrive articoli. Scrive manuali di guerra per il mercato moderno.
                </p>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs text-white">
                        N
                    </div>
                    <div>
                        <div className="text-white text-xs font-bold">Niccolò Ammaniti</div>
                        <div className="text-gray-500 text-[10px]">Autore & Scrittore</div>
                    </div>
                </div>
            </motion.div>

            {/* SOCIAL PROOF */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="flex items-center gap-4 bg-black/40 border border-white/5 p-4 rounded-xl"
            >
                <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gray-800 border-2 border-black flex items-center justify-center text-[10px] text-white">
                            {String.fromCharCode(64 + i)}
                        </div>
                    ))}
                </div>
                <div className="text-xs">
                    <strong className="text-white block">+2.218</strong>
                    <span className="text-gray-500">Iscritti alla newsletter</span>
                </div>
            </motion.div>

            {/* MODAL DOWNLOAD */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative bg-[#0F0F0F] border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 rounded-full blur-[50px] -mr-10 -mt-10 pointer-events-none" />

                            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">✕</button>

                            {status === 'success' ? (
                                <div className="text-center py-8">
                                    <div className="flex justify-center mb-4">
                                        <CheckCircle className="w-12 h-12 text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Report Inviato!</h3>
                                    <p className="text-gray-400">Controlla la tua casella di posta ({email}).<br />Il download inizierà a breve.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="text-center mb-6">
                                        <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl mb-4">
                                            <FileText className="w-6 h-6 text-white/70" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Scarica il Report 2026</h3>
                                        <p className="text-gray-400 text-sm">Inserisci la tua email lavorativa per sbloccare l'accesso al PDF completo.</p>
                                    </div>

                                    <form onSubmit={handleDownload} className="space-y-4">
                                        <div>
                                            <input
                                                type="email"
                                                required
                                                placeholder="nome@azienda.it"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-purple-500 transition-colors"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
                                        >
                                            {status === 'loading' ? 'Elaborazione...' : 'Sblocca Download [PDF]'}
                                        </button>
                                        <p className="text-[10px] text-gray-600 text-center">
                                            Rispettiamo la tua privacy. Nessuno spam.
                                        </p>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </aside>
    );
}

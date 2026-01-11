'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { useModal } from './ModalContext';
import { usePathname } from 'next/navigation';

export default function FloatingCTA() {
    const [isOpen, setIsOpen] = useState(false);
    const { openContactModal } = useModal();
    const pathname = usePathname();

    const isHiddenPath = pathname?.startsWith('/admin') || pathname?.startsWith('/area-clienti');

    const handleContact = () => {
        setIsOpen(false);
        openContactModal();
    };

    return (
        <div style={{ display: isHiddenPath ? 'none' : 'block' }}>
            {/* Always render children to maintain stable React tree, just hide parent */}

            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: isHiddenPath ? 0 : 1, opacity: isHiddenPath ? 0 : 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-6 h-6 text-black" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="message"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative"
                        >
                            <MessageCircle className="w-6 h-6 text-black" />
                            {/* Pulse animation */}
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Expanded Menu */}
            <AnimatePresence>
                {isOpen && !isHiddenPath && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="fixed bottom-24 right-6 z-50 w-80 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4">
                            <h3 className="text-lg font-bold text-black">Hai bisogno di aiuto?</h3>
                            <p className="text-sm text-black/80">Siamo qui per te!</p>
                        </div>

                        {/* Quick Actions */}
                        <div className="p-4 space-y-3">
                            <a
                                href="/preventivo"
                                className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left group border border-yellow-500/30"
                            >
                                <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center group-hover:bg-yellow-400/30 transition-colors">
                                    <Send className="w-5 h-5 text-yellow-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium text-white flex items-center gap-2">
                                        Calcola Preventivo
                                        <span className="text-[10px] bg-yellow-400 text-black px-1.5 rounded font-bold uppercase">New</span>
                                    </div>
                                    <div className="text-xs text-gray-400">Stima immediata online</div>
                                </div>
                            </a>

                            <button
                                onClick={handleContact}
                                className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left group"
                            >
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                    <MessageCircle className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium text-white">Contattaci</div>
                                    <div className="text-xs text-gray-400">Modulo rapido</div>
                                </div>
                            </button>

                            <a
                                href="https://wa.me/393401204651?text=Salve, vorrei maggiori informazioni sui servizi W[r]Digital."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left group"
                            >
                                <div className="w-10 h-10 rounded-full bg-green-400/20 flex items-center justify-center group-hover:bg-green-400/30 transition-colors">
                                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium text-white">WhatsApp</div>
                                    <div className="text-xs text-gray-400">Risposta immediata</div>
                                </div>
                            </a>

                            <a
                                href="tel:+393401204651"
                                className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left group"
                            >
                                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center group-hover:bg-blue-400/30 transition-colors">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium text-white">Chiamaci Ora</div>
                                    <div className="text-xs text-gray-400">Lun-Ven 9:00-18:00</div>
                                </div>
                            </a>

                            <a
                                href="mailto:info@wrdigital.it"
                                className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left group"
                            >
                                <div className="w-10 h-10 rounded-full bg-purple-400/20 flex items-center justify-center group-hover:bg-purple-400/30 transition-colors">
                                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium text-white">Scrivici Email</div>
                                    <div className="text-xs text-gray-400">Risposta in 24h</div>
                                </div>
                            </a>
                        </div>

                        {/* Footer */}
                        <div className="px-4 py-3 bg-white/5 border-t border-white/10">
                            <p className="text-xs text-gray-500 text-center">
                                ⚡ Risposta garantita entro 24 ore
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

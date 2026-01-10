'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useModal } from './ModalContext';

interface ServiceWidgetProps {
    className?: string;
}

const services = {
    seo: {
        title: "Strategia [r]anking",
        desc: "Scala Google con il nostro metodo tecnico.",
        link: "/servizi/seo",
        cta: "Analizza il mio sito",
        triggerId: "pilastri" // Maps to the 'ricerca' section conceptually
    },
    web: {
        title: "Sviluppo [r]esponsive",
        desc: "Siti ultra-veloci pronti per il 2026.",
        link: "/servizi/web-design",
        cta: "Richiedi preventivo",
        triggerId: "scelta" // Maps to 'Realizzazione Tecnica' or general choice
    },
    social: {
        title: "Asset [r]eali",
        desc: "Trasforma l'attenzione in fatturato.",
        link: "/servizi/social",
        cta: "Piano Editoriale",
        triggerId: "cases"
    },
    default: {
        title: "Crescita [r]eale",
        desc: "Il partner per il tuo marketing digitale.",
        link: "/contatti",
        cta: "Parla con noi",
        triggerId: "intro"
    }
};

export default function PillarServiceWidget({ className }: ServiceWidgetProps) {
    const { openContactModal } = useModal(); // Hook import
    const [activeService, setActiveService] = useState<keyof typeof services>('default');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Logic to determine active section
            const sections = ['intro', 'pilastri', 'scelta', 'cases'];
            let current = 'default';

            // Simple scroll spy
            for (const id of sections) {
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If element is in the upper half of the viewport
                    if (rect.top < window.innerHeight / 2 && rect.bottom > 0) {
                        // Map section to service
                        if (id === 'intro') current = 'default';
                        if (id === 'pilastri') current = 'seo'; // "Ricerca" is here
                        if (id === 'scelta') current = 'web'; // "Realizzazione" concept
                        if (id === 'cases') current = 'social';
                    }
                }
            }

            setActiveService(current as keyof typeof services);

            // Show widget only after scrolling past header (e.g. 500px)
            setIsVisible(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const current = services[activeService];

    // Helper for branded text
    const renderTitle = (text: string) => {
        return text.split(/(\[r\])/).map((part, i) =>
            part === '[r]'
                ? <span key={i} style={{ color: '#FACC15' }}>[r]</span>
                : part
        );
    };



    return (
        <motion.div
            // ... (props)
            className={className}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            style={{
                background: '#111',
                border: '1px solid #333',
                borderRadius: '8px',
                padding: '1.5rem',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                width: '100%',
                maxWidth: '300px'
            }}
        >
            {/* ... (header and title parts identical to before) */}
            <div style={{
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                color: '#666',
                marginBottom: '1rem',
                borderBottom: '1px solid #333',
                paddingBottom: '0.5rem',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <span>SERVIZIO CORRELATO</span>
                <span style={{ color: '#FACC15' }}>●</span>
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>
                {renderTitle(current.title)}
            </h3>

            <p style={{ fontSize: '0.9rem', color: '#999', marginBottom: '1.5rem', lineHeight: '1.4' }}>
                {current.desc}
            </p>

            {/* Conditional Rendering for Link vs Button */}
            {activeService === 'default' ? (
                <button
                    onClick={openContactModal}
                    className="btn-primary hover:bg-gray-200 transition-colors"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        fontSize: '0.85rem',
                        padding: '0.75rem',
                        background: '#fff',
                        color: '#000',
                        fontWeight: 700,
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                        cursor: 'pointer'
                    }}
                >
                    [{current.cta}]
                </button>
            ) : (
                <Link href={current.link} className="btn-primary hover:bg-gray-200 transition-colors" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    fontSize: '0.85rem',
                    padding: '0.75rem',
                    background: '#fff',
                    color: '#000',
                    fontWeight: 700,
                    borderRadius: '4px',
                    textTransform: 'uppercase'
                }}>
                    [{current.cta}]
                </Link>
            )}

            <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#555', textAlign: 'center' }}>
                Rating: ★★★★★ (42+ Aziende)
            </div>
        </motion.div>
    );
}

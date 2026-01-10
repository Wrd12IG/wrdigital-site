'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import styles from './CookieBanner.module.css';
import { Cookie } from 'lucide-react';

interface CookieConsent {
    necessary: boolean;
    statistics: boolean;
    marketing: boolean;
    timestamp: string;
}

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);
    const [consent, setConsent] = useState({
        statistics: false,
        marketing: false
    });

    useEffect(() => {
        // Check local storage
        const savedConsent = localStorage.getItem('wrdigital-cookie-consent');
        if (!savedConsent) {
            // Show banner after short delay
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        } else {
            // Load saved preferences
            try {
                const parsed = JSON.parse(savedConsent);
                setConsent({
                    statistics: parsed.statistics || false,
                    marketing: parsed.marketing || false
                });
            } catch (e) {
                // Invalid JSON, reset
            }
        }

        // Custom event listener to re-open settings
        const handleOpenSettings = () => {
            setIsVisible(true);
            setShowPreferences(true);
        };

        window.addEventListener('openCookieSettings', handleOpenSettings);
        return () => window.removeEventListener('openCookieSettings', handleOpenSettings);
    }, []);

    const handleAcceptAll = () => {
        const newConsent: CookieConsent = {
            necessary: true,
            statistics: true,
            marketing: true,
            timestamp: new Date().toISOString()
        };
        saveConsent(newConsent);
    };

    const handleRejectAll = () => {
        const newConsent: CookieConsent = {
            necessary: true,
            statistics: false,
            marketing: false,
            timestamp: new Date().toISOString()
        };
        saveConsent(newConsent);
    };

    const handleSavePreferences = () => {
        const newConsent: CookieConsent = {
            necessary: true,
            statistics: consent.statistics,
            marketing: consent.marketing,
            timestamp: new Date().toISOString()
        };
        saveConsent(newConsent);
    };

    const saveConsent = (consentData: CookieConsent) => {
        localStorage.setItem('wrdigital-cookie-consent', JSON.stringify(consentData));
        setConsent({
            statistics: consentData.statistics,
            marketing: consentData.marketing
        });
        setIsVisible(false);
        setShowPreferences(false);

        // Notify other components (e.g. GoogleAnalytics)
        window.dispatchEvent(new Event('cookie-consent-update'));
    };

    const togglePreference = (key: 'statistics' | 'marketing') => {
        setConsent(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Overlay for Modal Mode */}
                    {showPreferences && (
                        <motion.div
                            className={styles.overlay}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsVisible(false)}
                        />
                    )}

                    <motion.div
                        layout
                        className={`${styles.banner} ${showPreferences ? styles.modal : ''}`}
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        role="dialog"
                        aria-modal="true"
                    >
                        {/* Header */}
                        <div className={styles.header}>
                            <div className={styles.title}>
                                {showPreferences ? 'Gestisci Consenso' : <><Cookie className="w-5 h-5 inline-block mr-2" /> Cookie & Privacy</>}
                            </div>
                            {showPreferences && (
                                <button className={styles.closeButton} onClick={() => setIsVisible(false)}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {/* Content */}
                        {!showPreferences ? (
                            // Simple View
                            <>
                                <div className={styles.content}>
                                    Utilizziamo cookie per migliorare la tua esperienza e analizzare il traffico.
                                    Puoi decidere quali cookie accettare. Leggi la nostra <Link href="/cookie-policy" className={styles.link}>Cookie Policy</Link>.
                                </div>
                                <div className={styles.actions}>
                                    <div className={styles.rowButtons}>
                                        <button onClick={handleAcceptAll} className={styles.btnPrimary}>Accetta</button>
                                        <button onClick={handleRejectAll} className={styles.btnSecondary}>Nega</button>
                                    </div>
                                    <button onClick={() => setShowPreferences(true)} className={styles.btnOutline}>
                                        Visualizza le preferenze
                                    </button>
                                </div>
                            </>
                        ) : (
                            // Preferences View
                            <>
                                <div className={styles.content}>
                                    Gestisci le tue preferenze sui cookie. I cookie necessari sono sempre attivi per il funzionamento del sito.
                                </div>

                                <div className={styles.preferencesList}>
                                    {/* Funzionale (Always On) */}
                                    <div className={styles.preferenceItem}>
                                        <div className={styles.preferenceHeader}>
                                            <span className={styles.preferenceLabel}>Funzionale</span>
                                            <span className={styles.preferenceStatus}>Sempre attivo</span>
                                        </div>
                                        <div className={styles.preferenceDescription}>Necessari per il funzionamento base del sito.</div>
                                    </div>

                                    {/* Statistiche */}
                                    <div className={styles.preferenceItem}>
                                        <div className={styles.preferenceHeader}>
                                            <span className={styles.preferenceLabel}>Statistiche</span>
                                            <label className={styles.toggle}>
                                                <input
                                                    type="checkbox"
                                                    checked={consent.statistics}
                                                    onChange={() => togglePreference('statistics')}
                                                />
                                                <span className={styles.slider}></span>
                                            </label>
                                        </div>
                                        <div className={styles.preferenceDescription}>Ci aiutano a capire come gli utenti interagiscono col sito.</div>
                                    </div>

                                    {/* Marketing */}
                                    <div className={styles.preferenceItem}>
                                        <div className={styles.preferenceHeader}>
                                            <span className={styles.preferenceLabel}>Marketing</span>
                                            <label className={styles.toggle}>
                                                <input
                                                    type="checkbox"
                                                    checked={consent.marketing}
                                                    onChange={() => togglePreference('marketing')}
                                                />
                                                <span className={styles.slider}></span>
                                            </label>
                                        </div>
                                        <div className={styles.preferenceDescription}>Utilizzati per inviare pubblicità mirata.</div>
                                    </div>
                                </div>

                                <div className={styles.actions}>
                                    <div className={styles.rowButtons}>
                                        <button onClick={handleSavePreferences} className={styles.btnSecondary}>Salva Preferenze</button>
                                        <button onClick={handleAcceptAll} className={styles.btnPrimary}>Accetta Tutti</button>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

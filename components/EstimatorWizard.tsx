'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from './ToastContext';
import styles from './EstimatorWizard.module.css';
import {
    CheckCircle,
    Facebook,
    Instagram,
    Linkedin,
    Twitter,
    Youtube,
    Music, // For TikTok
    Rocket,
    Globe,
    BarChart,
    Search,
    Coins,
    Briefcase,
    Target
} from 'lucide-react';

type Step = 'goal' | 'service' | 'socials' | 'budget' | 'details' | 'success';

interface FormData {
    goal: string;
    services: string[];
    budget: string;
    name: string;
    email: string;
    company: string;
    website: string;
    socials: string[];
    privacy: boolean;
}

const socialOptions = [
    { id: 'instagram', label: 'Instagram', icon: <Instagram size={18} /> },
    { id: 'facebook', label: 'Facebook', icon: <Facebook size={18} /> },
    { id: 'linkedin', label: 'LinkedIn', icon: <Linkedin size={18} /> },
    { id: 'tiktok', label: 'TikTok', icon: <Music size={18} /> },
    { id: 'youtube', label: 'YouTube', icon: <Youtube size={18} /> },
    { id: 'twitter', label: 'Twitter/X', icon: <Twitter size={18} /> }
];

const goals = [
    { id: 'sales', label: 'Aumentare le Vendite', desc: 'Voglio più clienti e fatturato', icon: <Rocket /> },
    { id: 'brand', label: 'Brand Awareness', desc: 'Voglio far conoscere il mio brand', icon: <Globe /> },
    { id: 'leads', label: 'Generare Lead', desc: 'Voglio più contatti qualificati', icon: <Target /> },
    { id: 'optimize', label: 'Ottimizzazione', desc: 'Voglio migliorare i processi attuali', icon: <BarChart /> }
];

const services = [
    { id: 'seo', label: 'SEO & Content', desc: 'Posizionamento su Google', icon: <Search /> },
    { id: 'ads', label: 'Advertising', desc: 'Google, Meta & LinkedIn Ads', icon: <Coins /> },
    { id: 'social', label: 'Social Media', desc: 'Gestione profili e community', icon: <Briefcase /> },
    { id: 'web', label: 'Web Design', desc: 'Siti web e E-commerce', icon: <Globe /> }
];

const budgets = [
    { id: 'small', label: '< €1.000', desc: 'Budget iniziale' },
    { id: 'medium', label: '€1.000 - €3.000', desc: 'Crescita costante' },
    { id: 'large', label: '€3.000 - €5.000', desc: 'Scaling aggressivo' },
    { id: 'enterprise', label: '> €5.000', desc: 'Partnership completa' }
];

export default function EstimatorWizard() {
    const { addToast } = useToast();
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [data, setData] = useState<FormData>({
        goal: '',
        services: [],
        budget: '',
        name: '',
        email: '',
        company: '',
        website: '',
        socials: [],
        privacy: false
    });

    const getVisibleSteps = () => {
        const s = [{ id: 0, label: 'Obiettivo' }, { id: 1, label: 'Servizi' }];
        if (data.services.includes('social')) s.push({ id: 2, label: 'Canali Social' });
        s.push({ id: 3, label: 'Budget' }, { id: 4, label: 'Contatti' });
        return s;
    };

    const visibleSteps = getVisibleSteps();
    const currentIdx = visibleSteps.findIndex(s => s.id === currentStep);
    const progress = ((currentIdx + 1) / visibleSteps.length) * 100;

    const handleNext = () => {
        if (currentStep === 0 && !data.goal) return addToast('Seleziona un obiettivo', 'error');
        if (currentStep === 1 && data.services.length === 0) return addToast('Seleziona almeno un servizio', 'error');

        // Skip social step if not selected
        if (currentStep === 1 && !data.services.includes('social')) {
            setCurrentStep(3);
            return;
        }

        if (currentStep === 2 && data.services.includes('social') && data.socials.length === 0) {
            return addToast('Seleziona almeno un social', 'error');
        }

        if (currentStep === 3 && !data.budget) return addToast('Seleziona un budget', 'error');

        setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        if (currentStep === 3 && !data.services.includes('social')) {
            setCurrentStep(1);
        } else {
            setCurrentStep(prev => prev - 1);
        }
    };

    const toggleService = (id: string) => {
        setData(prev => {
            const exists = prev.services.includes(id);
            return {
                ...prev,
                services: exists
                    ? prev.services.filter(s => s !== id)
                    : [...prev.services, id]
            };
        });
    };

    const toggleSocial = (id: string) => {
        setData(prev => {
            const exists = prev.socials.includes(id);
            return {
                ...prev,
                socials: exists
                    ? prev.socials.filter(s => s !== id)
                    : [...prev.socials, id]
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.privacy) return addToast('Devi accettare la privacy policy', 'error');

        setIsSubmitting(true);

        const messageText = `
RICHIESTA PREVENTIVO WIZARD
---------------------------
Obiettivo: ${goals.find(g => g.id === data.goal)?.label}
Servizi: ${data.services.map(s => services.find(srv => srv.id === s)?.label).join(', ')}
Budget: ${budgets.find(b => b.id === data.budget)?.label}
Sito Web: ${data.website || 'Non specificato'}
Social: ${data.socials.length > 0 ? data.socials.join(', ') : 'Nessuno selezionato'}
        `.trim();

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    company: data.company,
                    service: 'preventivo',
                    message: messageText,
                    privacyAccepted: true
                })
            });

            if (res.ok) {
                setCurrentStep(5);
                addToast('Richiesta inviata con successo!', 'success');
            } else {
                const responseData = await res.json();
                throw new Error(responseData.error);
            }
        } catch (error) {
            addToast("Errore durante l'invio. Riprova.", 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className={styles.optionsGrid}>
                        {goals.map(goal => (
                            <div
                                key={goal.id}
                                className={`${styles.optionCard} ${data.goal === goal.id ? styles.selected : ''}`}
                                onClick={() => setData({ ...data, goal: goal.id })}
                            >
                                <div className={styles.optionIcon}>{goal.icon}</div>
                                <div className={styles.optionLabel}>{goal.label}</div>
                                <div className={styles.optionDescription}>{goal.desc}</div>
                            </div>
                        ))}
                    </div>
                );
            case 1:
                return (
                    <div className="space-y-6">
                        <div className={styles.optionsGrid}>
                            {services.map(service => (
                                <div
                                    key={service.id}
                                    className={`${styles.optionCard} ${data.services.includes(service.id) ? styles.selected : ''}`}
                                    onClick={() => toggleService(service.id)}
                                >
                                    <div className={styles.optionIcon}>{service.icon}</div>
                                    <div className={styles.optionLabel}>{service.label}</div>
                                    <div className={styles.optionDescription}>{service.desc}</div>
                                </div>
                            ))}
                        </div>
                        <div className="pt-4 border-t border-white/5">
                            <label className="text-[10px] text-gray-500 uppercase font-bold mb-2 block">Hai già un sito web? (Opzionale)</label>
                            <input
                                type="url"
                                placeholder="https://tuosito.it"
                                className={styles.input}
                                value={data.website}
                                onChange={e => setData({ ...data, website: e.target.value })}
                            />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="flex flex-col gap-6">
                        <div className="text-center mb-4">
                            <h3 className="text-xl font-bold text-white">Quali canali social utilizzi?</h3>
                            <p className="text-gray-400 text-sm">Seleziona quelli su cui vuoi attivare i nostri servizi</p>
                        </div>
                        <div className={styles.socialGrid}>
                            {socialOptions.map(social => (
                                <div
                                    key={social.id}
                                    className={`${styles.socialOption} ${data.socials.includes(social.id) ? styles.selected : ''}`}
                                    onClick={() => toggleSocial(social.id)}
                                >
                                    {social.icon}
                                    <span>{social.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className={styles.optionsGrid}>
                        {budgets.map(budget => (
                            <div
                                key={budget.id}
                                className={`${styles.optionCard} ${data.budget === budget.id ? styles.selected : ''}`}
                                onClick={() => setData({ ...data, budget: budget.id })}
                            >
                                <div className={styles.optionIcon}><Coins /></div>
                                <div className={styles.optionLabel}>{budget.label}</div>
                                <div className={styles.optionDescription}>{budget.desc}</div>
                            </div>
                        ))}
                    </div>
                );
            case 4:
                return (
                    <div className="flex flex-col gap-4">
                        <div className={styles.summary}>
                            <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Riepilogo</h3>
                            <div className={styles.summaryRow}>
                                <span className={styles.summaryLabel}>Obiettivo</span>
                                <span className={styles.summaryValue}>{goals.find(g => g.id === data.goal)?.label}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span className={styles.summaryLabel}>Servizi</span>
                                <span className={styles.summaryValue}>{data.services.map(s => services.find(srv => srv.id === s)?.label).join(', ')}</span>
                            </div>
                            {data.socials.length > 0 && (
                                <div className={styles.summaryRow}>
                                    <span className={styles.summaryLabel}>Social</span>
                                    <span className={styles.summaryValue}>{data.socials.join(', ')}</span>
                                </div>
                            )}
                            {data.website && (
                                <div className={styles.summaryRow}>
                                    <span className={styles.summaryLabel}>Sito Web</span>
                                    <span className={styles.summaryValue}>{data.website}</span>
                                </div>
                            )}
                            <div className={styles.summaryRow}>
                                <span className={styles.summaryLabel}>Budget</span>
                                <span className={styles.summaryValue}>{budgets.find(b => b.id === data.budget)?.label}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Nome e Cognome *"
                                className={styles.input}
                                value={data.name}
                                onChange={e => setData({ ...data, name: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Azienda"
                                className={styles.input}
                                value={data.company}
                                onChange={e => setData({ ...data, company: e.target.value })}
                            />
                            <input
                                type="email"
                                placeholder="Email Aziendale *"
                                className={styles.input}
                                value={data.email}
                                onChange={e => setData({ ...data, email: e.target.value })}
                                required
                            />
                            <div className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400 opacity-60">
                                <span>URL Sito: {data.website || 'Non specificato'}</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-2 mt-2">
                            <input
                                type="checkbox"
                                id="privacy-wizard"
                                checked={data.privacy}
                                onChange={e => setData({ ...data, privacy: e.target.checked })}
                                required
                                className="mt-1"
                            />
                            <label htmlFor="privacy-wizard" className="text-xs text-gray-400">
                                Ho letto e accetto la <a href="/privacy-policy" className="underline text-yellow-400">Privacy Policy</a>.
                            </label>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="text-center py-10">
                        <div className="text-green-500 mb-4 flex justify-center">
                            <CheckCircle size={64} />
                        </div>
                        <h2 className="text-3xl font-bold mb-2">Richiesta Ricevuta!</h2>
                        <p className="text-gray-400 mb-6">
                            Grazie {data.name}, abbiamo ricevuto i dettagli del tuo progetto.
                            <br />
                            Il nostro team analizzerà la richiesta e ti contatterà entro 24 ore.
                        </p>
                        <a href="/" className="btn btn-primary">Torna alla Home</a>
                    </div>
                );
        }
    };

    return (
        <div className={styles.wizardContainer}>
            {currentStep < 5 && (
                <div className={styles.progressBarContainer}>
                    <div
                        className={styles.progressBarFill}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}

            {currentStep < 5 && (
                <div className={styles.stepHeader}>
                    <h2 className={styles.stepTitle}>{visibleSteps[currentIdx]?.label}</h2>
                    <p className={styles.stepSubtitle}>Step {currentIdx + 1} di {visibleSteps.length}</p>
                </div>
            )}

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderStep()}
                </motion.div>
            </AnimatePresence>

            {currentStep < 5 && (
                <div className={styles.navigation}>
                    <button
                        className="btn btn-ghost"
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        style={{ opacity: currentStep === 0 ? 0 : 1 }}
                    >
                        Indietro
                    </button>

                    {currentStep === 4 ? (
                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            disabled={!data.name || !data.email || !data.privacy || isSubmitting}
                        >
                            {isSubmitting ? 'Invio in corso...' : 'Invia Richiesta'}
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary"
                            onClick={handleNext}
                        >
                            Avanti
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from './ToastContext';
import styles from './EstimatorWizard.module.css';
import {
    Rocket,
    Globe,
    BarChart,
    Search,
    Coins,
    Briefcase,
    Target,
    CheckCircle
} from 'lucide-react';

type Step = 'goal' | 'service' | 'budget' | 'details' | 'success';

interface FormData {
    goal: string;
    services: string[];
    budget: string;
    name: string;
    email: string;
    company: string;
    website: string;
    privacy: boolean;
}

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
        privacy: false
    });

    const steps = ['Obiettivo', 'Servizi', 'Budget', 'Contatti'];
    const progress = ((currentStep + 1) / steps.length) * 100;

    const handleNext = () => {
        if (currentStep === 0 && !data.goal) return addToast('Seleziona un obiettivo', 'error');
        if (currentStep === 1 && data.services.length === 0) return addToast('Seleziona almeno un servizio', 'error');
        if (currentStep === 2 && !data.budget) return addToast('Seleziona un budget', 'error');

        setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.privacy) return addToast('Devi accettare la privacy policy', 'error');

        setIsSubmitting(true);

        // Format message for backend
        const message = `
RICHIESTA PREVENTIVO WIZARD
---------------------------
Obiettivo: ${goals.find(g => g.id === data.goal)?.label}
Servizi: ${data.services.map(s => services.find(srv => srv.id === s)?.label).join(', ')}
Budget: ${budgets.find(b => b.id === data.budget)?.label}
Sito Web: ${data.website || 'Non specificato'}
        `.trim();

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    company: data.company,
                    service: 'preventivo', // Special tag
                    message: message,
                    privacyAccepted: true
                })
            });

            const responseData = await res.json();

            if (res.ok) {
                setCurrentStep(4); // Success step
                addToast('Richiesta inviata con successo!', 'success');
            } else {
                throw new Error(responseData.error);
            }
        } catch (error) {
            addToast('Errore durante l\'invio. Riprova.', 'error');
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
                );
            case 2:
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
            case 3:
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
                                <span className={styles.summaryValue}>{data.services.length} selezionati</span>
                            </div>
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
                            <input
                                type="url"
                                placeholder="Sito Web (opzionale)"
                                className={styles.input}
                                value={data.website}
                                onChange={e => setData({ ...data, website: e.target.value })}
                            />
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
            case 4:
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
            {currentStep < 4 && (
                <div className={styles.progressBarContainer}>
                    <div
                        className={styles.progressBarFill}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}

            {currentStep < 4 && (
                <div className={styles.stepHeader}>
                    <h2 className={styles.stepTitle}>{steps[currentStep]}</h2>
                    <p className={styles.stepSubtitle}>Step {currentStep + 1} di {steps.length}</p>
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

            {currentStep < 4 && (
                <div className={styles.navigation}>
                    <button
                        className="btn btn-ghost"
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        style={{ opacity: currentStep === 0 ? 0 : 1 }}
                    >
                        Indietro
                    </button>

                    {currentStep === 3 ? (
                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit as any}
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

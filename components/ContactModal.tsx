'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from './ModalContext';
import { useToast } from './ToastContext';
import styles from './ContactModal.module.css';

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

export default function ContactModal() {
    const { isContactOpen, closeContactModal } = useModal();
    const { addToast } = useToast();

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        company: '',
        message: '',
        service: '',
        website: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formState.name.trim()) newErrors.name = 'Il nome è obbligatorio';
        if (!formState.email.trim()) {
            newErrors.email = 'L\'email è obbligatoria';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
            newErrors.email = 'Email non valida';
        }
        if (!formState.message.trim()) newErrors.message = 'Il messaggio è obbligatorio';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formState),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error);

            addToast('Messaggio inviato! Ti contatteremo presto.', 'success');
            closeContactModal();
            setFormState({ name: '', email: '', company: '', message: '', service: '', website: '' });
        } catch (error) {
            console.error(error);
            addToast('Errore durante l\'invio. Riprova.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <AnimatePresence>
            {isContactOpen && (
                <div className={styles.backdrop} onClick={(e) => {
                    if (e.target === e.currentTarget) closeContactModal();
                }}>
                    <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <button className={styles.closeButton} onClick={closeContactModal}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        <h2 className={styles.title}>Pronto a scalare?</h2>
                        <p className={styles.subtitle}>Lascia i tuoi dati per ricevere un'analisi preliminare della tua presenza online. Nessun impegno, solo valore reale.</p>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.row}>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Nome e Cognome *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formState.name}
                                        onChange={handleChange}
                                        className={`${styles.formInput} ${errors.name ? styles.inputError : ''}`}
                                        placeholder="Il tuo nome"
                                    />
                                    {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                        className={`${styles.formInput} ${errors.email ? styles.inputError : ''}`}
                                        placeholder="tu@email.com"
                                    />
                                    {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>URL del tuo sito (Così lo studiamo prima di chiamarti)</label>
                                <input
                                    type="url"
                                    name="website"
                                    value={formState.website || ''}
                                    onChange={handleChange}
                                    className={styles.formInput}
                                    placeholder="https://"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Servizio di interesse</label>
                                <select
                                    name="service"
                                    value={formState.service}
                                    onChange={handleChange}
                                    className={styles.formSelect}
                                >
                                    <option value="">Seleziona...</option>
                                    <option value="seo">SEO & Content</option>
                                    <option value="social">Social Media</option>
                                    <option value="ads">Advertising</option>
                                    <option value="web">Web Design</option>
                                    <option value="other">Altro</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Qual è il tuo obiettivo principale?</label>
                                <textarea
                                    name="message"
                                    value={formState.message}
                                    onChange={handleChange}
                                    rows={3}
                                    className={`${styles.formTextarea} ${errors.message ? styles.inputError : ''}`}
                                    placeholder="Es: Aumentare le vendite, migliorare il posizionamento..."
                                />
                                {errors.message && <span className={styles.errorText}>{errors.message}</span>}
                            </div>

                            <button
                                type="submit"
                                className={`btn btn-primary ${styles.submitButton}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className={styles.spinner} />
                                        Analizzo...
                                    </>
                                ) : 'Ottieni la tua analisi gratuita'}
                            </button>
                            <p className={styles.microCopy}>
                                <span style={{ color: 'var(--color-accent-primary)' }}>✓</span> 0% Spam, 100% Privacy. I tuoi dati sono al sicuro.
                            </p>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useToast } from './ToastContext'; // Import Toast hook
import styles from './Contact.module.css';

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

export default function Contact() {
    const { addToast } = useToast(); // Use toast hook
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        company: '',
        message: '',
        service: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Removed submitStatus state as we use toasts now

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formState.name.trim()) {
            newErrors.name = 'Il nome è obbligatorio';
        }

        if (!formState.email.trim()) {
            newErrors.email = 'L\'email è obbligatoria';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
            newErrors.email = 'Inserisci un\'email valida';
        }

        if (!formState.message.trim()) {
            newErrors.message = 'Il messaggio è obbligatorio';
        } else if (formState.message.trim().length < 10) {
            newErrors.message = 'Il messaggio deve essere di almeno 10 caratteri';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            addToast('Per favore controlla i campi evidenziati.', 'error');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formState),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Errore nell\'invio');
            }

            addToast('Messaggio inviato con successo! Ti risponderemo presto.', 'success');

            setFormState({
                name: '',
                email: '',
                company: '',
                message: '',
                service: '',
            });
        } catch (error) {
            console.error('Form submission error:', error);
            addToast('Si è verificato un errore. Riprova più tardi.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    return (
        <section id="contatti" ref={sectionRef} className={styles.section}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Left Column - Info */}
                    <motion.div
                        className={styles.info}
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span className={styles.label}>Contatti</span>
                        <h2 className={styles.title}>
                            Hai un progetto in mente?
                            <br />
                            <span className="text-gradient">Parliamone.</span>
                        </h2>
                        <p className={styles.description}>
                            Che tu abbia un&apos;idea chiara o solo un obiettivo da raggiungere,
                            siamo qui per ascoltarti e trovare insieme la soluzione migliore.
                        </p>

                        {/* Contact Methods */}
                        {/* Contact Methods */}
                        <div className={styles.methods}>
                            <a href="mailto:info@wrdigital.it" className={styles.method}>
                                <div className={styles.methodIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                </div>
                                <div>
                                    <span className={styles.methodLabel}>Email</span>
                                    <span className={styles.methodValue}>info@wrdigital.it</span>
                                </div>
                            </a>

                            <a href="tel:+393401204651" className={styles.method}>
                                <div className={styles.methodIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className={styles.methodLabel}>Telefono</span>
                                    <span className={styles.methodValue}>+39 340 120 4651</span>
                                </div>
                            </a>

                            <div className={styles.method}>
                                <div className={styles.methodIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                <div>
                                    <span className={styles.methodLabel}>Sede</span>
                                    <span className={styles.methodValue}>
                                        Via Venezia, 2<br />
                                        20834 Nova Milanese (MB)
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className={styles.socials}>
                            <span className={styles.socialsLabel}>Seguici</span>
                            <div className={styles.socialLinks}>
                                {[
                                    { name: 'Facebook', url: 'https://www.facebook.com/WRDigitalSrl/' },
                                    { name: 'LinkedIn', url: 'https://linkedin.com/company/wrdigitalagency/' },
                                    { name: 'Instagram', url: 'https://www.instagram.com/wrdigital.agency/' },
                                    { name: 'YouTube', url: 'https://www.youtube.com/@wrdigital.agency' }
                                ].map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialLink}
                                        data-cursor={social.name}
                                    >
                                        {social.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Form */}
                    <motion.div
                        className={styles.formWrapper}
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className={styles.formContainer}>
                            <motion.form
                                onSubmit={handleSubmit}
                                className={styles.form}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className={styles.formGrid}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="name" className={styles.formLabel}>Nome *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formState.name}
                                            onChange={handleChange}
                                            className={`${styles.formInput} ${errors.name ? styles.inputError : ''}`}
                                            placeholder="Il tuo nome"
                                        />
                                        {errors.name && (
                                            <motion.span
                                                className={styles.errorText}
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                {errors.name}
                                            </motion.span>
                                        )}
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="email" className={styles.formLabel}>Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formState.email}
                                            onChange={handleChange}
                                            className={`${styles.formInput} ${errors.email ? styles.inputError : ''}`}
                                            placeholder="la.tua@email.com"
                                        />
                                        {errors.email && (
                                            <motion.span
                                                className={styles.errorText}
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                {errors.email}
                                            </motion.span>
                                        )}
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="company" className={styles.formLabel}>Azienda</label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formState.company}
                                        onChange={handleChange}
                                        className={styles.formInput}
                                        placeholder="Nome della tua azienda"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="service" className={styles.formLabel}>Servizio di interesse</label>
                                    <select
                                        id="service"
                                        name="service"
                                        value={formState.service}
                                        onChange={handleChange}
                                        className={styles.formSelect}
                                    >
                                        <option value="">Seleziona un servizio</option>
                                        <option value="seo">SEO & Content</option>
                                        <option value="social">Social Media</option>
                                        <option value="ads">Advertising</option>
                                        <option value="web">Web Development</option>
                                        <option value="strategy">Strategia Digitale</option>
                                        <option value="other">Altro</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="message" className={styles.formLabel}>Messaggio *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formState.message}
                                        onChange={handleChange}
                                        className={`${styles.formTextarea} ${errors.message ? styles.inputError : ''}`}
                                        placeholder="Raccontaci del tuo progetto..."
                                        rows={5}
                                    />
                                    {errors.message && (
                                        <motion.span
                                            className={styles.errorText}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            {errors.message}
                                        </motion.span>
                                    )}
                                </div>



                                <button
                                    type="submit"
                                    className={`btn btn-primary ${styles.formSubmit}`}
                                    disabled={isSubmitting}
                                    data-cursor="Invia"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className={styles.spinner} />
                                            Invio in corso...
                                        </>
                                    ) : (
                                        <>
                                            Invia Messaggio
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <line x1="22" y1="2" x2="11" y2="13" />
                                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </motion.form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

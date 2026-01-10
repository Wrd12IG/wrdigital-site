'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './page.module.css';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Email o password non corretti');
                setLoading(false);
                return;
            }

            // Redirect intelligente in base al ruolo (presunto dall'email)
            if (email.toLowerCase() === 'roberto@wrdigital.it' || email.toLowerCase() === 'admin@wrdigital.com') {
                router.push('/admin');
            } else {
                router.push('/area-clienti/dashboard');
            }
        } catch {
            setError('Si è verificato un errore. Riprova.');
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.bgGradient} />

            <motion.div
                className={styles.loginCard}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className={styles.logoSection}>
                    <h1 className={styles.logo}>
                        W<span className={styles.accent}>[r]</span>Digital
                    </h1>
                    <p className={styles.subtitle}>Area Clienti</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tuaemail@esempio.it"
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    {error && (
                        <div className={styles.error}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className={styles.spinner} />
                        ) : (
                            'Accedi'
                        )}
                    </button>
                </form>

                <p className={styles.helpText}>
                    Hai bisogno di assistenza? <a href="mailto:info@wrdigital.it">Contattaci</a>
                </p>
            </motion.div>
        </div>
    );
}

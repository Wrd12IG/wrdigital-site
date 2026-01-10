'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import styles from './Toast.module.css';

export interface ToastProps {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
    duration?: number;
    onClose: (id: string) => void;
}

export default function Toast({ id, message, type, duration = 5000, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(id);
        }, duration);

        return () => clearTimeout(timer);
    }, [id, duration, onClose]);

    const icons = {
        success: (
            <svg viewBox="0 0 24 24" fill="none" className={styles.toastIcon || ''}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        error: (
            <svg viewBox="0 0 24 24" fill="none" className={styles.toastIcon || ''}>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        info: (
            <svg viewBox="0 0 24 24" fill="none" className={styles.toastIcon || ''}>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" strokeWidth="2" />
                <line x1="12" y1="8" x2="12.01" y2="8" stroke="currentColor" strokeWidth="2" />
            </svg>
        )
    };

    return (
        <motion.div
            className={`${styles.toast} ${styles[type]}`}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            layout
        >
            <div className={styles.iconWrapper}>
                {icons[type]}
            </div>
            <p className={styles.message}>{message}</p>
            <button onClick={() => onClose(id)} className={styles.closeBtn}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
        </motion.div>
    );
}

export function ToastContainer({ toasts, removeToast }: { toasts: ToastProps[], removeToast: (id: string) => void }) {
    return (
        <div className={styles.toastContainer}>
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <Toast key={toast.id} {...toast} onClose={removeToast} />
                ))}
            </AnimatePresence>
        </div>
    );
}

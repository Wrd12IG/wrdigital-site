'use client';

import { useRef, useEffect, ReactNode } from 'react';
import styles from './ScrollReveal.module.css';

interface ScrollRevealProps {
    children: ReactNode;
    delay?: number;          // seconds, e.g. 0.1
    direction?: 'left' | 'up' | 'fade';
    className?: string;
    threshold?: number;      // 0–1, default 0.15
}

export default function ScrollReveal({
    children,
    delay = 0,
    direction = 'up',
    className = '',
    threshold = 0.15,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Set delay as CSS var
        el.style.setProperty('--reveal-delay', `${delay}s`);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.setAttribute('data-revealed', 'true');
                    observer.unobserve(el);
                }
            },
            { threshold, rootMargin: '0px 0px -60px 0px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [delay, threshold]);

    const directionClass =
        direction === 'left' ? styles.revealLeft :
        direction === 'up' ? styles.revealUp :
        styles.revealFade;

    return (
        <div ref={ref} className={`${styles.reveal} ${directionClass} ${className}`}>
            {children}
        </div>
    );
}

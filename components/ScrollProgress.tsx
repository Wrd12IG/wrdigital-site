'use client';

import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

            if (barRef.current) {
                barRef.current.style.transform = `scaleX(${progress})`;
            }
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress(); // initial
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                zIndex: 99999,
                pointerEvents: 'none',
                background: 'rgba(245,223,74,0.12)',
            }}
        >
            <div
                ref={barRef}
                style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #f5df4a 0%, #fbbf24 60%, #f5df4a 100%)',
                    transformOrigin: 'left',
                    transform: 'scaleX(0)',
                    transition: 'transform 0.08s linear',
                    boxShadow: '0 0 12px rgba(245,223,74,0.7), 0 0 4px rgba(245,223,74,0.5)',
                    borderRadius: '0 2px 2px 0',
                }}
            />
        </div>
    );
}

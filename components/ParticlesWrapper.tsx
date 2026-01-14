'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const AnimatedParticles = dynamic(() => import('./AnimatedParticles'), {
    ssr: false,
    loading: () => null
});

// Delay in ms before loading particles (allows critical rendering to complete)
const PARTICLES_LOAD_DELAY = 3500;

export default function ParticlesWrapper() {
    const [isReady, setIsReady] = useState(false);
    const [isMobile, setIsMobile] = useState(true); // Default to mobile to prevent SSR flash

    useEffect(() => {
        // Check if mobile
        const checkMobile = window.innerWidth < 768;
        setIsMobile(checkMobile);

        if (checkMobile) return; // Don't set timer if mobile

        // Delay the particles loading to allow critical rendering to complete
        const timer = setTimeout(() => {
            if ('requestIdleCallback' in window) {
                (window as any).requestIdleCallback(() => setIsReady(true), { timeout: 1000 });
            } else {
                setIsReady(true);
            }
        }, PARTICLES_LOAD_DELAY);

        return () => clearTimeout(timer);
    }, []);

    // Don't render on mobile
    if (isMobile) {
        return null;
    }

    // Don't render until delayed load is complete
    if (!isReady) {
        return null;
    }

    return <AnimatedParticles />;
}

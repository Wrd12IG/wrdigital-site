'use client';

import dynamic from 'next/dynamic';

const AnimatedParticles = dynamic(() => import('./AnimatedParticles'), {
    ssr: false,
    loading: () => null
});

export default function ParticlesWrapper() {
    // Basic mobile detection to avoid heavy canvas on phones
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
        return null;
    }

    return <AnimatedParticles />;
}

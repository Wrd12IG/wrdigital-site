'use client';

import dynamic from 'next/dynamic';

const AnimatedParticles = dynamic(() => import('./AnimatedParticles'), {
    ssr: false,
    loading: () => null
});

export default function ParticlesWrapper() {
    return <AnimatedParticles />;
}

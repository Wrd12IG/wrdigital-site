'use client';

import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center" style={{ background: '#e9ebee' }}>
      <span
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
          fontSize: 13,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#9aa2ad',
        }}
      >
        Fusione del vetro
      </span>
    </div>
  ),
});

export default function GlassPreview3DPage() {
  return (
    <main className="relative w-full overflow-hidden" style={{ background: '#e9ebee', height: '100vh' }}>
      <Scene />
    </main>
  );
}

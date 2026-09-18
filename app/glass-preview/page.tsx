'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowRight, Sparkles, Box, Layers } from 'lucide-react';

// Dynamic import for WebGL Canvas (no SSR)
const LiquidGlass3DScene = dynamic(() => import('@/components/LiquidGlass3DScene'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[650px] md:h-[750px] rounded-3xl bg-slate-200/60 animate-pulse flex flex-col items-center justify-center text-slate-500 gap-3 border border-white/60">
            <Box className="w-8 h-8 animate-spin text-slate-400" />
            <span className="text-sm font-semibold tracking-wide">Caricamento Motore Ottico 3D (Three.js WebGL)...</span>
        </div>
    )
});

export default function GlassPreviewPage() {
    const [viewMode, setViewMode] = useState<'3d' | 'css'>('3d');

    return (
        <div className="min-h-screen bg-[#e5e9f0] text-slate-800 flex flex-col items-center justify-center p-4 md:p-10 relative overflow-hidden selection:bg-orange-500/20">
            
            {/* Background Studio Lighting */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#ffffff_0%,#e8edf4_45%,#dce2ec_100%)] -z-10" />

            {/* Header & Switcher */}
            <div className="text-center mb-8 max-w-xl">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-white/70 border border-white/90 text-slate-700 shadow-sm mb-3 backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Liquid Glass System 2026
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                    Optical Glass 3D Engine
                </h1>
                <p className="text-sm md:text-base text-slate-500 mt-2">
                    Vera rifrazione ottica della luce (IOR 1.52), dispersione cromatica ai bordi e calcolo delle ombre caustiche in tempo reale.
                </p>

                {/* Switcher: 3D WebGL vs CSS3 */}
                <div className="inline-flex items-center p-1.5 rounded-full bg-slate-200/80 border border-white/80 shadow-inner mt-6 gap-1">
                    <button
                        onClick={() => setViewMode('3d')}
                        className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                            viewMode === '3d'
                                ? 'bg-white text-slate-900 shadow-md scale-105'
                                : 'text-slate-500 hover:text-slate-900'
                        }`}
                    >
                        <Box className="w-3.5 h-3.5 text-blue-500" />
                        Three.js WebGL (Rifrazione Ottica Reale)
                    </button>
                    <button
                        onClick={() => setViewMode('css')}
                        className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                            viewMode === 'css'
                                ? 'bg-white text-slate-900 shadow-md scale-105'
                                : 'text-slate-500 hover:text-slate-900'
                        }`}
                    >
                        <Layers className="w-3.5 h-3.5 text-emerald-500" />
                        CSS3 Backdrop Filter
                    </button>
                </div>
            </div>

            {/* Stage Showcase */}
            <div className="w-full max-w-[620px]">
                {viewMode === '3d' ? (
                    <div>
                        <LiquidGlass3DScene />
                        <p className="text-center text-xs text-slate-400 mt-3 font-medium">
                            💡 <em>Trascina con il mouse per ruotare e osservare la lente di cristallo da diverse angolazioni. Clicca sui tasti per testare i riflessi.</em>
                        </p>
                    </div>
                ) : (
                    <div className="p-8 rounded-3xl bg-white/40 border border-white/80 shadow-xl backdrop-blur-xl text-center">
                        <p className="text-sm text-slate-600 mb-4">
                            Modalità CSS3 tradizionale con simulazione di bordi, gradienti e box-shadow.
                        </p>
                        <a
                            href="/glass_preview.html"
                            target="_blank"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all shadow-lg"
                        >
                            Apri Anteprima CSS a Schermo Intero <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                    </div>
                )}
            </div>

            {/* Back to Home */}
            <div className="mt-10 text-center">
                <a
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-800 transition-colors"
                >
                    Torna alla Home di W[r]Digital <ArrowRight className="w-3.5 h-3.5" />
                </a>
            </div>

        </div>
    );
}

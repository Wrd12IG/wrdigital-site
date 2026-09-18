'use client';

import React, { useState, useRef } from 'react';
import { Search, Power, Sparkles, X, Check, ArrowRight, ChevronsUpDown, RotateCcw, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GlassPreviewPage() {
    const [toggled, setToggled] = useState(true);
    const [searchValue, setSearchValue] = useState('With suggestions');
    const [selectedActive, setSelectedActive] = useState(true);

    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePos({ x, y });
    };

    return (
        <div 
            className="min-h-screen text-slate-800 flex flex-col items-center justify-center p-4 sm:p-8 md:p-14 relative overflow-hidden select-none"
            style={{
                backgroundColor: '#eaeef4',
                backgroundImage: `
                    radial-gradient(circle at 48% 12%, rgba(255, 255, 255, 0.95) 0%, rgba(240, 244, 250, 0.7) 45%, rgba(225, 232, 242, 0.85) 100%)
                `
            }}
            onMouseMove={handleMouseMove}
        >
            {/* Top Studio Spotlights */}
            <div className="absolute top-[-10%] left-[20%] w-[600px] h-[400px] bg-white/80 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute top-[5%] right-[25%] w-[500px] h-[350px] bg-sky-100/40 rounded-full blur-[100px] pointer-events-none -z-10" />

            {/* Subtle Breadcrumb / Return to WRDigital */}
            <div className="w-full max-w-[500px] flex items-center justify-between mb-8 px-2 z-20">
                <a
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors bg-white/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/80 shadow-sm"
                >
                    <ArrowRight className="w-3 h-3 rotate-180" /> Home
                </a>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-extrabold tracking-wider uppercase bg-white/70 border border-white text-slate-700 shadow-sm backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Liquid Glass 3D UI
                </span>
            </div>

            {/* =========================================================================
                STAGE: 1:1 REPLICA OF THE 3D GLASS UI SYSTEM
            ========================================================================= */}
            <div 
                ref={containerRef}
                className="w-full max-w-[480px] flex flex-col gap-6 relative z-10"
                style={{
                    perspective: '1200px',
                    transformStyle: 'preserve-3d'
                }}
            >

                {/* =====================================================================
                    ROW 1: START PROJECT (ORANGE CORE), SECONDARY, POWER SQUIRCLE
                ===================================================================== */}
                <div className="flex items-center gap-5 justify-between">
                    
                    {/* --- START PROJECT PILL --- */}
                    <div 
                        className="flex-[1.3] h-[64px] rounded-full relative cursor-pointer group transition-transform duration-200 active:scale-[0.97]"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.3) 100%)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            border: '1.5px solid rgba(255,255,255,0.95)',
                            padding: '4.5px',
                            boxShadow: `
                                0 4px 12px rgba(0, 0, 0, 0.04),
                                0 16px 36px -6px rgba(25, 45, 75, 0.18),
                                0 28px 55px -12px rgba(15, 30, 55, 0.14),
                                inset 0 2px 2px 0 #ffffff,
                                inset 0 -2.5px 4px 0 rgba(70, 90, 130, 0.22),
                                inset 1px 0 2px rgba(255, 255, 255, 0.7),
                                inset -1px 0 2px rgba(255, 255, 255, 0.7)
                            `
                        }}
                    >
                        {/* Orange Floor Caustic Glow directly beneath */}
                        <div 
                            className="absolute -inset-2.5 rounded-full pointer-events-none -z-10"
                            style={{
                                background: 'radial-gradient(circle at 45% 95%, rgba(249, 115, 22, 0.65) 0%, rgba(251, 146, 60, 0.35) 45%, transparent 75%)',
                                filter: 'blur(11px)'
                            }}
                        />

                        {/* Prismatic Rainbow Dispersion Flare (Cyan, Yellow, Magenta) */}
                        <div 
                            className="absolute -right-2 -bottom-2 w-20 h-16 pointer-events-none -z-10 rounded-full"
                            style={{
                                background: 'radial-gradient(circle at 60% 60%, rgba(0, 220, 255, 0.8) 0%, rgba(255, 185, 0, 0.65) 35%, rgba(255, 0, 130, 0.5) 65%, transparent 80%)',
                                filter: 'blur(6px)'
                            }}
                        />

                        {/* High-Gloss Candy Orange Capsule Core */}
                        <div 
                            className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-[16px] tracking-tight relative overflow-hidden"
                            style={{
                                background: 'linear-gradient(180deg, #ff6b33 0%, #f4501a 38%, #e03c00 80%, #b82a00 100%)',
                                boxShadow: `
                                    inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.95),
                                    inset 0 -3px 5px 0 rgba(110, 15, 0, 0.7),
                                    0 5px 16px rgba(220, 60, 0, 0.5)
                                `,
                                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                            }}
                        >
                            {/* Curved Glass Specular Highlight Crescent */}
                            <div 
                                className="absolute top-[2px] left-3.5 right-3.5 h-[42%] rounded-full pointer-events-none"
                                style={{
                                    background: 'linear-gradient(180deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.2) 65%, transparent 100%)'
                                }}
                            />
                            Start project
                        </div>
                    </div>

                    {/* --- SECONDARY PILL --- */}
                    <div 
                        className="flex-1 h-[64px] rounded-full relative cursor-pointer group transition-transform duration-200 active:scale-[0.97] flex items-center justify-center"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.08) 45%, rgba(235,245,255,0.25) 80%, rgba(255,255,255,0.45) 100%)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            border: '1.5px solid rgba(255,255,255,0.95)',
                            padding: '4.5px',
                            boxShadow: `
                                0 4px 12px rgba(0, 0, 0, 0.04),
                                0 16px 36px -6px rgba(25, 45, 75, 0.18),
                                0 28px 55px -12px rgba(15, 30, 55, 0.14),
                                inset 0 2px 2px 0 #ffffff,
                                inset 0 -2.5px 4px 0 rgba(70, 90, 130, 0.22),
                                inset 1px 0 2px rgba(255, 255, 255, 0.7),
                                inset -1px 0 2px rgba(255, 255, 255, 0.7)
                            `
                        }}
                    >
                        {/* Cyan / Ice-Blue Floor Caustic Glow */}
                        <div 
                            className="absolute -inset-2.5 rounded-full pointer-events-none -z-10"
                            style={{
                                background: 'radial-gradient(circle at 65% 95%, rgba(56, 189, 248, 0.6) 0%, rgba(147, 197, 253, 0.35) 45%, transparent 75%)',
                                filter: 'blur(11px)'
                            }}
                        />

                        {/* Prismatic Rainbow Flare on Bottom-Right */}
                        <div 
                            className="absolute -right-2 -bottom-2 w-16 h-14 pointer-events-none -z-10 rounded-full"
                            style={{
                                background: 'radial-gradient(circle at 60% 60%, rgba(0, 210, 255, 0.8) 0%, rgba(255, 180, 0, 0.6) 35%, rgba(255, 0, 130, 0.45) 65%, transparent 80%)',
                                filter: 'blur(6px)'
                            }}
                        />

                        {/* Floating Dark Slate Text */}
                        <span className="font-semibold text-slate-800 text-[16px] tracking-tight relative z-10">
                            Secondary
                        </span>
                    </div>

                    {/* --- POWER SQUIRCLE BUTTON --- */}
                    <div 
                        className="w-[64px] h-[64px] rounded-[22px] relative flex-shrink-0 cursor-pointer group transition-transform duration-200 active:scale-[0.97] flex items-center justify-center"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.08) 45%, rgba(235,245,255,0.25) 80%, rgba(255,255,255,0.45) 100%)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            border: '1.5px solid rgba(255,255,255,0.95)',
                            padding: '4.5px',
                            boxShadow: `
                                0 4px 12px rgba(0, 0, 0, 0.04),
                                0 16px 36px -6px rgba(25, 45, 75, 0.18),
                                0 28px 55px -12px rgba(15, 30, 55, 0.14),
                                inset 0 2px 2px 0 #ffffff,
                                inset 0 -2.5px 4px 0 rgba(70, 90, 130, 0.22),
                                inset 1px 0 2px rgba(255, 255, 255, 0.7),
                                inset -1px 0 2px rgba(255, 255, 255, 0.7)
                            `
                        }}
                    >
                        {/* Prismatic Rainbow Flare on Bottom-Right Corner */}
                        <div 
                            className="absolute -right-2 -bottom-2 w-16 h-14 pointer-events-none -z-10 rounded-full"
                            style={{
                                background: 'radial-gradient(circle at 60% 60%, rgba(0, 220, 255, 0.85) 0%, rgba(255, 175, 0, 0.6) 35%, rgba(255, 0, 140, 0.5) 65%, transparent 80%)',
                                filter: 'blur(5px)'
                            }}
                        />

                        {/* Power Icon */}
                        <Power className="w-[23px] h-[23px] text-slate-800 stroke-[2.4] relative z-10" />
                    </div>

                </div>

                {/* =====================================================================
                    ROW 2: SEARCH BAR WITH SUGGESTIONS & PLUS BUTTON
                ===================================================================== */}
                <div 
                    className="w-full h-[66px] rounded-full flex items-center justify-between relative"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 40%, rgba(240,248,255,0.2) 75%, rgba(255,255,255,0.4) 100%)',
                        backdropFilter: 'blur(18px)',
                        WebkitBackdropFilter: 'blur(18px)',
                        border: '1.5px solid rgba(255,255,255,0.95)',
                        padding: '4.5px',
                        boxShadow: `
                            0 4px 12px rgba(0, 0, 0, 0.04),
                            0 18px 40px -6px rgba(25, 45, 75, 0.18),
                            0 30px 60px -12px rgba(15, 30, 55, 0.14),
                            inset 0 2px 2px 0 #ffffff,
                            inset 0 -2.5px 4px 0 rgba(70, 90, 130, 0.22),
                            inset 1px 0 2px rgba(255, 255, 255, 0.7),
                            inset -1px 0 2px rgba(255, 255, 255, 0.7)
                        `
                    }}
                >
                    {/* Prismatic Rainbow Dispersion Flare on Right Cap */}
                    <div 
                        className="absolute right-0 top-0 bottom-0 w-28 rounded-full pointer-events-none -z-10"
                        style={{
                            background: 'radial-gradient(circle at 85% 65%, rgba(0, 220, 255, 0.85) 0%, rgba(255, 180, 0, 0.65) 35%, rgba(255, 0, 140, 0.5) 60%, transparent 80%)',
                            filter: 'blur(8px)'
                        }}
                    />

                    {/* Left Search Section */}
                    <div className="flex-1 h-full flex items-center gap-3.5 pl-4 pr-3">
                        <Search className="w-5 h-5 text-slate-700 stroke-[2.4] flex-shrink-0" />
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="bg-transparent border-none outline-none font-medium text-slate-800 text-[16px] w-full placeholder-slate-400 tracking-tight"
                            placeholder="With suggestions"
                        />
                    </div>

                    {/* Right Partitioned Glass Button with Plus Sign */}
                    <button 
                        className="w-[58px] h-full rounded-r-full flex items-center justify-center text-slate-800 text-2xl font-light border-l border-white/60 hover:text-black transition-transform active:scale-95"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(225,240,255,0.15) 50%, rgba(255,235,210,0.2) 100%)',
                            boxShadow: 'inset 0 1.5px 1.5px rgba(255,255,255,0.9)'
                        }}
                    >
                        <Plus className="w-5 h-5 stroke-[2.4]" />
                    </button>
                </div>

                {/* =====================================================================
                    ROW 3: SELECT PILL & EMERALD JELLY TOGGLE
                ===================================================================== */}
                <div className="flex items-center gap-5 justify-between">
                    
                    {/* --- SELECT PILL --- */}
                    <div 
                        onClick={() => setSelectedActive(!selectedActive)}
                        className="flex-[1.4] h-[64px] rounded-full flex items-center justify-between relative cursor-pointer group transition-transform duration-200 active:scale-[0.98]"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 40%, rgba(240,248,255,0.2) 75%, rgba(255,255,255,0.4) 100%)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            border: '1.5px solid rgba(255,255,255,0.95)',
                            padding: '4.5px 5px 4.5px 22px',
                            boxShadow: `
                                0 4px 12px rgba(0, 0, 0, 0.04),
                                0 16px 36px -6px rgba(25, 45, 75, 0.18),
                                0 28px 55px -12px rgba(15, 30, 55, 0.14),
                                inset 0 2px 2px 0 #ffffff,
                                inset 0 -2.5px 4px 0 rgba(70, 90, 130, 0.22),
                                inset 1px 0 2px rgba(255, 255, 255, 0.7),
                                inset -1px 0 2px rgba(255, 255, 255, 0.7)
                            `
                        }}
                    >
                        {/* Reload Icon + Select Label */}
                        <div className="flex items-center gap-3 text-slate-800 font-semibold text-[16px] tracking-tight">
                            <RotateCcw className="w-5 h-5 stroke-[2.4] text-slate-700" />
                            <span>Select</span>
                        </div>

                        {/* Mint Green Checkmark Squircle */}
                        <div 
                            className="w-[46px] h-[46px] rounded-[13px] flex items-center justify-center text-white transition-transform duration-200 group-hover:scale-105"
                            style={{
                                background: selectedActive 
                                    ? 'linear-gradient(145deg, #34d399 0%, #10b981 50%, #059669 100%)'
                                    : 'linear-gradient(145deg, #cbd5e1 0%, #94a3b8 100%)',
                                boxShadow: 'inset 0 1.5px 1.5px rgba(255, 255, 255, 0.85), inset 0 -2.5px 4px rgba(0, 0, 0, 0.35), 0 4px 14px rgba(5, 150, 105, 0.45)'
                            }}
                        >
                            <Check className="w-6 h-6 stroke-[3.2]" />
                        </div>
                    </div>

                    {/* --- EMERALD JELLY TOGGLE --- */}
                    <div 
                        onClick={() => setToggled(!toggled)}
                        className="w-[108px] h-[60px] p-[5px] rounded-full relative cursor-pointer transition-all duration-300 flex-shrink-0"
                        style={{
                            background: toggled 
                                ? 'linear-gradient(135deg, rgba(20, 184, 166, 0.82) 0%, rgba(13, 148, 136, 0.65) 50%, rgba(15, 118, 110, 0.75) 100%)' 
                                : 'linear-gradient(135deg, rgba(148, 163, 184, 0.45) 0%, rgba(100, 116, 139, 0.25) 100%)',
                            backdropFilter: 'blur(16px)',
                            border: '1.5px solid rgba(255,255,255,0.95)',
                            boxShadow: `
                                0 4px 12px rgba(0, 0, 0, 0.05),
                                0 16px 32px -4px rgba(13, 148, 136, 0.4),
                                0 28px 50px -10px rgba(13, 148, 136, 0.25),
                                inset 0 2.5px 3px rgba(255, 255, 255, 0.95),
                                inset 0 -3px 6px rgba(0, 0, 0, 0.25)
                            `
                        }}
                    >
                        {/* Turquoise Floor Caustic Glow */}
                        {toggled && (
                            <div 
                                className="absolute -inset-2 rounded-full pointer-events-none -z-10"
                                style={{
                                    background: 'radial-gradient(circle at 65% 90%, rgba(20, 184, 166, 0.85) 0%, rgba(45, 212, 191, 0.5) 45%, transparent 75%)',
                                    filter: 'blur(10px)'
                                }}
                            />
                        )}

                        {/* Ceramic 3D White Knob with Top Specular Glow */}
                        <motion.div 
                            className="w-[48px] h-[48px] rounded-full"
                            animate={{ x: toggled ? 48 : 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                            style={{
                                background: 'radial-gradient(circle at 35% 25%, #ffffff 0%, #f1f5f9 55%, #cbd5e1 100%)',
                                boxShadow: `
                                    0 6px 14px rgba(0, 0, 0, 0.28),
                                    0 2px 4px rgba(0, 0, 0, 0.12),
                                    inset 0 1.5px 1.5px #ffffff
                                `
                            }}
                        />
                    </div>

                </div>

                {/* =====================================================================
                    ROW 4: TABS PILL & TOAST CAPSULE (WITH AMBER INNER CONTOUR)
                ===================================================================== */}
                <div className="flex items-center gap-5 justify-between">
                    
                    {/* --- TABS PILL --- */}
                    <div 
                        className="flex-1 h-[58px] px-6 rounded-full flex items-center justify-center gap-2.5 text-slate-800 font-semibold text-[15.5px] cursor-pointer hover:-translate-y-0.5 active:translate-y-0 transition-transform"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.08) 45%, rgba(235,245,255,0.25) 80%, rgba(255,255,255,0.45) 100%)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            border: '1.5px solid rgba(255,255,255,0.95)',
                            boxShadow: `
                                0 4px 12px rgba(0, 0, 0, 0.04),
                                0 16px 36px -6px rgba(25, 45, 75, 0.18),
                                0 28px 55px -12px rgba(15, 30, 55, 0.14),
                                inset 0 2px 2px 0 #ffffff,
                                inset 0 -2.5px 4px 0 rgba(70, 90, 130, 0.22),
                                inset 1px 0 2px rgba(255, 255, 255, 0.7),
                                inset -1px 0 2px rgba(255, 255, 255, 0.7)
                            `
                        }}
                    >
                        <ChevronsUpDown className="w-5 h-5 stroke-[2.4] text-slate-700" />
                        <span>Tabs</span>
                    </div>

                    {/* --- TOAST PILL WITH AMBER INNER CONTOUR --- */}
                    <div 
                        className="flex-1 h-[58px] p-[4.5px] rounded-full relative cursor-pointer hover:-translate-y-0.5 active:translate-y-0 transition-transform"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.08) 45%, rgba(255,245,235,0.25) 80%, rgba(255,255,255,0.45) 100%)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            border: '1.5px solid rgba(255,255,255,0.95)',
                            boxShadow: `
                                0 4px 12px rgba(0, 0, 0, 0.04),
                                0 16px 36px -6px rgba(25, 45, 75, 0.18),
                                0 28px 55px -12px rgba(15, 30, 55, 0.14),
                                inset 0 2px 2px 0 #ffffff,
                                inset 0 -2.5px 4px 0 rgba(70, 90, 130, 0.22),
                                inset 1px 0 2px rgba(255, 255, 255, 0.7),
                                inset -1px 0 2px rgba(255, 255, 255, 0.7)
                            `
                        }}
                    >
                        {/* Prismatic Rainbow Flare on Bottom-Right */}
                        <div 
                            className="absolute -right-2 -bottom-2 w-16 h-14 pointer-events-none -z-10 rounded-full"
                            style={{
                                background: 'radial-gradient(circle at 60% 60%, rgba(0, 220, 255, 0.8) 0%, rgba(255, 185, 0, 0.65) 35%, rgba(255, 0, 130, 0.5) 65%, transparent 80%)',
                                filter: 'blur(6px)'
                            }}
                        />

                        {/* Thin Glowing Amber Inner Contour Wire Ring */}
                        <div 
                            className="w-full h-full rounded-full flex items-center justify-center gap-2 text-slate-800 font-semibold text-[15.5px] border-[1.5px] border-amber-500/70"
                            style={{
                                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 245, 230, 0.15) 100%)',
                                boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.9), 0 2px 8px rgba(245, 158, 11, 0.2)'
                            }}
                        >
                            {/* 4-point Diamond Star */}
                            <svg className="w-4 h-4 text-amber-500 fill-amber-400/40" viewBox="0 0 24 24">
                                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                            </svg>
                            <span>Toast</span>
                        </div>
                    </div>

                </div>

                {/* =====================================================================
                    ROW 5: PRISMATIC GLASS CARD & PRO PLAN DIALOG MODAL
                ===================================================================== */}
                <div className="flex items-stretch gap-5 justify-between">
                    
                    {/* --- PRISMATIC GLASS CARD --- */}
                    <div 
                        className="flex-1 h-[160px] p-6 rounded-[28px] flex items-end justify-end text-slate-800 font-semibold text-[17px] relative overflow-hidden group cursor-pointer hover:-translate-y-0.5 active:translate-y-0 transition-transform"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,245,240,0.15) 25%, rgba(230,250,255,0.2) 60%, rgba(255,255,255,0.5) 100%)',
                            backdropFilter: 'blur(18px)',
                            WebkitBackdropFilter: 'blur(18px)',
                            border: '1.5px solid rgba(255,255,255,0.95)',
                            boxShadow: `
                                0 4px 12px rgba(0, 0, 0, 0.04),
                                0 20px 42px -6px rgba(25, 45, 75, 0.2),
                                0 32px 65px -12px rgba(15, 30, 55, 0.16),
                                inset 0 2px 2px 0 #ffffff,
                                inset 0 -2.5px 4px 0 rgba(70, 90, 130, 0.22),
                                inset 1px 0 2px rgba(255, 255, 255, 0.7),
                                inset -1px 0 2px rgba(255, 255, 255, 0.7)
                            `
                        }}
                    >
                        {/* Top Curved Glare Specular Sheen */}
                        <div 
                            className="absolute top-0 left-0 right-0 h-[60%] rounded-t-[28px] pointer-events-none"
                            style={{
                                background: 'radial-gradient(ellipse at 35% 0%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.2) 50%, transparent 80%)'
                            }}
                        />

                        {/* Iridescent Rainbow Pearlescent internal sheen */}
                        <div 
                            className="absolute -inset-10 pointer-events-none"
                            style={{
                                background: 'radial-gradient(circle at 40% 40%, rgba(255,220,240,0.5) 0%, rgba(220,245,255,0.4) 30%, rgba(255,255,255,0.4) 50%, transparent 70%)'
                            }}
                        />

                        {/* Bottom-right text "Card" */}
                        <span className="relative z-10 font-bold text-slate-800 tracking-tight">Card</span>
                    </div>

                    {/* --- PRO PLAN FLOATING GLASS MODAL --- */}
                    <div 
                        className="flex-[1.25] h-[160px] p-5 rounded-[28px] flex flex-col justify-between relative"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(240,248,255,0.2) 100%)',
                            backdropFilter: 'blur(18px)',
                            WebkitBackdropFilter: 'blur(18px)',
                            border: '1.5px solid rgba(255,255,255,0.95)',
                            boxShadow: `
                                0 4px 12px rgba(0, 0, 0, 0.04),
                                0 20px 42px -6px rgba(25, 45, 75, 0.2),
                                0 32px 65px -12px rgba(15, 30, 55, 0.16),
                                inset 0 2px 2px 0 #ffffff,
                                inset 0 -2.5px 4px 0 rgba(70, 90, 130, 0.22),
                                inset 1px 0 2px rgba(255, 255, 255, 0.7),
                                inset -1px 0 2px rgba(255, 255, 255, 0.7)
                            `
                        }}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-bold text-slate-900 text-[16.5px] leading-tight">Find files...</h3>
                                <p className="text-[13px] text-slate-500 font-medium mt-0.5">Add collaborator</p>
                            </div>
                            <button className="text-slate-400 hover:text-slate-800 transition-colors p-1">
                                <X className="w-4 h-4 stroke-[2.4]" />
                            </button>
                        </div>

                        {/* Glossy Candy Cobalt Blue Core */}
                        <button 
                            className="w-full h-[46px] rounded-full text-white font-bold text-[15.5px] tracking-tight hover:brightness-105 active:scale-[0.98] transition-all relative overflow-hidden"
                            style={{
                                background: 'linear-gradient(180deg, #38bdf8 0%, #0284c7 45%, #0369a1 80%, #075985 100%)',
                                boxShadow: `
                                    inset 0 1.5px 1.5px rgba(255, 255, 255, 0.9),
                                    inset 0 -2.5px 4px rgba(3, 105, 161, 0.9),
                                    0 6px 18px rgba(2, 132, 199, 0.55)
                                `,
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                            }}
                        >
                            <div className="absolute top-[2px] left-3.5 right-3.5 h-[42%] rounded-full bg-gradient-to-b from-white/70 to-transparent pointer-events-none" />
                            Pro plan
                        </button>
                    </div>

                </div>

            </div>

            {/* Bottom Credits / Tech Specs */}
            <div className="mt-12 text-center text-xs text-slate-400 font-medium">
                W[r]Digital Liquid Glass Design Engine &bull; Physics-based Fresnel refraction, caustics & prismatic dispersion
            </div>

        </div>
    );
}

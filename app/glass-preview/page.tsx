'use client';

import React, { useState } from 'react';
import { Search, Power, ChevronDown, Sparkles, X, Check, ArrowRight, RotateCcw } from 'lucide-react';

export default function GlassPreviewPage() {
    const [toggled, setToggled] = useState(true);
    const [searchValue, setSearchValue] = useState('With suggestions');

    return (
        <div className="min-h-screen bg-[#e8ecf2] text-slate-800 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 relative overflow-hidden select-none">
            
            {/* Studio Floor Background with Natural Top-Left Lighting */}
            <div 
                className="absolute inset-0 -z-30"
                style={{
                    background: 'radial-gradient(circle at 45% 8%, #ffffff 0%, #edf1f7 35%, #e1e7f0 70%, #d4dce8 100%)'
                }}
            />

            {/* Ambient Lighting Dome */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-white/70 rounded-full blur-3xl -z-20 pointer-events-none" />

            {/* Header */}
            <div className="text-center mb-10 max-w-lg relative z-10">
                <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-[11px] font-extrabold tracking-widest uppercase bg-white/70 border border-white text-slate-700 shadow-sm mb-3 backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Liquid Glass System 2026
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    Hyper-Realistic 3D Glass UI
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
                    Smussatura ottica Fresnel, dispersione cromatica RGB e nuclei volumetrici 3D.
                </p>
            </div>

            {/* UI Canvas Stage (Exact 1:1 Pixel-Perfect Layout) */}
            <div className="w-full max-w-[490px] flex flex-col gap-6 relative z-10">

                {/* =========================================================================
                    ROW 1: START PROJECT (ORANGE CORE), SECONDARY, POWER BUTTON
                ========================================================================= */}
                <div className="flex items-center gap-4 justify-between">
                    
                    {/* START PROJECT PILL */}
                    <div 
                        className="flex-[1.35] h-[64px] p-[5px] rounded-full relative cursor-pointer group transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.06) 40%, rgba(240,246,255,0.12) 70%, rgba(255,255,255,0.35) 100%)',
                            backdropFilter: 'blur(20px) saturate(200%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                            border: '1.5px solid rgba(255,255,255,0.92)',
                            boxShadow: `
                                inset 0 2px 1.5px 0 #ffffff,
                                inset 0 -2.5px 4px 0 rgba(100,120,150,0.22),
                                inset 0 4px 8px -2px rgba(255,255,255,0.6),
                                0 4px 10px rgba(0,0,0,0.04),
                                0 16px 32px -4px rgba(45,65,95,0.2),
                                0 28px 56px -10px rgba(20,35,60,0.14)
                            `
                        }}
                    >
                        {/* Prismatic Rainbow Flare on Bottom-Right Edge */}
                        <div 
                            className="absolute -right-2 -bottom-2 w-20 h-16 pointer-events-none -z-10 rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(0,220,255,0.7) 0%, rgba(255,180,0,0.6) 35%, rgba(255,0,128,0.45) 65%, transparent 80%)',
                                filter: 'blur(7px)'
                            }}
                        />

                        {/* Orange Caustic Floor Glow */}
                        <div 
                            className="absolute -inset-2 rounded-full pointer-events-none -z-10"
                            style={{
                                background: 'radial-gradient(circle at 50% 95%, rgba(249,115,22,0.7) 0%, rgba(251,146,60,0.4) 45%, transparent 75%)',
                                filter: 'blur(10px)'
                            }}
                        />

                        {/* High-Gloss Candy Orange Inner Core */}
                        <div 
                            className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-[16px] tracking-tight relative overflow-hidden shadow-lg"
                            style={{
                                background: 'linear-gradient(180deg, #ff6e38 0%, #f45717 40%, #dc3c00 80%, #b82800 100%)',
                                boxShadow: 'inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.9), inset 0 -3px 5px 0 rgba(110, 15, 0, 0.7), 0 6px 18px rgba(220, 60, 0, 0.6)',
                                textShadow: '0 1px 2px rgba(0,0,0,0.35)'
                            }}
                        >
                            {/* Glass Specular Crescent */}
                            <div className="absolute top-[2px] left-3 right-3 h-[42%] rounded-full bg-gradient-to-b from-white/70 via-white/20 to-transparent pointer-events-none" />
                            Start project
                        </div>
                    </div>

                    {/* SECONDARY BUTTON */}
                    <div 
                        className="flex-1 h-[64px] p-[5px] rounded-full relative cursor-pointer group transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.06) 40%, rgba(240,246,255,0.12) 70%, rgba(255,255,255,0.35) 100%)',
                            backdropFilter: 'blur(20px) saturate(200%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                            border: '1.5px solid rgba(255,255,255,0.92)',
                            boxShadow: `
                                inset 0 2px 1.5px 0 #ffffff,
                                inset 0 -2.5px 4px 0 rgba(100,120,150,0.22),
                                inset 0 4px 8px -2px rgba(255,255,255,0.6),
                                0 4px 10px rgba(0,0,0,0.04),
                                0 16px 32px -4px rgba(45,65,95,0.2),
                                0 28px 56px -10px rgba(20,35,60,0.14)
                            `
                        }}
                    >
                        {/* Cyan/Blue Prismatic Flare */}
                        <div 
                            className="absolute -right-2 -bottom-2 w-20 h-16 pointer-events-none -z-10 rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(0,220,255,0.75) 0%, rgba(147,197,253,0.4) 40%, rgba(255,0,128,0.3) 65%, transparent 80%)',
                                filter: 'blur(7px)'
                            }}
                        />

                        <div 
                            className="w-full h-full rounded-full flex items-center justify-center text-slate-800 font-semibold text-[15.5px]"
                            style={{
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(240,246,255,0.1) 50%, rgba(220,235,250,0.3) 100%)',
                                boxShadow: 'inset 0 1.5px 1.5px rgba(255,255,255,0.9), inset 0 -1.5px 3px rgba(100,130,170,0.15)'
                            }}
                        >
                            Secondary
                        </div>
                    </div>

                    {/* POWER SQUARE BUTTON */}
                    <div 
                        className="w-[64px] h-[64px] p-[5px] rounded-[22px] relative flex-shrink-0 cursor-pointer group transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.06) 40%, rgba(240,246,255,0.12) 70%, rgba(255,255,255,0.35) 100%)',
                            backdropFilter: 'blur(20px) saturate(200%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                            border: '1.5px solid rgba(255,255,255,0.92)',
                            boxShadow: `
                                inset 0 2px 1.5px 0 #ffffff,
                                inset 0 -2.5px 4px 0 rgba(100,120,150,0.22),
                                inset 0 4px 8px -2px rgba(255,255,255,0.6),
                                0 4px 10px rgba(0,0,0,0.04),
                                0 16px 32px -4px rgba(45,65,95,0.2)
                            `
                        }}
                    >
                        {/* Rainbow flare */}
                        <div 
                            className="absolute -right-2 -bottom-2 w-16 h-16 pointer-events-none -z-10 rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(0,220,255,0.8) 0%, rgba(255,170,0,0.55) 35%, rgba(255,0,140,0.45) 60%, transparent 80%)',
                                filter: 'blur(6px)'
                            }}
                        />

                        <div 
                            className="w-full h-full rounded-[17px] flex items-center justify-center text-slate-800"
                            style={{
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(240,246,255,0.1) 50%, rgba(220,235,250,0.3) 100%)',
                                boxShadow: 'inset 0 1.5px 1.5px rgba(255,255,255,0.9), inset 0 -1.5px 3px rgba(100,130,170,0.15)'
                            }}
                        >
                            <Power className="w-[22px] h-[22px] stroke-[2.4]" />
                        </div>
                    </div>

                </div>

                {/* =========================================================================
                    ROW 2: SEARCH BAR WITH SUGGESTIONS & PLUS BUTTON
                ========================================================================= */}
                <div 
                    className="w-full h-[66px] p-[5px] rounded-full flex items-center justify-between relative"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.06) 40%, rgba(240,246,255,0.12) 70%, rgba(255,255,255,0.35) 100%)',
                        backdropFilter: 'blur(20px) saturate(200%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                        border: '1.5px solid rgba(255,255,255,0.92)',
                        boxShadow: `
                            inset 0 2px 1.5px 0 #ffffff,
                            inset 0 -2.5px 4px 0 rgba(100,120,150,0.22),
                            inset 0 4px 8px -2px rgba(255,255,255,0.6),
                            0 4px 10px rgba(0,0,0,0.04),
                            0 18px 36px -6px rgba(45,65,95,0.22)
                        `
                    }}
                >
                    {/* Rainbow Dispersion Flare on Right Cap */}
                    <div 
                        className="absolute right-0 top-0 bottom-0 w-28 rounded-full pointer-events-none -z-10"
                        style={{
                            background: 'radial-gradient(circle at 85% 50%, rgba(0,210,255,0.8) 0%, rgba(255,170,0,0.6) 35%, rgba(255,0,140,0.5) 60%, transparent 80%)',
                            filter: 'blur(8px)'
                        }}
                    />

                    {/* Inner Semi-Transparent Cutout */}
                    <div 
                        className="flex-1 h-full rounded-l-full pl-5 pr-3 flex items-center gap-3"
                        style={{
                            background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(245,248,252,0.5) 100%)',
                            boxShadow: 'inset 0 1.5px 2px rgba(255,255,255,0.95), inset 0 -1px 2px rgba(100,130,170,0.1)'
                        }}
                    >
                        <Search className="w-5 h-5 text-slate-600 stroke-[2.4] flex-shrink-0" />
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="bg-transparent border-none outline-none font-medium text-slate-800 text-[16px] w-full"
                        />
                    </div>

                    {/* Plus Cap */}
                    <button 
                        className="w-[56px] h-full rounded-r-full flex items-center justify-center text-slate-800 text-2xl font-light border-l border-white/60 hover:text-black transition-transform hover:scale-105 active:scale-95"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(215,235,255,0.2) 50%, rgba(255,230,200,0.2) 100%)',
                            boxShadow: 'inset 0 1.5px 1.5px rgba(255,255,255,0.9)'
                        }}
                    >
                        +
                    </button>
                </div>

                {/* =========================================================================
                    ROW 3: SELECT & EMERALD JELLY TOGGLE
                ========================================================================= */}
                <div className="flex items-center gap-4 justify-between">
                    
                    {/* SELECT PILL */}
                    <div 
                        className="flex-[1.4] h-[62px] p-[5px] pl-6 rounded-full flex items-center justify-between relative cursor-pointer group transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.06) 40%, rgba(240,246,255,0.12) 70%, rgba(255,255,255,0.35) 100%)',
                            backdropFilter: 'blur(20px) saturate(200%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                            border: '1.5px solid rgba(255,255,255,0.92)',
                            boxShadow: `
                                inset 0 2px 1.5px 0 #ffffff,
                                inset 0 -2.5px 4px 0 rgba(100,120,150,0.22),
                                inset 0 4px 8px -2px rgba(255,255,255,0.6),
                                0 16px 32px -4px rgba(45,65,95,0.2)
                            `
                        }}
                    >
                        <div className="flex items-center gap-3 text-slate-800 font-semibold text-[16px]">
                            <RotateCcw className="w-5 h-5 stroke-[2.4] text-slate-700" />
                            <span>Select</span>
                        </div>

                        <div 
                            className="w-[44px] h-[44px] rounded-[13px] flex items-center justify-center text-white mr-1 shadow-md"
                            style={{
                                background: 'linear-gradient(145deg, #34d399 0%, #059669 60%, #047857 100%)',
                                boxShadow: 'inset 0 1.5px 1.5px rgba(255, 255, 255, 0.8), inset 0 -2.5px 4px rgba(0, 0, 0, 0.4), 0 4px 14px rgba(5, 150, 105, 0.5)'
                            }}
                        >
                            <Check className="w-6 h-6 stroke-[3.2]" />
                        </div>
                    </div>

                    {/* EMERALD JELLY TOGGLE */}
                    <div 
                        onClick={() => setToggled(!toggled)}
                        className="w-[104px] h-[58px] p-1 rounded-full relative cursor-pointer transition-all duration-300 flex-shrink-0"
                        style={{
                            background: toggled 
                                ? 'linear-gradient(135deg, rgba(20, 184, 166, 0.75) 0%, rgba(13, 148, 136, 0.55) 50%, rgba(15, 118, 110, 0.65) 100%)' 
                                : 'linear-gradient(135deg, rgba(148, 163, 184, 0.4) 0%, rgba(100, 116, 139, 0.25) 100%)',
                            backdropFilter: 'blur(16px)',
                            border: '1.5px solid rgba(255,255,255,0.92)',
                            boxShadow: 'inset 0 2px 3px rgba(255, 255, 255, 0.9), inset 0 -3px 6px rgba(0, 0, 0, 0.25), 0 14px 28px -4px rgba(13, 148, 136, 0.45), 0 6px 12px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        {/* Cyan-Green Caustic Floor Glow */}
                        <div 
                            className="absolute -inset-1.5 rounded-full pointer-events-none -z-10"
                            style={{
                                background: 'radial-gradient(circle at 75% 85%, rgba(20,184,166,0.8) 0%, rgba(45,212,191,0.5) 40%, transparent 70%)',
                                filter: 'blur(8px)'
                            }}
                        />

                        {/* Ceramic 3D White Knob with Top Specular Glow */}
                        <div 
                            className="w-[46px] h-[46px] rounded-full absolute top-[5px] transition-all duration-300 ease-out"
                            style={{
                                left: toggled ? 'calc(100% - 51px)' : '5px',
                                background: 'radial-gradient(circle at 35% 25%, #ffffff 0%, #f1f5f9 55%, #cbd5e1 100%)',
                                boxShadow: '0 6px 14px rgba(0, 0, 0, 0.28), 0 2px 4px rgba(0, 0, 0, 0.12), inset 0 1.5px 1.5px #ffffff'
                            }}
                        />
                    </div>

                </div>

                {/* =========================================================================
                    ROW 4: TABS & TOAST CAPSULES
                ========================================================================= */}
                <div className="flex items-center gap-4 justify-between">
                    
                    {/* TABS PILL */}
                    <div 
                        className="flex-1 h-[56px] px-6 rounded-full flex items-center justify-center gap-2.5 text-slate-800 font-semibold text-[15px] cursor-pointer hover:-translate-y-0.5 transition-all"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.06) 40%, rgba(240,246,255,0.12) 70%, rgba(255,255,255,0.35) 100%)',
                            backdropFilter: 'blur(20px) saturate(200%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                            border: '1.5px solid rgba(255,255,255,0.92)',
                            boxShadow: `
                                inset 0 2px 1.5px 0 #ffffff,
                                inset 0 -2.5px 4px 0 rgba(100,120,150,0.22),
                                inset 0 4px 8px -2px rgba(255,255,255,0.6),
                                0 16px 32px -4px rgba(45,65,95,0.2)
                            `
                        }}
                    >
                        <ChevronDown className="w-5 h-5 stroke-[2.6]" />
                        <span>Tabs</span>
                    </div>

                    {/* TOAST PILL WITH AMBER BEZEL */}
                    <div 
                        className="flex-1 h-[56px] p-[5px] rounded-full relative cursor-pointer hover:-translate-y-0.5 transition-all"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.06) 40%, rgba(240,246,255,0.12) 70%, rgba(255,255,255,0.35) 100%)',
                            backdropFilter: 'blur(20px) saturate(200%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                            border: '1.5px solid rgba(255,255,255,0.92)',
                            boxShadow: `
                                inset 0 2px 1.5px 0 #ffffff,
                                inset 0 -2.5px 4px 0 rgba(100,120,150,0.22),
                                inset 0 4px 8px -2px rgba(255,255,255,0.6),
                                0 16px 32px -4px rgba(45,65,95,0.2)
                            `
                        }}
                    >
                        {/* Amber Caustic Rim */}
                        <div 
                            className="w-full h-full rounded-full flex items-center justify-center gap-2 text-slate-800 font-semibold text-[15px] border-[1.5px] border-amber-500/65"
                            style={{
                                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 245, 230, 0.15) 100%)',
                                boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.9), 0 2px 8px rgba(245, 158, 11, 0.2)'
                            }}
                        >
                            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400/30" />
                            <span>Toast</span>
                        </div>
                    </div>

                </div>

                {/* =========================================================================
                    ROW 5: PRISMATIC GLASS CARD & DIALOG
                ========================================================================= */}
                <div className="flex items-stretch gap-4 justify-between">
                    
                    {/* PRISMATIC GLASS CARD */}
                    <div 
                        className="flex-1 h-[155px] p-6 rounded-[28px] flex items-end justify-end text-slate-800 font-semibold text-[17px] relative overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,245,240,0.12) 25%, rgba(230,250,255,0.18) 60%, rgba(255,255,255,0.4) 100%)',
                            backdropFilter: 'blur(20px) saturate(200%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                            border: '1.5px solid rgba(255,255,255,0.92)',
                            boxShadow: `
                                inset 0 2px 1.5px 0 #ffffff,
                                inset 0 -2.5px 4px 0 rgba(100,120,150,0.22),
                                inset 0 4px 8px -2px rgba(255,255,255,0.6),
                                0 20px 45px -8px rgba(45,65,95,0.24)
                            `
                        }}
                    >
                        {/* Rainbow Pearlescent internal sheen */}
                        <div 
                            className="absolute -inset-10 pointer-events-none"
                            style={{
                                background: 'radial-gradient(circle at 40% 40%, rgba(255,220,240,0.45) 0%, rgba(220,245,255,0.35) 30%, rgba(255,255,255,0.4) 50%, transparent 70%)'
                            }}
                        />
                        <span className="relative z-10">Card</span>
                    </div>

                    {/* PRO PLAN FLOATING GLASS MODAL */}
                    <div 
                        className="flex-[1.25] h-[155px] p-4 px-5 rounded-[28px] flex flex-col justify-between relative"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(240,246,255,0.18) 100%)',
                            backdropFilter: 'blur(20px) saturate(200%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                            border: '1.5px solid rgba(255,255,255,0.92)',
                            boxShadow: `
                                inset 0 2px 1.5px 0 #ffffff,
                                inset 0 -2.5px 4px 0 rgba(100,120,150,0.22),
                                inset 0 4px 8px -2px rgba(255,255,255,0.6),
                                0 20px 45px -8px rgba(45,65,95,0.24)
                            `
                        }}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-bold text-slate-900 text-[16px] leading-tight">Find files...</h3>
                                <p className="text-[13.5px] text-slate-500 font-medium">Add collaborator</p>
                            </div>
                            <X className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-700" />
                        </div>

                        {/* Glossy Cobalt Blue Core */}
                        <button 
                            className="w-full h-[44px] rounded-full text-white font-bold text-[15px] tracking-tight hover:brightness-105 active:scale-98 transition-all shadow-md relative overflow-hidden"
                            style={{
                                background: 'linear-gradient(180deg, #38bdf8 0%, #0284c7 45%, #0369a1 80%, #075985 100%)',
                                boxShadow: 'inset 0 1.5px 1.5px rgba(255, 255, 255, 0.9), inset 0 -2.5px 4px rgba(3, 105, 161, 0.9), 0 6px 18px rgba(2, 132, 199, 0.55)',
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                            }}
                        >
                            <div className="absolute top-[2px] left-3 right-3 h-[40%] rounded-full bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
                            Pro plan
                        </button>
                    </div>

                </div>

            </div>

            {/* Back to Home */}
            <div className="mt-12 text-center">
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

'use client';

import React, { useState } from 'react';
import { Search, Power, ChevronDown, Sparkles, X, Check, ArrowRight, RotateCcw } from 'lucide-react';

export default function GlassPreviewPage() {
    const [toggled, setToggled] = useState(true);
    const [searchValue, setSearchValue] = useState('With suggestions');

    return (
        <div className="min-h-screen bg-[#e8ecf2] text-slate-800 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 relative overflow-hidden select-none">
            
            {/* Global Studio Illumination & Soft Floor Gradient */}
            <div 
                className="absolute inset-0 -z-10"
                style={{
                    background: 'radial-gradient(circle at 50% 10%, #ffffff 0%, #eef2f7 40%, #e2e8f0 75%, #d5dde8 100%)'
                }}
            />
            
            {/* Ambient Lighting Dome */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-white/60 rounded-full blur-3xl -z-10 pointer-events-none" />

            {/* Header */}
            <div className="text-center mb-10 max-w-lg">
                <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-[11px] font-extrabold tracking-widest uppercase bg-white/80 border border-white text-slate-700 shadow-sm mb-3 backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Liquid Glass System 2026
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    Hyper-Realistic 3D Glass UI
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
                    Riproduzione 1:1 con lenti in cristallo spesso, riflessi speculari Fresnel, dispersione arcobaleno e nuclei volumetrici.
                </p>
            </div>

            {/* UI Canvas Stage (Exact 1:1 Layout) */}
            <div className="w-full max-w-[500px] flex flex-col gap-6 relative z-10">

                {/* =========================================================================
                    ROW 1: START PROJECT (ORANGE CORE), SECONDARY, POWER BUTTON
                ========================================================================= */}
                <div className="flex items-center gap-4 justify-between">
                    
                    {/* START PROJECT PILL */}
                    <div 
                        className="flex-[1.35] h-[64px] p-[5px] rounded-full relative cursor-pointer group transition-all duration-300 hover:-translate-y-0.5"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.2) 40%, rgba(240,246,255,0.3) 70%, rgba(255,255,255,0.7) 100%)',
                            backdropFilter: 'blur(24px) saturate(200%)',
                            WebkitBackdropFilter: 'blur(24px) saturate(200%)',
                            boxShadow: `
                                inset 0 2px 1.5px 0 rgba(255,255,255,1),
                                inset 0 0 0 1px rgba(255,255,255,0.8),
                                inset 0 -3px 6px 0 rgba(100,120,150,0.25),
                                0 4px 8px rgba(0,0,0,0.04),
                                0 18px 36px -6px rgba(45,65,95,0.22),
                                0 28px 56px -12px rgba(20,35,60,0.12)
                            `
                        }}
                    >
                        {/* Orange Caustic Floor Flare */}
                        <div 
                            className="absolute -inset-1.5 rounded-full pointer-events-none -z-10"
                            style={{
                                background: 'radial-gradient(circle at 50% 90%, rgba(249,115,22,0.65) 0%, rgba(251,146,60,0.35) 45%, transparent 75%)',
                                filter: 'blur(10px)'
                            }}
                        />

                        {/* Glossy Orange Floating Core */}
                        <div 
                            className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-[16px] tracking-tight relative overflow-hidden shadow-lg transition-transform group-hover:scale-[1.01]"
                            style={{
                                background: 'linear-gradient(180deg, #ff7441 0%, #f95f24 45%, #e44307 80%, #c23200 100%)',
                                boxShadow: 'inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.8), inset 0 -2.5px 4px 0 rgba(120, 20, 0, 0.6), 0 6px 18px rgba(228, 67, 7, 0.55)',
                                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                            }}
                        >
                            {/* Specular Glint */}
                            <div className="absolute top-[2px] left-3 right-3 h-[38%] rounded-full bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
                            Start project
                        </div>
                    </div>

                    {/* SECONDARY BUTTON */}
                    <div 
                        className="flex-1 h-[64px] p-[5px] rounded-full relative cursor-pointer group transition-all duration-300 hover:-translate-y-0.5"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.2) 40%, rgba(240,246,255,0.3) 70%, rgba(255,255,255,0.7) 100%)',
                            backdropFilter: 'blur(24px) saturate(200%)',
                            WebkitBackdropFilter: 'blur(24px) saturate(200%)',
                            boxShadow: `
                                inset 0 2px 1.5px 0 rgba(255,255,255,1),
                                inset 0 0 0 1px rgba(255,255,255,0.8),
                                inset 0 -3px 6px 0 rgba(100,120,150,0.25),
                                0 4px 8px rgba(0,0,0,0.04),
                                0 18px 36px -6px rgba(45,65,95,0.22),
                                0 28px 56px -12px rgba(20,35,60,0.12)
                            `
                        }}
                    >
                        {/* Cyan/Blue Dispersion Flare */}
                        <div 
                            className="absolute -inset-1.5 rounded-full pointer-events-none -z-10"
                            style={{
                                background: 'radial-gradient(circle at 85% 85%, rgba(0,210,255,0.65) 0%, rgba(147,197,253,0.35) 40%, transparent 70%)',
                                filter: 'blur(8px)'
                            }}
                        />

                        <div 
                            className="w-full h-full rounded-full flex items-center justify-center text-slate-800 font-semibold text-[15.5px]"
                            style={{
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(235,242,250,0.55) 50%, rgba(215,228,245,0.65) 100%)',
                                boxShadow: 'inset 0 1.5px 1.5px rgba(255,255,255,0.95), inset 0 -1.5px 3px rgba(100,130,170,0.2), 0 4px 12px rgba(70,90,120,0.12)'
                            }}
                        >
                            Secondary
                        </div>
                    </div>

                    {/* POWER SQUARE BUTTON */}
                    <div 
                        className="w-[64px] h-[64px] p-[5px] rounded-[22px] relative flex-shrink-0 cursor-pointer group transition-all duration-300 hover:-translate-y-0.5"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.2) 40%, rgba(240,246,255,0.3) 70%, rgba(255,255,255,0.7) 100%)',
                            backdropFilter: 'blur(24px) saturate(200%)',
                            WebkitBackdropFilter: 'blur(24px) saturate(200%)',
                            boxShadow: `
                                inset 0 2px 1.5px 0 rgba(255,255,255,1),
                                inset 0 0 0 1px rgba(255,255,255,0.8),
                                inset 0 -3px 6px 0 rgba(100,120,150,0.25),
                                0 4px 8px rgba(0,0,0,0.04),
                                0 18px 36px -6px rgba(45,65,95,0.22)
                            `
                        }}
                    >
                        {/* Rainbow flare */}
                        <div 
                            className="absolute -inset-1.5 rounded-[22px] pointer-events-none -z-10"
                            style={{
                                background: 'radial-gradient(circle at 85% 85%, rgba(0,210,255,0.7) 0%, rgba(255,170,0,0.5) 30%, rgba(255,0,140,0.4) 50%, transparent 70%)',
                                filter: 'blur(7px)'
                            }}
                        />

                        <div 
                            className="w-full h-full rounded-[17px] flex items-center justify-center text-slate-800"
                            style={{
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(235,242,250,0.55) 50%, rgba(215,228,245,0.65) 100%)',
                                boxShadow: 'inset 0 1.5px 1.5px rgba(255,255,255,0.95), inset 0 -1.5px 3px rgba(100,130,170,0.2)'
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
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.2) 40%, rgba(240,246,255,0.3) 70%, rgba(255,255,255,0.7) 100%)',
                        backdropFilter: 'blur(24px) saturate(200%)',
                        WebkitBackdropFilter: 'blur(24px) saturate(200%)',
                        boxShadow: `
                            inset 0 2px 1.5px 0 rgba(255,255,255,1),
                            inset 0 0 0 1px rgba(255,255,255,0.8),
                            inset 0 -3px 6px 0 rgba(100,120,150,0.25),
                            0 4px 8px rgba(0,0,0,0.04),
                            0 20px 42px -8px rgba(45,65,95,0.24)
                        `
                    }}
                >
                    {/* Rainbow Dispersion Flare on Right Cap */}
                    <div 
                        className="absolute right-0 top-0 bottom-0 w-28 rounded-full pointer-events-none -z-10"
                        style={{
                            background: 'radial-gradient(circle at 85% 50%, rgba(0,210,255,0.75) 0%, rgba(255,170,0,0.55) 35%, rgba(255,0,140,0.45) 55%, transparent 75%)',
                            filter: 'blur(8px)'
                        }}
                    />

                    {/* Inner Search Cutout */}
                    <div 
                        className="flex-1 h-full rounded-l-full pl-5 pr-3 flex items-center gap-3"
                        style={{
                            background: 'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(245,248,252,0.8) 100%)',
                            boxShadow: 'inset 0 1.5px 2px rgba(255,255,255,1), inset 0 -1px 2px rgba(100,130,170,0.15)'
                        }}
                    >
                        <Search className="w-5 h-5 text-slate-500 stroke-[2.4] flex-shrink-0" />
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="bg-transparent border-none outline-none font-medium text-slate-700 text-[16px] w-full"
                        />
                    </div>

                    {/* Plus Cap */}
                    <button 
                        className="w-[56px] h-full rounded-r-full flex items-center justify-center text-slate-700 text-2xl font-light border-l border-white/80 hover:text-black transition-transform hover:scale-105 active:scale-95"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(215,235,255,0.55) 50%, rgba(255,230,200,0.45) 100%)',
                            boxShadow: 'inset 0 1.5px 1.5px rgba(255,255,255,0.95)'
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
                        className="flex-[1.4] h-[62px] p-[5px] pl-6 rounded-full flex items-center justify-between relative cursor-pointer group transition-all duration-300 hover:-translate-y-0.5"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.2) 40%, rgba(240,246,255,0.3) 70%, rgba(255,255,255,0.7) 100%)',
                            backdropFilter: 'blur(24px) saturate(200%)',
                            WebkitBackdropFilter: 'blur(24px) saturate(200%)',
                            boxShadow: `
                                inset 0 2px 1.5px 0 rgba(255,255,255,1),
                                inset 0 0 0 1px rgba(255,255,255,0.8),
                                inset 0 -3px 6px 0 rgba(100,120,150,0.25),
                                0 18px 36px -6px rgba(45,65,95,0.22)
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
                                boxShadow: 'inset 0 1.5px 1.5px rgba(255, 255, 255, 0.7), inset 0 -2px 4px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(5, 150, 105, 0.45)'
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
                                ? 'linear-gradient(135deg, rgba(20, 184, 166, 0.8) 0%, rgba(13, 148, 136, 0.6) 50%, rgba(15, 118, 110, 0.7) 100%)' 
                                : 'linear-gradient(135deg, rgba(148, 163, 184, 0.5) 0%, rgba(100, 116, 139, 0.4) 100%)',
                            boxShadow: 'inset 0 2px 3px rgba(255, 255, 255, 0.85), inset 0 -3px 6px rgba(0, 0, 0, 0.25), 0 14px 28px -4px rgba(13, 148, 136, 0.45), 0 6px 12px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        {/* Cyan-Green Caustic Floor Glow */}
                        <div 
                            className="absolute -inset-1.5 rounded-full pointer-events-none -z-10"
                            style={{
                                background: 'radial-gradient(circle at 75% 85%, rgba(20,184,166,0.75) 0%, rgba(45,212,191,0.45) 40%, transparent 70%)',
                                filter: 'blur(8px)'
                            }}
                        />

                        {/* Ceramic White Knob */}
                        <div 
                            className="w-[46px] h-[46px] rounded-full absolute top-[5px] transition-all duration-300 ease-out"
                            style={{
                                left: toggled ? 'calc(100% - 51px)' : '5px',
                                background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #f1f5f9 55%, #cbd5e1 100%)',
                                boxShadow: '0 6px 14px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1.5px 1.5px rgba(255, 255, 255, 1)'
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
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.2) 40%, rgba(240,246,255,0.3) 70%, rgba(255,255,255,0.7) 100%)',
                            backdropFilter: 'blur(24px) saturate(200%)',
                            WebkitBackdropFilter: 'blur(24px) saturate(200%)',
                            boxShadow: `
                                inset 0 2px 1.5px 0 rgba(255,255,255,1),
                                inset 0 0 0 1px rgba(255,255,255,0.8),
                                inset 0 -3px 6px 0 rgba(100,120,150,0.25),
                                0 18px 36px -6px rgba(45,65,95,0.2)
                            `
                        }}
                    >
                        <ChevronDown className="w-5 h-5 stroke-[2.6]" />
                        <span>Tabs</span>
                    </div>

                    {/* TOAST PILL WITH AMBER RIM */}
                    <div 
                        className="flex-1 h-[56px] p-[5px] rounded-full relative cursor-pointer hover:-translate-y-0.5 transition-all"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.2) 40%, rgba(240,246,255,0.3) 70%, rgba(255,255,255,0.7) 100%)',
                            backdropFilter: 'blur(24px) saturate(200%)',
                            WebkitBackdropFilter: 'blur(24px) saturate(200%)',
                            boxShadow: `
                                inset 0 2px 1.5px 0 rgba(255,255,255,1),
                                inset 0 0 0 1px rgba(255,255,255,0.8),
                                inset 0 -3px 6px 0 rgba(100,120,150,0.25),
                                0 18px 36px -6px rgba(45,65,95,0.2)
                            `
                        }}
                    >
                        {/* Amber Caustic Rim */}
                        <div 
                            className="w-full h-full rounded-full flex items-center justify-center gap-2 text-slate-800 font-semibold text-[15px] border-[1.5px] border-amber-500/60"
                            style={{
                                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 245, 230, 0.35) 100%)',
                                boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.85), 0 2px 8px rgba(245, 158, 11, 0.18)'
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
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,245,240,0.4) 25%, rgba(230,250,255,0.45) 60%, rgba(255,255,255,0.8) 100%)',
                            backdropFilter: 'blur(24px) saturate(200%)',
                            WebkitBackdropFilter: 'blur(24px) saturate(200%)',
                            boxShadow: `
                                inset 0 2px 1.5px 0 rgba(255,255,255,1),
                                inset 0 0 0 1px rgba(255,255,255,0.8),
                                inset 0 -3px 6px 0 rgba(100,120,150,0.25),
                                0 24px 50px -10px rgba(45,65,95,0.24)
                            `
                        }}
                    >
                        {/* Rainbow Pearlescent internal sheen */}
                        <div 
                            className="absolute -inset-10 pointer-events-none"
                            style={{
                                background: 'radial-gradient(circle at 40% 40%, rgba(255,220,240,0.45) 0%, rgba(220,245,255,0.4) 30%, rgba(255,255,255,0.5) 50%, transparent 70%)'
                            }}
                        />
                        <span className="relative z-10">Card</span>
                    </div>

                    {/* PRO PLAN FLOATING GLASS MODAL */}
                    <div 
                        className="flex-[1.25] h-[155px] p-4 px-5 rounded-[28px] flex flex-col justify-between relative"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,246,255,0.5) 100%)',
                            backdropFilter: 'blur(24px) saturate(200%)',
                            WebkitBackdropFilter: 'blur(24px) saturate(200%)',
                            boxShadow: `
                                inset 0 2px 1.5px 0 rgba(255,255,255,1),
                                inset 0 0 0 1px rgba(255,255,255,0.8),
                                inset 0 -3px 6px 0 rgba(100,120,150,0.25),
                                0 24px 50px -10px rgba(45,65,95,0.24)
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
                            className="w-full h-[44px] rounded-full text-white font-bold text-[15px] tracking-tight hover:brightness-105 active:scale-98 transition-all shadow-md"
                            style={{
                                background: 'linear-gradient(180deg, #38bdf8 0%, #0284c7 45%, #0369a1 80%, #075985 100%)',
                                boxShadow: 'inset 0 1.5px 1.5px rgba(255, 255, 255, 0.85), inset 0 -2.5px 4px rgba(3, 105, 161, 0.85), 0 6px 18px rgba(2, 132, 199, 0.5)',
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                            }}
                        >
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

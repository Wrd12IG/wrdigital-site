'use client';

import React, { useState, useRef } from 'react';
import { Search, Power, X, Check, ChevronsUpDown, RotateCcw, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GlassPreviewPage() {
    const [toggled, setToggled] = useState(true);
    const [searchValue, setSearchValue] = useState('With suggestions');
    const [selectedActive, setSelectedActive] = useState(true);

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        setMousePos({ x, y });
    };

    const handleMouseLeave = () => {
        setMousePos({ x: 0, y: 0 });
    };

    return (
        <main 
            className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8 select-none"
            style={{
                backgroundColor: '#e6e8ec',
                backgroundImage: `
                    radial-gradient(circle at 50% 15%, #ffffff 0%, #eef0f4 40%, #e2e5eb 75%, #d5d9e2 100%)
                `
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Top Diffused Studio Light */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-white/70 rounded-full blur-[140px] pointer-events-none -z-10" />

            {/* 3D Tilted UI Board */}
            <motion.div 
                ref={cardRef}
                animate={{
                    rotateX: mousePos.y * -3,
                    rotateY: mousePos.x * 3,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="w-full max-w-[460px] flex flex-col gap-[22px] relative z-10 py-6"
                style={{
                    transformStyle: 'preserve-3d',
                }}
            >

                {/* =========================================================================
                    ROW 1: START PROJECT | SECONDARY | POWER
                ========================================================================= */}
                <div className="flex items-center gap-[14px] justify-between">
                    
                    {/* 1. START PROJECT */}
                    <div 
                        className="flex-[1.42] h-[64px] rounded-full relative cursor-pointer active:scale-[0.98] transition-transform"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.45) 100%)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            padding: '4px',
                            boxShadow: `
                                0 2px 4px rgba(0, 0, 0, 0.04),
                                0 14px 28px -4px rgba(35, 45, 65, 0.16),
                                0 24px 44px -8px rgba(25, 35, 55, 0.12),
                                inset 0 2px 2px #ffffff,
                                inset 0 -2px 3px rgba(70, 85, 110, 0.25),
                                inset 1px 0 2px rgba(255, 255, 255, 0.8),
                                inset -1px 0 2px rgba(255, 255, 255, 0.8)
                            `,
                            border: '1.2px solid rgba(255, 255, 255, 0.95)'
                        }}
                    >
                        {/* Orange Floor Caustic */}
                        <div 
                            className="absolute -inset-2.5 rounded-full pointer-events-none -z-10"
                            style={{
                                background: 'radial-gradient(circle at 45% 95%, rgba(249, 115, 22, 0.6) 0%, rgba(251, 146, 60, 0.35) 45%, transparent 75%)',
                                filter: 'blur(10px)'
                            }}
                        />

                        {/* Prismatic Rainbow Dispersion Flare (Bottom-Right) */}
                        <div 
                            className="absolute -right-2 -bottom-2 w-16 h-14 pointer-events-none -z-10 rounded-full"
                            style={{
                                background: 'radial-gradient(circle at 60% 60%, rgba(0, 220, 255, 0.9) 0%, rgba(255, 190, 0, 0.75) 35%, rgba(255, 0, 130, 0.6) 65%, transparent 80%)',
                                filter: 'blur(5px)'
                            }}
                        />

                        {/* Inner Orange Candy Pill */}
                        <div 
                            className="w-full h-full rounded-full flex items-center justify-center text-white font-semibold text-[15.5px] tracking-tight relative overflow-hidden"
                            style={{
                                background: 'linear-gradient(180deg, #ff6a30 0%, #f35016 38%, #e03a00 80%, #b82800 100%)',
                                boxShadow: `
                                    inset 0 1.5px 2px rgba(255, 255, 255, 0.95),
                                    inset 0 -2.5px 4px rgba(120, 20, 0, 0.7),
                                    0 4px 14px rgba(220, 60, 0, 0.45)
                                `,
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.25)'
                            }}
                        >
                            {/* Curved Glass Specular Highlight */}
                            <div 
                                className="absolute top-[2px] left-3.5 right-3.5 h-[44%] rounded-full pointer-events-none"
                                style={{
                                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 65%, transparent 100%)'
                                }}
                            />
                            Start project
                        </div>
                    </div>

                    {/* 2. SECONDARY */}
                    <div 
                        className="flex-1 h-[64px] rounded-full relative cursor-pointer active:scale-[0.98] transition-transform flex items-center justify-center"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.1) 45%, rgba(230, 242, 255, 0.3) 80%, rgba(255, 255, 255, 0.5) 100%)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            padding: '4px',
                            boxShadow: `
                                0 2px 4px rgba(0, 0, 0, 0.04),
                                0 14px 28px -4px rgba(35, 45, 65, 0.16),
                                0 24px 44px -8px rgba(25, 35, 55, 0.12),
                                inset 0 2px 2px #ffffff,
                                inset 0 -2px 3px rgba(70, 85, 110, 0.25),
                                inset 1px 0 2px rgba(255, 255, 255, 0.8),
                                inset -1px 0 2px rgba(255, 255, 255, 0.8)
                            `,
                            border: '1.2px solid rgba(255, 255, 255, 0.95)'
                        }}
                    >
                        {/* Cyan Floor Caustic */}
                        <div 
                            className="absolute -inset-2.5 rounded-full pointer-events-none -z-10"
                            style={{
                                background: 'radial-gradient(circle at 65% 95%, rgba(56, 189, 248, 0.6) 0%, rgba(147, 197, 253, 0.3) 45%, transparent 75%)',
                                filter: 'blur(10px)'
                            }}
                        />

                        {/* Prismatic Rainbow Flare on Bottom-Right */}
                        <div 
                            className="absolute -right-2 -bottom-2 w-14 h-12 pointer-events-none -z-10 rounded-full"
                            style={{
                                background: 'radial-gradient(circle at 60% 60%, rgba(0, 210, 255, 0.85) 0%, rgba(255, 180, 0, 0.65) 35%, rgba(255, 0, 130, 0.5) 65%, transparent 80%)',
                                filter: 'blur(5px)'
                            }}
                        />

                        {/* Floating Dark Slate Text */}
                        <span className="font-semibold text-slate-800 text-[15.5px] tracking-tight relative z-10">
                            Secondary
                        </span>
                    </div>

                    {/* 3. POWER SQUIRCLE */}
                    <div 
                        className="w-[64px] h-[64px] rounded-[22px] relative flex-shrink-0 cursor-pointer active:scale-[0.98] transition-transform flex items-center justify-center"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.1) 45%, rgba(230, 242, 255, 0.3) 80%, rgba(255, 255, 255, 0.5) 100%)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            boxShadow: `
                                0 2px 4px rgba(0, 0, 0, 0.04),
                                0 14px 28px -4px rgba(35, 45, 65, 0.16),
                                0 24px 44px -8px rgba(25, 35, 55, 0.12),
                                inset 0 2px 2px #ffffff,
                                inset 0 -2px 3px rgba(70, 85, 110, 0.25),
                                inset 1px 0 2px rgba(255, 255, 255, 0.8),
                                inset -1px 0 2px rgba(255, 255, 255, 0.8)
                            `,
                            border: '1.2px solid rgba(255, 255, 255, 0.95)'
                        }}
                    >
                        {/* Prismatic Rainbow Flare on Bottom-Right Corner */}
                        <div 
                            className="absolute -right-2 -bottom-2 w-14 h-12 pointer-events-none -z-10 rounded-full"
                            style={{
                                background: 'radial-gradient(circle at 60% 60%, rgba(0, 220, 255, 0.9) 0%, rgba(255, 180, 0, 0.7) 35%, rgba(255, 0, 140, 0.55) 65%, transparent 80%)',
                                filter: 'blur(5px)'
                            }}
                        />

                        {/* Power Icon */}
                        <Power className="w-[22px] h-[22px] text-slate-800 stroke-[2.4] relative z-10" />
                    </div>

                </div>

                {/* =========================================================================
                    ROW 2: SEARCH BAR ("With suggestions" + PLUS)
                ========================================================================= */}
                <div 
                    className="w-full h-[64px] rounded-full flex items-center justify-between relative"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.45) 100%)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        padding: '4px',
                        boxShadow: `
                            0 2px 4px rgba(0, 0, 0, 0.04),
                            0 14px 30px -4px rgba(35, 45, 65, 0.16),
                            0 26px 48px -8px rgba(25, 35, 55, 0.12),
                            inset 0 2px 2px #ffffff,
                            inset 0 -2px 3px rgba(70, 85, 110, 0.25),
                            inset 1px 0 2px rgba(255, 255, 255, 0.8),
                            inset -1px 0 2px rgba(255, 255, 255, 0.8)
                        `,
                        border: '1.2px solid rgba(255, 255, 255, 0.95)'
                    }}
                >
                    {/* Prismatic Rainbow Dispersion Flare on Right Cap */}
                    <div 
                        className="absolute right-0 top-0 bottom-0 w-24 rounded-full pointer-events-none -z-10"
                        style={{
                            background: 'radial-gradient(circle at 85% 65%, rgba(0, 220, 255, 0.9) 0%, rgba(255, 185, 0, 0.7) 35%, rgba(255, 0, 140, 0.55) 60%, transparent 80%)',
                            filter: 'blur(7px)'
                        }}
                    />

                    {/* Left Frosted Input Box */}
                    <div 
                        className="flex-1 h-full rounded-l-full flex items-center gap-3 pl-4 pr-3 mr-1"
                        style={{
                            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.88) 0%, rgba(240, 243, 248, 0.6) 100%)',
                            boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.9), inset 0 -1px 2px rgba(70, 85, 110, 0.08)'
                        }}
                    >
                        <Search className="w-[18px] h-[18px] text-slate-600 stroke-[2.4] flex-shrink-0" />
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="bg-transparent border-none outline-none font-medium text-slate-700 text-[15.5px] w-full placeholder-slate-400 tracking-tight"
                            placeholder="With suggestions"
                        />
                    </div>

                    {/* Right Partitioned Glass Button with Plus Sign */}
                    <button 
                        className="w-[56px] h-full rounded-r-full flex items-center justify-center text-slate-800 transition-transform active:scale-95"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(225, 240, 255, 0.2) 50%, rgba(255, 235, 210, 0.25) 100%)',
                            boxShadow: 'inset 0 1.5px 1.5px rgba(255, 255, 255, 0.9), inset 1px 0 0 rgba(255, 255, 255, 0.7)'
                        }}
                    >
                        <Plus className="w-5 h-5 stroke-[2.4]" />
                    </button>
                </div>

                {/* =========================================================================
                    ROW 3: SELECT | TOGGLE SWITCH
                ========================================================================= */}
                <div className="flex items-center gap-[14px] justify-between">
                    
                    {/* SELECT PILL */}
                    <div 
                        onClick={() => setSelectedActive(!selectedActive)}
                        className="flex-[1.42] h-[62px] rounded-full flex items-center justify-between relative cursor-pointer active:scale-[0.98] transition-transform"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.45) 100%)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            padding: '4px 5px 4px 18px',
                            boxShadow: `
                                0 2px 4px rgba(0, 0, 0, 0.04),
                                0 14px 28px -4px rgba(35, 45, 65, 0.16),
                                0 24px 44px -8px rgba(25, 35, 55, 0.12),
                                inset 0 2px 2px #ffffff,
                                inset 0 -2px 3px rgba(70, 85, 110, 0.25),
                                inset 1px 0 2px rgba(255, 255, 255, 0.8),
                                inset -1px 0 2px rgba(255, 255, 255, 0.8)
                            `,
                            border: '1.2px solid rgba(255, 255, 255, 0.95)'
                        }}
                    >
                        {/* Reload Icon + Select Label */}
                        <div className="flex items-center gap-2.5 text-slate-800 font-semibold text-[15.5px] tracking-tight">
                            <RotateCcw className="w-[18px] h-[18px] stroke-[2.4] text-slate-700" />
                            <span>Select</span>
                        </div>

                        {/* Mint Green Checkmark Squircle */}
                        <div 
                            className="w-[46px] h-[46px] rounded-[13px] flex items-center justify-center text-white"
                            style={{
                                background: selectedActive 
                                    ? 'linear-gradient(145deg, #34d399 0%, #10b981 50%, #059669 100%)'
                                    : 'linear-gradient(145deg, #cbd5e1 0%, #94a3b8 100%)',
                                boxShadow: 'inset 0 1.5px 1.5px rgba(255, 255, 255, 0.85), inset 0 -2.5px 4px rgba(0, 0, 0, 0.35), 0 4px 12px rgba(5, 150, 105, 0.45)'
                            }}
                        >
                            <Check className="w-5 h-5 stroke-[3.2]" />
                        </div>
                    </div>

                    {/* TOGGLE SWITCH (Emerald Jelly + White Ceramic Knob) */}
                    <div 
                        onClick={() => setToggled(!toggled)}
                        className="w-[104px] h-[58px] p-[4px] rounded-full relative cursor-pointer transition-all duration-300 flex-shrink-0"
                        style={{
                            background: toggled 
                                ? 'linear-gradient(135deg, rgba(20, 184, 166, 0.85) 0%, rgba(13, 148, 136, 0.7) 50%, rgba(15, 118, 110, 0.8) 100%)' 
                                : 'linear-gradient(135deg, rgba(148, 163, 184, 0.45) 0%, rgba(100, 116, 139, 0.25) 100%)',
                            backdropFilter: 'blur(16px)',
                            border: '1.2px solid rgba(255, 255, 255, 0.95)',
                            boxShadow: `
                                0 2px 4px rgba(0, 0, 0, 0.05),
                                0 14px 28px -4px rgba(13, 148, 136, 0.42),
                                0 24px 44px -8px rgba(13, 148, 136, 0.25),
                                inset 0 2.5px 3px rgba(255, 255, 255, 0.95),
                                inset 0 -3px 5px rgba(0, 0, 0, 0.28)
                            `
                        }}
                    >
                        {/* Turquoise Floor Caustic Glow */}
                        {toggled && (
                            <div 
                                className="absolute -inset-2 rounded-full pointer-events-none -z-10"
                                style={{
                                    background: 'radial-gradient(circle at 65% 90%, rgba(20, 184, 166, 0.85) 0%, rgba(45, 212, 191, 0.5) 45%, transparent 75%)',
                                    filter: 'blur(9px)'
                                }}
                            />
                        )}

                        {/* Ceramic 3D White Knob with Top Specular Glow */}
                        <motion.div 
                            className="w-[48px] h-[48px] rounded-full"
                            animate={{ x: toggled ? 46 : 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                            style={{
                                background: 'radial-gradient(circle at 35% 25%, #ffffff 0%, #f1f5f9 55%, #cbd5e1 100%)',
                                boxShadow: `
                                    0 6px 12px rgba(0, 0, 0, 0.26),
                                    0 2px 4px rgba(0, 0, 0, 0.12),
                                    inset 0 1.5px 1.5px #ffffff
                                `
                            }}
                        />
                    </div>

                </div>

                {/* =========================================================================
                    ROW 4: TABS | TOAST
                ========================================================================= */}
                <div className="flex items-center gap-[14px] justify-between">
                    
                    {/* TABS PILL */}
                    <div 
                        className="flex-1 h-[56px] px-6 rounded-full flex items-center justify-center gap-2 text-slate-800 font-semibold text-[15px] cursor-pointer active:scale-[0.98] transition-transform"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.1) 45%, rgba(230, 242, 255, 0.3) 80%, rgba(255, 255, 255, 0.5) 100%)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1.2px solid rgba(255, 255, 255, 0.95)',
                            boxShadow: `
                                0 2px 4px rgba(0, 0, 0, 0.04),
                                0 14px 28px -4px rgba(35, 45, 65, 0.16),
                                0 24px 44px -8px rgba(25, 35, 55, 0.12),
                                inset 0 2px 2px #ffffff,
                                inset 0 -2px 3px rgba(70, 85, 110, 0.25),
                                inset 1px 0 2px rgba(255, 255, 255, 0.8),
                                inset -1px 0 2px rgba(255, 255, 255, 0.8)
                            `
                        }}
                    >
                        <ChevronsUpDown className="w-[18px] h-[18px] stroke-[2.4] text-slate-700" />
                        <span>Tabs</span>
                    </div>

                    {/* TOAST PILL WITH AMBER INNER CONTOUR WIRE */}
                    <div 
                        className="flex-1 h-[56px] p-[4px] rounded-full relative cursor-pointer active:scale-[0.98] transition-transform"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.1) 45%, rgba(255, 245, 235, 0.3) 80%, rgba(255, 255, 255, 0.5) 100%)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1.2px solid rgba(255, 255, 255, 0.95)',
                            boxShadow: `
                                0 2px 4px rgba(0, 0, 0, 0.04),
                                0 14px 28px -4px rgba(35, 45, 65, 0.16),
                                0 24px 44px -8px rgba(25, 35, 55, 0.12),
                                inset 0 2px 2px #ffffff,
                                inset 0 -2px 3px rgba(70, 85, 110, 0.25),
                                inset 1px 0 2px rgba(255, 255, 255, 0.8),
                                inset -1px 0 2px rgba(255, 255, 255, 0.8)
                            `
                        }}
                    >
                        {/* Prismatic Rainbow Flare on Bottom-Right */}
                        <div 
                            className="absolute -right-2 -bottom-2 w-14 h-12 pointer-events-none -z-10 rounded-full"
                            style={{
                                background: 'radial-gradient(circle at 60% 60%, rgba(0, 220, 255, 0.85) 0%, rgba(255, 185, 0, 0.7) 35%, rgba(255, 0, 130, 0.55) 65%, transparent 80%)',
                                filter: 'blur(5px)'
                            }}
                        />

                        {/* Thin Glowing Amber Inner Contour Wire Ring */}
                        <div 
                            className="w-full h-full rounded-full flex items-center justify-center gap-2 text-slate-800 font-semibold text-[15px] border-[1.5px] border-amber-500/75"
                            style={{
                                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 245, 230, 0.15) 100%)',
                                boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.9), 0 2px 8px rgba(245, 158, 11, 0.22)'
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

                {/* =========================================================================
                    ROW 5: PRISMATIC GLASS CARD | PRO PLAN DIALOG MODAL
                ========================================================================= */}
                <div className="flex items-stretch gap-[14px] justify-between">
                    
                    {/* PRISMATIC GLASS CARD */}
                    <div 
                        className="flex-1 h-[155px] p-5 rounded-[26px] flex items-end justify-end text-slate-800 font-semibold text-[16px] relative overflow-hidden active:scale-[0.98] transition-transform"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 245, 240, 0.15) 25%, rgba(230, 250, 255, 0.25) 60%, rgba(255, 255, 255, 0.55) 100%)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1.2px solid rgba(255, 255, 255, 0.95)',
                            boxShadow: `
                                0 2px 4px rgba(0, 0, 0, 0.04),
                                0 16px 32px -4px rgba(35, 45, 65, 0.18),
                                0 28px 50px -8px rgba(25, 35, 55, 0.14),
                                inset 0 2px 2px #ffffff,
                                inset 0 -2px 3px rgba(70, 85, 110, 0.25),
                                inset 1px 0 2px rgba(255, 255, 255, 0.8),
                                inset -1px 0 2px rgba(255, 255, 255, 0.8)
                            `
                        }}
                    >
                        {/* Top Curved Glare Specular Sheen */}
                        <div 
                            className="absolute top-0 left-0 right-0 h-[65%] rounded-t-[26px] pointer-events-none"
                            style={{
                                background: 'radial-gradient(ellipse at 30% 0%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.3) 50%, transparent 80%)'
                            }}
                        />

                        {/* Iridescent Rainbow Pearlescent internal sheen */}
                        <div 
                            className="absolute -inset-10 pointer-events-none"
                            style={{
                                background: 'radial-gradient(circle at 45% 45%, rgba(255, 220, 240, 0.5) 0%, rgba(220, 245, 255, 0.4) 30%, rgba(255, 255, 255, 0.45) 50%, transparent 70%)'
                            }}
                        />

                        {/* Bottom-right text "Card" */}
                        <span className="relative z-10 font-bold text-slate-800 tracking-tight">Card</span>
                    </div>

                    {/* PRO PLAN FLOATING GLASS MODAL */}
                    <div 
                        className="flex-[1.2] h-[155px] p-4 px-[18px] rounded-[26px] flex flex-col justify-between relative"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(240, 248, 255, 0.25) 100%)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1.2px solid rgba(255, 255, 255, 0.95)',
                            boxShadow: `
                                0 2px 4px rgba(0, 0, 0, 0.04),
                                0 16px 32px -4px rgba(35, 45, 65, 0.18),
                                0 28px 50px -8px rgba(25, 35, 55, 0.14),
                                inset 0 2px 2px #ffffff,
                                inset 0 -2px 3px rgba(70, 85, 110, 0.25),
                                inset 1px 0 2px rgba(255, 255, 255, 0.8),
                                inset -1px 0 2px rgba(255, 255, 255, 0.8)
                            `
                        }}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-bold text-slate-900 text-[16px] leading-tight">Find files...</h3>
                                <p className="text-[12.5px] text-slate-500 font-medium mt-0.5">Add collaborator</p>
                            </div>
                            <button className="text-slate-400 hover:text-slate-800 transition-colors p-0.5">
                                <X className="w-4 h-4 stroke-[2.4]" />
                            </button>
                        </div>

                        {/* Glossy Candy Cobalt Blue Core */}
                        <button 
                            className="w-full h-[42px] rounded-full text-white font-bold text-[15px] tracking-tight hover:brightness-105 active:scale-[0.98] transition-all relative overflow-hidden"
                            style={{
                                background: 'linear-gradient(180deg, #38bdf8 0%, #0284c7 45%, #0369a1 80%, #075985 100%)',
                                boxShadow: `
                                    inset 0 1.5px 1.5px rgba(255, 255, 255, 0.9),
                                    inset 0 -2.5px 4px rgba(3, 105, 161, 0.9),
                                    0 5px 16px rgba(2, 132, 199, 0.55)
                                `,
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                            }}
                        >
                            <div className="absolute top-[2px] left-3.5 right-3.5 h-[42%] rounded-full bg-gradient-to-b from-white/70 to-transparent pointer-events-none" />
                            Pro plan
                        </button>
                    </div>

                </div>

            </motion.div>
        </main>
    );
}

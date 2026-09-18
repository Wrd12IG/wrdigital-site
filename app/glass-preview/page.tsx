'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Power, ChevronDown, Sparkles, X, Check, ArrowRight } from 'lucide-react';

export default function GlassPreviewPage() {
    const [toggled, setToggled] = useState(true);
    const [searchValue, setSearchValue] = useState('With suggestions');

    return (
        <div className="min-h-screen bg-[#e5e9f0] text-slate-800 flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden selection:bg-orange-500/20">
            
            {/* Studio Satin Background Lighting */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#ffffff_0%,#e8edf4_45%,#dce2ec_100%)] -z-10" />

            {/* Showcase Stage */}
            <div className="w-full max-w-[520px] flex flex-col gap-7 relative z-10">

                {/* ROW 1: START PROJECT / SECONDARY / POWER */}
                <div className="flex items-center gap-5 justify-between">
                    
                    {/* Start Project: Thick Crystal Lens Shell + Nested High-Gloss Orange Core */}
                    <motion.button
                        whileHover={{ y: -2, scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        className="flex-[1.3] h-[66px] p-[5px] rounded-full relative cursor-pointer"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.2) 40%, rgba(240, 246, 255, 0.25) 70%, rgba(255, 255, 255, 0.6) 100%)',
                            backdropFilter: 'blur(20px) saturate(190%)',
                            boxShadow: 'inset 0 1.5px 1px 0 rgba(255, 255, 255, 1), inset 0 0 0 1px rgba(255, 255, 255, 0.7), inset 0 -3px 6px 0 rgba(120, 140, 170, 0.2), inset 0 3px 8px 0 rgba(255, 255, 255, 0.6), 0 3px 6px rgba(0,0,0,0.04), 0 18px 36px -6px rgba(45,65,95,0.2), 0 30px 60px -12px rgba(20,35,60,0.12)'
                        }}
                    >
                        {/* Orange Caustic Floor Flare */}
                        <div className="absolute -inset-1 rounded-full bg-[radial-gradient(circle_at_50%_90%,rgba(249,115,22,0.6)_0%,rgba(251,146,60,0.35)_40%,transparent_75%)] blur-md -z-10" />

                        {/* Orange Floating Core */}
                        <div 
                            className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-[16px] tracking-tight relative overflow-hidden"
                            style={{
                                background: 'linear-gradient(180deg, #ff7441 0%, #f95f24 45%, #e44307 80%, #c23200 100%)',
                                boxShadow: 'inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.75), inset 0 -2.5px 4px 0 rgba(120, 20, 0, 0.5), 0 6px 16px rgba(228, 67, 7, 0.5)',
                                textShadow: '0 1px 2px rgba(0,0,0,0.25)'
                            }}
                        >
                            <div className="absolute top-[2px] left-3 right-3 h-[40%] rounded-full bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />
                            Start project
                        </div>
                    </motion.button>

                    {/* Secondary Clear Glass Pill */}
                    <motion.button
                        whileHover={{ y: -2, scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        className="flex-1 h-[66px] p-[5px] rounded-full relative cursor-pointer"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.2) 40%, rgba(240, 246, 255, 0.25) 70%, rgba(255, 255, 255, 0.6) 100%)',
                            backdropFilter: 'blur(20px) saturate(190%)',
                            boxShadow: 'inset 0 1.5px 1px 0 rgba(255, 255, 255, 1), inset 0 0 0 1px rgba(255, 255, 255, 0.7), inset 0 -3px 6px 0 rgba(120, 140, 170, 0.2), inset 0 3px 8px 0 rgba(255, 255, 255, 0.6), 0 3px 6px rgba(0,0,0,0.04), 0 18px 36px -6px rgba(45,65,95,0.2), 0 30px 60px -12px rgba(20,35,60,0.12)'
                        }}
                    >
                        {/* Rainbow Chromatic Flare on edge */}
                        <div className="absolute -inset-1 rounded-full bg-[radial-gradient(circle_at_85%_85%,rgba(0,210,255,0.6)_0%,rgba(255,170,0,0.4)_30%,rgba(255,0,140,0.35)_50%,transparent_70%)] blur-md -z-10" />

                        <div 
                            className="w-full h-full rounded-full flex items-center justify-center text-slate-800 font-semibold text-[15.5px]"
                            style={{
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(235,242,250,0.5) 50%, rgba(215,228,245,0.6) 100%)',
                                boxShadow: 'inset 0 1.5px 1.5px rgba(255,255,255,0.9), inset 0 -1.5px 3px rgba(100,130,170,0.2), 0 4px 10px rgba(70,90,120,0.1)'
                            }}
                        >
                            Secondary
                        </div>
                    </motion.button>

                    {/* Power Square Glass Button */}
                    <motion.button
                        whileHover={{ y: -2, scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-[66px] h-[66px] p-[5px] rounded-[22px] relative flex-shrink-0 cursor-pointer"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.2) 40%, rgba(240, 246, 255, 0.25) 70%, rgba(255, 255, 255, 0.6) 100%)',
                            backdropFilter: 'blur(20px) saturate(190%)',
                            boxShadow: 'inset 0 1.5px 1px 0 rgba(255, 255, 255, 1), inset 0 0 0 1px rgba(255, 255, 255, 0.7), inset 0 -3px 6px 0 rgba(120, 140, 170, 0.2), 0 18px 36px -6px rgba(45,65,95,0.2)'
                        }}
                    >
                        {/* Rainbow flare */}
                        <div className="absolute -inset-1 rounded-[22px] bg-[radial-gradient(circle_at_85%_85%,rgba(0,210,255,0.6)_0%,rgba(255,170,0,0.4)_30%,rgba(255,0,140,0.35)_50%,transparent_70%)] blur-md -z-10" />

                        <div 
                            className="w-full h-full rounded-[17px] flex items-center justify-center text-slate-800"
                            style={{
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(235,242,250,0.5) 50%, rgba(215,228,245,0.6) 100%)',
                                boxShadow: 'inset 0 1.5px 1.5px rgba(255,255,255,0.9), inset 0 -1.5px 3px rgba(100,130,170,0.2)'
                            }}
                        >
                            <Power className="w-[22px] h-[22px] stroke-[2.4]" />
                        </div>
                    </motion.button>
                </div>

                {/* ROW 2: SEARCH BAR WITH CUTOUT & PLUS CAP */}
                <div 
                    className="w-full h-[68px] p-[5px] rounded-full flex items-center justify-between relative"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.2) 40%, rgba(240, 246, 255, 0.25) 70%, rgba(255, 255, 255, 0.6) 100%)',
                        backdropFilter: 'blur(20px) saturate(190%)',
                        boxShadow: 'inset 0 1.5px 1px 0 rgba(255, 255, 255, 1), inset 0 0 0 1px rgba(255, 255, 255, 0.7), inset 0 -3px 6px 0 rgba(120, 140, 170, 0.2), 0 20px 40px -8px rgba(45,65,95,0.22)'
                    }}
                >
                    {/* Rainbow flare on right plus cap */}
                    <div className="absolute right-0 top-0 bottom-0 w-24 rounded-full bg-[radial-gradient(circle_at_85%_50%,rgba(0,210,255,0.7)_0%,rgba(255,170,0,0.5)_30%,rgba(255,0,140,0.4)_50%,transparent_70%)] blur-md -z-10" />

                    <div 
                        className="flex-1 h-full rounded-l-full pl-5 pr-3 flex items-center gap-3"
                        style={{
                            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 248, 252, 0.75) 100%)',
                            boxShadow: 'inset 0 1.5px 2px rgba(255, 255, 255, 1), inset 0 -1px 2px rgba(100, 130, 170, 0.15)'
                        }}
                    >
                        <Search className="w-5 h-5 text-slate-500 stroke-[2.4]" />
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="bg-transparent border-none outline-none font-medium text-slate-700 text-[16px] w-full"
                        />
                    </div>

                    <button 
                        className="w-[56px] h-full rounded-r-full flex items-center justify-center text-slate-700 text-2xl font-light border-l border-white/80 hover:text-black transition-transform"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(215, 235, 255, 0.5) 50%, rgba(255, 230, 200, 0.4) 100%)',
                            boxShadow: 'inset 0 1.5px 1.5px rgba(255, 255, 255, 0.9)'
                        }}
                    >
                        +
                    </button>
                </div>

                {/* ROW 3: SELECT & JELLY TOGGLE */}
                <div className="flex items-center gap-5 justify-between">
                    
                    {/* Select Pill */}
                    <div 
                        className="flex-[1.4] h-[62px] p-[5px] pl-6 rounded-full flex items-center justify-between relative"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.2) 40%, rgba(240, 246, 255, 0.25) 70%, rgba(255, 255, 255, 0.6) 100%)',
                            backdropFilter: 'blur(20px) saturate(190%)',
                            boxShadow: 'inset 0 1.5px 1px 0 rgba(255, 255, 255, 1), inset 0 0 0 1px rgba(255, 255, 255, 0.7), inset 0 -3px 6px 0 rgba(120, 140, 170, 0.2), 0 18px 36px -6px rgba(45,65,95,0.2)'
                        }}
                    >
                        <div className="flex items-center gap-3 text-slate-800 font-semibold text-[16px]">
                            <span className="w-5 h-5 rounded-full border-[2.5px] border-slate-700 flex items-center justify-center text-xs">↻</span>
                            <span>Select</span>
                        </div>

                        <div 
                            className="w-[44px] h-[44px] rounded-[13px] flex items-center justify-center text-white mr-1"
                            style={{
                                background: 'linear-gradient(145deg, #34d399 0%, #059669 60%, #047857 100%)',
                                boxShadow: 'inset 0 1.5px 1.5px rgba(255, 255, 255, 0.7), inset 0 -2px 4px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(5, 150, 105, 0.45)'
                            }}
                        >
                            <Check className="w-6 h-6 stroke-[3.2]" />
                        </div>
                    </div>

                    {/* Emerald Jelly Glass Toggle Switch */}
                    <div 
                        onClick={() => setToggled(!toggled)}
                        className="w-[108px] h-[58px] p-1 rounded-full relative cursor-pointer transition-all duration-300 flex-shrink-0"
                        style={{
                            background: toggled 
                                ? 'linear-gradient(135deg, rgba(20, 184, 166, 0.75) 0%, rgba(13, 148, 136, 0.55) 50%, rgba(15, 118, 110, 0.65) 100%)' 
                                : 'linear-gradient(135deg, rgba(148, 163, 184, 0.4) 0%, rgba(100, 116, 139, 0.3) 100%)',
                            boxShadow: 'inset 0 2px 3px rgba(255, 255, 255, 0.8), inset 0 -3px 6px rgba(0, 0, 0, 0.2), 0 14px 28px -4px rgba(13, 148, 136, 0.4), 0 6px 12px rgba(0, 0, 0, 0.08)'
                        }}
                    >
                        {/* Cyan-Green Caustic Floor Glow */}
                        <div className="absolute -inset-1 rounded-full bg-[radial-gradient(circle_at_75%_85%,rgba(20,184,166,0.7)_0%,rgba(45,212,191,0.4)_40%,transparent_70%)] blur-md -z-10" />

                        <motion.div
                            animate={{ x: toggled ? 50 : 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                            className="w-[46px] h-[46px] rounded-full"
                            style={{
                                background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #f1f5f9 55%, #cbd5e1 100%)',
                                boxShadow: '0 6px 14px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1.5px 1.5px rgba(255, 255, 255, 1)'
                            }}
                        />
                    </div>
                </div>

                {/* ROW 4: TABS & TOAST */}
                <div className="flex items-center gap-5 justify-between">
                    
                    {/* Tabs Capsule */}
                    <div 
                        className="flex-1 h-[56px] px-6 rounded-full flex items-center justify-center gap-2.5 text-slate-800 font-semibold text-[15px]"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.2) 40%, rgba(240, 246, 255, 0.25) 70%, rgba(255, 255, 255, 0.6) 100%)',
                            backdropFilter: 'blur(20px) saturate(190%)',
                            boxShadow: 'inset 0 1.5px 1px 0 rgba(255, 255, 255, 1), inset 0 0 0 1px rgba(255, 255, 255, 0.7), inset 0 -3px 6px 0 rgba(120, 140, 170, 0.2), 0 18px 36px -6px rgba(45,65,95,0.18)'
                        }}
                    >
                        <ChevronDown className="w-5 h-5 stroke-[2.6]" />
                        <span>Tabs</span>
                    </div>

                    {/* Toast Capsule with Amber Bezel */}
                    <div 
                        className="flex-1 h-[56px] p-[5px] rounded-full relative"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.2) 40%, rgba(240, 246, 255, 0.25) 70%, rgba(255, 255, 255, 0.6) 100%)',
                            backdropFilter: 'blur(20px) saturate(190%)',
                            boxShadow: 'inset 0 1.5px 1px 0 rgba(255, 255, 255, 1), inset 0 0 0 1px rgba(255, 255, 255, 0.7), inset 0 -3px 6px 0 rgba(120, 140, 170, 0.2), 0 18px 36px -6px rgba(45,65,95,0.18)'
                        }}
                    >
                        <div 
                            className="w-full h-full rounded-full flex items-center justify-center gap-2 text-slate-800 font-semibold text-[15px] border-[1.5px] border-amber-500/55"
                            style={{
                                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 245, 230, 0.3) 100%)',
                                boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.8), 0 2px 8px rgba(245, 158, 11, 0.15)'
                            }}
                        >
                            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400/30" />
                            <span>Toast</span>
                        </div>
                    </div>
                </div>

                {/* ROW 5: PRISMATIC GLASS CARD & PRO PLAN DIALOG */}
                <div className="flex items-stretch gap-5 justify-between">
                    
                    {/* Prismatic Pure Glass Card */}
                    <div 
                        className="flex-1 h-[160px] p-6 rounded-[28px] flex items-end justify-end text-slate-800 font-semibold text-[17px] relative overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 245, 240, 0.35) 25%, rgba(230, 250, 255, 0.4) 60%, rgba(255, 255, 255, 0.75) 100%)',
                            backdropFilter: 'blur(20px) saturate(190%)',
                            boxShadow: 'inset 0 1.5px 1px 0 rgba(255, 255, 255, 1), inset 0 0 0 1px rgba(255, 255, 255, 0.7), inset 0 -3px 6px 0 rgba(120, 140, 170, 0.2), 0 24px 50px -10px rgba(45,65,95,0.22)'
                        }}
                    >
                        {/* Pearlescent internal sheen */}
                        <div className="absolute -inset-10 bg-[radial-gradient(circle_at_40%_40%,rgba(255,220,240,0.4)_0%,rgba(220,245,255,0.35)_30%,rgba(255,255,255,0.45)_50%,transparent_70%)] pointer-events-none" />
                        <span className="relative z-10">Card</span>
                    </div>

                    {/* Pro Plan Floating Glass Window */}
                    <div 
                        className="flex-[1.25] h-[160px] p-4 px-5 rounded-[28px] flex flex-col justify-between relative"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(240, 246, 255, 0.45) 100%)',
                            backdropFilter: 'blur(20px) saturate(190%)',
                            boxShadow: 'inset 0 1.5px 1px 0 rgba(255, 255, 255, 1), inset 0 0 0 1px rgba(255, 255, 255, 0.7), inset 0 -3px 6px 0 rgba(120, 140, 170, 0.2), 0 24px 50px -10px rgba(45,65,95,0.22)'
                        }}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-bold text-slate-900 text-[16px] leading-tight">Find files...</h3>
                                <p className="text-[13.5px] text-slate-500 font-medium">Add collaborator</p>
                            </div>
                            <X className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-700" />
                        </div>

                        <button 
                            className="w-full h-[44px] rounded-full text-white font-bold text-[15px] tracking-tight hover:brightness-105 transition-all"
                            style={{
                                background: 'linear-gradient(180deg, #38bdf8 0%, #0284c7 45%, #0369a1 80%, #075985 100%)',
                                boxShadow: 'inset 0 1.5px 1.5px rgba(255, 255, 255, 0.8), inset 0 -2.5px 4px rgba(3, 105, 161, 0.8), 0 6px 18px rgba(2, 132, 199, 0.45)',
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.25)'
                            }}
                        >
                            Pro plan
                        </button>
                    </div>
                </div>

            </div>

            {/* Back to Home Link */}
            <div className="mt-14 text-center">
                <a
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
                >
                    Torna alla Home di W[r]Digital <ArrowRight className="w-4 h-4" />
                </a>
            </div>

        </div>
    );
}

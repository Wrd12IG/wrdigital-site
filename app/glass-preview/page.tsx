'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Check, Power, ChevronDown, Sparkles, X, ArrowRight } from 'lucide-react';

export default function GlassPreviewPage() {
    const [toggled, setToggled] = useState(true);
    const [searchValue, setSearchValue] = useState('With suggestions');
    const [activeTab, setActiveTab] = useState('Toast');

    return (
        <div className="min-h-screen bg-[#e8ecf2] text-slate-800 flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden selection:bg-orange-500/20">
            
            {/* Studio Satin Background Lighting */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,#f8fafc_0%,#e2e8f0_65%,#cbd5e1_100%)] -z-10" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-white/40 rounded-full blur-3xl -z-10 pointer-events-none" />

            {/* Header */}
            <div className="text-center mb-10">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-white/60 border border-white/80 text-slate-600 shadow-sm mb-3 backdrop-blur-md">
                    ✨ Liquid Glass UI Design System
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                    Hyper-Realistic 3D Glassmorphism
                </h1>
                <p className="text-sm md:text-base text-slate-500 mt-2 max-w-md mx-auto">
                    Ricostruzione fedele in puro CSS/Tailwind con rifrazione ottica, dispersione arcobaleno e specular highlights.
                </p>
            </div>

            {/* Showcase Stage */}
            <div className="w-full max-w-[560px] flex flex-col gap-6">

                {/* ROW 1: START PROJECT / SECONDARY / POWER */}
                <div className="flex items-center gap-4 justify-between">
                    
                    {/* Orange Core Capsule */}
                    <motion.button
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-[1.2] h-[62px] p-1.5 rounded-full bg-white/40 border-[1.5px] border-white/90 backdrop-blur-2xl shadow-[0_20px_40px_-10px_rgba(70,90,120,0.22),inset_0_2px_3px_rgba(255,255,255,0.9),inset_0_-3px_6px_rgba(100,130,170,0.18)] relative group overflow-hidden"
                    >
                        <div className="w-full h-full rounded-full bg-gradient-to-b from-[#ff6b3d] via-[#ea580c] to-[#c2410c] flex items-center justify-center text-white font-bold text-lg tracking-tight shadow-[inset_0_2px_2px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(0,0,0,0.3),0_8px_20px_rgba(234,88,12,0.45)]">
                            Start project
                        </div>
                    </motion.button>

                    {/* Secondary Capsule */}
                    <motion.button
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 h-[62px] px-6 rounded-full bg-white/50 border-[1.5px] border-white/95 backdrop-blur-2xl flex items-center justify-center font-bold text-slate-700 text-base shadow-[0_20px_40px_-10px_rgba(70,90,120,0.2),inset_0_2px_3px_rgba(255,255,255,0.95),inset_0_-3px_6px_rgba(100,130,170,0.15)] relative overflow-hidden"
                    >
                        Secondary
                    </motion.button>

                    {/* Power Switch */}
                    <motion.button
                        whileHover={{ y: -2, scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="w-[62px] h-[62px] rounded-2xl bg-white/50 border-[1.5px] border-white/95 backdrop-blur-2xl flex items-center justify-center text-slate-700 shadow-[0_20px_40px_-10px_rgba(70,90,120,0.2),inset_0_2px_3px_rgba(255,255,255,0.95),inset_0_-3px_6px_rgba(100,130,170,0.15)]"
                    >
                        <Power className="w-6 h-6 stroke-[2.2]" />
                    </motion.button>
                </div>

                {/* ROW 2: SEARCH BAR */}
                <motion.div
                    whileHover={{ y: -1 }}
                    className="w-full h-[64px] px-4 rounded-full bg-white/45 border-[1.5px] border-white/95 backdrop-blur-2xl flex items-center justify-between shadow-[0_22px_45px_-12px_rgba(70,90,120,0.22),inset_0_2px_3px_rgba(255,255,255,0.95),inset_0_-3px_6px_rgba(100,130,170,0.15)]"
                >
                    <div className="flex items-center gap-3 flex-1 pl-2">
                        <Search className="w-5 h-5 text-slate-500 stroke-[2.2]" />
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="bg-transparent border-none outline-none font-semibold text-slate-800 text-base w-full placeholder-slate-400"
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-11 h-11 rounded-full bg-gradient-to-br from-white/90 to-blue-50/60 border border-white/90 flex items-center justify-center text-slate-700 shadow-[0_4px_12px_rgba(70,90,120,0.15),inset_0_1px_2px_rgba(255,255,255,0.9)]"
                    >
                        <Plus className="w-5 h-5 stroke-[2.2]" />
                    </motion.button>
                </motion.div>

                {/* ROW 3: SELECT & TOGGLE */}
                <div className="flex items-center gap-4 justify-between">
                    
                    {/* Select Pill */}
                    <motion.div
                        whileHover={{ y: -2, scale: 1.01 }}
                        className="flex-[1.4] h-[58px] px-4 rounded-full bg-white/45 border-[1.5px] border-white/95 backdrop-blur-2xl flex items-center justify-between shadow-[0_20px_40px_-10px_rgba(70,90,120,0.2),inset_0_2px_3px_rgba(255,255,255,0.95),inset_0_-3px_6px_rgba(100,130,170,0.15)]"
                    >
                        <div className="flex items-center gap-3 pl-2 font-bold text-slate-700 text-base">
                            <span className="w-5 h-5 rounded-full border-2 border-slate-600 flex items-center justify-center text-xs">↻</span>
                            <span>Select</span>
                        </div>
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-[0_4px_14px_rgba(5,150,105,0.4),inset_0_1px_2px_rgba(255,255,255,0.6)]">
                            <Check className="w-5 h-5 stroke-[3]" />
                        </div>
                    </motion.div>

                    {/* Emerald Glass Toggle */}
                    <div
                        onClick={() => setToggled(!toggled)}
                        className={`w-[110px] h-[58px] p-1 rounded-full border-[1.5px] border-white/90 backdrop-blur-2xl cursor-pointer relative transition-all duration-300 ${
                            toggled
                                ? 'bg-gradient-to-r from-teal-500/60 to-emerald-500/50 shadow-[0_12px_28px_rgba(13,148,136,0.35),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_6px_rgba(0,0,0,0.1)]'
                                : 'bg-slate-300/40 shadow-[0_10px_20px_rgba(100,116,139,0.2),inset_0_2px_4px_rgba(255,255,255,0.6)]'
                        }`}
                    >
                        <motion.div
                            animate={{ x: toggled ? 52 : 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            className="w-12 h-12 rounded-full bg-gradient-to-br from-white via-slate-100 to-slate-200 shadow-[0_6px_14px_rgba(0,0,0,0.18),inset_0_1px_1px_white]"
                        />
                    </div>
                </div>

                {/* ROW 4: TABS & TOAST */}
                <div className="flex items-center gap-4 justify-between">
                    
                    {/* Tabs Capsule */}
                    <motion.div
                        whileHover={{ y: -2 }}
                        className="flex-1 h-[54px] px-6 rounded-full bg-white/45 border-[1.5px] border-white/95 backdrop-blur-2xl flex items-center justify-center gap-2 font-bold text-slate-700 text-sm shadow-[0_18px_36px_-10px_rgba(70,90,120,0.18),inset_0_2px_3px_rgba(255,255,255,0.95),inset_0_-2px_5px_rgba(100,130,170,0.15)]"
                    >
                        <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                        <span>Tabs</span>
                    </motion.div>

                    {/* Toast Capsule with Amber Rim */}
                    <motion.div
                        whileHover={{ y: -2 }}
                        className="flex-1 h-[54px] px-6 rounded-full bg-white/45 border-[1.5px] border-white/95 backdrop-blur-2xl flex items-center justify-center gap-2 font-bold text-slate-700 text-sm shadow-[0_18px_36px_-10px_rgba(70,90,120,0.18),inset_0_2px_3px_rgba(255,255,255,0.95),inset_0_-2px_5px_rgba(100,130,170,0.15)] relative"
                    >
                        <div className="absolute inset-1 rounded-full border border-amber-400/50 pointer-events-none" />
                        <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400/30" />
                        <span>Toast</span>
                    </motion.div>
                </div>

                {/* ROW 5: PRISMATIC CARD & PRO PLAN MODAL */}
                <div className="flex items-stretch gap-4 justify-between">
                    
                    {/* Prismatic Corner Glass Card */}
                    <motion.div
                        whileHover={{ y: -3, scale: 1.02 }}
                        className="flex-1 h-[155px] p-6 rounded-[28px] bg-gradient-to-br from-white/60 via-pink-50/20 to-blue-50/40 border-[1.5px] border-white/95 backdrop-blur-2xl flex items-end justify-end font-bold text-slate-700 text-lg shadow-[0_24px_50px_-12px_rgba(70,90,120,0.22),inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-3px_8px_rgba(100,130,170,0.18)]"
                    >
                        <span>Card</span>
                    </motion.div>

                    {/* Pro Plan Dialog Card */}
                    <motion.div
                        whileHover={{ y: -3, scale: 1.02 }}
                        className="flex-[1.2] h-[155px] p-4 rounded-[28px] bg-white/55 border-[1.5px] border-white/95 backdrop-blur-2xl flex flex-col justify-between shadow-[0_24px_50px_-12px_rgba(70,90,120,0.22),inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-3px_8px_rgba(100,130,170,0.18)]"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-extrabold text-slate-900 text-base leading-tight">Find files...</h3>
                                <p className="text-xs text-slate-500 font-medium">Add collaborator</p>
                            </div>
                            <button className="text-slate-400 hover:text-slate-700 transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full h-11 rounded-full bg-gradient-to-b from-[#38bdf8] via-[#0284c7] to-[#0369a1] text-white font-bold text-sm shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.7),inset_0_-2px_4px_rgba(0,0,0,0.3),0_6px_16px_rgba(2,132,199,0.4)]"
                        >
                            Pro plan
                        </motion.button>
                    </motion.div>
                </div>

            </div>

            {/* Back to Home Link */}
            <div className="mt-12 text-center">
                <a
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
                >
                    Torna alla Home di W[r]Digital <ArrowRight className="w-4 h-4" />
                </a>
            </div>

        </div>
    );
}

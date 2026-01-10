'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, MousePointer, Eye, Target, AlertCircle, ArrowRight, FileText, BarChart3 } from 'lucide-react';
import SeoPageManager from './SeoPageManager';


export default function SeoDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'analytics' | 'pages'>('pages');

    useEffect(() => {
        fetch('/api/admin/gsc')
            .then(res => res.json())
            .then(d => { setData(d); setLoading(false); })
            .catch(e => setLoading(false));
    }, []);

    if (loading) return (
        <div className="w-full h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
    );

    if (!data) return <div className="p-8 text-center text-red-500">Errore caricamento dati dashboard.</div>;

    // Helper per grafico SVG
    const width = 800;
    const height = 200;
    const padding = 20;

    // Normalizza dati traffico
    const traffic = data.traffic || [];
    const maxClicks = Math.max(...traffic.map((t: any) => t.clicks)) || 1;
    const maxImp = Math.max(...traffic.map((t: any) => t.impressions)) || 1;

    // Genera path SVG
    const pointsClicks = traffic.map((t: any, i: number) => {
        const x = (i / (traffic.length - 1 || 1)) * (width - padding * 2) + padding;
        const y = height - (t.clicks / maxClicks) * (height - padding * 2) - padding;
        return `${x},${y}`;
    }).join(' ');

    const pointsImp = traffic.map((t: any, i: number) => {
        const x = (i / (traffic.length - 1 || 1)) * (width - padding * 2) + padding;
        const y = height - (t.impressions / maxImp) * (height - padding * 2) - padding;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="space-y-6 mb-12">

            {/* Header with Tabs */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 flex items-center gap-2">
                    <TrendingUp className="text-blue-400" /> SEO Dashboard [r]adicale
                </h2>

                {/* Tab Switcher */}
                <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                    <button
                        onClick={() => setActiveTab('pages')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'pages'
                            ? 'bg-yellow-400 text-black'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <FileText className="w-4 h-4" />
                        Pagine SEO
                    </button>
                    <button
                        onClick={() => setActiveTab('analytics')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'analytics'
                            ? 'bg-yellow-400 text-black'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <BarChart3 className="w-4 h-4" />
                        Analytics GSC
                    </button>
                </div>

                {data?.isMock && activeTab === 'analytics' && (
                    <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded border border-yellow-500/30">
                        Demo Mode
                    </span>
                )}
            </div>

            {/* TAB: Page Manager */}
            {activeTab === 'pages' && (
                <SeoPageManager />
            )}

            {/* TAB: Analytics - Il Termometro del Traffico */}
            {activeTab === 'analytics' && data && (
                <>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-semibold text-white">Traffico Organico (30gg)</h3>
                                <p className="text-xs text-gray-400">Trend Clicks vs Impressions</p>
                            </div>
                            <div className="flex gap-4 text-xs font-mono">
                                <span className="flex items-center gap-1 text-blue-400"><span className="w-2 h-2 rounded-full bg-blue-400"></span> Clicks</span>
                                <span className="flex items-center gap-1 text-purple-400"><span className="w-2 h-2 rounded-full bg-purple-400"></span> Impressions</span>
                            </div>
                        </div>

                        {/* SVG Chart */}
                        <div className="w-full relative bg-white/5 rounded-lg border border-white/5" style={{ height: '200px' }}>
                            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                {/* Grid lines */}
                                <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#333" strokeWidth="1" />
                                <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="#333" strokeWidth="1" strokeDasharray="4 4" />

                                {/* Impressions Line */}
                                <motion.polyline
                                    points={pointsImp}
                                    fill="none"
                                    stroke="#A855F7"
                                    strokeWidth="2"
                                    strokeOpacity="0.5"
                                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
                                />

                                {/* Clicks Line */}
                                <motion.polyline
                                    points={pointsClicks}
                                    fill="none"
                                    stroke="#3B82F6"
                                    strokeWidth="3"
                                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.2 }}
                                />
                            </svg>

                            {/* Tooltip Overlay (Simple) */}
                            <div className="absolute inset-x-0 bottom-0 h-8 flex justify-between px-4 text-[10px] text-gray-500 items-end pb-1">
                                <span>30 giorni fa</span>
                                <span>Oggi</span>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* 2. Top 10 Keywords */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                            className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                        >
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Target className="w-5 h-5 text-yellow-400" /> Top Keywords
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-400">
                                    <thead className="text-xs uppercase bg-white/5 text-gray-300">
                                        <tr>
                                            <th className="px-4 py-3 rounded-l-lg">Keyword</th>
                                            <th className="px-4 py-3 text-right">Pos.</th>
                                            <th className="px-4 py-3 text-right rounded-r-lg">Clicks</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {data.keywords.map((k: any, i: number) => (
                                            <tr key={i} className="hover:bg-white/5 transition-colors">
                                                <td className="px-4 py-3 font-medium text-white max-w-[150px] truncate">{k.keys[0]}</td>
                                                <td className={`px-4 py-3 text-right font-bold ${k.position < 3 ? 'text-green-400' : 'text-yellow-400'}`}>
                                                    {k.position.toFixed(1)}
                                                </td>
                                                <td className="px-4 py-3 text-right">{k.clicks}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>

                        {/* 3. Pagine Opportunità */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                            className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                                <AlertCircle className="w-24 h-24 text-red-500" />
                            </div>

                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-red-400" /> Opportunità SEO (Low CTR)
                            </h3>
                            <p className="text-xs text-gray-500 mb-4 border-l-2 border-red-500 pl-3">
                                Queste pagine hanno molte impression ma pochi click.
                                <strong>Azione:</strong> Riscrivi il Meta Title per renderlo più cliccabile.
                            </p>

                            <div className="space-y-3">
                                {data.opportunities.map((op: any, i: number) => (
                                    <div key={i} className="bg-white/5 p-3 rounded-lg border border-white/5 hover:border-red-500/30 transition-colors group cursor-pointer hover:bg-white/10">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-xs text-blue-300 truncate max-w-[200px]" title={op.keys[0]}>{op.keys[0].replace('https://www.wrdigital.it', '')}</span>
                                            <span className="text-xs bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded font-mono">
                                                CTR {(op.ctr * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                        <div className="text-sm font-bold text-white mb-1">
                                            Query: "{op.keys[1]}"
                                        </div>
                                        <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                                            <span>Impressions: <span className="text-purple-400">{op.impressions}</span></span>
                                            <span className="text-green-400 group-hover:underline text-[10px] uppercase tracking-wider flex items-center gap-1">
                                                Fix it <ArrowRight className="w-3 h-3" />
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {data.opportunities.length === 0 && (
                                    <div className="text-center py-8 text-gray-500 italic">
                                        Nessuna opportunità critica rilevata. Ottimo lavoro!
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Recommendation Smart Insight */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                        className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/20 rounded-xl p-4 flex items-start gap-4"
                    >
                        <div className="bg-blue-500/20 p-2 rounded-lg">
                            <Target className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">[r]ecommendation</h4>
                            <p className="text-sm text-gray-300">
                                La keyword <strong>"{data.keywords[0]?.keys[0] || 'agenzia seo'}"</strong> sta performando bene.
                                Considera di creare una <strong>Pillar Page</strong> dedicata o espandere il contenuto esistente per consolidare la posizione.
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </div>
    );
}

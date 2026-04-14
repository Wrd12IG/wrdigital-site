'use client';

import { useState, useMemo } from 'react';
import { servicesData } from '@/data/services';
import { Globe, FileText, Layout, ChevronRight, CheckCircle2, AlertTriangle, XCircle, Code, BarChart3, Image as ImageIcon, Video, Zap, Monitor, PenTool, Link as LinkIcon, Fingerprint, Type } from 'lucide-react';

interface SEOPage {
    id: string;
    label: string;
    type: 'static' | 'service' | 'other';
    priority: number;
}

const CHECKLIST_CATEGORIES = [
    {
        title: "Architettura e Tag HTML",
        icon: Layout,
        items: [
            { id: 'title_check', label: 'Tag <title> (unico, max 60 char, keyword a sinistra)' },
            { id: 'meta_desc_check', label: 'Meta Description (CTA inclusa, max 150 char)' },
            { id: 'h1_check', label: 'Tag <h1> unico per pagina' },
            { id: 'h_hierarchy', label: 'Gerarchia <h2>-<h6> coerente e semantica' },
            { id: 'canonical', label: 'Tag <link rel="canonical"> auto-referenziale o incrociato' },
            { id: 'slug', label: 'Slug URL (SEO-friendly, breve, senza stop-words)' },
            { id: 'breadcrumbs', label: 'Implementazione Breadcrumbs (con dati strutturati)' }
        ]
    },
    {
        title: "Contenuto e Semantica (NLP & Intent)",
        icon: FileText,
        items: [
            { id: 'kw_first_para', label: 'Keyword principale nel primo paragrafo (prime 100 parole)' },
            { id: 'tf_idf', label: 'Analisi TF-IDF e integrazione keyword LSI (semantica)' },
            { id: 'search_intent', label: 'Copertura dei "Search Intent" (Informational, Transactional, Navigational)' },
            { id: 'kw_closing', label: 'Keyword nel paragrafo di chiusura' },
            { id: 'featured_snippet', label: 'Ottimizzazione per "Featured Snippet" (elenchi puntati/tabelle)' },
            { id: 'bold_keywords', label: 'Grassetto (<strong>) sui concetti chiave e varianti semantiche' },
            { id: 'unique_content', label: 'Verifica unicità del contenuto (no duplicate content)' }
        ]
    },
    {
        title: "Media e Asset",
        icon: ImageIcon,
        items: [
            { id: 'img_naming', label: 'Naming file immagini (descrittivo con keyword)' },
            { id: 'img_alt', label: 'Attributo alt su ogni immagine' },
            { id: 'img_dims', label: 'Dimensioni width e height esplicite (no Layout Shift)' },
            { id: 'next_gen_format', label: 'Formati Next-gen (.webp o .avif)' },
            { id: 'compression', label: 'Compressione sotto i 100kb per asset' },
            { id: 'video_schema', label: 'Video Schema Markup (se presenti video)' }
        ]
    },
    {
        title: "Linking Interno ed Esterno",
        icon: LinkIcon,
        items: [
            { id: 'internal_in', label: 'Minimo 3-5 Link interni in entrata verso la pagina' },
            { id: 'internal_out', label: 'Minimo 2-3 Link interni in uscita verso pagine correlate' },
            { id: 'anchor_text', label: 'Anchor text diversificati (esatti, a frase, brandizzati)' },
            { id: 'outbound', label: 'Link verso fonti esterne autorevoli (Outbound links)' },
            { id: 'broken_links', label: 'Controllo e rimozione di eventuali Link rotti (404)' }
        ]
    },
    {
        title: "Dati Strutturati (Schema.org)",
        icon: Code,
        items: [
            { id: 'json_business', label: 'JSON-LD Organization o LocalBusiness' },
            { id: 'json_service', label: 'JSON-LD Service o Product' },
            { id: 'json_faq', label: 'JSON-LD FAQPage (se applicabile)' },
            { id: 'json_article', label: 'JSON-LD Article o BlogPosting' },
            { id: 'rich_results', label: 'Validazione completa su "Rich Results Test" di Google' }
        ]
    },
    {
        title: "Technical On-Page & Performance",
        icon: Zap,
        items: [
            { id: 'cls', label: 'Analisi CLS (Cumulative Layout Shift) < 0.1' },
            { id: 'lcp', label: 'Analisi LCP (Largest Contentful Paint) < 2.5s' },
            { id: 'above_fold', label: 'Ottimizzazione "Above the fold" (no blocchi rendering)' },
            { id: 'mobile_touch', label: 'Verifica responsive design e "Touch targets" mobile' },
            { id: 'robots', label: 'Presenza e correttezza del file robots.txt' },
            { id: 'og_tags', label: 'Integrazione Open Graph (og:title, og:image)' }
        ]
    }
];

export default function SimpleSEOManager({ seoMeta, setSeoMeta }: { seoMeta: any, setSeoMeta: (val: any) => void }) {
    const [selectedPageId, setSelectedPageId] = useState<string>('home');
    const [viewMode, setViewMode] = useState<'editor' | 'report'>('editor');
    const [fixingItem, setFixingItem] = useState<string | null>(null);

    // 1. Lista Pagine
    const pages: SEOPage[] = useMemo(() => {
        const list: SEOPage[] = [
            { id: 'home', label: 'Home Page', type: 'static', priority: 10 },
            { id: 'pillar', label: 'Agenzia Marketing (Pillar)', type: 'static', priority: 9 },
            { id: 'blog', label: 'Blog', type: 'static', priority: 8 },
            { id: 'portfolio', label: 'Portfolio', type: 'static', priority: 7 },
            { id: 'contatti', label: 'Contatti', type: 'static', priority: 6 },
            { id: 'chi-siamo', label: 'Chi Siamo', type: 'static', priority: 5 },
            { id: 'privacy', label: 'Privacy Policy', type: 'static', priority: 1 },
            { id: 'cookie', label: 'Cookie Policy', type: 'static', priority: 1 },
        ];
        Object.entries(servicesData || {}).forEach(([slug, data]: any) => {
            list.push({ id: `servizio-${slug}`, label: `Servizio: ${data.title}`, type: 'service', priority: 8 });
        });
        return list.sort((a, b) => b.priority - a.priority);
    }, []);

    const activePage = pages.find(p => p.id === selectedPageId);
    const meta = seoMeta[selectedPageId] || {};

    const updateMeta = (field: string, value: any) => {
        setSeoMeta({
            ...seoMeta,
            [selectedPageId]: { ...meta, [field]: value }
        });
    };

    const handleFixWithAI = async (itemId: string) => {
        setFixingItem(itemId);
        try {
            const pageKey = activePage?.id.replace('servizio-', '') || 'home';
            // Mock API call to generate optimized content
            const res = await fetch('/api/admin/ai-generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pageKey, type: 'meta' })
            });

            if (res.ok) {
                const data = await res.json();

                if (itemId === 'title_check') {
                    updateMeta('title', data.title);
                }
                if (itemId === 'meta_desc_check') {
                    updateMeta('description', data.description);
                }
                if (itemId === 'h1_check') {
                    // Simple heuristic: use title part as H1 if not provided specifically
                    updateMeta('h1', (data.title || '').split('|')[0].trim());
                }
                if (itemId === 'h_hierarchy') {
                    updateMeta('h2_intro', data.description);
                }
            }
        } catch (e) {
            console.error("AI Generation failed", e);
        } finally {
            setFixingItem(null);
        }
    };

    // Helper per calcolare lo stato della checklist (simulato o reale dove possibile)
    const checkStatus = (itemId: string): 'success' | 'warning' | 'error' | 'pending' => {
        // Implementazione logica corretta per i controlli base
        const title = meta.title || '';
        const desc = meta.description || '';
        const h1 = meta.h1 || '';

        if (itemId === 'title_check') {
            return (title.length > 0 && title.length <= 60) ? 'success' : (title.length > 60 ? 'warning' : 'error');
        }
        if (itemId === 'meta_desc_check') {
            return (desc.length >= 120 && desc.length <= 160) ? 'success' : (desc.length > 0 ? 'warning' : 'error');
        }
        if (itemId === 'h1_check') return h1 ? 'success' : 'error';
        if (itemId === 'h_hierarchy') return h1 && meta.h2_intro ? 'success' : 'warning';
        if (itemId === 'img_alt') return meta.alt_hero ? 'success' : 'warning';

        // Controlli simulati su best practices (assumiamo OK se l'utente ha compilato i campi base)
        if (meta.title && meta.description && h1) {
            if (['slug', 'canonical', 'robots', 'mobile_touch'].includes(itemId)) return 'success';
            if (['next_gen_format', 'compression', 'img_dims'].includes(itemId) && meta.alt_hero) return 'warning'; // Richiede verifica manuale
        }

        return 'error';
    };

    return (
        <div className="flex h-[calc(100vh-200px)] border border-white/10 rounded-2xl overflow-hidden bg-[#0a0a0a]">
            {/* 1. SIDEBAR LISTA PAGINE */}
            <div className="w-64 bg-black/40 border-r border-white/10 flex flex-col">
                <div className="p-4 border-b border-white/10 bg-white/5">
                    <h3 className="font-bold text-gray-300 text-xs uppercase tracking-widest flex items-center gap-2">
                        <Monitor className="w-4 h-4" /> Pagina
                    </h3>
                </div>
                <div className="overflow-y-auto flex-1 p-2 space-y-1">
                    {pages.map(page => (
                        <button
                            key={page.id}
                            onClick={() => setSelectedPageId(page.id)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg text-sm transition-all text-left ${selectedPageId === page.id
                                    ? 'bg-purple-600 text-white font-medium shadow-lg shadow-purple-900/20'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <span className="truncate">{page.label}</span>
                            {selectedPageId === page.id && <ChevronRight className="w-4 h-4 opacity-50" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* 2. AREA PRINCIPALE */}
            <div className="flex-1 flex flex-col relative overflow-hidden bg-[#111]">
                {activePage ? (
                    <>
                        {/* Header Toolbar */}
                        <div className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-white/5">
                            <div>
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    {activePage.type === 'service' ? <FileText className="w-5 h-5 text-gray-400" /> : <Globe className="w-5 h-5 text-gray-400" />}
                                    {activePage.label}
                                </h2>
                                <p className="text-xs text-gray-500 font-mono mt-1">{`wrdigital.it/${activePage.id === 'home' ? '' : activePage.id}`}</p>
                            </div>

                            <div className="flex bg-black/50 p-1 rounded-lg border border-white/10">
                                <button
                                    onClick={() => setViewMode('editor')}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${viewMode === 'editor' ? 'bg-purple-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                                >
                                    <PenTool className="w-4 h-4" /> Editor Contenuti
                                </button>
                                <button
                                    onClick={() => setViewMode('report')}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${viewMode === 'report' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                                >
                                    <BarChart3 className="w-4 h-4" /> SEO Report
                                </button>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto p-8">

                            {/* VIEW: EDITOR CONTENUTI */}
                            {viewMode === 'editor' && (
                                <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-300">
                                    <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-blue-300 text-sm mb-6 flex items-start gap-3">
                                        <Monitor className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <p>Modifica questi campi per aggiornare i contenuti live sulla pagina. Per la Home Page, le modifiche a Titolo, Sottotitolo e Immagine Hero sono immediate.</p>
                                    </div>

                                    {/* 1. SEZIONE HERO / TESTATA */}
                                    <section className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group hover:border-purple-500/30 transition-colors">
                                        <div className="absolute top-4 right-4 p-2 bg-purple-500/20 rounded text-purple-400">
                                            <Layout className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-2">1. Hero Section (Testata)</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Titolo Principale (H1)</label>
                                                    <textarea
                                                        rows={2}
                                                        value={meta.h1 || ''}
                                                        onChange={(e) => updateMeta('h1', e.target.value)}
                                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white font-bold text-lg focus:border-purple-500 transition-colors resize-none"
                                                        placeholder="Il Titolo della Pagina"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Sottotitolo / Intro</label>
                                                    <textarea
                                                        rows={4}
                                                        value={meta.h2_intro || ''}
                                                        onChange={(e) => updateMeta('h2_intro', e.target.value)}
                                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-gray-300 text-sm focus:border-purple-500 transition-colors resize-none"
                                                        placeholder="Testo introduttivo..."
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer group/img">
                                                    <ImageIcon className="w-8 h-8 text-gray-600 mb-2 group-hover/img:text-purple-400" />
                                                    <span className="text-xs font-bold text-gray-500 uppercase group-hover/img:text-purple-400">Immagine di Sfondo / Hero</span>
                                                    <span className="text-[10px] text-gray-600 mt-1">1920x1080px (WebP)</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={meta.hero_image_url || ''}
                                                    onChange={(e) => updateMeta('hero_image_url', e.target.value)}
                                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-sm text-white focus:border-purple-500 transition-colors"
                                                    placeholder="URL Immagine (es. /my-hero.jpg)"
                                                />
                                                <div>
                                                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Alt Text Immagine</label>
                                                    <input
                                                        type="text"
                                                        value={meta.alt_hero || ''}
                                                        onChange={(e) => updateMeta('alt_hero', e.target.value)}
                                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-sm text-white focus:border-purple-500 transition-colors"
                                                        placeholder="Descrizione SEO dell'immagine..."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* 2. SEZIONE VIDEO / MEDIA */}
                                    <section className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group hover:border-pink-500/30 transition-colors">
                                        <div className="absolute top-4 right-4 p-2 bg-pink-500/20 rounded text-pink-400">
                                            <Video className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-2">2. Media & Video Presentation</h3>

                                        <div className="grid grid-cols-1 gap-6">
                                            <div className="flex items-center gap-4 p-4 bg-black/30 rounded-xl">
                                                <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <Video className="w-6 h-6 text-gray-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">URL Video (YouTube / Vimeo / MP4)</label>
                                                    <input
                                                        type="text"
                                                        className="w-full bg-transparent border-b border-white/10 py-1 text-white focus:border-pink-500 transition-colors outline-none"
                                                        placeholder="https://..."
                                                        disabled
                                                    />
                                                    <p className="text-[10px] text-gray-500 mt-1">Funzionalità video in arrivo.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* 3. META DATA (SEO) */}
                                    <section className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group hover:border-green-500/30 transition-colors">
                                        <div className="absolute top-4 right-4 p-2 bg-green-500/20 rounded text-green-400">
                                            <Globe className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-2">3. Metadati per Google (Snippet Preview)</h3>

                                        <div className="bg-[#222] p-4 rounded-xl border border-white/5 mb-4">
                                            <div className="text-sm text-blue-400 hover:underline cursor-pointer mb-1 truncate text-xl leading-snug font-sans">
                                                {meta.title || 'Titolo Pagina | W[r]Digital'}
                                            </div>
                                            <div className="text-xs text-green-500 mb-1 font-sans">
                                                https://wrdigital.it/{activePage.id}
                                            </div>
                                            <div className="text-sm text-gray-400 line-clamp-2 font-sans">
                                                {meta.description || 'Descrizione della pagina...'}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Meta Title</label>
                                                <input
                                                    type="text"
                                                    value={meta.title || ''}
                                                    onChange={(e) => updateMeta('title', e.target.value)}
                                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-green-500 transition-colors"
                                                    placeholder="Titolo che appare su Google"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Meta Description</label>
                                                <textarea
                                                    rows={2}
                                                    value={meta.description || ''}
                                                    onChange={(e) => updateMeta('description', e.target.value)}
                                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-green-500 transition-colors resize-none"
                                                    placeholder="Descrizione che invita al clic"
                                                />
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            )}

                            {/* VIEW: SEO REPORT */}
                            {viewMode === 'report' && (
                                <div className="max-w-5xl mx-auto animate-in fade-in zoom-in-95 duration-300">
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <h2 className="text-2xl font-bold text-white">Report SEO Dettagliato</h2>
                                            <p className="text-gray-400">Analisi completa dello stato di salute della pagina.</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-bold border border-green-500/20">PASS: {CHECKLIST_CATEGORIES.reduce((acc, cat) => acc + cat.items.filter(i => checkStatus(i.id) === 'success').length, 0)}</div>
                                            <div className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-xs font-bold border border-yellow-500/20">WARN: {CHECKLIST_CATEGORIES.reduce((acc, cat) => acc + cat.items.filter(i => checkStatus(i.id) === 'warning').length, 0)}</div>
                                            <div className="px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-xs font-bold border border-red-500/20">FAIL: {CHECKLIST_CATEGORIES.reduce((acc, cat) => acc + cat.items.filter(i => checkStatus(i.id) === 'error').length, 0)}</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                                        {CHECKLIST_CATEGORIES.map((category, idx) => (
                                            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                                                <div className="p-4 border-b border-white/10 bg-black/20 flex items-center gap-3">
                                                    <category.icon className="w-5 h-5 text-gray-400" />
                                                    <h3 className="font-bold text-gray-200">{category.title}</h3>
                                                </div>
                                                <div className="p-2">
                                                    {category.items.map((item) => {
                                                        const status = checkStatus(item.id);
                                                        return (
                                                            <div key={item.id} className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-lg transition-colors group">
                                                                <div className="mt-0.5 flex-shrink-0">
                                                                    {status === 'success' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                                                                    {status === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                                                                    {status === 'error' && <XCircle className="w-4 h-4 text-red-500" />}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className={`text-sm ${status === 'success' ? 'text-gray-300' : 'text-gray-400'}`}>{item.label}</p>
                                                                    {/* Action Button: Fix with AI */}
                                                                    {['title_check', 'meta_desc_check', 'h1_check', 'h_hierarchy'].includes(item.id) && (
                                                                        <div className={`flex items-center gap-2 mt-2 ${fixingItem === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                                                                            <button
                                                                                onClick={() => handleFixWithAI(item.id)}
                                                                                disabled={fixingItem !== null}
                                                                                className={`text-[10px] uppercase font-bold cursor-pointer hover:underline flex items-center gap-1 ${fixingItem === item.id ? 'text-gray-500' : 'text-purple-400'}`}
                                                                            >
                                                                                {fixingItem === item.id ? <div className="animate-spin w-3 h-3 border-2 border-purple-500 border-t-transparent rounded-full" /> : <Zap className="w-3 h-3" />}
                                                                                {fixingItem === item.id ? 'Generazione in corso...' : 'Fix with AI'}
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500 flex-col">
                        <Monitor className="w-16 h-16 opacity-20 mb-4" />
                        <p>Seleziona una pagina dalla sitemap</p>
                    </div>
                )}
            </div>
        </div>
    );
}

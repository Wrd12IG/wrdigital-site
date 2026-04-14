'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, CheckCircle2, AlertTriangle, XCircle, Filter,
    Home, FileText, Briefcase, Scale, ChevronRight, Eye,
    Settings, RefreshCw, TrendingUp, Target, Sparkles,
    ExternalLink, PenLine, Type, BarChart3
} from 'lucide-react';
import SEOPanelImproved from './SEOPanelImproved';

// Page definitions with SEO data
interface PageSeoData {
    id: string;
    title: string;
    path: string;
    category: 'static' | 'service' | 'legal' | 'blog';
    metaTitle?: string;
    metaDescription?: string;
    focusKeyword?: string;
    content?: string;
    canonical?: string;
    noindex?: boolean;
    schema?: any;
}

// Calculate SEO score for a page
function calculateScore(page: PageSeoData): { score: number; status: 'excellent' | 'good' | 'needs-work' | 'critical' } {
    let score = 0;
    const maxScore = 100;

    // Title (25 points)
    const titleLen = (page.metaTitle || '').length;
    if (titleLen >= 50 && titleLen <= 60) score += 25;
    else if (titleLen > 0) score += 12;

    // Description (25 points)
    const descLen = (page.metaDescription || '').length;
    if (descLen >= 140 && descLen <= 160) score += 25;
    else if (descLen > 0) score += 12;

    // Focus Keyword (20 points)
    if (page.focusKeyword && page.focusKeyword.length > 0) {
        score += 10;
        // Check if keyword is in title
        if (page.metaTitle?.toLowerCase().includes(page.focusKeyword.toLowerCase())) {
            score += 10;
        }
    }

    // Schema (15 points)
    if (page.schema) score += 15;

    // Canonical (10 points)
    if (page.canonical || page.path) score += 10;

    // Indexability (5 points)
    if (!page.noindex) score += 5;

    const percentage = Math.round((score / maxScore) * 100);

    if (percentage >= 80) return { score: percentage, status: 'excellent' };
    if (percentage >= 60) return { score: percentage, status: 'good' };
    if (percentage >= 40) return { score: percentage, status: 'needs-work' };
    return { score: percentage, status: 'critical' };
}

// Default pages that should exist
const defaultPages: PageSeoData[] = [
    { id: 'home', title: 'Homepage', path: '/', category: 'static' },
    { id: 'pillar', title: 'Pillar Page Marketing', path: '/agenzia-marketing-digitale', category: 'static' },
    { id: 'blog', title: 'Blog', path: '/blog', category: 'static' },
    { id: 'portfolio', title: 'Portfolio', path: '/portfolio', category: 'static' },
    { id: 'contatti', title: 'Contatti', path: '/contatti', category: 'static' },
    { id: 'seo', title: 'Servizio SEO', path: '/servizi/seo', category: 'service' },
    { id: 'sem', title: 'Servizio SEM/Ads', path: '/servizi/campagne-google-ads', category: 'service' },
    { id: 'social', title: 'Social Media Marketing', path: '/servizi/social-media-marketing', category: 'service' },
    { id: 'web', title: 'Sviluppo Web', path: '/servizi/sviluppo-web', category: 'service' },
    { id: 'content', title: 'Content Marketing', path: '/servizi/content-marketing', category: 'service' },
    { id: 'branding', title: 'Branding', path: '/servizi/branding', category: 'service' },
    { id: 'privacy', title: 'Privacy Policy', path: '/privacy', category: 'legal' },
    { id: 'cookie', title: 'Cookie Policy', path: '/cookie-policy', category: 'legal' },
];

export default function SeoPageManager() {
    const [pages, setPages] = useState<PageSeoData[]>(defaultPages);
    const [seoData, setSeoData] = useState<Record<string, any>>({});
    const [contentData, setContentData] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [selectedPage, setSelectedPage] = useState<PageSeoData | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [editTab, setEditTab] = useState<'seo' | 'content'>('seo');

    // Load SEO data and content
    useEffect(() => {
        const loadData = async () => {
            try {
                const [resSeo, resContent] = await Promise.all([
                    fetch('/api/admin/seo-meta'),
                    fetch('/api/admin/services-content')
                ]);

                if (resSeo.ok) {
                    const data = await resSeo.json();
                    setSeoData(data);

                    // Merge with default pages
                    const mergedPages = defaultPages.map(page => ({
                        ...page,
                        metaTitle: data[page.id]?.title || '',
                        metaDescription: data[page.id]?.description || '',
                        focusKeyword: data[page.id]?.keywords?.split(',')[0]?.trim() || '',
                        schema: data[page.id]?.schemaType,
                        canonical: data[page.id]?.canonical,
                        noindex: data[page.id]?.noindex,
                        content: data[page.id]?.pageContent || ''
                    }));
                    setPages(mergedPages);
                }

                if (resContent.ok) {
                    const content = await resContent.json();
                    setContentData(content);
                }
            } catch (error) {
                console.error('Error loading SEO data:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Filtered pages
    const filteredPages = useMemo(() => {
        return pages.filter(page => {
            // Search filter
            if (searchQuery && !page.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                !page.path.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }
            // Category filter
            if (filterCategory !== 'all' && page.category !== filterCategory) {
                return false;
            }
            // Status filter
            if (filterStatus !== 'all') {
                const { status } = calculateScore(page);
                if (filterStatus !== status) return false;
            }
            return true;
        });
    }, [pages, searchQuery, filterCategory, filterStatus]);

    // Stats
    const stats = useMemo(() => {
        const counts = { excellent: 0, good: 0, 'needs-work': 0, critical: 0 };
        pages.forEach(page => {
            const { status } = calculateScore(page);
            counts[status]++;
        });
        return counts;
    }, [pages]);

    // Save page SEO
    const handleSavePage = async (pageId: string, data: any) => {
        setSaving(true);
        try {
            const newSeoData = {
                ...seoData,
                [pageId]: {
                    ...seoData[pageId],
                    title: data.title,
                    description: data.description,
                    keywords: data.focusKeyword,
                    schemaType: data.schema,
                    canonical: data.canonical,
                    noindex: data.noindex
                }
            };

            const res = await fetch('/api/admin/seo-meta', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSeoData)
            });

            if (res.ok) {
                setSeoData(newSeoData);
                setPages(pages.map(p =>
                    p.id === pageId ? {
                        ...p,
                        metaTitle: data.title,
                        metaDescription: data.description,
                        focusKeyword: data.focusKeyword,
                        schema: data.schema
                    } : p
                ));
                alert('SEO salvato con successo!');
            }
        } catch (error) {
            alert('Errore nel salvataggio');
        } finally {
            setSaving(false);
        }
    };

    // Load page content when page is selected
    const loadPageContent = async (page: PageSeoData) => {
        try {
            const res = await fetch(`/api/admin/page-content?pageId=${page.id}&type=${page.category}`);
            if (res.ok) {
                const data = await res.json();
                if (data.textContent) {
                    setSelectedPage(prev => prev ? {
                        ...prev,
                        content: data.textContent
                    } : null);
                }
            }
        } catch (error) {
            console.error('Error loading page content:', error);
        }
    };

    // Handle page selection
    const handleSelectPage = (page: PageSeoData) => {
        setSelectedPage(page);
        setEditTab('seo'); // Reset to SEO tab
        // Load content for this page
        loadPageContent(page);
    };

    // Save page content
    const handleSaveContent = async (pageId: string, content: string) => {
        if (!selectedPage) return;

        setSaving(true);
        try {
            // Save using new page-content API
            const res = await fetch('/api/admin/page-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pageId,
                    pageType: selectedPage.category,
                    textContent: content,
                    slug: selectedPage.path
                })
            });

            const result = await res.json();

            if (res.ok) {
                // Also update in seo-meta for SEO analysis
                const newSeoData = {
                    ...seoData,
                    [pageId]: {
                        ...seoData[pageId],
                        pageContent: content
                    }
                };
                await fetch('/api/admin/seo-meta', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newSeoData)
                });
                setSeoData(newSeoData);

                setPages(pages.map(p =>
                    p.id === pageId ? { ...p, content } : p
                ));

                const savedLocation = result.savedTo === 'database'
                    ? '✅ Salvato nel DATABASE (visibile sul sito)'
                    : '💾 Salvato nel file di configurazione';
                alert(`Contenuto salvato!\n\n${savedLocation}`);
            }
        } catch (error) {
            alert('Errore nel salvataggio del contenuto');
        } finally {
            setSaving(false);
        }
    };

    // Calculate keyword density
    const calculateKeywordDensity = (text: string, keyword: string): { count: number; density: number; wordCount: number } => {
        if (!text || !keyword) return { count: 0, density: 0, wordCount: 0 };

        const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 0);
        const wordCount = words.length;
        const keywordLower = keyword.toLowerCase();

        // Count keyword occurrences (including partial matches in compound words)
        let count = 0;
        words.forEach(word => {
            if (word.includes(keywordLower)) count++;
        });

        // Also count exact phrase matches
        const phraseMatches = (text.toLowerCase().match(new RegExp(keywordLower, 'g')) || []).length;
        count = Math.max(count, phraseMatches);

        const density = wordCount > 0 ? (count / wordCount) * 100 : 0;

        return { count, density: Math.round(density * 100) / 100, wordCount };
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'excellent': return <CheckCircle2 className="w-4 h-4 text-green-400" />;
            case 'good': return <CheckCircle2 className="w-4 h-4 text-blue-400" />;
            case 'needs-work': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
            case 'critical': return <XCircle className="w-4 h-4 text-red-400" />;
            default: return null;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'excellent': return 'bg-green-500/20 border-green-500/30 text-green-400';
            case 'good': return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
            case 'needs-work': return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400';
            case 'critical': return 'bg-red-500/20 border-red-500/30 text-red-400';
            default: return 'bg-gray-500/20 border-gray-500/30 text-gray-400';
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'static': return <Home className="w-4 h-4" />;
            case 'service': return <Briefcase className="w-4 h-4" />;
            case 'legal': return <Scale className="w-4 h-4" />;
            case 'blog': return <FileText className="w-4 h-4" />;
            default: return <FileText className="w-4 h-4" />;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
            </div>
        );
    }

    return (
        <div className="flex h-[calc(100vh-200px)] gap-6">
            {/* Left Sidebar - Page List */}
            <div className="w-80 flex-shrink-0 flex flex-col bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-white/10">
                    <h2 className="text-lg font-bold flex items-center gap-2 text-white mb-3">
                        <Target className="w-5 h-5 text-yellow-400" />
                        SEO Manager
                    </h2>

                    {/* Search */}
                    <div className="relative mb-3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Cerca pagina..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-black/30 border border-white/10 rounded-lg text-sm focus:border-yellow-400/50 focus:outline-none"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2">
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                        >
                            <option value="all">Tutte</option>
                            <option value="static">Statiche</option>
                            <option value="service">Servizi</option>
                            <option value="legal">Legali</option>
                        </select>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                        >
                            <option value="all">Tutti stati</option>
                            <option value="excellent">✅ Ottimo</option>
                            <option value="good">🔵 Buono</option>
                            <option value="needs-work">⚠️ Da migliorare</option>
                            <option value="critical">❌ Critico</option>
                        </select>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="p-3 border-b border-white/10 flex gap-2">
                    <div className="flex-1 text-center p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-lg font-bold text-green-400">{stats.excellent}</div>
                        <div className="text-[10px] text-gray-400">Ottimo</div>
                    </div>
                    <div className="flex-1 text-center p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-lg font-bold text-blue-400">{stats.good}</div>
                        <div className="text-[10px] text-gray-400">Buono</div>
                    </div>
                    <div className="flex-1 text-center p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-lg font-bold text-yellow-400">{stats['needs-work']}</div>
                        <div className="text-[10px] text-gray-400">Da fare</div>
                    </div>
                    <div className="flex-1 text-center p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-lg font-bold text-red-400">{stats.critical}</div>
                        <div className="text-[10px] text-gray-400">Critico</div>
                    </div>
                </div>

                {/* Page List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredPages.map((page) => {
                        const { score, status } = calculateScore(page);
                        const isSelected = selectedPage?.id === page.id;

                        return (
                            <motion.div
                                key={page.id}
                                onClick={() => handleSelectPage(page)}
                                className={`
                                    p-3 border-b border-white/5 cursor-pointer transition-all
                                    ${isSelected ? 'bg-yellow-400/10 border-l-2 border-l-yellow-400' : 'hover:bg-white/5'}
                                `}
                                whileHover={{ x: 4 }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-1.5 rounded-lg ${getStatusColor(status)}`}>
                                        {getCategoryIcon(page.category)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-sm text-white truncate">{page.title}</span>
                                            {getStatusIcon(status)}
                                        </div>
                                        <div className="text-xs text-gray-500 truncate">{page.path}</div>
                                    </div>
                                    <div className={`
                                        text-xs font-bold px-2 py-1 rounded
                                        ${score >= 80 ? 'text-green-400' : score >= 60 ? 'text-blue-400' : score >= 40 ? 'text-yellow-400' : 'text-red-400'}
                                    `}>
                                        {score}%
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Right Panel - SEO Editor */}
            <div className="flex-1 bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                <AnimatePresence mode="wait">
                    {selectedPage ? (
                        <motion.div
                            key={selectedPage.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="p-6 h-full overflow-y-auto"
                        >
                            {/* Page Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                        {getCategoryIcon(selectedPage.category)}
                                        {selectedPage.title}
                                    </h3>
                                    <div className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                                        <span className="font-mono">{selectedPage.path}</span>
                                        <a
                                            href={selectedPage.path}
                                            target="_blank"
                                            rel="noopener"
                                            className="text-blue-400 hover:underline flex items-center gap-1"
                                        >
                                            <Eye className="w-3 h-3" /> Vedi
                                        </a>
                                    </div>
                                </div>
                                <div className={`px-3 py-1.5 rounded-lg text-sm font-bold ${getStatusColor(calculateScore(selectedPage).status)}`}>
                                    Score: {calculateScore(selectedPage).score}%
                                </div>
                            </div>

                            {/* Tab Navigation */}
                            <div className="flex gap-2 mb-6 bg-black/30 p-1 rounded-lg">
                                <button
                                    onClick={() => setEditTab('seo')}
                                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${editTab === 'seo'
                                        ? 'bg-yellow-400 text-black'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    <Target className="w-4 h-4" />
                                    SEO Meta
                                </button>
                                <button
                                    onClick={() => setEditTab('content')}
                                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${editTab === 'content'
                                        ? 'bg-yellow-400 text-black'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    <Type className="w-4 h-4" />
                                    Contenuto
                                </button>
                            </div>

                            {/* TAB: SEO Meta */}
                            {editTab === 'seo' && (
                                <>
                                    <SEOPanelImproved
                                        title={selectedPage.metaTitle || ''}
                                        description={selectedPage.metaDescription || ''}
                                        focusKeyword={selectedPage.focusKeyword || ''}
                                        content={selectedPage.content || ''}
                                        slug={selectedPage.path}
                                        canonical={selectedPage.canonical}
                                        noindex={selectedPage.noindex}
                                        schemaData={selectedPage.schema}
                                        onChange={(field, value) => {
                                            setSelectedPage({
                                                ...selectedPage,
                                                [field === 'title' ? 'metaTitle' : field === 'description' ? 'metaDescription' : field]: value
                                            });
                                        }}
                                    />

                                    {/* Save SEO Button */}
                                    <div className="mt-6 flex justify-end">
                                        <button
                                            onClick={() => handleSavePage(selectedPage.id, {
                                                title: selectedPage.metaTitle,
                                                description: selectedPage.metaDescription,
                                                focusKeyword: selectedPage.focusKeyword,
                                                schema: selectedPage.schema,
                                                canonical: selectedPage.canonical,
                                                noindex: selectedPage.noindex
                                            })}
                                            disabled={saving}
                                            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all disabled:opacity-50 flex items-center gap-2"
                                        >
                                            {saving ? (
                                                <RefreshCw className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Sparkles className="w-4 h-4" />
                                            )}
                                            {saving ? 'Salvataggio...' : 'Salva SEO'}
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* TAB: Content Editor */}
                            {editTab === 'content' && (
                                <div className="space-y-6">
                                    {/* Quick Link to CMS Editor for Services */}
                                    {selectedPage.category === 'service' && (
                                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-sm font-bold text-blue-400 flex items-center gap-2">
                                                        <PenLine className="w-4 h-4" />
                                                        Editor Visuale
                                                    </h4>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        Usa l'editor CMS per modificare i blocchi visivamente
                                                    </p>
                                                </div>
                                                <a
                                                    href={`/admin/editor?page=${selectedPage.id}`}
                                                    target="_blank"
                                                    rel="noopener"
                                                    className="px-4 py-2 bg-blue-500 text-white text-sm font-bold rounded-lg hover:bg-blue-400 transition-colors flex items-center gap-2"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    Apri Editor
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    {/* Info: Where content is saved */}
                                    <div className={`rounded-xl p-4 ${selectedPage.category === 'service'
                                            ? 'bg-green-500/10 border border-green-500/30'
                                            : 'bg-purple-500/10 border border-purple-500/30'
                                        }`}>
                                        <div className="flex items-start gap-3">
                                            <div className={`p-2 rounded-lg ${selectedPage.category === 'service'
                                                    ? 'bg-green-500/20'
                                                    : 'bg-purple-500/20'
                                                }`}>
                                                {selectedPage.category === 'service' ? (
                                                    <Briefcase className="w-5 h-5 text-green-400" />
                                                ) : (
                                                    <FileText className="w-5 h-5 text-purple-400" />
                                                )}
                                            </div>
                                            <div>
                                                <h4 className={`text-sm font-bold ${selectedPage.category === 'service'
                                                        ? 'text-green-400'
                                                        : 'text-purple-400'
                                                    }`}>
                                                    {selectedPage.category === 'service'
                                                        ? '📦 Contenuto salvato nel DATABASE'
                                                        : '📄 Contenuto salvato nel File di Configurazione'}
                                                </h4>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {selectedPage.category === 'service'
                                                        ? 'Le modifiche saranno visibili direttamente sulla pagina del servizio sul sito.'
                                                        : 'Il contenuto viene salvato per l\'analisi SEO. Per modificare i testi visibili sul sito, modifica i componenti React.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Keyword Density Analyzer */}
                                    {selectedPage.focusKeyword && (
                                        <div className="bg-gray-800/50 rounded-xl p-4">
                                            <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                                                <BarChart3 className="w-4 h-4 text-yellow-400" />
                                                Keyword Density
                                            </h4>
                                            {(() => {
                                                const { count, density, wordCount } = calculateKeywordDensity(
                                                    selectedPage.content || '',
                                                    selectedPage.focusKeyword
                                                );
                                                const isOptimal = density >= 1 && density <= 3;
                                                const isLow = density < 1;
                                                const isHigh = density > 3;

                                                return (
                                                    <div className="grid grid-cols-3 gap-4">
                                                        <div className="text-center p-3 bg-black/30 rounded-lg">
                                                            <div className="text-2xl font-bold text-white">{wordCount}</div>
                                                            <div className="text-xs text-gray-400">Parole totali</div>
                                                        </div>
                                                        <div className="text-center p-3 bg-black/30 rounded-lg">
                                                            <div className="text-2xl font-bold text-yellow-400">{count}</div>
                                                            <div className="text-xs text-gray-400">Keyword trovate</div>
                                                        </div>
                                                        <div className={`text-center p-3 rounded-lg ${isOptimal ? 'bg-green-500/20' : isLow ? 'bg-red-500/20' : 'bg-yellow-500/20'
                                                            }`}>
                                                            <div className={`text-2xl font-bold ${isOptimal ? 'text-green-400' : isLow ? 'text-red-400' : 'text-yellow-400'
                                                                }`}>
                                                                {density}%
                                                            </div>
                                                            <div className="text-xs text-gray-400">
                                                                {isOptimal ? '✓ Ottimale' : isLow ? '↑ Troppo bassa' : '↓ Troppo alta'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })()}
                                            <p className="text-xs text-gray-500 mt-3">
                                                💡 La keyword density ottimale è tra 1% e 3%. Aggiungi la keyword "{selectedPage.focusKeyword}" nel testo sottostante.
                                            </p>
                                        </div>
                                    )}

                                    {/* Content Text Editor */}
                                    <div>
                                        <label className="block text-sm font-bold text-white mb-2 flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-gray-400" />
                                            Contenuto Testuale della Pagina
                                        </label>
                                        <p className="text-xs text-gray-500 mb-3">
                                            Inserisci qui il testo principale della pagina per ottimizzare la keyword density.
                                            Questo testo verrà usato per l'analisi SEO.
                                        </p>
                                        <textarea
                                            value={selectedPage.content || ''}
                                            onChange={(e) => setSelectedPage({
                                                ...selectedPage,
                                                content: e.target.value
                                            })}
                                            placeholder={`Inserisci il contenuto testuale per ${selectedPage.title}...\n\nSuggerimento: Includi la keyword "${selectedPage.focusKeyword || 'focus keyword'}" naturalmente nel testo per migliorare la SEO.`}
                                            className="w-full h-64 bg-black/30 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-gray-500 focus:border-yellow-400/50 focus:outline-none resize-none font-mono"
                                            style={{ lineHeight: 1.6 }}
                                        />
                                        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                                            <span>
                                                {(selectedPage.content || '').split(/\s+/).filter(w => w.length > 0).length} parole
                                            </span>
                                            <span>
                                                {(selectedPage.content || '').length} caratteri
                                            </span>
                                        </div>
                                    </div>

                                    {/* Suggestions */}
                                    {selectedPage.focusKeyword && (
                                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                                            <h4 className="text-sm font-bold text-yellow-400 mb-2">💡 Suggerimenti per la Keyword Density</h4>
                                            <ul className="text-xs text-gray-300 space-y-1">
                                                <li>• Usa la keyword "{selectedPage.focusKeyword}" nel primo paragrafo</li>
                                                <li>• Inseriscila in modo naturale 3-5 volte ogni 300 parole</li>
                                                <li>• Usa variazioni e sinonimi (es: SEO, ottimizzazione, posizionamento)</li>
                                                <li>• Non forzare la keyword - Google penalizza il keyword stuffing</li>
                                            </ul>
                                        </div>
                                    )}

                                    {/* Save Content Button */}
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => handleSaveContent(selectedPage.id, selectedPage.content || '')}
                                            disabled={saving}
                                            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-400 hover:to-emerald-500 transition-all disabled:opacity-50 flex items-center gap-2"
                                        >
                                            {saving ? (
                                                <RefreshCw className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <FileText className="w-4 h-4" />
                                            )}
                                            {saving ? 'Salvataggio...' : 'Salva Contenuto'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="h-full flex items-center justify-center"
                        >
                            <div className="text-center text-gray-500">
                                <Target className="w-16 h-16 mx-auto mb-4 opacity-30" />
                                <p className="text-lg">Seleziona una pagina per modificarne il SEO</p>
                                <p className="text-sm mt-2">Scegli dalla lista a sinistra</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

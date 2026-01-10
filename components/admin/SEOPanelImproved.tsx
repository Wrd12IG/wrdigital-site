'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, AlertTriangle, CheckCircle2, XCircle, Info,
    Eye, FileText, Link2, Code, Target, BarChart3,
    Sparkles, TrendingUp, AlertCircle, ChevronDown
} from 'lucide-react';

// SEO Analysis Types
interface SEOAnalysis {
    score: number;
    title: TitleAnalysis;
    description: DescriptionAnalysis;
    keyword: KeywordAnalysis;
    content: ContentAnalysis;
    technical: TechnicalAnalysis;
}

interface TitleAnalysis {
    text: string;
    length: number;
    optimal: boolean;
    hasKeyword: boolean;
    issues: string[];
}

interface DescriptionAnalysis {
    text: string;
    length: number;
    optimal: boolean;
    hasKeyword: boolean;
    issues: string[];
}

interface KeywordAnalysis {
    keyword: string;
    density: number;
    count: number;
    inTitle: boolean;
    inDescription: boolean;
    inH1: boolean;
    inUrl: boolean;
    lsiSuggestions: string[];
}

interface ContentAnalysis {
    wordCount: number;
    readingTime: number;
    headingsStructure: { level: number; text: string }[];
    imagesWithoutAlt: number;
    internalLinks: number;
    externalLinks: number;
}

interface TechnicalAnalysis {
    hasCanonical: boolean;
    isIndexable: boolean;
    hasSchema: boolean;
    estimatedLCP: number; // in seconds
    issues: string[];
}

// LSI Keywords database (simplified)
const LSI_DATABASE: Record<string, string[]> = {
    'seo': ['ottimizzazione', 'posizionamento', 'ranking', 'serp', 'google', 'indicizzazione', 'backlink', 'keyword'],
    'marketing': ['strategia', 'brand', 'advertising', 'campagne', 'roi', 'conversione', 'lead', 'funnel'],
    'web design': ['ux', 'ui', 'responsive', 'mobile', 'performance', 'user experience', 'layout', 'landing page'],
    'social media': ['engagement', 'follower', 'community', 'content', 'instagram', 'facebook', 'tiktok', 'influencer'],
    'advertising': ['ppc', 'cpc', 'roas', 'google ads', 'meta ads', 'campagne', 'budget', 'conversioni']
};

interface SEOPanelProps {
    title: string;
    description: string;
    focusKeyword: string;
    content: string;
    slug: string;
    canonical?: string;
    noindex?: boolean;
    schemaData?: any;
    onChange: (field: string, value: any) => void;
}

export default function SEOPanelImproved({
    title,
    description,
    focusKeyword,
    content,
    slug,
    canonical,
    noindex,
    schemaData,
    onChange
}: SEOPanelProps) {
    const [expandedSection, setExpandedSection] = useState<string | null>('overview');
    const [showLSI, setShowLSI] = useState(false);

    // Compute SEO Analysis
    const analysis = useMemo<SEOAnalysis>(() => {
        const plainContent = content.replace(/<[^>]*>/g, '').toLowerCase();
        const words = plainContent.split(/\s+/).filter(w => w.length > 2);
        const keywordLower = focusKeyword.toLowerCase();

        // Keyword occurrences
        const keywordRegex = new RegExp(keywordLower, 'gi');
        const keywordCount = (plainContent.match(keywordRegex) || []).length;
        const keywordDensity = words.length > 0 ? (keywordCount / words.length) * 100 : 0;

        // Title analysis
        const titleIssues: string[] = [];
        if (title.length < 30) titleIssues.push('Titolo troppo corto (min 30 caratteri)');
        if (title.length > 60) titleIssues.push('Titolo troppo lungo (max 60 caratteri)');
        if (!title.toLowerCase().includes(keywordLower)) titleIssues.push('Keyword principale non presente nel titolo');

        // Description analysis
        const descIssues: string[] = [];
        if (description.length < 120) descIssues.push('Descrizione troppo corta (min 120 caratteri)');
        if (description.length > 160) descIssues.push('Descrizione troppo lunga (max 160 caratteri)');
        if (!description.toLowerCase().includes(keywordLower)) descIssues.push('Keyword principale non presente nella descrizione');

        // Technical issues
        const techIssues: string[] = [];
        if (!canonical) techIssues.push('URL Canonical non impostato');
        if (noindex) techIssues.push('⚠️ Pagina impostata come NOINDEX');

        // LSI suggestions
        const lsiSuggestions = Object.entries(LSI_DATABASE)
            .filter(([key]) => keywordLower.includes(key) || key.includes(keywordLower))
            .flatMap(([_, suggestions]) => suggestions)
            .filter(s => !plainContent.includes(s.toLowerCase()))
            .slice(0, 8);

        // Headings structure
        const headingsRegex = /<h([1-6])[^>]*>(.*?)<\/h\1>/gi;
        const headings: { level: number; text: string }[] = [];
        let match;
        while ((match = headingsRegex.exec(content)) !== null) {
            headings.push({ level: parseInt(match[1]), text: match[2].replace(/<[^>]*>/g, '') });
        }

        // Images without alt
        const imgRegex = /<img[^>]*>/gi;
        const images = content.match(imgRegex) || [];
        const imagesWithoutAlt = images.filter(img => !img.includes('alt="') || img.includes('alt=""')).length;

        // Links
        const internalLinkRegex = /href=["']\/[^"']*["']/gi;
        const externalLinkRegex = /href=["']https?:\/\/(?!wrdigital)[^"']*["']/gi;
        const internalLinks = (content.match(internalLinkRegex) || []).length;
        const externalLinks = (content.match(externalLinkRegex) || []).length;

        // Calculate overall score
        let score = 100;
        if (titleIssues.length > 0) score -= titleIssues.length * 10;
        if (descIssues.length > 0) score -= descIssues.length * 10;
        if (keywordDensity < 0.5 || keywordDensity > 3) score -= 15;
        if (!title.toLowerCase().includes(keywordLower)) score -= 15;
        if (!slug.includes(keywordLower.replace(/\s+/g, '-'))) score -= 10;
        if (techIssues.length > 0) score -= techIssues.length * 5;
        if (imagesWithoutAlt > 0) score -= imagesWithoutAlt * 5;
        if (words.length < 300) score -= 10;
        score = Math.max(0, Math.min(100, score));

        return {
            score,
            title: {
                text: title,
                length: title.length,
                optimal: title.length >= 30 && title.length <= 60,
                hasKeyword: title.toLowerCase().includes(keywordLower),
                issues: titleIssues
            },
            description: {
                text: description,
                length: description.length,
                optimal: description.length >= 120 && description.length <= 160,
                hasKeyword: description.toLowerCase().includes(keywordLower),
                issues: descIssues
            },
            keyword: {
                keyword: focusKeyword,
                density: keywordDensity,
                count: keywordCount,
                inTitle: title.toLowerCase().includes(keywordLower),
                inDescription: description.toLowerCase().includes(keywordLower),
                inH1: headings.some(h => h.level === 1 && h.text.toLowerCase().includes(keywordLower)),
                inUrl: slug.includes(keywordLower.replace(/\s+/g, '-')),
                lsiSuggestions
            },
            content: {
                wordCount: words.length,
                readingTime: Math.ceil(words.length / 200),
                headingsStructure: headings,
                imagesWithoutAlt,
                internalLinks,
                externalLinks
            },
            technical: {
                hasCanonical: !!canonical,
                isIndexable: !noindex,
                hasSchema: !!schemaData,
                estimatedLCP: 1.5, // placeholder
                issues: techIssues
            }
        };
    }, [title, description, focusKeyword, content, slug, canonical, noindex, schemaData]);

    // Score color
    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-400';
        if (score >= 60) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getScoreBg = (score: number) => {
        if (score >= 80) return 'from-green-500/20 to-green-500/5';
        if (score >= 60) return 'from-yellow-500/20 to-yellow-500/5';
        return 'from-red-500/20 to-red-500/5';
    };

    // Progress bar component
    const ProgressBar = ({ value, max, optimal }: { value: number; max: number; optimal: { min: number; max: number } }) => {
        const percentage = Math.min((value / max) * 100, 100);
        const isOptimal = value >= optimal.min && value <= optimal.max;
        const isTooLong = value > optimal.max;

        return (
            <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    className={`h-full rounded-full ${isOptimal ? 'bg-green-500' : isTooLong ? 'bg-red-500' : 'bg-yellow-500'
                        }`}
                />
                {/* Optimal zone indicator */}
                <div
                    className="absolute top-0 h-full border-l-2 border-r-2 border-green-400/50 bg-green-400/10"
                    style={{
                        left: `${(optimal.min / max) * 100}%`,
                        width: `${((optimal.max - optimal.min) / max) * 100}%`
                    }}
                />
            </div>
        );
    };

    // Checklist item
    const ChecklistItem = ({ passed, label }: { passed: boolean; label: string }) => (
        <div className={`flex items-center gap-2 text-sm ${passed ? 'text-green-400' : 'text-red-400'}`}>
            {passed ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
            <span>{label}</span>
        </div>
    );

    return (
        <div className="bg-gray-900 rounded-2xl border border-white/10 overflow-hidden">
            {/* Header with Score */}
            <div className={`p-6 bg-gradient-to-r ${getScoreBg(analysis.score)}`}>
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Search className="w-5 h-5 text-yellow-400" />
                            SEO Analyzer
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">Analisi in tempo reale</p>
                    </div>
                    <div className="text-center">
                        <div className={`text-4xl font-bold ${getScoreColor(analysis.score)}`}>
                            {analysis.score}
                        </div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">Score</div>
                    </div>
                </div>
            </div>

            {/* Focus Keyword Input */}
            <div className="p-4 border-b border-white/10">
                <label className="block text-sm text-gray-400 mb-2">
                    <Target className="w-4 h-4 inline mr-1" />
                    Focus Keyword
                </label>
                <input
                    type="text"
                    value={focusKeyword}
                    onChange={(e) => onChange('focusKeyword', e.target.value)}
                    placeholder="es: agenzia marketing digitale"
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-400/50 focus:outline-none"
                />
                {focusKeyword && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        <ChecklistItem passed={analysis.keyword.inTitle} label="Nel titolo" />
                        <ChecklistItem passed={analysis.keyword.inDescription} label="Nella descrizione" />
                        <ChecklistItem passed={analysis.keyword.inUrl} label="Nell'URL" />
                        <ChecklistItem passed={analysis.keyword.inH1} label="Nell'H1" />
                    </div>
                )}
            </div>

            {/* Sections */}
            <div className="divide-y divide-white/10">
                {/* Title Section */}
                <CollapsibleSection
                    title="Meta Title"
                    icon={<FileText className="w-4 h-4" />}
                    status={analysis.title.optimal && analysis.title.hasKeyword ? 'success' : analysis.title.issues.length > 0 ? 'error' : 'warning'}
                    isExpanded={expandedSection === 'title'}
                    onToggle={() => setExpandedSection(expandedSection === 'title' ? null : 'title')}
                >
                    <div className="space-y-3">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => onChange('title', e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                            placeholder="Meta Title"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>{analysis.title.length} caratteri</span>
                            <span className={analysis.title.optimal ? 'text-green-400' : 'text-yellow-400'}>
                                Ottimale: 30-60
                            </span>
                        </div>
                        <ProgressBar value={analysis.title.length} max={80} optimal={{ min: 30, max: 60 }} />
                        {analysis.title.issues.map((issue, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-yellow-400">
                                <AlertTriangle className="w-4 h-4" />
                                {issue}
                            </div>
                        ))}
                    </div>
                </CollapsibleSection>

                {/* Description Section */}
                <CollapsibleSection
                    title="Meta Description"
                    icon={<FileText className="w-4 h-4" />}
                    status={analysis.description.optimal && analysis.description.hasKeyword ? 'success' : 'warning'}
                    isExpanded={expandedSection === 'description'}
                    onToggle={() => setExpandedSection(expandedSection === 'description' ? null : 'description')}
                >
                    <div className="space-y-3">
                        <textarea
                            value={description}
                            onChange={(e) => onChange('description', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white resize-none"
                            placeholder="Meta Description"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>{analysis.description.length} caratteri</span>
                            <span className={analysis.description.optimal ? 'text-green-400' : 'text-yellow-400'}>
                                Ottimale: 120-160
                            </span>
                        </div>
                        <ProgressBar value={analysis.description.length} max={200} optimal={{ min: 120, max: 160 }} />
                        {analysis.description.issues.map((issue, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-yellow-400">
                                <AlertTriangle className="w-4 h-4" />
                                {issue}
                            </div>
                        ))}
                    </div>
                </CollapsibleSection>

                {/* Keyword Density Section */}
                <CollapsibleSection
                    title="Keyword Density"
                    icon={<BarChart3 className="w-4 h-4" />}
                    status={analysis.keyword.density >= 0.5 && analysis.keyword.density <= 2.5 ? 'success' : 'warning'}
                    isExpanded={expandedSection === 'density'}
                    onToggle={() => setExpandedSection(expandedSection === 'density' ? null : 'density')}
                >
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-400">Densità attuale</span>
                            <span className={`font-bold ${analysis.keyword.density >= 0.5 && analysis.keyword.density <= 2.5
                                    ? 'text-green-400'
                                    : analysis.keyword.density > 3
                                        ? 'text-red-400'
                                        : 'text-yellow-400'
                                }`}>
                                {analysis.keyword.density.toFixed(2)}%
                            </span>
                        </div>
                        <ProgressBar
                            value={analysis.keyword.density}
                            max={5}
                            optimal={{ min: 0.5, max: 2.5 }}
                        />
                        <div className="text-xs text-gray-500">
                            La keyword "{focusKeyword}" appare <strong>{analysis.keyword.count}</strong> volte
                            su <strong>{analysis.content.wordCount}</strong> parole totali.
                        </div>
                        {analysis.keyword.density > 3 && (
                            <div className="flex items-center gap-2 text-sm text-red-400">
                                <AlertCircle className="w-4 h-4" />
                                Attenzione: rischio keyword stuffing! Riduci le occorrenze.
                            </div>
                        )}

                        {/* LSI Suggestions */}
                        {analysis.keyword.lsiSuggestions.length > 0 && (
                            <div className="mt-4">
                                <button
                                    onClick={() => setShowLSI(!showLSI)}
                                    className="flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    Suggerimenti LSI ({analysis.keyword.lsiSuggestions.length})
                                    <ChevronDown className={`w-4 h-4 transition-transform ${showLSI ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {showLSI && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {analysis.keyword.lsiSuggestions.map((term, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400 text-xs border border-yellow-400/30"
                                                    >
                                                        {term}
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2">
                                                Aggiungi questi termini semanticamente correlati per migliorare il ranking.
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </CollapsibleSection>

                {/* Technical Section */}
                <CollapsibleSection
                    title="Controlli Tecnici"
                    icon={<Code className="w-4 h-4" />}
                    status={analysis.technical.issues.length === 0 ? 'success' : 'warning'}
                    isExpanded={expandedSection === 'technical'}
                    onToggle={() => setExpandedSection(expandedSection === 'technical' ? null : 'technical')}
                >
                    <div className="space-y-3">
                        {/* Canonical */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">URL Canonical</label>
                            <input
                                type="text"
                                value={canonical || ''}
                                onChange={(e) => onChange('canonical', e.target.value)}
                                placeholder={`https://wrdigital.it/servizi/${slug}`}
                                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                            />
                        </div>

                        {/* Noindex Toggle */}
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <span className="text-sm text-white">Indicizzazione</span>
                                <p className="text-xs text-gray-500">Permetti a Google di indicizzare questa pagina</p>
                            </div>
                            <button
                                onClick={() => onChange('noindex', !noindex)}
                                className={`
                                    relative w-14 h-7 rounded-full transition-colors
                                    ${noindex ? 'bg-red-500' : 'bg-green-500'}
                                `}
                            >
                                <span className={`
                                    absolute top-1 w-5 h-5 rounded-full bg-white transition-transform
                                    ${noindex ? 'left-1' : 'left-8'}
                                `} />
                            </button>
                        </div>

                        {/* Schema Status */}
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <span className="text-sm text-white">Schema.org</span>
                                <p className="text-xs text-gray-500">Dati strutturati per SERP</p>
                            </div>
                            <span className={`text-sm ${analysis.technical.hasSchema ? 'text-green-400' : 'text-yellow-400'}`}>
                                {analysis.technical.hasSchema ? 'Configurato' : 'Non configurato'}
                            </span>
                        </div>

                        {/* Issues */}
                        {analysis.technical.issues.map((issue, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-yellow-400">
                                <AlertTriangle className="w-4 h-4" />
                                {issue}
                            </div>
                        ))}
                    </div>
                </CollapsibleSection>

                {/* Content Analysis */}
                <CollapsibleSection
                    title="Analisi Contenuto"
                    icon={<TrendingUp className="w-4 h-4" />}
                    status={analysis.content.wordCount >= 300 ? 'success' : 'warning'}
                    isExpanded={expandedSection === 'content'}
                    onToggle={() => setExpandedSection(expandedSection === 'content' ? null : 'content')}
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 rounded-lg bg-white/5">
                            <div className="text-2xl font-bold text-white">{analysis.content.wordCount}</div>
                            <div className="text-xs text-gray-500">Parole</div>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5">
                            <div className="text-2xl font-bold text-white">{analysis.content.readingTime} min</div>
                            <div className="text-xs text-gray-500">Lettura</div>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5">
                            <div className="text-2xl font-bold text-white">{analysis.content.internalLinks}</div>
                            <div className="text-xs text-gray-500">Link Interni</div>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5">
                            <div className={`text-2xl font-bold ${analysis.content.imagesWithoutAlt > 0 ? 'text-red-400' : 'text-white'}`}>
                                {analysis.content.imagesWithoutAlt}
                            </div>
                            <div className="text-xs text-gray-500">Img senza Alt</div>
                        </div>
                    </div>

                    {analysis.content.wordCount < 300 && (
                        <div className="flex items-center gap-2 text-sm text-yellow-400 mt-4">
                            <AlertTriangle className="w-4 h-4" />
                            Contenuto troppo breve. Consigliamo almeno 300 parole per un buon ranking.
                        </div>
                    )}
                </CollapsibleSection>
            </div>
        </div>
    );
}

// Collapsible Section Component
function CollapsibleSection({
    title,
    icon,
    status,
    isExpanded,
    onToggle,
    children
}: {
    title: string;
    icon: React.ReactNode;
    status: 'success' | 'warning' | 'error';
    isExpanded: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}) {
    const statusColors = {
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        error: 'bg-red-500'
    };

    return (
        <div>
            <button
                onClick={onToggle}
                className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
                    <span className="text-gray-400">{icon}</span>
                    <span className="font-medium text-white">{title}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-4">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

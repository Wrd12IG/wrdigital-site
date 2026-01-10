'use client';

import { Sparkles, Bot, Search, Lightbulb, Target, BarChart, Plus, ArrowUp } from 'lucide-react';

interface FAQSuggestionsProps {
    suggestions: any[];
    loading: boolean;
    onGenerate: (input: { queries?: string[], topic?: string }) => void;
    onAddToFaq: (suggestion: any) => void;
}

export default function FAQSuggestionsPanel({ suggestions, loading, onGenerate, onAddToFaq }: FAQSuggestionsProps) {
    return (
        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-2 border-purple-500/30 rounded-2xl p-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 inline-block" /> Suggerimenti AI da Google Search
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                        Genera FAQ intelligenti basate su query di ricerca reali o argomenti specifici
                    </p>
                </div>
            </div>

            {/* Input Form */}
            <div className="space-y-4 mb-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2">
                        <BarChart className="w-3 h-3 inline-block mr-1" /> Opzione 1: Query di ricerca Google (una per riga)
                    </label>
                    <textarea
                        id="faq-queries-input"
                        placeholder={"Esempio:\ncome fare seo\nagenzia seo milano costi\nquanto costa la seo\nseo tecnica cos'è"}
                        rows={4}
                        className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-gray-500 focus:border-purple-500 outline-none"
                    />
                    <button
                        onClick={() => {
                            const textarea = document.getElementById('faq-queries-input') as HTMLTextAreaElement;
                            const queries = textarea?.value.split('\n').filter(q => q.trim().length > 0) || [];
                            if (queries.length === 0) {
                                alert('Inserisci almeno una query di ricerca');
                                return;
                            }
                            onGenerate({ queries });
                        }}
                        disabled={loading}
                        className="mt-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {loading ? <><Bot className="w-3 h-3 inline-block mr-1" /> Generando...</> : <><Search className="w-3 h-3 inline-block mr-1" /> Analizza Query</>}
                    </button>
                </div>

                <div className="text-center text-xs text-gray-500 font-bold">OPPURE</div>

                <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2">
                        <Lightbulb className="w-3 h-3 inline-block mr-1" /> Opzione 2: Argomento/Servizio
                    </label>
                    <div className="flex gap-2">
                        <input
                            id="faq-topic-input"
                            type="text"
                            placeholder="Es: SEO tecnica, Social Media Marketing, Google Ads"
                            className="flex-1 bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-gray-500 focus:border-purple-500 outline-none"
                        />
                        <button
                            onClick={() => {
                                const input = document.getElementById('faq-topic-input') as HTMLInputElement;
                                const topic = input?.value.trim() || '';
                                if (!topic) {
                                    alert('Inserisci un argomento');
                                    return;
                                }
                                onGenerate({ topic });
                            }}
                            disabled={loading}
                            className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {loading ? <><Bot className="w-3 h-3 inline-block mr-1" /> Generando...</> : <><Sparkles className="w-3 h-3 inline-block mr-1" /> Genera</>}
                        </button>
                    </div>
                </div>
            </div>

            {/* Suggestions Results */}
            {suggestions.length > 0 && (
                <div className="space-y-3 mt-6 pt-6 border-t border-white/10">
                    <h4 className="text-sm font-bold text-purple-200 flex items-center gap-2">
                        <Target className="w-4 h-4 inline-block mr-1" /> Suggerimenti Generati ({suggestions.length})
                    </h4>
                    {suggestions.map((suggestion, idx) => (
                        <div key={idx} className="bg-black/40 border border-purple-500/20 rounded-xl p-4 hover:border-purple-500/40 transition-all group">
                            <div className="flex justify-between items-start gap-4 mb-2">
                                <div className="flex-1">
                                    <div className="flex items-start gap-2 mb-1 flex-wrap">
                                        <span className="text-xs font-bold text-purple-400 bg-purple-500/20 px-2 py-1 rounded">
                                            Priorità: {suggestion.priority}/10
                                        </span>
                                        <span className="text-xs font-mono text-blue-400 bg-blue-500/20 px-2 py-1 rounded">
                                            {suggestion.searchIntent || 'informational'}
                                        </span>
                                    </div>
                                    <h5 className="font-bold text-white text-sm mb-2">
                                        {suggestion.question}
                                    </h5>
                                    <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">
                                        {suggestion.answer}
                                    </p>
                                    {suggestion.keywords && suggestion.keywords.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {suggestion.keywords.map((kw: string, i: number) => (
                                                <span key={i} className="text-[10px] bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded">
                                                    {kw}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => onAddToFaq(suggestion)}
                                    className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                                >
                                    <Plus className="w-3 h-3 inline-block mr-1" /> Aggiungi
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {suggestions.length === 0 && !loading && (
                <div className="text-center py-8 text-gray-500 text-sm">
                    <ArrowUp className="w-4 h-4 inline-block mr-1" /> Usa uno dei metodi sopra per generare suggerimenti FAQ intelligenti
                </div>
            )}
        </div>
    );
}

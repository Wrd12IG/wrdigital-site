'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles, Wand2, Maximize2, Minimize2, Languages,
    TrendingUp, Type, Copy, Check, Loader2, X
} from 'lucide-react';

interface AIAssistantProps {
    content: string;
    onApply: (newContent: string) => void;
    context?: {
        keyword?: string;
        pages?: string[];
    };
}

type AIAction =
    | 'improve'
    | 'shorten'
    | 'lengthen'
    | 'seo'
    | 'tone'
    | 'translate'
    | 'generate-variants'
    | 'generate-meta';

export default function AIAssistant({ content, onApply, context }: AIAssistantProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string>('');
    const [selectedAction, setSelectedAction] = useState<AIAction | null>(null);
    const [customTone, setCustomTone] = useState('professionale');
    const [targetLanguage, setTargetLanguage] = useState('inglese');

    const handleAction = async (action: AIAction, actionContext?: any) => {
        setIsLoading(true);
        setSelectedAction(action);

        try {
            const res = await fetch('/api/cms/ai-assistant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action,
                    content,
                    context: { ...context, ...actionContext }
                })
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || 'AI request failed');
            }

            const data = await res.json();
            setResult(data.result);
        } catch (error) {
            console.error('AI Error:', error);

            // User-friendly error message
            setResult(`⚠️ Funzionalità AI non disponibile

L'AI Assistant richiede una configurazione API.

Per abilitare questa funzionalità:
1. Configura una API key OpenAI o Anthropic
2. Aggiungi la chiave nelle variabili d'ambiente
3. Crea il file /app/api/cms/ai-assistant/route.ts

Nel frattempo, puoi modificare manualmente il contenuto.`);
        } finally {
            setIsLoading(false);
        }
    };

    const copyResult = () => {
        navigator.clipboard.writeText(result);
    };

    const applyResult = () => {
        onApply(result);
        setIsOpen(false);
        setResult('');
    };

    if (!content || content.length < 10) {
        return null;
    }

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-400 hover:from-purple-500/30 hover:to-pink-500/30 transition-all text-sm font-medium"
                title="AI Content Assistant"
            >
                <Sparkles className="w-4 h-4" />
                Migliora con AI
            </button>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-purple-500/20">
                                        <Sparkles className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">AI Content Assistant</h2>
                                        <p className="text-sm text-gray-400">Powered by GPT-4</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Actions Grid */}
                            <div className="p-6 border-b border-white/10">
                                <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">Azioni Rapide</h3>
                                <div className="grid grid-cols-4 gap-3">
                                    <ActionButton
                                        icon={<Wand2 className="w-5 h-5" />}
                                        label="Migliora"
                                        onClick={() => handleAction('improve')}
                                        isLoading={isLoading && selectedAction === 'improve'}
                                    />
                                    <ActionButton
                                        icon={<Minimize2 className="w-5 h-5" />}
                                        label="Accorcia"
                                        onClick={() => handleAction('shorten')}
                                        isLoading={isLoading && selectedAction === 'shorten'}
                                    />
                                    <ActionButton
                                        icon={<Maximize2 className="w-5 h-5" />}
                                        label="Espandi"
                                        onClick={() => handleAction('lengthen')}
                                        isLoading={isLoading && selectedAction === 'lengthen'}
                                    />
                                    <ActionButton
                                        icon={<TrendingUp className="w-5 h-5" />}
                                        label="Ottimizza SEO"
                                        onClick={() => handleAction('seo', { keyword: context?.keyword })}
                                        isLoading={isLoading && selectedAction === 'seo'}
                                    />
                                </div>

                                {/* Advanced Actions */}
                                <div className="mt-4 space-y-3">
                                    {/* Tone Changer */}
                                    <div className="flex items-center gap-3">
                                        <Type className="w-4 h-4 text-gray-500" />
                                        <select
                                            value={customTone}
                                            onChange={e => setCustomTone(e.target.value)}
                                            className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                                        >
                                            <option value="professionale">Professionale</option>
                                            <option value="amichevole">Amichevole</option>
                                            <option value="persuasivo">Persuasivo</option>
                                            <option value="tecnico">Tecnico</option>
                                            <option value="casual">Casual</option>
                                        </select>
                                        <button
                                            onClick={() => handleAction('tone', { tone: customTone })}
                                            disabled={isLoading}
                                            className="px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-400 hover:bg-purple-500/30 transition-colors text-sm disabled:opacity-50"
                                        >
                                            Cambia Tono
                                        </button>
                                    </div>

                                    {/* Translator */}
                                    <div className="flex items-center gap-3">
                                        <Languages className="w-4 h-4 text-gray-500" />
                                        <select
                                            value={targetLanguage}
                                            onChange={e => setTargetLanguage(e.target.value)}
                                            className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                                        >
                                            <option value="inglese">Inglese</option>
                                            <option value="spagnolo">Spagnolo</option>
                                            <option value="francese">Francese</option>
                                            <option value="tedesco">Tedesco</option>
                                        </select>
                                        <button
                                            onClick={() => handleAction('translate', { language: targetLanguage })}
                                            disabled={isLoading}
                                            className="px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-400 hover:bg-purple-500/30 transition-colors text-sm disabled:opacity-50"
                                        >
                                            Traduci
                                        </button>
                                    </div>

                                    {/* Generate Variants */}
                                    <button
                                        onClick={() => handleAction('generate-variants', { count: 3 })}
                                        disabled={isLoading}
                                        className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-400 hover:from-purple-500/30 hover:to-pink-500/30 transition-all text-sm disabled:opacity-50"
                                    >
                                        <Sparkles className="w-4 h-4 inline mr-2" />
                                        Genera 3 Varianti per A/B Testing
                                    </button>

                                    {/* Generate Meta Tags */}
                                    <button
                                        onClick={() => handleAction('generate-meta')}
                                        disabled={isLoading}
                                        className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-400 hover:from-purple-500/30 hover:to-pink-500/30 transition-all text-sm disabled:opacity-50"
                                    >
                                        Genera Meta Title & Description
                                    </button>
                                </div>
                            </div>

                            {/* Result */}
                            <div className="flex-1 overflow-auto p-6">
                                {isLoading ? (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                        <Loader2 className="w-8 h-8 animate-spin text-purple-400 mb-3" />
                                        <p>L'AI sta elaborando...</p>
                                    </div>
                                ) : result ? (
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-semibold text-white">Risultato</h4>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={copyResult}
                                                    className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                                    title="Copia"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-white whitespace-pre-wrap">
                                            {result}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                        <Sparkles className="w-12 h-12 mb-3 opacity-50" />
                                        <p>Seleziona un'azione per iniziare</p>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            {result && (
                                <div className="p-6 border-t border-white/10 flex justify-end gap-3">
                                    <button
                                        onClick={() => {
                                            setResult('');
                                            setSelectedAction(null);
                                        }}
                                        className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                                    >
                                        Scarta
                                    </button>
                                    <button
                                        onClick={applyResult}
                                        className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all flex items-center gap-2"
                                    >
                                        <Check className="w-4 h-4" />
                                        Applica Modifiche
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

// Action Button Component
function ActionButton({
    icon,
    label,
    onClick,
    isLoading
}: {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    isLoading?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <div className="flex flex-col items-center gap-2">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-purple-400" /> : icon}
                <span className="text-xs font-medium">{label}</span>
            </div>
        </button>
    );
}

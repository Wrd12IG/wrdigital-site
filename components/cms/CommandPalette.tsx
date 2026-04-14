'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, X } from 'lucide-react';

interface CommandPaletteProps {
    isOpen: boolean;
    onClose: () => void;
    onCommand: (command: Command) => void;
    blocks: any[];
}

interface Command {
    id: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
    action: () => void;
    keywords?: string[];
}

export default function CommandPalette({ isOpen, onClose, onCommand, blocks }: CommandPaletteProps) {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Generate commands
    const commands: Command[] = [
        {
            id: 'new-hero',
            label: 'Nuovo Hero',
            description: 'Aggiungi sezione Hero',
            keywords: ['add', 'create', 'hero', 'banner'],
            action: () => onCommand({ id: 'add-block', type: 'hero' } as any)
        },
        {
            id: 'new-text',
            label: 'Nuovo Testo',
            description: 'Aggiungi blocco testo',
            keywords: ['add', 'create', 'text', 'content'],
            action: () => onCommand({ id: 'add-block', type: 'text-block' } as any)
        },
        {
            id: 'new-cta',
            label: 'Nuovo CTA',
            description: 'Aggiungi Call to Action',
            keywords: ['add', 'create', 'cta', 'button'],
            action: () => onCommand({ id: 'add-block', type: 'cta' } as any)
        },
        {
            id: 'save',
            label: 'Salva',
            description: 'Salva le modifiche',
            keywords: ['save', 'salvare'],
            action: () => onCommand({ id: 'save' } as any)
        },
        {
            id: 'undo',
            label: 'Annulla',
            description: 'Annulla ultima modifica',
            keywords: ['undo', 'annulla'],
            action: () => onCommand({ id: 'undo' } as any)
        },
        {
            id: 'redo',
            label: 'Ripristina',
            description: 'Ripristina modifica',
            keywords: ['redo', 'ripristina'],
            action: () => onCommand({ id: 'redo' } as any)
        },
        {
            id: 'templates',
            label: 'Mostra Templates',
            description: 'Apri galleria templates',
            keywords: ['templates', 'gallery'],
            action: () => onCommand({ id: 'show-templates' } as any)
        },
        {
            id: 'schema',
            label: 'Schema.org Builder',
            description: 'Crea dati strutturati',
            keywords: ['schema', 'seo', 'structured'],
            action: () => onCommand({ id: 'show-schema' } as any)
        },
        {
            id: 'focus-mode',
            label: 'Focus Mode',
            description: 'Nascondi sidebars',
            keywords: ['focus', 'fullscreen', 'zen'],
            action: () => onCommand({ id: 'toggle-focus' } as any)
        },
        ...blocks.map((block, idx) => ({
            id: `goto-${block.id}`,
            label: `Vai a ${block.type}`,
            description: `Seleziona blocco #${idx + 1}`,
            keywords: ['select', 'goto', block.type],
            action: () => onCommand({ id: 'select-block', blockId: block.id } as any)
        }))
    ];

    // Filter commands
    const filteredCommands = query.length > 0
        ? commands.filter(cmd => {
            const searchText = `${cmd.label} ${cmd.description} ${cmd.keywords?.join(' ')}`.toLowerCase();
            return searchText.includes(query.toLowerCase());
        })
        : commands.slice(0, 10);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (filteredCommands[selectedIndex]) {
                    filteredCommands[selectedIndex].action();
                    onClose();
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filteredCommands, selectedIndex, onClose]);

    // Reset on open
    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setSelectedIndex(0);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-start justify-center pt-32"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: -20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: -20 }}
                    className="bg-gray-900 rounded-2xl w-full max-w-2xl shadow-2xl border border-white/10 overflow-hidden"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Search Input */}
                    <div className="p-4 border-b border-white/10 flex items-center gap-3">
                        <Command className="w-5 h-5 text-yellow-400" />
                        <input
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Cerca azioni, blocchi..."
                            autoFocus
                            className="flex-1 bg-transparent text-white placeholder:text-gray-500 focus:outline-none text-lg"
                        />
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Results */}
                    <div className="max-h-96 overflow-y-auto">
                        {filteredCommands.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <Search className="w-8 h-8 mx-auto mb-3 opacity-50" />
                                <p>Nessun risultato per "{query}"</p>
                            </div>
                        ) : (
                            <div className="p-2">
                                {filteredCommands.map((cmd, idx) => (
                                    <button
                                        key={cmd.id}
                                        onClick={() => {
                                            cmd.action();
                                            onClose();
                                        }}
                                        className={`
                                            w-full p-3 rounded-lg text-left transition-colors flex items-center justify-between group
                                            ${idx === selectedIndex
                                                ? 'bg-yellow-400/10 border border-yellow-400/30'
                                                : 'hover:bg-white/5 border border-transparent'
                                            }
                                        `}
                                    >
                                        <div className="flex-1">
                                            <div className="font-medium text-white">{cmd.label}</div>
                                            {cmd.description && (
                                                <div className="text-sm text-gray-400">{cmd.description}</div>
                                            )}
                                        </div>
                                        {idx === selectedIndex && (
                                            <kbd className="px-2 py-1 rounded bg-gray-800 text-white text-xs">↵</kbd>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
                        <div className="flex gap-4">
                            <span><kbd className="px-1.5 py-0.5 rounded bg-gray-800 text-white">↑↓</kbd> naviga</span>
                            <span><kbd className="px-1.5 py-0.5 rounded bg-gray-800 text-white">↵</kbd> seleziona</span>
                            <span><kbd className="px-1.5 py-0.5 rounded bg-gray-800 text-white">esc</kbd> chiudi</span>
                        </div>
                        <span>{filteredCommands.length} risultati</span>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

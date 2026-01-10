'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import {
    Plus, Trash2, Copy, Eye, EyeOff, Settings, GripVertical,
    Smartphone, Tablet, Monitor, Save, Undo, Redo, Layers,
    Type, Image, Layout, MessageSquare, Star, HelpCircle,
    BarChart3, Play, Code, Mail, Minus, Columns, Sparkles, X, PanelRightOpen,
    ZoomIn, ZoomOut, Maximize, Info, Clock, Palette, Box, AlignLeft, AlignCenter, AlignRight,
    Maximize2, Shield, Globe, MousePointer, PanelLeftClose, PanelLeftOpen,
    AlertTriangle, Wand2, LogOut
} from 'lucide-react';
import RichTextEditor from './RichTextEditor';
import MediaLibrary from './MediaLibrary';
import LivePreview from './LivePreview';
import AIAssistant from './AIAssistant';
import SchemaBuilder from './SchemaBuilder';
import CommandPalette from './CommandPalette';
import ToastContainer, { useToast } from './ToastNotifications';
import TemplateManager from './TemplateManager';
import { BLOCK_TEMPLATES as TEMPLATE_LIBRARY, BlockTemplate, getTemplatesByCategory } from './BlockTemplates';


// Block type definitions
export interface Block {
    id: string;
    type: BlockType;
    content: Record<string, any>;
    styles?: Record<string, any>;
    hidden?: { mobile?: boolean; tablet?: boolean; desktop?: boolean };
}

export type BlockType =
    | 'hero'
    | 'text-block'
    | 'image'
    | 'cta'
    | 'bento-grid'
    | 'testimonials'
    | 'faq'
    | 'stats'
    | 'video'
    | 'code'
    | 'form'
    | 'spacer'
    | 'divider'
    | 'columns';

// Block templates
const BLOCK_TEMPLATES: Record<BlockType, { label: string; icon: React.ReactNode; defaultContent: Record<string, any> }> = {
    'hero': {
        label: 'Hero Section',
        icon: <Layout className="w-5 h-5" />,
        defaultContent: {
            title: 'Titolo Hero',
            subtitle: 'Sottotitolo accattivante che cattura l\'attenzione',
            ctaText: 'Scopri di più',
            ctaLink: '#',
            backgroundType: 'gradient'
        }
    },
    'text-block': {
        label: 'Blocco Testo',
        icon: <Type className="w-5 h-5" />,
        defaultContent: {
            content: '<p>Inserisci il tuo testo qui...</p>',
            alignment: 'left'
        }
    },
    'image': {
        label: 'Immagine',
        icon: <Image className="w-5 h-5" />,
        defaultContent: {
            src: '',
            alt: '',
            caption: ''
        }
    },
    'cta': {
        label: 'Call to Action',
        icon: <Sparkles className="w-5 h-5" />,
        defaultContent: {
            title: 'Pronto a iniziare?',
            description: 'Contattaci oggi per una consulenza gratuita',
            buttonText: 'Contattaci',
            buttonLink: '/contatti',
            style: 'primary'
        }
    },
    'bento-grid': {
        label: 'Bento Grid',
        icon: <Layers className="w-5 h-5" />,
        defaultContent: {
            columns: 3,
            items: [
                { title: 'Feature 1', description: 'Descrizione feature', span: 2 },
                { title: 'Feature 2', description: 'Descrizione feature', span: 1 },
                { title: 'Feature 3', description: 'Descrizione feature', span: 1 },
                { title: 'Feature 4', description: 'Descrizione feature', span: 2 }
            ]
        }
    },
    'testimonials': {
        label: 'Testimonials',
        icon: <MessageSquare className="w-5 h-5" />,
        defaultContent: {
            items: [
                { quote: 'Citazione cliente...', name: 'Nome Cognome', role: 'Azienda', avatar: '' }
            ]
        }
    },
    'faq': {
        label: 'FAQ Accordion',
        icon: <HelpCircle className="w-5 h-5" />,
        defaultContent: {
            items: [
                { question: 'Domanda esempio?', answer: 'Risposta esempio...' }
            ],
            title: 'Domande Frequenti'
        }
    },
    'stats': {
        label: 'Statistiche',
        icon: <BarChart3 className="w-5 h-5" />,
        defaultContent: {
            items: [
                { value: '+150%', label: 'Crescita' },
                { value: '50+', label: 'Clienti' },
                { value: '4.9', label: 'Rating' }
            ]
        }
    },
    'video': {
        label: 'Video Embed',
        icon: <Play className="w-5 h-5" />,
        defaultContent: {
            url: '',
            title: '',
            autoplay: false,
            muted: true
        }
    },
    'code': {
        label: 'Codice/Embed',
        icon: <Code className="w-5 h-5" />,
        defaultContent: {
            code: '',
            language: 'html'
        }
    },
    'form': {
        label: 'Form Contatto',
        icon: <Mail className="w-5 h-5" />,
        defaultContent: {
            title: 'Contattaci',
            fields: ['name', 'email', 'message'],
            submitText: 'Invia',
            destinationEmail: ''
        }
    },
    'spacer': {
        label: 'Spaziatore',
        icon: <Minus className="w-5 h-5" />,
        defaultContent: {
            height: 60
        }
    },
    'divider': {
        label: 'Divisore',
        icon: <Minus className="w-5 h-5" />,
        defaultContent: {
            style: 'line',
            color: '#333'
        }
    },
    'columns': {
        label: 'Colonne',
        icon: <Columns className="w-5 h-5" />,
        defaultContent: {
            columns: 2,
            gap: 24,
            items: [{ content: '' }, { content: '' }]
        }
    }
};

// Preview size presets - optimized for 13" screens (1280px total)
// Left sidebar: 192px, Right sidebar: 224px, leaves ~860px for preview area
const PREVIEW_SIZES = {
    mobile: { width: 375, label: 'Mobile' },
    tablet: { width: 768, label: 'Tablet' },
    desktop: { width: 800, label: 'Desktop' }
};

interface BlockEditorProps {
    initialBlocks?: Block[];
    pageId?: string;
    onSave?: (blocks: Block[]) => Promise<void>;
    onPublish?: (blocks: Block[]) => Promise<void>;
    onBack?: () => void;
}



export default function BlockEditor({ pageId, initialBlocks = [], onSave, onPublish, onBack }: BlockEditorProps) {
    // ... (existing code)

    const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
    const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
    const [previewDevice, setPreviewDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
    const [showBlockPicker, setShowBlockPicker] = useState(false);
    const [history, setHistory] = useState<Block[][]>([initialBlocks]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [showRightSidebar, setShowRightSidebar] = useState(true);
    const [pickerTab, setPickerTab] = useState<'blocks' | 'templates'>('blocks');
    const [showSchemaBuilder, setShowSchemaBuilder] = useState(false);
    const [useLivePreview, setUseLivePreview] = useState(true);
    const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
    const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
    const [showCommandPalette, setShowCommandPalette] = useState(false);
    const [showTemplateManager, setShowTemplateManager] = useState(false);
    const [previewZoom, setPreviewZoom] = useState(100);
    const [focusMode, setFocusMode] = useState(false);
    const [darkPreview, setDarkPreview] = useState(true);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const { toasts, dismissToast, success, error, info } = useToast();

    // Track changes for undo/redo
    const pushHistory = useCallback((newBlocks: Block[]) => {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(newBlocks);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setIsDirty(true);
    }, [history, historyIndex]);

    const undo = useCallback(() => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            setBlocks(history[historyIndex - 1]);
        }
    }, [history, historyIndex]);

    const redo = useCallback(() => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1);
            setBlocks(history[historyIndex + 1]);
        }
    }, [history, historyIndex]);

    // Add new block
    const addBlock = (type: BlockType) => {
        const template = BLOCK_TEMPLATES[type];
        const newBlock: Block = {
            id: `block-${Date.now()}`,
            type,
            content: { ...template.defaultContent },
            styles: {},
            hidden: { mobile: false, tablet: false, desktop: false }
        };
        const newBlocks = [...blocks, newBlock];
        setBlocks(newBlocks);
        pushHistory(newBlocks);
        setSelectedBlockId(newBlock.id);
        setShowBlockPicker(false);
    };

    // Add blocks from template
    const addBlocksFromTemplate = (templateBlocks: any[]) => {
        const newBlocks = templateBlocks.map(tb => ({
            id: `block-${Date.now()}-${Math.random()}`,
            type: tb.type,
            content: { ...tb.content },
            styles: {},
            hidden: { mobile: false, tablet: false, desktop: false }
        }));
        const updatedBlocks = [...blocks, ...newBlocks];
        setBlocks(updatedBlocks);
        pushHistory(updatedBlocks);
        setShowBlockPicker(false);
    };

    // Update block content
    const updateBlock = (blockId: string, updates: Partial<Block>) => {
        const newBlocks = blocks.map(b =>
            b.id === blockId ? { ...b, ...updates } : b
        );
        setBlocks(newBlocks);
        pushHistory(newBlocks);
    };

    // Delete block
    const deleteBlock = (blockId: string) => {
        const newBlocks = blocks.filter(b => b.id !== blockId);
        setBlocks(newBlocks);
        pushHistory(newBlocks);
        setSelectedBlockId(null);
    };

    // Duplicate block
    const duplicateBlock = (blockId: string) => {
        const blockToDupe = blocks.find(b => b.id === blockId);
        if (!blockToDupe) return;

        const newBlock: Block = {
            ...blockToDupe,
            id: `block-${Date.now()}`,
            content: { ...blockToDupe.content }
        };

        const blockIndex = blocks.findIndex(b => b.id === blockId);
        const newBlocks = [...blocks];
        newBlocks.splice(blockIndex + 1, 0, newBlock);
        setBlocks(newBlocks);
        pushHistory(newBlocks);
        setSelectedBlockId(newBlock.id);
    };

    // Toggle visibility per device
    const toggleVisibility = (blockId: string, device: 'mobile' | 'tablet' | 'desktop') => {
        const block = blocks.find(b => b.id === blockId);
        if (!block) return;

        const newHidden = { ...block.hidden, [device]: !block.hidden?.[device] };
        updateBlock(blockId, { hidden: newHidden });
    };

    // Save to API
    const handleSave = async () => {
        setIsSaving(true);
        try {
            if (onSave) {
                await onSave(blocks);
            }
            setIsDirty(false);
            setLastSaved(new Date());
            success('✅ Bozza salvata con successo');
        } catch (err) {
            console.error('Error saving:', err);
            error('❌ Errore durante il salvataggio');
        } finally {
            setIsSaving(false);
        }
    };

    const handlePublish = async () => {
        if (!onPublish) return;
        setIsPublishing(true);
        try {
            await onPublish(blocks);
            setIsDirty(false);
            success('✅ Pagina pubblicata con successo');
        } catch (err) {
            console.error('Publish error:', err);
            error('❌ Errore durante la pubblicazione');
        } finally {
            setIsPublishing(false);
        }
    };

    // Keyboard shortcuts
    // ... (omitted for brevity)

    // ... inside RETURN JSX ...

    return (
        <div className="flex flex-1 h-full overflow-hidden relative">
            {/* Left Sidebar: Block List */}
            <AnimatePresence>
                {!leftSidebarCollapsed && (
                    <motion.div
                        initial={{ x: -250, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -250, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-60 lg:w-72 flex-shrink-0 bg-gray-900 border-r border-white/10 flex flex-col overflow-hidden shadow-2xl"
                    >
                        <div className="p-4 border-b border-white/10 flex items-center justify-between">
                            <h2 className="text-lg font-bold">Blocchi</h2>
                            <button
                                onClick={() => setLeftSidebarCollapsed(true)}
                                className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-white/10"
                                title="Comprimi"
                            >
                                <PanelLeftClose className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                            {blocks.map((block, index) => (
                                <div
                                    key={block.id}
                                    onClick={() => setSelectedBlockId(block.id)}
                                    className={`
                                        flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors
                                        ${selectedBlockId === block.id
                                            ? 'bg-yellow-400/20 border border-yellow-400 text-yellow-400'
                                            : 'hover:bg-white/5 text-gray-300'
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-2">
                                        {BLOCK_TEMPLATES[block.type].icon}
                                        <span className="text-sm font-medium truncate">{BLOCK_TEMPLATES[block.type].label}</span>
                                    </div>
                                    <span className="text-xs text-gray-500">{index + 1}</span>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-white/10">
                            <button
                                onClick={() => setShowBlockPicker(true)}
                                className="w-full py-2 px-4 rounded-lg bg-yellow-400 text-black font-medium hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Aggiungi Blocco
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content: Preview */}
            <div className={`flex-1 flex flex-col relative ${focusMode ? 'fixed inset-0 z-50 bg-gray-950' : ''}`}>
                {/* Toolbar */}
                <div className="h-14 bg-gray-900 border-b border-white/10 px-4 flex items-center justify-between flex-shrink-0 z-20 relative">
                    {/* Left: Device Toggles */}
                    <div className="flex items-center gap-3">
                        {onBack && (
                            <>
                                <button
                                    onClick={onBack}
                                    className="p-2 rounded-md text-red-400 hover:text-red-300 hover:bg-white/10 border border-transparent hover:border-red-500/30 transition-all flex items-center gap-2"
                                    title="Esci dall'editor"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase hidden sm:inline">Esci</span>
                                </button>
                                <div className="w-px h-6 bg-white/10" />
                            </>
                        )}
                        {!leftSidebarCollapsed && (
                            <button
                                onClick={() => setLeftSidebarCollapsed(true)}
                                className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10"
                                title="Comprimi pannello blocchi"
                            >
                                <PanelLeftClose className="w-4 h-4" />
                            </button>
                        )}
                        {leftSidebarCollapsed && (
                            <button
                                onClick={() => setLeftSidebarCollapsed(false)}
                                className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10"
                                title="Espandi pannello blocchi"
                            >
                                <PanelLeftOpen className="w-4 h-4" />
                            </button>
                        )}
                        <div className="w-px h-6 bg-white/10" />
                        <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
                            {(Object.keys(PREVIEW_SIZES) as Array<keyof typeof PREVIEW_SIZES>).map((device) => (
                                <button
                                    key={device}
                                    onClick={() => setPreviewDevice(device)}
                                    className={`p-2 rounded-md transition-colors ${previewDevice === device
                                        ? 'bg-yellow-400 text-black'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                    title={`${device}`}
                                >
                                    {device === 'mobile' && <Smartphone className="w-4 h-4" />}
                                    {device === 'tablet' && <Tablet className="w-4 h-4" />}
                                    {device === 'desktop' && <Monitor className="w-4 h-4" />}
                                </button>
                            ))}
                        </div>

                        {/* Zoom Controls */}
                        <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
                            <button
                                onClick={() => setPreviewZoom(Math.max(50, previewZoom - 10))}
                                disabled={previewZoom <= 50}
                                className="p-2 rounded-md text-gray-400 hover:text-white disabled:opacity-30"
                                title="Zoom Out"
                            >
                                <ZoomOut className="w-4 h-4" />
                            </button>
                            <span className="px-2 text-sm text-gray-400 min-w-[50px] text-center">{previewZoom}%</span>
                            <button
                                onClick={() => setPreviewZoom(Math.min(200, previewZoom + 10))}
                                disabled={previewZoom >= 200}
                                className="p-2 rounded-md text-gray-400 hover:text-white disabled:opacity-30"
                                title="Zoom In"
                            >
                                <ZoomIn className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setPreviewZoom(100)}
                                className="p-2 rounded-md text-gray-400 hover:text-white"
                                title="Reset Zoom (100%)"
                            >
                                100%
                            </button>
                        </div>
                    </div>

                    {/* Center: Undo/Redo */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={undo}
                            disabled={historyIndex <= 0}
                            className="p-2 rounded-md text-gray-400 hover:text-white disabled:opacity-30"
                            title="Annulla (⌘Z)"
                        >
                            <Undo className="w-4 h-4" />
                        </button>
                        <button
                            onClick={redo}
                            disabled={historyIndex >= history.length - 1}
                            className="p-2 rounded-md text-gray-400 hover:text-white disabled:opacity-30"
                            title="Ripeti (⌘⇧Z)"
                        >
                            <Redo className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowCommandPalette(true)}
                            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10"
                            title="Command Palette (⌘K)"
                        >
                            <Code className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setDarkPreview(!darkPreview)}
                            className={`p-2 rounded-md transition-colors ${darkPreview ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                            title="Dark Preview Mode"
                        >
                            {darkPreview ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            )}
                        </button>
                        <button
                            onClick={() => setFocusMode(!focusMode)}
                            className={`p-2 rounded-md transition-colors ${focusMode ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                            title="Focus Mode (⌘F)"
                        >
                            <Maximize className="w-4 h-4" />
                        </button>

                        <div className="w-px h-6 bg-white/10" />
                        <button
                            onClick={handleSave}
                            disabled={!isDirty || isSaving}
                            className={`
                                px-3 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm
                                ${isDirty
                                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                                    : 'bg-gray-800 text-gray-500'
                                }
                            `}
                        >
                            <Save className="w-4 h-4" />
                            {isSaving ? '...' : 'Salva Bozza'}
                        </button>

                        <button
                            onClick={handlePublish}
                            disabled={isPublishing}
                            className="px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm bg-green-500 text-white hover:bg-green-400"
                        >
                            <Globe className="w-4 h-4" />
                            {isPublishing ? '...' : 'Pubblica'}
                        </button>

                        {/* Toggle Right Sidebar Button */}
                        {selectedBlockId && !showRightSidebar && (
                            <button
                                onClick={() => setShowRightSidebar(true)}
                                className="p-2 rounded-lg bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30 transition-colors"
                                title="Mostra pannello proprietà"
                            >
                                <PanelRightOpen className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Preview Area */}
                <div className="flex-1 overflow-auto p-4 flex justify-center bg-gray-950 relative z-10">
                    <div
                        className={`rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ${darkPreview ? 'bg-gray-950' : 'bg-white'}`}
                        style={{
                            width: PREVIEW_SIZES[previewDevice].width,
                            maxWidth: '100%',
                            transform: `scale(${previewZoom / 100})`,
                            transformOrigin: 'top center',
                            minHeight: '600px'
                        }}
                    >
                        {/* Preview content */}
                        {blocks.length === 0 ? (
                            <div className={`min-h-[600px] flex items-center justify-center ${darkPreview ? 'text-gray-400' : 'text-gray-600'}`}>
                                <div className="text-center max-w-md px-6">
                                    <Layers className="w-16 h-16 mx-auto mb-4 opacity-30" />
                                    <h3 className={`text-xl font-bold mb-2 ${darkPreview ? 'text-white' : 'text-gray-900'}`}>
                                        Inizia a Creare
                                    </h3>
                                    <p className="text-sm mb-6">
                                        Aggiungi il primo blocco per iniziare a costruire la tua pagina
                                    </p>
                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        <button onClick={() => addBlock('hero')} className="p-4 rounded-lg bg-gradient-to-br from-yellow-400/10 to-yellow-500/5 border border-yellow-400/20 hover:border-yellow-400/40 transition-all group">
                                            <Star className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                                            <div className="text-sm font-medium text-yellow-400">Hero</div>
                                        </button>
                                        <button onClick={() => addBlock('text-block')} className="p-4 rounded-lg bg-gradient-to-br from-blue-400/10 to-blue-500/5 border border-blue-400/20 hover:border-blue-400/40 transition-all group">
                                            <Type className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                                            <div className="text-sm font-medium text-blue-400">Testo</div>
                                        </button>
                                        <button
                                            onClick={() => addBlock('cta')}
                                            className="p-4 rounded-lg bg-gradient-to-br from-green-400/10 to-green-500/5 border border-green-400/20 hover:border-green-400/40 transition-all group"
                                        >
                                            <Sparkles className="w-6 h-6 mx-auto mb-2 text-green-400" />
                                            <div className="text-sm font-medium text-green-400">CTA</div>
                                        </button>
                                        <button
                                            onClick={() => addBlock('image')}
                                            className="p-4 rounded-lg bg-gradient-to-br from-purple-400/10 to-purple-500/5 border border-purple-400/20 hover:border-purple-400/40 transition-all group"
                                        >
                                            <Image className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                                            <div className="text-sm font-medium text-purple-400">Immagine</div>
                                        </button>
                                    </div>
                                    <button onClick={() => setShowBlockPicker(true)} className={`text-xs ${darkPreview ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'} transition-colors`}>
                                        o esplora tutti i blocchi →
                                    </button>
                                </div>
                            </div>
                        ) : useLivePreview ? (
                            <LivePreview
                                blocks={blocks}
                                device={previewDevice}
                                className="min-h-[600px]"
                            />
                        ) : (
                            <div className="min-h-[600px] p-4">
                                {blocks.map((block) => (
                                    <BlockPreview
                                        key={block.id}
                                        block={block}
                                        isSelected={selectedBlockId === block.id}
                                        device={previewDevice}
                                        onClick={() => setSelectedBlockId(block.id)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Status Bar */}
                {!focusMode && (
                    <div className="h-8 bg-gray-900 border-t border-white/10 px-4 flex items-center justify-between text-xs text-gray-400 flex-shrink-0 z-20 relative">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1.5">
                                <Layers className="w-3.5 h-3.5" />
                                {blocks.length} {blocks.length === 1 ? 'blocco' : 'blocchi'}
                            </span>
                            <span>|</span>
                            <span>Ultima modifica: {lastSaved ? lastSaved.toLocaleTimeString('it-IT') : 'Mai'}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1.5">
                                <Info className="w-3.5 h-3.5" />
                                {selectedBlockId ? `${BLOCK_TEMPLATES[blocks.find(b => b.id === selectedBlockId)?.type || 'hero'].label} selezionato` : 'Nessuna selezione'}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Right Sidebar: Block Settings */}
            <AnimatePresence>
                {selectedBlockId && showRightSidebar && (
                    <motion.div
                        initial={{ x: 320, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 320, opacity: 0 }}
                        className="w-80 lg:w-96 flex-shrink-0 bg-gray-900 border-l border-white/10 flex flex-col overflow-hidden shadow-2xl"
                    >
                        {/* Header - Improved */}
                        <div className="p-4 border-b border-white/10 bg-gradient-to-r from-yellow-400/5 to-purple-400/5">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    {blocks.find(b => b.id === selectedBlockId) && BLOCK_TEMPLATES[blocks.find(b => b.id === selectedBlockId)!.type].icon}
                                    <span className="font-semibold text-sm truncate">
                                        {blocks.find(b => b.id === selectedBlockId) && BLOCK_TEMPLATES[blocks.find(b => b.id === selectedBlockId)!.type].label}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-1 flex-shrink-0">
                                <button
                                    onClick={() => duplicateBlock(selectedBlockId)}
                                    className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-white/10"
                                    title="Duplica"
                                >
                                    <Copy className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => deleteBlock(selectedBlockId)}
                                    className="p-1.5 rounded-md text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                    title="Elimina"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => setShowRightSidebar(false)}
                                    className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-white/10"
                                    title="Chiudi pannello"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>

                        {/* Visibility Controls */}
                        <div className="p-4 border-b border-white/10">
                            <h4 className="text-xs font-semibold text-gray-400 uppercase mb-3">Visibilità</h4>
                            <div className="flex gap-2">
                                {(['mobile', 'tablet', 'desktop'] as const).map((device) => {
                                    const block = blocks.find(b => b.id === selectedBlockId);
                                    if (!block) return null;
                                    return (
                                        <button
                                            key={device}
                                            onClick={() => toggleVisibility(selectedBlockId, device)}
                                            className={`
                                            flex-1 py-2 rounded-lg flex items-center justify-center gap-1 text-sm transition-colors
                                            ${block.hidden?.[device]
                                                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                                    : 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                }
                                        `}
                                        >
                                            {device === 'mobile' && <Smartphone className="w-3 h-3" />}
                                            {device === 'tablet' && <Tablet className="w-3 h-3" />}
                                            {device === 'desktop' && <Monitor className="w-3 h-3" />}
                                            {block.hidden?.[device] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* SEO Tools */}
                        <div className="p-4 border-b border-white/10">
                            <h4 className="text-xs font-semibold text-gray-400 uppercase mb-3">SEO & Schema</h4>
                            <button
                                onClick={() => setShowSchemaBuilder(true)}
                                className="w-full py-2 px-4 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500/20 transition-colors text-sm flex items-center justify-center gap-2"
                            >
                                <Code className="w-4 h-4" />
                                Schema.org Builder
                            </button>
                        </div>

                        {/* Content Editor */}
                        <div className="flex-1 overflow-y-auto p-4">
                            <h4 className="text-xs font-semibold text-gray-400 uppercase mb-3">Contenuto</h4>
                            {blocks.find(b => b.id === selectedBlockId) && (
                                <BlockContentEditor
                                    block={blocks.find(b => b.id === selectedBlockId)!}
                                    onChange={(content) => {
                                        const { _styles, _hidden, ...restContent } = content;
                                        const updates: any = { content: restContent };
                                        if (_styles) updates.styles = _styles;
                                        if (_hidden) updates.hidden = _hidden;
                                        updateBlock(selectedBlockId, updates);
                                    }}
                                />
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Block Picker Modal */}
            <AnimatePresence>
                {
                    showBlockPicker && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                            onClick={() => setShowBlockPicker(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-gray-900 rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] flex flex-col"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Header with Tabs */}
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold">Scegli contenuto</h3>
                                    <div className="flex gap-2 bg-gray-800 rounded-lg p-1">
                                        <button
                                            onClick={() => setPickerTab('blocks')}
                                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${pickerTab === 'blocks'
                                                ? 'bg-yellow-400 text-black'
                                                : 'text-gray-400 hover:text-white'
                                                }`}
                                        >
                                            Blocchi
                                        </button>
                                        <button
                                            onClick={() => setPickerTab('templates')}
                                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${pickerTab === 'templates'
                                                ? 'bg-yellow-400 text-black'
                                                : 'text-gray-400 hover:text-white'
                                                }`}
                                        >
                                            <Sparkles className="w-4 h-4 inline mr-1" />
                                            Templates
                                        </button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 overflow-y-auto">
                                    {pickerTab === 'blocks' ? (
                                        <div className="grid grid-cols-3 gap-3">
                                            {(Object.entries(BLOCK_TEMPLATES) as [BlockType, typeof BLOCK_TEMPLATES[BlockType]][]).map(([type, template]) => (
                                                <button
                                                    key={type}
                                                    onClick={() => addBlock(type)}
                                                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-yellow-400/50 transition-colors text-left"
                                                >
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className="p-2 rounded-lg bg-yellow-400/10 text-yellow-400">
                                                            {template.icon}
                                                        </div>
                                                        <span className="font-medium">{template.label}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            {/* Hero Templates */}
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-400 uppercase mb-3">Hero Sections</h4>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {getTemplatesByCategory('hero').map(template => (
                                                        <button
                                                            key={template.id}
                                                            onClick={() => addBlocksFromTemplate(template.blocks)}
                                                            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-colors text-left"
                                                        >
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <Sparkles className="w-4 h-4 text-purple-400" />
                                                                <span className="font-medium text-white">{template.name}</span>
                                                            </div>
                                                            <p className="text-xs text-gray-400">{template.description}</p>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Content Templates */}
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-400 uppercase mb-3">Contenuti</h4>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {getTemplatesByCategory('content').map(template => (
                                                        <button
                                                            key={template.id}
                                                            onClick={() => addBlocksFromTemplate(template.blocks)}
                                                            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-colors text-left"
                                                        >
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <Sparkles className="w-4 h-4 text-purple-400" />
                                                                <span className="font-medium text-white">{template.name}</span>
                                                            </div>
                                                            <p className="text-xs text-gray-400">{template.description}</p>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* CTA Templates */}
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-400 uppercase mb-3">Call to Action</h4>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {getTemplatesByCategory('cta').map(template => (
                                                        <button
                                                            key={template.id}
                                                            onClick={() => addBlocksFromTemplate(template.blocks)}
                                                            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-colors text-left"
                                                        >
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <Sparkles className="w-4 h-4 text-purple-400" />
                                                                <span className="font-medium text-white">{template.name}</span>
                                                            </div>
                                                            <p className="text-xs text-gray-400">{template.description}</p>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Layout Templates */}
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-400 uppercase mb-3">Layout Completi</h4>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {getTemplatesByCategory('layout').map(template => (
                                                        <button
                                                            key={template.id}
                                                            onClick={() => addBlocksFromTemplate(template.blocks)}
                                                            className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 hover:border-purple-500/50 transition-colors text-left"
                                                        >
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <Sparkles className="w-5 h-5 text-purple-400" />
                                                                <span className="font-semibold text-white">{template.name}</span>
                                                                <span className="ml-auto text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-400">
                                                                    {template.blocks.length} blocchi
                                                                </span>
                                                            </div>
                                                            <p className="text-sm text-gray-300">{template.description}</p>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    )
                }
            </AnimatePresence >

            {/* Schema Builder Modal */}
            < SchemaBuilder
                isOpen={showSchemaBuilder}
                onClose={() => setShowSchemaBuilder(false)
                }
                onSave={(schema) => {
                    // Save schema to page/block metadata
                    console.log('Schema saved:', schema);
                    setShowSchemaBuilder(false);
                }}
            />

            {/* Keyboard Shortcuts Modal */}
            <AnimatePresence>
                {showKeyboardShortcuts && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                        onClick={() => setShowKeyboardShortcuts(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold">Keyboard Shortcuts</h3>
                                <button
                                    onClick={() => setShowKeyboardShortcuts(false)}
                                    className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {/* General */}
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-400 uppercase mb-3">Generale</h4>
                                    <div className="space-y-2">
                                        <ShortcutItem keys="⌘ S" description="Salva modifiche" />
                                        <ShortcutItem keys="⌘ Z" description="Annulla" />
                                        <ShortcutItem keys="⌘ ⇧ Z" description="Ripristina" />
                                        <ShortcutItem keys="⌘ N" description="Nuovo blocco" />
                                        <ShortcutItem keys="⌘ /" description="Mostra shortcuts" />
                                    </div>
                                </div>

                                {/* Editing */}
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-400 uppercase mb-3">Modifica</h4>
                                    <div className="space-y-2">
                                        <ShortcutItem keys="⌘ D" description="Duplica blocco" />
                                        <ShortcutItem keys="Delete" description="Elimina blocco" />
                                        <ShortcutItem keys="⌘ B" description="Grassetto (testo)" />
                                        <ShortcutItem keys="⌘ I" description="Corsivo (testo)" />
                                        <ShortcutItem keys="⌘ K" description="Link (testo)" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 p-4 rounded-lg bg-yellow-400/5 border border-yellow-400/20">
                                <p className="text-sm text-gray-400">
                                    <span className="text-yellow-400 font-semibold">💡 Pro Tip:</span> Usa
                                    <kbd className="mx-1 px-2 py-1 rounded bg-gray-800 text-white text-xs">Tab</kbd>
                                    per navigare tra i campi,
                                    <kbd className="mx-1 px-2 py-1 rounded bg-gray-800 text-white text-xs">Esc</kbd>
                                    per deselezionare.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Command Palette */}
            <CommandPalette
                isOpen={showCommandPalette}
                onClose={() => setShowCommandPalette(false)}
                blocks={blocks}
                onCommand={(cmd: any) => {
                    switch (cmd.id) {
                        case 'save':
                            handleSave();
                            break;
                        case 'undo':
                            undo();
                            break;
                        case 'redo':
                            redo();
                            break;
                        case 'add-block':
                            addBlock(cmd.type);
                            break;
                        case 'show-templates':
                            setPickerTab('templates');
                            setShowBlockPicker(true);
                            break;
                        case 'show-schema':
                            setShowSchemaBuilder(true);
                            break;
                        case 'toggle-focus':
                            setFocusMode(!focusMode);
                            break;
                        case 'select-block':
                            setSelectedBlockId(cmd.blockId);
                            break;
                    }
                }}
            />

            {/* Template Manager */}
            <TemplateManager
                isOpen={showTemplateManager}
                onClose={() => setShowTemplateManager(false)}
                onLoadTemplate={(templateBlocks) => {
                    setBlocks(templateBlocks);
                    pushHistory(templateBlocks);
                    setIsDirty(true);
                    success('✅ Template caricato con successo');
                }}
                currentBlocks={blocks}
            />

            {/* Toast Notifications */}
            <ToastContainer toasts={toasts} onDismiss={dismissToast} />
        </div >
    );
}

// Block Preview Component
function BlockPreview({
    block,
    isSelected,
    device,
    onClick
}: {
    block: Block;
    isSelected: boolean;
    device: 'mobile' | 'tablet' | 'desktop';
    onClick: () => void;
}) {
    // Hide if block is not visible on current device
    if (block.hidden?.[device]) {
        return (
            <div
                className="p-4 my-2 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100 text-gray-400 text-center text-sm cursor-pointer"
                onClick={onClick}
            >
                <EyeOff className="w-4 h-4 inline mr-2" />
                Nascosto su {device}
            </div>
        );
    }

    return (
        <div
            onClick={onClick}
            className={`
                my-2 rounded-lg transition-all cursor-pointer
                ${isSelected ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-white' : 'hover:ring-2 hover:ring-blue-400/50'}
            `}
        >
            {/* Simplified preview based on block type */}
            <div className="p-4 bg-gray-50 rounded-lg min-h-[80px] flex items-center justify-center">
                <div className="text-center text-gray-600">
                    <div className="flex items-center justify-center gap-2 mb-1">
                        {BLOCK_TEMPLATES[block.type].icon}
                        <span className="font-medium">{BLOCK_TEMPLATES[block.type].label}</span>
                    </div>
                    {block.content.title && (
                        <p className="text-sm text-gray-500">{block.content.title}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

// Background Settings Component - Extracted for performance
function BackgroundSettings({
    block,
    handleFieldChange,
    openMediaPicker
}: {
    block: Block;
    handleFieldChange: (field: string, value: any) => void;
    openMediaPicker: (field: string) => void;
}) {
    return (
        <div className="space-y-4 border-t border-white/10 pt-6 mt-6">
            <h4 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <Settings className="w-4 h-4 text-yellow-400" />
                Stile Sfondo Sezione
            </h4>

            {/* Background Type Selection */}
            <div>
                <label className="block text-sm text-gray-400 mb-2">Tipo Sfondo</label>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        type="button"
                        onClick={() => handleFieldChange('backgroundType', 'image')}
                        className={`py-2 px-4 rounded-lg border transition-all text-sm ${(block.content.backgroundType || 'image') === 'image'
                            ? 'bg-yellow-400/20 border-yellow-400/50 text-yellow-400'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        🖼️ Immagine
                    </button>
                    <button
                        type="button"
                        onClick={() => handleFieldChange('backgroundType', 'color')}
                        className={`py-2 px-4 rounded-lg border transition-all text-sm ${block.content.backgroundType === 'color'
                            ? 'bg-yellow-400/20 border-yellow-400/50 text-yellow-400'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        🎨 Colore
                    </button>
                </div>
            </div>

            {/* Image Background Options */}
            {(block.content.backgroundType || 'image') === 'image' && (
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Immagine Principale</label>
                    <button
                        type="button"
                        onClick={() => openMediaPicker('backgroundImage')}
                        className="w-full py-2 px-4 rounded-lg bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/20 transition-colors text-sm flex items-center justify-center gap-2"
                    >
                        <Image className="w-4 h-4" />
                        {block.content.backgroundImage ? 'Cambia Immagine' : 'Seleziona Immagine'}
                    </button>
                    {block.content.backgroundImage && (
                        <div className="mt-2 relative aspect-video rounded-lg overflow-hidden border border-white/10">
                            <img
                                src={block.content.backgroundImage}
                                alt={block.content.backgroundImageAlt || ''}
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => handleFieldChange('backgroundImage', '')}
                                className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 rounded-lg text-white transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Color Background Options */}
            {block.content.backgroundType === 'color' && (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Colore Primario</label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={block.content.backgroundColor || '#000000'}
                                onChange={(e) => handleFieldChange('backgroundColor', e.target.value)}
                                className="w-12 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                            />
                            <input
                                type="text"
                                value={block.content.backgroundColor || '#000000'}
                                onChange={(e) => handleFieldChange('backgroundColor', e.target.value)}
                                className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-mono"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm text-gray-400 mb-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={block.content.useGradient || false}
                                onChange={(e) => handleFieldChange('useGradient', e.target.checked)}
                                className="rounded border-white/10 text-yellow-400 focus:ring-yellow-400 bg-white/5"
                            />
                            Usa Gradiente
                        </label>

                        {block.content.useGradient && (
                            <div className="space-y-3 mt-3">
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        value={block.content.gradientColor || '#1a1a1a'}
                                        onChange={(e) => handleFieldChange('gradientColor', e.target.value)}
                                        className="w-12 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={block.content.gradientColor || '#1a1a1a'}
                                        onChange={(e) => handleFieldChange('gradientColor', e.target.value)}
                                        className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-mono"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                                            <span>Angolo</span>
                                            <span>{block.content.gradientAngle || 135}°</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="360"
                                            value={block.content.gradientAngle || 135}
                                            onChange={(e) => handleFieldChange('gradientAngle', parseInt(e.target.value))}
                                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                                            <span>Posizione</span>
                                            <span>{block.content.gradientPosition ?? 100}%</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={block.content.gradientPosition ?? 100}
                                            onChange={(e) => handleFieldChange('gradientPosition', parseInt(e.target.value))}
                                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Presets */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2 text-xs uppercase tracking-wider font-bold">Preset Temi</label>
                        <div className="grid grid-cols-5 gap-2">
                            {[
                                { b: '#000000', g: '#1a1a1a' },
                                { b: '#001a33', g: '#0072ff' },
                                { b: '#002b1b', g: '#00a86b' },
                                { b: '#1a0033', g: '#8a2be2' },
                                { b: '#330000', g: '#ff4b2b' }
                            ].map((p) => (
                                <button
                                    key={p.b}
                                    type="button"
                                    onClick={() => {
                                        const up: Record<string, any> = { ...block.content, backgroundColor: p.b };
                                        if (block.content.useGradient) up.gradientColor = p.g;
                                        handleFieldChange('backgroundColor', up.backgroundColor);
                                        if (up.gradientColor) handleFieldChange('gradientColor', up.gradientColor);
                                    }}
                                    className="aspect-square rounded-lg border border-white/10 hover:border-yellow-400/50 transition-all"
                                    style={{ background: block.content.useGradient ? `linear-gradient(135deg, ${p.b}, ${p.g})` : p.b }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Advanced Settings Component
function AdvancedSettings({
    block,
    handleFieldChange
}: {
    block: Block;
    handleFieldChange: (field: string, value: any) => void;
}) {
    const handleStyleChange = (prop: string, value: any) => {
        const styles = { ...(block.styles || {}), [prop]: value };
        handleFieldChange('styles', styles);
    };

    const handleVisibilityChange = (device: 'mobile' | 'tablet' | 'desktop', hidden: boolean) => {
        const visibility = { ...(block.hidden || {}), [device]: hidden };
        handleFieldChange('hidden', visibility);
    };

    return (
        <div className="space-y-6">
            {/* Spacing */}
            <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <Box className="w-4 h-4 text-yellow-400" />
                    Spaziatura (Spacing)
                </h4>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Padding Verticale (rem)</label>
                        <input
                            type="number"
                            step="0.5"
                            value={block.styles?.paddingY || 4}
                            onChange={(e) => handleStyleChange('paddingY', parseFloat(e.target.value))}
                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Titolo Video (opzionale)</label>
                        <input
                            type="text"
                            value={block.content.title || ''}
                            onChange={(e) => handleFieldChange('title', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                        />
                    </div>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={block.content.autoplay || false}
                                onChange={(e) => handleFieldChange('autoplay', e.target.checked)}
                                className="rounded border-white/10 text-yellow-400 focus:ring-yellow-400 bg-white/5"
                            />
                            <span className="text-sm text-gray-300">Autoplay</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={block.content.muted || false}
                                onChange={(e) => handleFieldChange('muted', e.target.checked)}
                                className="rounded border-white/10 text-yellow-400 focus:ring-yellow-400 bg-white/5"
                            />
                            <span className="text-sm text-gray-300">Muto</span>
                        </label>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Padding Orizzontale (rem)</label>
                        <input
                            type="number"
                            step="0.5"
                            value={block.styles?.paddingX || 0}
                            onChange={(e) => handleStyleChange('paddingX', parseFloat(e.target.value))}
                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Visibility */}
            <div className="space-y-4 pt-4 border-t border-white/10">
                <h4 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <EyeOff className="w-4 h-4 text-yellow-400" />
                    Visibilità (Responsive)
                </h4>

                <div className="space-y-2">
                    {(['mobile', 'tablet', 'desktop'] as const).map((device) => (
                        <label key={device} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-white/5">
                            <span className="text-sm text-gray-300 capitalize flex items-center gap-2">
                                {device === 'mobile' && <Smartphone className="w-4 h-4" />}
                                {device === 'tablet' && <Tablet className="w-4 h-4" />}
                                {device === 'desktop' && <Monitor className="w-4 h-4" />}
                                Nascondi su {device}
                            </span>
                            <input
                                type="checkbox"
                                checked={block.hidden?.[device] || false}
                                onChange={(e) => handleVisibilityChange(device, e.target.checked)}
                                className="rounded border-white/10 text-yellow-400 focus:ring-yellow-400 bg-white/5 h-4 w-4"
                            />
                        </label>
                    ))}
                </div>
            </div>

            {/* Custom CSS (Placeholder for future) */}
            <div className="pt-4 border-t border-white/10">
                <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                    <Code className="w-4 h-4 text-yellow-400" />
                    CSS Personalizzato
                </h4>
                <textarea
                    placeholder="/* Aggiungi qui il tuo CSS personalizzato per questo blocco */"
                    value={block.styles?.customCss || ''}
                    onChange={(e) => handleStyleChange('customCss', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-mono min-h-[100px] focus:outline-none focus:border-yellow-400/50"
                />
            </div>
        </div>
    );
}

// Block Content Editor - Enhanced with Rich Text and Media
// Block Content Editor - Enhanced with Rich Text and Media
function BlockContentEditor({
    block,
    onChange
}: {
    block: Block;
    onChange: (content: Record<string, any>) => void;
}) {
    const [showMediaLibrary, setShowMediaLibrary] = useState(false);
    const [mediaTargetField, setMediaTargetField] = useState<string>('');
    const [mediaTargetIndex, setMediaTargetIndex] = useState<number | null>(null);
    const subtitleEditorRef = useRef<any>(null);
    const contentEditorRef = useRef<any>(null);
    const [activeEditor, setActiveEditor] = useState<'subtitle' | 'content' | null>(null);
    const [activeTab, setActiveTab] = useState<'content' | 'style' | 'advanced'>('content');

    const handleFieldChange = (field: string, value: any) => {
        if (field === 'styles') {
            onChange({ ...block.content, _styles: value });
            return;
        }
        if (field === 'hidden') {
            onChange({ ...block.content, _hidden: value });
            return;
        }
        onChange({ ...block.content, [field]: value });
    };

    const openMediaPicker = (field: string, index: number | null = null) => {
        setMediaTargetField(field);
        setMediaTargetIndex(index);
        setShowMediaLibrary(true);
    };

    const handleMediaSelect = (media: any) => {
        if (activeEditor) {
            const ref = activeEditor === 'subtitle' ? subtitleEditorRef : contentEditorRef;
            if (ref.current) {
                ref.current.insertImage(media.url, media.altText, media.requestedSize);
            }
            setActiveEditor(null);
            setShowMediaLibrary(false);
            return;
        }

        if (!mediaTargetField) return;

        if (mediaTargetIndex !== null && Array.isArray(block.content.items)) {
            // Handle array item update (e.g., testimonial avatar)
            const newItems = [...block.content.items];
            if (newItems[mediaTargetIndex]) {
                newItems[mediaTargetIndex] = {
                    ...newItems[mediaTargetIndex],
                    [mediaTargetField]: media.url
                };
                onChange({ ...block.content, items: newItems });
            }
        } else {
            // Handle top-level field update
            const updates: Record<string, any> = {
                [mediaTargetField]: media.url
            };

            if (mediaTargetField === 'backgroundImage' || mediaTargetField === 'src') {
                updates[mediaTargetField + 'Alt'] = media.altText || '';
            }

            onChange({
                ...block.content,
                ...updates
            });
        }

        setShowMediaLibrary(false);
        setMediaTargetField('');
        setMediaTargetIndex(null);
    };

    const renderBackgroundSettings = () => (
        <BackgroundSettings
            block={block}
            handleFieldChange={handleFieldChange}
            openMediaPicker={openMediaPicker}
        />
    );

    return (
        <div className="flex flex-col h-full">
            {/* Tabs */}
            <div className="flex border-b border-white/10 mb-6 sticky top-0 bg-gray-900 z-10 -mx-4 px-4 pt-2">
                {[
                    { id: 'content', label: 'Contenuto', icon: <Layers className="w-4 h-4" /> },
                    { id: 'style', label: 'Stile', icon: <Palette className="w-4 h-4" /> },
                    { id: 'advanced', label: 'Avanzato', icon: <Settings className="w-4 h-4" /> }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${activeTab === tab.id
                            ? 'border-yellow-400 text-yellow-400'
                            : 'border-transparent text-gray-500 hover:text-white'
                            }`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-auto pb-20">
                {activeTab === 'content' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {(() => {
                            switch (block.type) {
                                case 'hero':
                                    return (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Titolo Principale</label>
                                                <input
                                                    type="text"
                                                    value={block.content.title || ''}
                                                    onChange={(e) => handleFieldChange('title', e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Sottotitolo</label>
                                                <RichTextEditor
                                                    ref={subtitleEditorRef}
                                                    content={block.content.subtitle || ''}
                                                    onChange={(html) => handleFieldChange('subtitle', html)}
                                                    onImageClick={() => {
                                                        setActiveEditor('subtitle');
                                                        setShowMediaLibrary(true);
                                                    }}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Testo Bottone</label>
                                                    <input
                                                        type="text"
                                                        value={block.content.ctaText || ''}
                                                        onChange={(e) => handleFieldChange('ctaText', e.target.value)}
                                                        placeholder="es. Scopri di più"
                                                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Link Bottone</label>
                                                    <input
                                                        type="text"
                                                        value={block.content.ctaLink || ''}
                                                        onChange={(e) => handleFieldChange('ctaLink', e.target.value)}
                                                        placeholder="es. /servizi o https://..."
                                                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );

                                case 'text-block':
                                    return (
                                        <div className="space-y-4">
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Contenuto Testuale</label>
                                            <RichTextEditor
                                                ref={contentEditorRef}
                                                content={block.content.content || ''}
                                                onChange={(html) => handleFieldChange('content', html)}
                                                onImageClick={() => {
                                                    setActiveEditor('content');
                                                    setShowMediaLibrary(true);
                                                }}
                                            />
                                        </div>
                                    );

                                case 'cta':
                                    return (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Titolo dell'invito</label>
                                                <input
                                                    type="text"
                                                    value={block.content.title || ''}
                                                    onChange={(e) => handleFieldChange('title', e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Testo Bottone</label>
                                                    <input
                                                        type="text"
                                                        value={block.content.buttonText || ''}
                                                        onChange={(e) => handleFieldChange('buttonText', e.target.value)}
                                                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Link Bottone</label>
                                                    <input
                                                        type="text"
                                                        value={block.content.buttonLink || ''}
                                                        onChange={(e) => handleFieldChange('buttonLink', e.target.value)}
                                                        placeholder="es. /contatti"
                                                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );

                                case 'stats':
                                    return (
                                        <div className="space-y-4">
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Statistiche</label>
                                            {(block.content.items || []).map((item: any, idx: number) => (
                                                <div key={idx} className="flex gap-2 p-3 bg-white/5 rounded-lg border border-white/10">
                                                    <div className="flex-col flex gap-2 w-full">
                                                        <input
                                                            type="text"
                                                            value={item.value}
                                                            onChange={(e) => {
                                                                const newItems = [...block.content.items];
                                                                newItems[idx].value = e.target.value;
                                                                handleFieldChange('items', newItems);
                                                            }}
                                                            placeholder="Valore (es. 100+)"
                                                            className="w-full px-2 py-1 rounded bg-black/20 border border-white/10 text-white text-sm"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={item.label}
                                                            onChange={(e) => {
                                                                const newItems = [...block.content.items];
                                                                newItems[idx].label = e.target.value;
                                                                handleFieldChange('items', newItems);
                                                            }}
                                                            placeholder="Etichetta"
                                                            className="w-full px-2 py-1 rounded bg-black/20 border border-white/10 text-white text-sm"
                                                        />
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            const newItems = block.content.items.filter((_: any, i: number) => i !== idx);
                                                            handleFieldChange('items', newItems);
                                                        }}
                                                        className="p-1 text-red-400 hover:text-red-300"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                onClick={() => handleFieldChange('items', [...(block.content.items || []), { value: '0', label: 'Nuova' }])}
                                                className="w-full py-2 border border-dashed border-white/20 rounded-lg text-xs text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Plus className="w-4 h-4" /> Aggiungi Statistica
                                            </button>
                                        </div>
                                    );

                                case 'columns':
                                    return (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Numero Colonne</label>
                                                <select
                                                    value={block.content.columns || 2}
                                                    onChange={(e) => {
                                                        const count = parseInt(e.target.value);
                                                        const newItems = [...(block.content.items || [])];
                                                        while (newItems.length < count) newItems.push({ content: '' });
                                                        while (newItems.length > count) newItems.pop();
                                                        handleFieldChange('columns', count);
                                                        handleFieldChange('items', newItems);
                                                    }}
                                                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                                                >
                                                    <option value="1">1 Colonna</option>
                                                    <option value="2">2 Colonne</option>
                                                    <option value="3">3 Colonne</option>
                                                    <option value="4">4 Colonne</option>
                                                </select>
                                            </div>
                                            {(block.content.items || []).map((item: any, idx: number) => (
                                                <div key={idx} className="space-y-1 p-3 bg-white/5 rounded-lg border border-white/10">
                                                    <label className="text-[10px] text-gray-500 uppercase font-bold">Contenuto Colonna {idx + 1}</label>
                                                    <RichTextEditor
                                                        content={item.content || ''}
                                                        onChange={(html) => {
                                                            const newItems = [...block.content.items];
                                                            newItems[idx].content = html;
                                                            handleFieldChange('items', newItems);
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    );

                                case 'testimonials':
                                    return (
                                        <div className="space-y-4">
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Testimonianze</label>
                                            {(block.content.items || []).map((item: any, idx: number) => (
                                                <div key={idx} className="space-y-3 p-4 bg-white/5 rounded-lg border border-white/10 group relative">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-4">
                                                            <div
                                                                onClick={() => openMediaPicker('avatar', idx)}
                                                                className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden cursor-pointer hover:border-yellow-400 transition-colors flex-shrink-0"
                                                            >
                                                                {item.avatar ? (
                                                                    <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <Plus className="w-4 h-4 text-gray-500" />
                                                                )}
                                                            </div>
                                                            <div className="flex-1 space-y-2">
                                                                <input
                                                                    type="text"
                                                                    value={item.name}
                                                                    onChange={(e) => {
                                                                        const newItems = [...block.content.items];
                                                                        newItems[idx].name = e.target.value;
                                                                        handleFieldChange('items', newItems);
                                                                    }}
                                                                    placeholder="Nome Cliente"
                                                                    className="w-full px-2 py-1.5 rounded bg-black/20 border border-white/10 text-white text-sm"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={item.role}
                                                                    onChange={(e) => {
                                                                        const newItems = [...block.content.items];
                                                                        newItems[idx].role = e.target.value;
                                                                        handleFieldChange('items', newItems);
                                                                    }}
                                                                    placeholder="Ruolo / Azienda"
                                                                    className="w-full px-2 py-1.5 rounded bg-black/20 border border-white/10 text-white text-xs text-gray-400"
                                                                />
                                                            </div>
                                                        </div>
                                                        <textarea
                                                            value={item.quote}
                                                            onChange={(e) => {
                                                                const newItems = [...block.content.items];
                                                                newItems[idx].quote = e.target.value;
                                                                handleFieldChange('items', newItems);
                                                            }}
                                                            placeholder="La testimonianza..."
                                                            className="w-full px-2 py-1.5 rounded bg-black/20 border border-white/10 text-white text-sm min-h-[80px]"
                                                        />
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            const newItems = block.content.items.filter((_: any, i: number) => i !== idx);
                                                            handleFieldChange('items', newItems);
                                                        }}
                                                        className="absolute top-2 right-2 p-1 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                onClick={() => handleFieldChange('items', [...(block.content.items || []), { name: '', role: '', quote: '' }])}
                                                className="w-full py-2 border border-dashed border-white/20 rounded-lg text-xs text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Plus className="w-4 h-4" /> Aggiungi Testimonianza
                                            </button>
                                        </div>
                                    );

                                case 'faq':
                                    return (
                                        <div className="space-y-4">
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Domande Frequenti (FAQ)</label>
                                            {(block.content.items || []).map((item: any, idx: number) => (
                                                <div key={idx} className="space-y-3 p-4 bg-white/5 rounded-lg border border-white/10 group relative">
                                                    <div className="space-y-2">
                                                        <input
                                                            type="text"
                                                            value={item.question}
                                                            onChange={(e) => {
                                                                const newItems = [...block.content.items];
                                                                newItems[idx].question = e.target.value;
                                                                handleFieldChange('items', newItems);
                                                            }}
                                                            placeholder="Domanda"
                                                            className="w-full px-2 py-1.5 rounded bg-black/20 border border-white/10 text-white text-sm font-bold"
                                                        />
                                                        <textarea
                                                            value={item.answer}
                                                            onChange={(e) => {
                                                                const newItems = [...block.content.items];
                                                                newItems[idx].answer = e.target.value;
                                                                handleFieldChange('items', newItems);
                                                            }}
                                                            placeholder="Risposta"
                                                            className="w-full px-2 py-1.5 rounded bg-black/20 border border-white/10 text-white text-sm min-h-[80px]"
                                                        />
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            const newItems = block.content.items.filter((_: any, i: number) => i !== idx);
                                                            handleFieldChange('items', newItems);
                                                        }}
                                                        className="absolute top-2 right-2 p-1 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                onClick={() => handleFieldChange('items', [...(block.content.items || []), { question: '', answer: '' }])}
                                                className="w-full py-2 border border-dashed border-white/20 rounded-lg text-xs text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Plus className="w-4 h-4" /> Aggiungi FAQ
                                            </button>
                                        </div>
                                    );

                                case 'video':
                                    return (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">URL Video (YouTube/Vimeo/MP4)</label>
                                                <input
                                                    type="text"
                                                    value={block.content.url || ''}
                                                    onChange={(e) => handleFieldChange('url', e.target.value)}
                                                    placeholder="https://..."
                                                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Titolo Video (opzionale)</label>
                                                <input
                                                    type="text"
                                                    value={block.content.title || ''}
                                                    onChange={(e) => handleFieldChange('title', e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                                                />
                                            </div>
                                            <div className="flex gap-4">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={block.content.autoplay || false}
                                                        onChange={(e) => handleFieldChange('autoplay', e.target.checked)}
                                                        className="rounded border-white/10 text-yellow-400 focus:ring-yellow-400 bg-white/5"
                                                    />
                                                    <span className="text-sm text-gray-300">Autoplay</span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={block.content.muted || false}
                                                        onChange={(e) => handleFieldChange('muted', e.target.checked)}
                                                        className="rounded border-white/10 text-yellow-400 focus:ring-yellow-400 bg-white/5"
                                                    />
                                                    <span className="text-sm text-gray-300">Muto</span>
                                                </label>
                                            </div>
                                        </div>
                                    );

                                case 'code':
                                    return (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Codice HTML / Script</label>
                                                <textarea
                                                    value={block.content.code || ''}
                                                    onChange={(e) => handleFieldChange('code', e.target.value)}
                                                    placeholder="<script>...</script>"
                                                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-mono min-h-[200px]"
                                                />
                                            </div>
                                        </div>
                                    );

                                default:
                                    return (
                                        <div className="p-8 rounded-2xl bg-white/5 border border-dashed border-white/10 text-center space-y-3">
                                            <Layout className="w-10 h-10 text-gray-600 mx-auto" />
                                            <div>
                                                <p className="text-white font-medium">Editor specifico per {block.type}</p>
                                                <p className="text-sm text-gray-500">I campi base sono modificabili nelle altre tab.</p>
                                            </div>
                                        </div>
                                    );
                            }
                        })()}
                    </div>
                )
                }

                {
                    activeTab === 'style' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            {/* Alignment Settings */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                                    <AlignLeft className="w-4 h-4 text-yellow-400" />
                                    Allineamento Contenuto
                                </h4>
                                <div className="flex bg-white/5 rounded-xl p-1 border border-white/10 w-fit">
                                    {[
                                        { id: 'left', icon: <AlignLeft className="w-4 h-4" /> },
                                        { id: 'center', icon: <AlignCenter className="w-4 h-4" /> },
                                        { id: 'right', icon: <AlignRight className="w-4 h-4" /> }
                                    ].map((align) => (
                                        <button
                                            key={align.id}
                                            onClick={() => handleFieldChange('alignment', align.id)}
                                            className={`p-2 rounded-lg transition-all ${(block.content.alignment || 'left') === align.id
                                                ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20'
                                                : 'text-gray-400 hover:text-white'
                                                }`}
                                        >
                                            {align.icon}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Position Settings (for CTA/Buttons) */}
                            {(block.type === 'cta' || block.type === 'hero') && (
                                <div className="space-y-4 pt-4 border-t border-white/10">
                                    <h4 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                                        <Layout className="w-4 h-4 text-yellow-400" />
                                        Posizione Pulsante
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['inline', 'below'].map((pos) => (
                                            <button
                                                key={pos}
                                                onClick={() => handleFieldChange('buttonPosition', pos)}
                                                className={`py-2 px-4 rounded-lg border transition-all text-xs uppercase font-bold tracking-widest ${(block.content.buttonPosition || 'below') === pos
                                                    ? 'bg-yellow-400/20 border-yellow-400/50 text-yellow-400'
                                                    : 'bg-white/5 border-white/10 text-gray-500 hover:bg-white/10'
                                                    }`}
                                            >
                                                {pos === 'inline' ? 'A fianco' : 'Sotto'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {renderBackgroundSettings()}
                        </div>
                    )
                }

                {
                    activeTab === 'advanced' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <AdvancedSettings
                                block={block}
                                handleFieldChange={handleFieldChange}
                            />
                        </div>
                    )
                }
            </div >

            {showMediaLibrary && (
                <MediaLibrary
                    isOpen={showMediaLibrary}
                    onClose={() => setShowMediaLibrary(false)}
                    onSelect={handleMediaSelect}
                />
            )}
        </div >
    );
}

// Shortcut Item Component
function ShortcutItem({ keys, description }: { keys: string; description: string }) {
    return (
        <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">{description}</span>
            <kbd className="px-2 py-1 rounded bg-gray-800 text-white text-xs font-mono">{keys}</kbd>
        </div>
    );
}

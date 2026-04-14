'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Save, Download, Upload, Trash2, Eye, Copy,
    Sparkles, FileText, Briefcase, Users, Mail, ShoppingCart,
    Layout, Star, Tag, Search, Filter
} from 'lucide-react';

interface Template {
    id: string;
    name: string;
    description: string;
    category: 'landing' | 'blog' | 'portfolio' | 'about' | 'service' | 'contact' | 'ecommerce' | 'custom';
    blocks: any[];
    thumbnail?: string;
    tags: string[];
    createdAt: Date;
    isCustom: boolean;
}

interface TemplateManagerProps {
    isOpen: boolean;
    onClose: () => void;
    onLoadTemplate: (blocks: any[]) => void;
    currentBlocks: any[];
}

const PREDEFINED_TEMPLATES: Template[] = [
    {
        id: 'landing-page',
        name: 'Landing Page',
        description: 'Pagina di atterraggio completa con hero, features, testimonials e CTA',
        category: 'landing',
        tags: ['marketing', 'conversion', 'sales'],
        isCustom: false,
        createdAt: new Date(),
        blocks: [
            { id: '1', type: 'hero', content: { title: 'Trasforma il tuo Business', subtitle: 'Soluzioni digitali che generano risultati', cta: 'Inizia Ora' } },
            { id: '2', type: 'bento-grid', content: { items: [] } },
            { id: '3', type: 'stats', content: { stats: [{ label: 'Clienti', value: '500+' }, { label: 'Progetti', value: '1000+' }] } },
            { id: '4', type: 'testimonials', content: { testimonials: [] } },
            { id: '5', type: 'cta', content: { title: 'Pronto a Iniziare?', cta: 'Contattaci' } },
            { id: '6', type: 'faq', content: { faqs: [] } }
        ]
    },
    {
        id: 'blog-post',
        name: 'Blog Post',
        description: 'Struttura ottimale per articoli di blog con immagini e CTA',
        category: 'blog',
        tags: ['content', 'seo', 'article'],
        isCustom: false,
        createdAt: new Date(),
        blocks: [
            { id: '1', type: 'hero', content: { title: 'Titolo Articolo', subtitle: 'Sottotitolo coinvolgente' } },
            { id: '2', type: 'text-block', content: { text: '<p>Introduzione dell\'articolo...</p>' } },
            { id: '3', type: 'image', content: { src: '', alt: 'Immagine articolo' } },
            { id: '4', type: 'text-block', content: { text: '<p>Corpo dell\'articolo...</p>' } },
            { id: '5', type: 'cta', content: { title: 'Ti è piaciuto?', cta: 'Iscriviti alla Newsletter' } }
        ]
    },
    {
        id: 'portfolio-case-study',
        name: 'Portfolio Case Study',
        description: 'Presentazione professionale di progetti e case study',
        category: 'portfolio',
        tags: ['portfolio', 'project', 'showcase'],
        isCustom: false,
        createdAt: new Date(),
        blocks: [
            { id: '1', type: 'hero', content: { title: 'Nome Progetto', subtitle: 'Cliente - Anno' } },
            { id: '2', type: 'text-block', content: { text: '<p>Descrizione del progetto...</p>' } },
            { id: '3', type: 'stats', content: { stats: [{ label: 'ROI', value: '+300%' }, { label: 'Traffico', value: '+150%' }] } },
            { id: '4', type: 'image', content: { src: '', alt: 'Screenshot progetto' } },
            { id: '5', type: 'testimonials', content: { testimonials: [] } },
            { id: '6', type: 'cta', content: { title: 'Vuoi risultati simili?', cta: 'Parliamone' } }
        ]
    },
    {
        id: 'about-us',
        name: 'About Us',
        description: 'Pagina chi siamo con mission, team e valori',
        category: 'about',
        tags: ['company', 'team', 'mission'],
        isCustom: false,
        createdAt: new Date(),
        blocks: [
            { id: '1', type: 'hero', content: { title: 'Chi Siamo', subtitle: 'La nostra storia' } },
            { id: '2', type: 'text-block', content: { text: '<p>Mission e valori...</p>' } },
            { id: '3', type: 'stats', content: { stats: [{ label: 'Anni', value: '10+' }, { label: 'Team', value: '50+' }] } },
            { id: '4', type: 'bento-grid', content: { items: [] } },
            { id: '5', type: 'cta', content: { title: 'Unisciti al Team', cta: 'Lavora con Noi' } }
        ]
    },
    {
        id: 'service-page',
        name: 'Service Page',
        description: 'Pagina servizio con features, FAQ e social proof',
        category: 'service',
        tags: ['service', 'offering', 'features'],
        isCustom: false,
        createdAt: new Date(),
        blocks: [
            { id: '1', type: 'hero', content: { title: 'Nome Servizio', subtitle: 'Descrizione breve' } },
            { id: '2', type: 'bento-grid', content: { items: [] } },
            { id: '3', type: 'testimonials', content: { testimonials: [] } },
            { id: '4', type: 'faq', content: { faqs: [] } },
            { id: '5', type: 'cta', content: { title: 'Richiedi Preventivo', cta: 'Contattaci' } }
        ]
    },
    {
        id: 'contact-page',
        name: 'Contact Page',
        description: 'Pagina contatti con form e informazioni',
        category: 'contact',
        tags: ['contact', 'form', 'support'],
        isCustom: false,
        createdAt: new Date(),
        blocks: [
            { id: '1', type: 'hero', content: { title: 'Contattaci', subtitle: 'Siamo qui per aiutarti' } },
            { id: '2', type: 'form', content: { fields: [] } },
            { id: '3', type: 'text-block', content: { text: '<p>Informazioni di contatto...</p>' } },
            { id: '4', type: 'cta', content: { title: 'Preferisci parlare?', cta: 'Chiamaci' } }
        ]
    },
    {
        id: 'ecommerce-product',
        name: 'eCommerce Product',
        description: 'Pagina prodotto con features, reviews e acquisto',
        category: 'ecommerce',
        tags: ['product', 'shop', 'sales'],
        isCustom: false,
        createdAt: new Date(),
        blocks: [
            { id: '1', type: 'hero', content: { title: 'Nome Prodotto', subtitle: 'Prezzo e descrizione' } },
            { id: '2', type: 'bento-grid', content: { items: [] } },
            { id: '3', type: 'testimonials', content: { testimonials: [] } },
            { id: '4', type: 'faq', content: { faqs: [] } },
            { id: '5', type: 'cta', content: { title: 'Acquista Ora', cta: 'Aggiungi al Carrello' } }
        ]
    }
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    landing: <Sparkles className="w-5 h-5" />,
    blog: <FileText className="w-5 h-5" />,
    portfolio: <Briefcase className="w-5 h-5" />,
    about: <Users className="w-5 h-5" />,
    service: <Layout className="w-5 h-5" />,
    contact: <Mail className="w-5 h-5" />,
    ecommerce: <ShoppingCart className="w-5 h-5" />,
    custom: <Star className="w-5 h-5" />
};

export default function TemplateManager({ isOpen, onClose, onLoadTemplate, currentBlocks }: TemplateManagerProps) {
    const [templates, setTemplates] = useState<Template[]>(PREDEFINED_TEMPLATES);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [newTemplateName, setNewTemplateName] = useState('');
    const [newTemplateDesc, setNewTemplateDesc] = useState('');
    const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

    const filteredTemplates = templates.filter(t => {
        const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = !selectedCategory || t.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleSaveAsTemplate = () => {
        if (!newTemplateName.trim()) return;

        const newTemplate: Template = {
            id: `custom-${Date.now()}`,
            name: newTemplateName,
            description: newTemplateDesc,
            category: 'custom',
            tags: ['custom'],
            blocks: currentBlocks,
            isCustom: true,
            createdAt: new Date()
        };

        setTemplates([...templates, newTemplate]);
        setShowSaveDialog(false);
        setNewTemplateName('');
        setNewTemplateDesc('');

        // Save to localStorage
        localStorage.setItem('cms-templates', JSON.stringify([...templates, newTemplate]));
    };

    const handleDeleteTemplate = (id: string) => {
        if (!confirm('Eliminare questo template?')) return;
        const updated = templates.filter(t => t.id !== id);
        setTemplates(updated);
        localStorage.setItem('cms-templates', JSON.stringify(updated));
    };

    const handleExportTemplate = (template: Template) => {
        const dataStr = JSON.stringify(template, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = `template-${template.id}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    const handleImportTemplate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target?.result as string);
                imported.id = `imported-${Date.now()}`;
                imported.isCustom = true;
                setTemplates([...templates, imported]);
                localStorage.setItem('cms-templates', JSON.stringify([...templates, imported]));
            } catch (error) {
                alert('Errore nell\'importazione del template');
            }
        };
        reader.readAsText(file);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-6xl h-[90vh] bg-gray-900 rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Layout className="w-6 h-6 text-yellow-400" />
                            Template Manager
                        </h2>
                        <p className="text-sm text-gray-400 mt-1">Gestisci e crea template per le tue pagine</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {/* Toolbar */}
                <div className="p-4 border-b border-white/10 space-y-4">
                    {/* Search and Actions */}
                    <div className="flex items-center gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Cerca template..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50"
                            />
                        </div>
                        <button
                            onClick={() => setShowSaveDialog(true)}
                            className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            Salva Corrente
                        </button>
                        <label className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-lg font-medium flex items-center gap-2 transition-colors cursor-pointer">
                            <Upload className="w-4 h-4" />
                            Importa
                            <input type="file" accept=".json" onChange={handleImportTemplate} className="hidden" />
                        </label>
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${!selectedCategory ? 'bg-yellow-400 text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            Tutti
                        </button>
                        {Object.entries(CATEGORY_ICONS).map(([cat, icon]) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${selectedCategory === cat ? 'bg-yellow-400 text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                    }`}
                            >
                                {icon}
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Templates Grid */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredTemplates.map((template) => (
                            <motion.div
                                key={template.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-yellow-400/50 transition-all group"
                            >
                                {/* Thumbnail */}
                                <div className="h-32 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                                    {CATEGORY_ICONS[template.category]}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => setPreviewTemplate(template)}
                                            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg"
                                            title="Preview"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleExportTemplate(template)}
                                            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg"
                                            title="Export"
                                        >
                                            <Download className="w-4 h-4" />
                                        </button>
                                        {template.isCustom && (
                                            <button
                                                onClick={() => handleDeleteTemplate(template.id)}
                                                className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-400" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-bold text-white">{template.name}</h3>
                                        {template.isCustom && (
                                            <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded">Custom</span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-400 mb-3">{template.description}</p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {template.tags.map((tag) => (
                                            <span key={tag} className="px-2 py-0.5 bg-white/5 text-gray-500 text-xs rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Actions */}
                                    <button
                                        onClick={() => {
                                            onLoadTemplate(template.blocks);
                                            onClose();
                                        }}
                                        className="w-full px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black rounded-lg font-medium transition-colors"
                                    >
                                        Usa Template
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredTemplates.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            <Filter className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p>Nessun template trovato</p>
                        </div>
                    )}
                </div>

                {/* Save Dialog */}
                <AnimatePresence>
                    {showSaveDialog && (
                        <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-white/10"
                            >
                                <h3 className="text-xl font-bold text-white mb-4">Salva come Template</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Nome Template</label>
                                        <input
                                            type="text"
                                            value={newTemplateName}
                                            onChange={(e) => setNewTemplateName(e.target.value)}
                                            placeholder="Es: Landing Page Custom"
                                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Descrizione</label>
                                        <textarea
                                            value={newTemplateDesc}
                                            onChange={(e) => setNewTemplateDesc(e.target.value)}
                                            placeholder="Descrizione del template..."
                                            rows={3}
                                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 resize-none"
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setShowSaveDialog(false)}
                                            className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-colors"
                                        >
                                            Annulla
                                        </button>
                                        <button
                                            onClick={handleSaveAsTemplate}
                                            disabled={!newTemplateName.trim()}
                                            className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-400 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg font-medium transition-colors"
                                        >
                                            Salva
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Preview Dialog */}
                <AnimatePresence>
                    {previewTemplate && (
                        <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full border border-white/10 max-h-[80vh] overflow-y-auto"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-white">{previewTemplate.name}</h3>
                                    <button
                                        onClick={() => setPreviewTemplate(null)}
                                        className="p-2 hover:bg-white/10 rounded-lg"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <p className="text-gray-400 mb-4">{previewTemplate.description}</p>
                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium text-gray-400">Blocchi ({previewTemplate.blocks.length}):</h4>
                                    {previewTemplate.blocks.map((block, idx) => (
                                        <div key={idx} className="p-3 bg-white/5 rounded-lg flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-yellow-400/20 flex items-center justify-center text-yellow-400 text-sm font-bold">
                                                {idx + 1}
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-white capitalize">{block.type.replace('-', ' ')}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => {
                                        onLoadTemplate(previewTemplate.blocks);
                                        setPreviewTemplate(null);
                                        onClose();
                                    }}
                                    className="w-full mt-4 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black rounded-lg font-medium transition-colors"
                                >
                                    Usa Template
                                </button>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

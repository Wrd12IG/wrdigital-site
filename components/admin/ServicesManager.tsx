'use client';

import { useState, useEffect } from 'react';
import {
    Edit2 as IconEdit,
    Trash2 as IconTrash,
    Plus as IconPlus,
    Globe as IconGlobe,
    FileText as IconFileText,
    Settings as IconSettings,
    Image as IconImage,
    Check as IconCheck,
    X as IconX,
    ArrowLeft as IconArrowLeft,
    Save as IconSave
} from 'lucide-react';

// Helper Component per Analisi SEO Live
const SeoProgressBar = ({ value, min, max }: { value: string, min: number, max: number }) => {
    const len = value?.length || 0;
    let color = 'bg-red-500';
    if (len >= min && len <= max) color = 'bg-green-500';
    else if (len > 0) color = 'bg-yellow-500';

    const percentage = Math.min((len / max) * 100, 100);

    return (
        <div className="h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
            <div className={`h-full ${color} transition-all duration-300`} style={{ width: `${percentage}%` }} />
        </div>
    );
};

// Types
interface Service {
    id: string;
    title: string;
    slug: string;
    content: any;
    seo: any;
    published: boolean;
}

interface EditingService extends Service {
    content: {
        features?: Array<{ title: string; description: string }>;
        process?: Array<any>;
        faq?: Array<{ question: string; answer: string }>;
        description?: string;
    };
    seo: {
        metaTitle?: string;
        metaDescription?: string;
        canonicalUrl?: string;
        ogImage?: string;
        robotsIndex?: boolean;
        robotsFollow?: boolean;
    };
}

// Helper: normalizza il contenuto in oggetto
const normalizeContent = (content: any) => {
    if (Array.isArray(content)) return content; // V2 Block Editor
    if (typeof content === 'string') {
        try {
            const parsed = JSON.parse(content);
            return parsed;
        } catch {
            return { features: [], process: [], faq: [] };
        }
    }
    if (typeof content === 'object' && content !== null) return content;
    return { features: [], process: [], faq: [] };
};

// Helper: sanitizza slug
const sanitizeSlug = (str: string): string => {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
};

export default function ServicesManager() {
    const [services, setServices] = useState<Service[]>([]);
    const [deleteConfirmIds, setDeleteConfirmIds] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>('content');
    const [editingService, setEditingService] = useState<EditingService | null>(null);
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    // ... existing load/save logic ...

    // Richiede conferma UI
    const requestDelete = (e: any, id: string) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        if (deleteConfirmIds.includes(id)) return; // Già in attesa
        setDeleteConfirmIds([...deleteConfirmIds, id]);

        // Timeout di 3 secondi per annullare automaticamente
        setTimeout(() => {
            setDeleteConfirmIds(prev => prev.filter(pid => pid !== id));
        }, 3000);
    };

    // Esegue cancellazione vera
    const confirmDelete = async (e: any, id: string) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }

        try {
            const res = await fetch(`/api/admin/services?id=${id}&_t=${Date.now()}`, { method: 'DELETE' });
            if (res.ok) {
                setServices(prev => prev.filter(s => s.id !== id)); // Optimistic update
                if (selectedServiceId === id) {
                    setEditingService(null);
                    setSelectedServiceId(null);
                }
                showNotification('Eliminato');
            } else {
                showNotification('Errore eliminazione', 'error');
            }
        } catch (err) {
            showNotification('Errore di rete', 'error');
        }
    };

    // ... renderContent ...



    const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 8000);
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await fetch(`/api/admin/services?_t=${Date.now()}`);
            const data = await res.json();
            console.log('FETCHED SERVICES:', data); // DEBUG
            setServices(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to fetch services', error);
            showNotification('Errore di caricamento servizi', 'error');
            setIsLoading(false);
        }
    };

    const handleCreateService = async (e?: any) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setIsLoading(true);
        try {
            const tempSlug = `bozza-${Date.now()}`;
            const newServicePayload = {
                title: 'Nuova Pagina (Bozza)',
                slug: tempSlug,
                content: JSON.stringify([]), // MUST BE STRING for Prisma
                seo: {
                    metaTitle: 'Nuova Bozza',
                    metaDescription: '',
                    robotsIndex: false,
                    robotsFollow: false
                },
                published: false
            };

            const res = await fetch('/api/admin/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newServicePayload)
            });

            if (res.ok) {
                const data = await res.json();

                // Fetch updated list logic optimized
                const freshRes = await fetch(`/api/admin/services?_t=${Date.now()}`);
                const freshList = await freshRes.json();
                setServices(freshList);

                const newItem = freshList.find((s: any) => s.id === data.id);
                if (newItem) handleSelectService(newItem);

                showNotification('Bozza creata con successo!');
            } else {
                const err = await res.text();
                showNotification(`Errore creazione: ${err}`, 'error');
            }
        } catch (error) {
            console.error('Error creating draft:', error);
            showNotification('Errore di connessione', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectService = (service: any) => {
        setEditingService({
            ...service,
            content: normalizeContent(service.content),
            seo: service.seo || {}
        });
        setSelectedServiceId(service.id);
        setActiveTab('content');
    };

    const handleSave = async (e?: any) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (!editingService) return;

        // Prepare payload with originalSlug for redirect logic handling
        const originalService = services.find(s => s.id === editingService.id);
        const originalSlug = originalService ? originalService.slug : null;

        const payload = {
            ...editingService,
            originalSlug: originalSlug, // Important for 301 Redirect detection
            content: JSON.stringify(editingService.content)
        };

        const res = await fetch('/api/admin/services', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        });

        if (res.ok) {
            fetchServices();
            if (editingService.id === 'new') setSelectedServiceId(null);
            showNotification('Salvataggio completato!');
        } else {
            showNotification('Errore nel salvataggio', 'error');
        }
    };



    // --- Sub-Components for Arrays ---
    const addFeature = () => {
        if (!editingService) return;
        const newFeatures = [...(editingService.content.features || []), { title: '', description: '' }];
        setEditingService({ ...editingService, content: { ...editingService.content, features: newFeatures } });
    };

    const renderContent = () => {
        if (!editingService) return (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <IconFileText className="w-16 h-16 mb-4 opacity-20" />
                <p>Seleziona un servizio per iniziare</p>
                {isLoading && <div className="mt-4 animate-spin w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full"></div>}
            </div>
        );

        switch (activeTab) {
            case 'seo':
                return (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="bg-black/20 p-6 rounded-xl border border-white/5">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <IconGlobe className="w-4 h-4 text-blue-400" />
                                Metadata SEO
                            </h3>
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label htmlFor="meta-title" className="text-xs font-bold text-gray-500 uppercase tracking-wider">Meta Title</label>
                                        <span className="text-xs text-gray-500">{editingService.seo.metaTitle?.length || 0} / 60</span>
                                    </div>
                                    <input
                                        id="meta-title"
                                        name="meta-title"
                                        type="text"
                                        value={editingService.seo.metaTitle || ''}
                                        onChange={(e) => editingService && setEditingService({ ...editingService, seo: { ...editingService.seo, metaTitle: e.target.value } })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                    <SeoProgressBar value={editingService.seo.metaTitle || ''} min={40} max={60} />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label htmlFor="meta-desc" className="text-xs font-bold text-gray-500 uppercase tracking-wider">Meta Description</label>
                                        <span className="text-xs text-gray-500">{editingService.seo.metaDescription?.length || 0} / 160</span>
                                    </div>
                                    <textarea
                                        id="meta-desc"
                                        name="meta-description"
                                        value={editingService.seo.metaDescription || ''}
                                        onChange={(e) => editingService && setEditingService({ ...editingService, seo: { ...editingService.seo, metaDescription: e.target.value } })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white h-24 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                    <SeoProgressBar value={editingService.seo.metaDescription || ''} min={120} max={160} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/20 p-6 rounded-xl border border-white/5">
                            <h3 className="text-lg font-semibold text-white mb-4">Indexing & Robots</h3>
                            <div className="flex gap-8">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        id="robots-index"
                                        name="robots-index"
                                        type="checkbox"
                                        checked={editingService.seo.robotsIndex}
                                        onChange={(e) => editingService && setEditingService({ ...editingService, seo: { ...editingService.seo, robotsIndex: e.target.checked } })}
                                        className="w-5 h-5 rounded border-gray-600 bg-black/40 text-blue-500 focus:ring-offset-0 focus:ring-0"
                                    />
                                    <span className="text-gray-300">Index (Mostra su Google)</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        id="robots-follow"
                                        name="robots-follow"
                                        type="checkbox"
                                        checked={editingService.seo.robotsFollow}
                                        onChange={(e) => editingService && setEditingService({ ...editingService, seo: { ...editingService.seo, robotsFollow: e.target.checked } })}
                                        className="w-5 h-5 rounded border-gray-600 bg-black/40 text-blue-500 focus:ring-offset-0 focus:ring-0"
                                    />
                                    <span className="text-gray-300">Follow (Segui link)</span>
                                </label>
                            </div>
                        </div>
                    </div>
                );

            case 'settings':
                return (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="bg-black/20 p-6 rounded-xl border border-white/5">
                            <h3 className="text-lg font-semibold text-white mb-4">Configurazione URL</h3>
                            <div>
                                <label htmlFor="url-slug" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Slug URL</label>
                                <div className="flex">
                                    <span className="bg-white/5 border border-white/10 border-r-0 rounded-l-lg px-3 py-3 text-gray-400 text-sm flex items-center">
                                        /servizi/
                                    </span>
                                    <input
                                        id="url-slug"
                                        name="slug"
                                        type="text"
                                        value={editingService.slug}
                                        onChange={(e) => editingService && setEditingService({ ...editingService, slug: sanitizeSlug(e.target.value) })}
                                        className="flex-1 bg-black/40 border border-white/10 rounded-r-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    Attenzione: modificando lo slug verranno creati automaticamente redirect 301 dalla vecchia URL.
                                </p>
                            </div>
                        </div>
                    </div>
                );

            case 'content':
            default:
                // Check if content is V2 (Block Editor Array)
                const isBlockContent = Array.isArray(editingService.content);

                if (isBlockContent) {
                    return (
                        <div className="flex flex-col items-center justify-center h-64 text-center space-y-6 animate-in fade-in zoom-in duration-300">
                            <div className="bg-purple-500/10 p-6 rounded-full">
                                <IconEdit className="w-12 h-12 text-purple-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Pagina gestita con Editor Visuale (V2)</h3>
                                <p className="text-gray-400 max-w-md mx-auto">
                                    Il contenuto di questa pagina è strutturato a blocchi.
                                    Non puoi modificarlo da qui, devi usare l'editor visuale.
                                </p>
                            </div>
                            <a
                                href={`/admin/editor?pageId=${editingService.id}`}
                                className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-xl font-bold shadow-xl hover:shadow-purple-500/20 transition transform hover:scale-105 flex items-center gap-3"
                            >
                                <IconEdit className="w-5 h-5" /> Apri Editor Visuale
                            </a>
                        </div>
                    );
                }

                return (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        {/* Hero Section */}
                        <div className="bg-black/20 p-6 rounded-xl border border-white/5">
                            <h3 className="text-lg font-semibold text-white mb-4">Contenuto Principale (Legacy)</h3>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="page-title" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Titolo Pagina (H1)</label>
                                    <input
                                        id="page-title"
                                        name="title"
                                        type="text"
                                        value={editingService.title}
                                        onChange={(e) => editingService && setEditingService({ ...editingService, title: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-lg font-bold focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="page-desc" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Sottotitolo / Intro</label>
                                    <textarea
                                        id="page-desc"
                                        name="description"
                                        value={editingService.content.description || ''}
                                        onChange={(e) => editingService && setEditingService({ ...editingService, content: { ...editingService.content, description: e.target.value } })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white h-24 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Features Array */}
                        <div className="bg-black/20 p-6 rounded-xl border border-white/5">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-white">Features (Bento Grid)</h3>
                                <button type="button" onClick={addFeature} className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition">+ Aggiungi</button>
                            </div>
                            <div className="space-y-4">
                                {(editingService.content.features || []).map((feat: any, idx: number) => (
                                    <div key={idx} className="bg-white/5 p-4 rounded-lg border border-white/5">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-xs text-gray-500">Feature #{idx + 1}</span>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (!editingService) return;
                                                    const newF = [...(editingService.content.features || [])];
                                                    newF.splice(idx, 1);
                                                    setEditingService({ ...editingService, content: { ...editingService.content, features: newF } });
                                                }}
                                                className="text-red-400 hover:text-red-300"
                                            ><IconX className="w-4 h-4" /></button>
                                        </div>
                                        <input
                                            name={`feature-title-${idx}`}
                                            type="text"
                                            placeholder="Titolo Feature"
                                            value={feat.title}
                                            onChange={(e) => {
                                                if (!editingService) return;
                                                const newF = [...(editingService.content.features || [])];
                                                newF[idx].title = e.target.value;
                                                setEditingService({ ...editingService, content: { ...editingService.content, features: newF } });
                                            }}
                                            className="w-full bg-black/40 border border-white/10 rounded mb-2 px-3 py-2 text-white text-sm"
                                        />
                                        <textarea
                                            name={`feature-desc-${idx}`}
                                            placeholder="Descrizione"
                                            value={feat.description}
                                            onChange={(e) => {
                                                if (!editingService) return;
                                                const newF = [...(editingService.content.features || [])];
                                                newF[idx].description = e.target.value;
                                                setEditingService({ ...editingService, content: { ...editingService.content, features: newF } });
                                            }}
                                            className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white text-sm h-16"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FAQ Array (Schema Generator) */}
                        <div className="bg-black/20 p-6 rounded-xl border border-white/5">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <IconFileText className="w-4 h-4 text-green-400" /> FAQ & Schema
                                </h3>
                                <button onClick={() => {
                                    const newFAQ = [...(editingService.content.faq || []), { question: 'Domanda?', answer: '' }];
                                    setEditingService({ ...editingService, content: { ...editingService.content, faq: newFAQ } });
                                }} className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded hover:bg-green-500 hover:text-white transition">+ Aggiungi Domanda</button>
                            </div>
                            <div className="space-y-4">
                                {(editingService.content.faq || []).map((item: any, idx: number) => (
                                    <div key={idx} className="bg-white/5 p-4 rounded-lg border border-white/5">
                                        <input
                                            name={`faq-question-${idx}`}
                                            type="text"
                                            value={item.question}
                                            onChange={(e) => {
                                                if (!editingService) return;
                                                const newF = [...(editingService.content.faq || [])];
                                                newF[idx].question = e.target.value;
                                                setEditingService({ ...editingService, content: { ...editingService.content, faq: newF } });
                                            }}
                                            className="w-full bg-black/40 border-none font-bold text-white mb-2 focus:ring-0 px-0"
                                            placeholder="Inserisci la domanda..."
                                        />
                                        <textarea
                                            name={`faq-answer-${idx}`}
                                            value={item.answer}
                                            onChange={(e) => {
                                                if (!editingService) return;
                                                const newF = [...(editingService.content.faq || [])];
                                                newF[idx].answer = e.target.value;
                                                setEditingService({ ...editingService, content: { ...editingService.content, faq: newF } });
                                            }}
                                            className="w-full bg-black/20 border border-white/5 rounded px-3 py-2 text-gray-300 text-sm h-16"
                                            placeholder="Risposta per lo snippet..."
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                );
        }
    };

    return (
        <div className="flex h-[calc(100vh-100px)]">
            {/* Sidebar List */}
            <div className="w-64 border-r border-white/10 overflow-y-auto p-4 shrink-0 bg-black/20">
                <button
                    type="button"
                    onClick={(e) => handleCreateService(e)}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-lg flex items-center justify-center gap-2 mb-6 font-medium shadow-lg hover:shadow-blue-500/20 transition-all"
                >
                    <IconPlus className="w-5 h-5" /> Nuovo Servizio
                </button>

                <div className="space-y-1">
                    {services.map((s, index) => (
                        <div
                            role="button"
                            key={s.id || index}
                            onClick={() => {
                                if (selectedServiceId === s.id) return;
                                setEditingService(null);
                                setTimeout(() => {
                                    setSelectedServiceId(s.id);
                                    setActiveTab('content');
                                }, 10);
                            }}
                            className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between group relative ${selectedServiceId === s.id
                                ? 'bg-purple-900/30 border-purple-500 text-white'
                                : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className={`w-2 h-2 rounded-full shrink-0 ${s.published ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-gray-600'}`} />
                                <div className="truncate">
                                    <div className="font-bold text-sm truncate">{s.title || 'Senza Titolo'}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pl-2">
                                <span className="text-xs opacity-50 truncate max-w-[120px] hidden sm:block">/{s.slug}</span>
                                {s.published === false && (
                                    deleteConfirmIds.includes(s.id) ? (
                                        <div
                                            role="button"
                                            className="px-2 py-0.5 bg-red-600 text-white text-[10px] rounded font-bold hover:bg-red-700 transition animate-in zoom-in duration-200 z-50 cursor-pointer"
                                            onClick={(e) => confirmDelete(e, s.id)}
                                        >
                                            CONFERMA
                                        </div>
                                    ) : (
                                        <div
                                            role="button"
                                            title="Elimina Bozza"
                                            className="p-1 hover:bg-red-500/20 text-gray-500 hover:text-red-500 rounded transition-colors cursor-pointer"
                                            onClick={(e) => requestDelete(e, s.id)}
                                        >
                                            <IconTrash className="w-3 h-3" />
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Editor Area */}
            <div className="flex-1 flex flex-col h-full bg-black/40">
                {/* Editor Header */}
                {editingService && (
                    <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black/20 shrink-0">
                        <div>
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                {editingService.title}
                                {editingService.id === 'new' && <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">NUOVO</span>}
                            </h2>
                            {editingService.id !== 'new' && (
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${editingService.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-500'}`}>
                                        {editingService.published ? 'Pubblicato' : 'Bozza'}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            {editingService.id !== 'new' && (
                                <a
                                    href={`/admin/editor?pageId=${editingService.id}`}
                                    className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-purple-500/20 transition flex items-center gap-2 text-sm"
                                >
                                    <IconEdit className="w-4 h-4" /> Edit Visuale (V2)
                                </a>
                            )}
                            {editingService.id !== 'new' && (
                                <button
                                    type="button"
                                    onClick={() => setEditingService({ ...editingService, published: !editingService.published })}
                                    className={`px-3 py-2 rounded-lg font-medium transition flex items-center gap-2 text-sm border ${editingService.published ? 'bg-green-500/10 border-green-500 text-green-400 hover:bg-green-500/20' : 'bg-yellow-500/10 border-yellow-500 text-yellow-500 hover:bg-yellow-500/20'}`}
                                    title={editingService.published ? 'Clicca per ritirare (Bozza)' : 'Clicca per pubblicare'}
                                >
                                    {editingService.published ? <IconGlobe className="w-4 h-4" /> : <IconFileText className="w-4 h-4" />}
                                    {editingService.published ? 'Pubblicato' : 'Bozza'}
                                </button>
                            )}
                            <button type="button" onClick={(e) => handleSave(e)} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium shadow-lg hover:shadow-blue-500/20 transition flex items-center gap-2">
                                <IconSave className="w-4 h-4" /> Salva
                            </button>
                        </div>
                    </div>
                )}

                {/* Editor Tabs */}
                {editingService && (
                    <div className="flex border-b border-white/10 px-6 gap-6 bg-black/10 shrink-0">
                        <button
                            type="button"
                            onClick={() => setActiveTab('content')}
                            className={`py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'content' ? 'border-purple-500 text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                        >
                            Contenuto
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('seo')}
                            className={`py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'seo' ? 'border-purple-500 text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                        >
                            SEO & Metadata
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('settings')}
                            className={`py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'settings' ? 'border-purple-500 text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                        >
                            Impostazioni
                        </button>
                    </div>
                )}

                {/* Editor Content Scrollable */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {renderContent()}
                </div>
            </div>
            {/* Notification Toast */}
            {notification && (
                <button
                    type="button"
                    onClick={() => setNotification(null)}
                    className={`fixed bottom-8 right-8 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 cursor-pointer hover:scale-105 transition-transform text-left ${notification.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
                    title="Clicca per chiudere"
                >
                    {notification.type === 'success' ? <IconCheck className="w-5 h-5 shrink-0" /> : <IconX className="w-5 h-5 shrink-0" />}
                    <div className="flex flex-col">
                        <span className="font-medium">{notification.message}</span>
                        <span className="text-[10px] opacity-70 mt-1 uppercase tracking-wider font-bold">Clicca per chiudere</span>
                    </div>
                </button>
            )}
        </div>
    );
}

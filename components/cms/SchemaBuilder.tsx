'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Code, Check, Copy, FileText, Star, HelpCircle,
    Briefcase, Package, X, Plus, Trash2
} from 'lucide-react';

type SchemaType = 'FAQ' | 'Service' | 'Product' | 'Review' | 'Organization' | 'Article';

interface SchemaBuilderProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (schema: any) => void;
    initialSchema?: any;
}

export default function SchemaBuilder({ isOpen, onClose, onSave, initialSchema }: SchemaBuilderProps) {
    const [schemaType, setSchemaType] = useState<SchemaType>('FAQ');
    const [schemaData, setSchemaData] = useState<any>(initialSchema || {});
    const [showPreview, setShowPreview] = useState(false);

    if (!isOpen) return null;

    const generateJSONLD = () => {
        switch (schemaType) {
            case 'FAQ':
                return generateFAQSchema(schemaData);
            case 'Service':
                return generateServiceSchema(schemaData);
            case 'Product':
                return generateProductSchema(schemaData);
            case 'Review':
                return generateReviewSchema(schemaData);
            case 'Organization':
                return generateOrganizationSchema(schemaData);
            case 'Article':
                return generateArticleSchema(schemaData);
            default:
                return {};
        }
    };

    const copyToClipboard = () => {
        const json = JSON.stringify(generateJSONLD(), null, 2);
        navigator.clipboard.writeText(json);
        alert('Schema copiato negli appunti!');
    };

    const handleSave = () => {
        onSave(generateJSONLD());
        onClose();
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-6 border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-yellow-400/10">
                                <Code className="w-5 h-5 text-yellow-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">Schema.org Builder</h2>
                                <p className="text-sm text-gray-400">Dati strutturati per Google Rich Results</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Schema Type Selector */}
                    <div className="p-6 border-b border-white/10">
                        <label className="block text-sm text-gray-400 mb-3">Tipo di Schema</label>
                        <div className="grid grid-cols-3 gap-3">
                            {(['FAQ', 'Service', 'Product', 'Review', 'Organization', 'Article'] as SchemaType[]).map(type => (
                                <button
                                    key={type}
                                    onClick={() => {
                                        setSchemaType(type);
                                        setSchemaData({});
                                    }}
                                    className={`p-3 rounded-lg border transition-colors text-left ${schemaType === type
                                            ? 'bg-yellow-400/10 border-yellow-400/50 text-yellow-400'
                                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                                        }`}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        {getSchemaIcon(type)}
                                        <span className="font-medium">{type}</span>
                                    </div>
                                    <p className="text-xs opacity-75">{getSchemaDescription(type)}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <div className="flex-1 overflow-auto p-6">
                        {renderSchemaForm(schemaType, schemaData, setSchemaData)}
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-white/10 flex items-center justify-between">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowPreview(!showPreview)}
                                className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                            >
                                <Code className="w-4 h-4" />
                                {showPreview ? 'Nascondi' : 'Mostra'} JSON-LD
                            </button>
                            <button
                                onClick={copyToClipboard}
                                className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                            >
                                <Copy className="w-4 h-4" />
                                Copia
                            </button>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                Annulla
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-6 py-2 rounded-lg bg-yellow-400 text-black font-medium hover:bg-yellow-300 transition-colors flex items-center gap-2"
                            >
                                <Check className="w-4 h-4" />
                                Salva Schema
                            </button>
                        </div>
                    </div>

                    {/* JSON Preview */}
                    <AnimatePresence>
                        {showPreview && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 300, opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t border-white/10 overflow-hidden"
                            >
                                <div className="p-6 h-full overflow-auto">
                                    <pre className="text-xs text-green-400 font-mono bg-black/50 p-4 rounded-lg">
                                        {JSON.stringify(generateJSONLD(), null, 2)}
                                    </pre>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

// Schema Icons
function getSchemaIcon(type: SchemaType) {
    const icons = {
        FAQ: <HelpCircle className="w-4 h-4" />,
        Service: <Briefcase className="w-4 h-4" />,
        Product: <Package className="w-4 h-4" />,
        Review: <Star className="w-4 h-4" />,
        Organization: <Briefcase className="w-4 h-4" />,
        Article: <FileText className="w-4 h-4" />
    };
    return icons[type];
}

// Schema Descriptions
function getSchemaDescription(type: SchemaType) {
    const descriptions = {
        FAQ: 'Domande e risposte',
        Service: 'Servizio offerto',
        Product: 'Prodotto e-commerce',
        Review: 'Recensioni e rating',
        Organization: 'Informazioni azienda',
        Article: 'Articolo blog/news'
    };
    return descriptions[type];
}

// Render form based on schema type
function renderSchemaForm(type: SchemaType, data: any, setData: (data: any) => void) {
    switch (type) {
        case 'FAQ':
            return <FAQForm data={data} setData={setData} />;
        case 'Service':
            return <ServiceForm data={data} setData={setData} />;
        case 'Product':
            return <ProductForm data={data} setData={setData} />;
        default:
            return <div className="text-gray-400 text-center py-8">Form in sviluppo...</div>;
    }
}

// FAQ Form
function FAQForm({ data, setData }: { data: any; setData: (data: any) => void }) {
    const questions = data.questions || [{ question: '', answer: '' }];

    const addQuestion = () => {
        setData({ ...data, questions: [...questions, { question: '', answer: '' }] });
    };

    const removeQuestion = (index: number) => {
        const newQuestions = questions.filter((_: any, i: number) => i !== index);
        setData({ ...data, questions: newQuestions });
    };

    const updateQuestion = (index: number, field: 'question' | 'answer', value: string) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setData({ ...data, questions: newQuestions });
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Domande Frequenti</h3>
                <button
                    onClick={addQuestion}
                    className="px-3 py-1.5 rounded-lg bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/20 transition-colors text-sm flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Aggiungi Domanda
                </button>
            </div>

            {questions.map((item: any, index: number) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Domanda {index + 1}</span>
                        {questions.length > 1 && (
                            <button
                                onClick={() => removeQuestion(index)}
                                className="p-1 rounded-md text-red-400 hover:bg-red-500/10"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    <input
                        type="text"
                        placeholder="Domanda..."
                        value={item.question}
                        onChange={e => updateQuestion(index, 'question', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500"
                    />
                    <textarea
                        placeholder="Risposta..."
                        value={item.answer}
                        onChange={e => updateQuestion(index, 'answer', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 resize-none"
                    />
                </div>
            ))}
        </div>
    );
}

// Service Form
function ServiceForm({ data, setData }: { data: any; setData: (data: any) => void }) {
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm text-gray-400 mb-2">Nome Servizio</label>
                <input
                    type="text"
                    placeholder="es: Consulenza SEO"
                    value={data.name || ''}
                    onChange={e => setData({ ...data, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                />
            </div>
            <div>
                <label className="block text-sm text-gray-400 mb-2">Descrizione</label>
                <textarea
                    placeholder="Descrizione del servizio..."
                    value={data.description || ''}
                    onChange={e => setData({ ...data, description: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white resize-none"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Prezzo (€)</label>
                    <input
                        type="number"
                        placeholder="1500"
                        value={data.price || ''}
                        onChange={e => setData({ ...data, price: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Valuta</label>
                    <input
                        type="text"
                        value="EUR"
                        readOnly
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-500"
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm text-gray-400 mb-2">Provider (Azienda)</label>
                <input
                    type="text"
                    placeholder="W[r]Digital"
                    value={data.provider || ''}
                    onChange={e => setData({ ...data, provider: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                />
            </div>
        </div>
    );
}

// Product Form
function ProductForm({ data, setData }: { data: any; setData: (data: any) => void }) {
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm text-gray-400 mb-2">Nome Prodotto</label>
                <input
                    type="text"
                    placeholder="es: Corso Marketing Digitale"
                    value={data.name || ''}
                    onChange={e => setData({ ...data, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                />
            </div>
            <div>
                <label className="block text-sm text-gray-400 mb-2">Brand</label>
                <input
                    type="text"
                    placeholder="W[r]Digital"
                    value={data.brand || ''}
                    onChange={e => setData({ ...data, brand: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Prezzo (€)</label>
                    <input
                        type="number"
                        placeholder="497"
                        value={data.price || ''}
                        onChange={e => setData({ ...data, price: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Disponibilità</label>
                    <select
                        value={data.availability || 'InStock'}
                        onChange={e => setData({ ...data, availability: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                    >
                        <option value="InStock">In Stock</option>
                        <option value="OutOfStock">Out of Stock</option>
                        <option value="PreOrder">Pre-Order</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Rating (1-5)</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        placeholder="4.8"
                        value={data.rating || ''}
                        onChange={e => setData({ ...data, rating: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Numero Recensioni</label>
                    <input
                        type="number"
                        placeholder="127"
                        value={data.reviewCount || ''}
                        onChange={e => setData({ ...data, reviewCount: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                    />
                </div>
            </div>
        </div>
    );
}

// Schema Generators
function generateFAQSchema(data: any) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: (data.questions || []).map((q: any) => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: q.answer
            }
        }))
    };
}

function generateServiceSchema(data: any) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: data.name,
        description: data.description,
        provider: {
            '@type': 'Organization',
            name: data.provider || 'W[r]Digital'
        },
        offers: {
            '@type': 'Offer',
            price: data.price,
            priceCurrency: 'EUR'
        }
    };
}

function generateProductSchema(data: any) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: data.name,
        brand: {
            '@type': 'Brand',
            name: data.brand
        },
        offers: {
            '@type': 'Offer',
            price: data.price,
            priceCurrency: 'EUR',
            availability: `https://schema.org/${data.availability || 'InStock'}`
        },
        aggregateRating: data.rating ? {
            '@type': 'AggregateRating',
            ratingValue: data.rating,
            reviewCount: data.reviewCount || 1
        } : undefined
    };
}

function generateReviewSchema(data: any) {
    return {};
}

function generateOrganizationSchema(data: any) {
    return {};
}

function generateArticleSchema(data: any) {
    return {};
}

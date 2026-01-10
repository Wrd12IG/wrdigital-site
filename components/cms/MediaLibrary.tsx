'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload, X, Search, Grid, List, Check, AlertCircle,
    Image as ImageIcon, FileText, Loader2, Trash2, Download,
    ZoomIn, Filter, SortAsc
} from 'lucide-react';
import Image from 'next/image';

interface MediaItem {
    id: string;
    filename: string;
    url: string;
    altText?: string;
    mimeType: string;
    size: number;
    width?: number;
    height?: number;
    variants?: {
        webp?: string;
        avif?: string;
        thumbnail?: string;
    };
    createdAt: string;
}

interface MediaLibraryProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (media: MediaItem) => void;
    multiSelect?: boolean;
    selectedIds?: string[];
}

export default function MediaLibrary({
    isOpen,
    onClose,
    onSelect,
    multiSelect = false,
    selectedIds = []
}: MediaLibraryProps) {
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [selectedMedia, setSelectedMedia] = useState<string[]>(selectedIds);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [previewMedia, setPreviewMedia] = useState<MediaItem | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [dragActive, setDragActive] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [selectedSize, setSelectedSize] = useState<'original' | 'small' | 'medium' | 'large'>('original');

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Load media on mount
    useEffect(() => {
        if (isOpen) {
            loadMedia();
        }
    }, [isOpen, page, searchQuery]);

    const loadMedia = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams({
                page: String(page),
                limit: '20',
                ...(searchQuery && { search: searchQuery })
            });

            const res = await fetch(`/api/cms/media?${params}`);
            const data = await res.json();

            setMedia(data.media || []);
            setTotalPages(data.pagination?.pages || 1);
        } catch (error) {
            console.error('Error loading media:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle file upload
    const handleUpload = async (files: FileList | null) => {
        if (!files || files.length === 0) return;
        setIsUploading(true);

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const formData = new FormData();
            formData.append('file', file);
            // Alt text is handled later or set to a default based on name
            formData.append('altText', file.name.split('.')[0].replace(/[-_]/g, ' '));

            try {
                const res = await fetch('/api/cms/media', {
                    method: 'POST',
                    body: formData
                });

                if (res.ok) {
                    const result = await res.json();
                    setMedia(prev => [result.media, ...prev]);
                    // Auto-select the newly uploaded file in single mode
                    if (!multiSelect) {
                        setSelectedMedia([result.media.id]);
                    }
                }
            } catch (error) {
                console.error('Upload error:', error);
            }
        }
        setIsUploading(false);
    };

    // Drag and drop handlers
    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleUpload(e.dataTransfer.files);
        }
    }, []);

    // Select/deselect media
    const toggleSelect = (mediaId: string) => {
        if (multiSelect) {
            setSelectedMedia(prev =>
                prev.includes(mediaId)
                    ? prev.filter(id => id !== mediaId)
                    : [...prev, mediaId]
            );
        } else {
            setSelectedMedia([mediaId]);
        }
    };

    // Confirm selection
    const confirmSelection = (forceItem?: MediaItem) => {
        const itemToSelect = forceItem || media.find(m => m.id === selectedMedia[0]);
        if (!itemToSelect) return;

        if (multiSelect) {
            selectedMedia.forEach(id => {
                const item = media.find(m => m.id === id);
                if (item) onSelect({ ...item, requestedSize: selectedSize } as any);
            });
        } else {
            onSelect({ ...itemToSelect, requestedSize: selectedSize } as any);
        }

        onClose();
    };

    // Delete media
    const deleteMedia = async (mediaId: string) => {
        if (!confirm('Sei sicuro di voler eliminare questo media?')) return;

        try {
            const res = await fetch('/api/cms/media', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: mediaId })
            });

            if (res.ok) {
                setMedia(prev => prev.filter(m => m.id !== mediaId));
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    if (!isOpen || !isMounted) return null;

    return createPortal(
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 z-[999999] flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-gray-900 rounded-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-6 border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-yellow-400/10">
                                <ImageIcon className="w-5 h-5 text-yellow-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">Media Library</h2>
                                <p className="text-sm text-gray-400">{media.length} file disponibili</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Toolbar */}
                    <div className="px-6 py-4 border-b border-white/10 flex items-center gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Cerca per nome file o alt text..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-400/50 focus:outline-none"
                            />
                        </div>

                        {/* View Mode */}
                        <div className="flex gap-1 bg-gray-800 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-md transition-colors ${viewMode === 'grid'
                                    ? 'bg-yellow-400 text-black'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                <Grid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-colors ${viewMode === 'list'
                                    ? 'bg-yellow-400 text-black'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Upload Button */}
                        <label className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-medium flex items-center gap-2 hover:bg-yellow-300 transition-colors cursor-pointer">
                            <Upload className="w-4 h-4" />
                            Carica
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={e => handleUpload(e.target.files)}
                                className="hidden"
                            />
                        </label>
                    </div>

                    {/* Drop Zone */}
                    <div
                        className={`relative flex-1 overflow-auto ${dragActive ? 'bg-yellow-400/10' : ''}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        {dragActive && (
                            <div className="absolute inset-0 flex items-center justify-center bg-yellow-400/20 border-2 border-dashed border-yellow-400 rounded-lg z-10">
                                <div className="text-center">
                                    <Upload className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
                                    <p className="text-lg font-medium text-white">Rilascia qui per caricare</p>
                                </div>
                            </div>
                        )}

                        {isLoading ? (
                            <div className="flex items-center justify-center h-64">
                                <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
                            </div>
                        ) : media.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                                <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
                                <p className="text-lg">Nessun media caricato</p>
                                <p className="text-sm">Trascina i file qui o clicca su "Carica"</p>
                            </div>
                        ) : (
                            <div className={`p-6 ${viewMode === 'grid'
                                ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'
                                : 'space-y-2'
                                }`}>
                                {media.map(item => (
                                    viewMode === 'grid' ? (
                                        <MediaGridItem
                                            key={item.id}
                                            item={item}
                                            isSelected={selectedMedia.includes(item.id)}
                                            onSelect={() => toggleSelect(item.id)}
                                            onDoubleClick={() => confirmSelection(item)}
                                            onPreview={() => setPreviewMedia(item)}
                                            onDelete={() => deleteMedia(item.id)}
                                        />
                                    ) : (
                                        <MediaListItem
                                            key={item.id}
                                            item={item}
                                            isSelected={selectedMedia.includes(item.id)}
                                            onSelect={() => toggleSelect(item.id)}
                                            onDoubleClick={() => confirmSelection(item)}
                                            onDelete={() => deleteMedia(item.id)}
                                        />
                                    )
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-white/10 bg-gray-800/50 flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-bold text-white">
                                {selectedMedia.length > 0 && `${selectedMedia.length} file selezionati`}
                            </p>
                            {!multiSelect && selectedMedia.length > 0 && (
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] text-gray-500 uppercase font-bold">Dimensione:</span>
                                    <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                                        {(['small', 'medium', 'large', 'original'] as const).map(size => (
                                            <button
                                                key={size}
                                                type="button"
                                                onClick={() => setSelectedSize(size)}
                                                className={`px-2 py-1 text-[10px] rounded-md transition-all ${selectedSize === size
                                                        ? 'bg-yellow-400 text-black font-bold'
                                                        : 'text-gray-400 hover:text-white'
                                                    }`}
                                            >
                                                {size === 'small' ? '300px' : size === 'medium' ? '600px' : size === 'large' ? '1000px' : 'Originale'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClose(); }}
                                className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                Annulla
                            </button>
                            <button
                                type="button"
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); confirmSelection(); }}
                                disabled={selectedMedia.length === 0}
                                className="px-6 py-2 rounded-lg bg-yellow-400 text-black font-medium hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <Check className="w-4 h-4" />
                                Inserisci {selectedMedia.length > 0 && `(${selectedMedia.length})`}
                            </button>
                        </div>
                    </div>

                    {/* Uploading overlay */}
                    {isUploading && (
                        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
                            <div className="text-center">
                                <Loader2 className="w-12 h-12 animate-spin text-yellow-400 mx-auto mb-4" />
                                <p className="text-white font-medium">Caricamento in corso...</p>
                                <p className="text-sm text-gray-400">Ottimizzazione e conversione WebP/AVIF</p>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Preview Modal */}
                <AnimatePresence>
                    {previewMedia && (
                        <MediaPreview media={previewMedia} onClose={() => setPreviewMedia(null)} />
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
}

// Grid Item Component
function MediaGridItem({
    item,
    isSelected,
    onSelect,
    onDoubleClick,
    onPreview,
    onDelete
}: {
    item: MediaItem;
    isSelected: boolean;
    onSelect: () => void;
    onDoubleClick: () => void;
    onPreview: () => void;
    onDelete: () => void;
}) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className={`relative group rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${isSelected
                ? 'border-yellow-400 shadow-lg shadow-yellow-400/20'
                : 'border-transparent hover:border-white/20'
                }`}
            onClick={onSelect}
            onDoubleClick={onDoubleClick}
        >
            <div className="aspect-square bg-gray-800 relative">
                {item.mimeType.startsWith('image/') ? (
                    <Image
                        src={item.variants?.thumbnail || item.url}
                        alt={item.altText || ''}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <FileText className="w-12 h-12 text-gray-500" />
                    </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                        onClick={e => { e.stopPropagation(); onPreview(); }}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                    >
                        <ZoomIn className="w-4 h-4" />
                    </button>
                    <button
                        onClick={e => { e.stopPropagation(); onDelete(); }}
                        className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>

                {/* Selected indicator */}
                {isSelected && (
                    <div className="absolute top-2 right-2 p-1 rounded-full bg-yellow-400">
                        <Check className="w-4 h-4 text-black" />
                    </div>
                )}
            </div>

            <div className="p-2 bg-gray-800/50">
                <p className="text-xs text-white truncate font-medium">{item.filename}</p>
                <p className="text-xs text-gray-500">
                    {item.width && item.height && `${item.width}×${item.height} • `}
                    {(item.size / 1024).toFixed(0)} KB
                </p>
            </div>
        </motion.div>
    );
}

// List Item Component
function MediaListItem({
    item,
    isSelected,
    onSelect,
    onDoubleClick,
    onDelete
}: {
    item: MediaItem;
    isSelected: boolean;
    onSelect: () => void;
    onDoubleClick: () => void;
    onDelete: () => void;
}) {
    return (
        <div
            onClick={onSelect}
            onDoubleClick={onDoubleClick}
            className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors ${isSelected
                ? 'bg-yellow-400/10 border border-yellow-400/50'
                : 'bg-white/5 hover:bg-white/10 border border-transparent'
                }`}
        >
            {/* Thumbnail */}
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                {item.mimeType.startsWith('image/') ? (
                    <Image
                        src={item.variants?.thumbnail || item.url}
                        alt={item.altText || ''}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <FileText className="w-8 h-8 text-gray-500" />
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{item.filename}</p>
                <p className="text-xs text-gray-400">
                    {item.width && item.height && `${item.width}×${item.height} • `}
                    {(item.size / 1024).toFixed(0)} KB
                </p>
                {item.altText && (
                    <p className="text-xs text-gray-500 mt-1 truncate">Alt: {item.altText}</p>
                )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                {isSelected && <Check className="w-5 h-5 text-yellow-400" />}
                <button
                    onClick={e => { e.stopPropagation(); onDelete(); }}
                    className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

// Preview Modal
function MediaPreview({ media, onClose }: { media: MediaItem; onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="max-w-4xl w-full"
                onClick={e => e.stopPropagation()}
            >
                <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                    <Image
                        src={media.url}
                        alt={media.altText || ''}
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="mt-4 p-4 bg-gray-900 rounded-lg">
                    <h3 className="font-bold text-white mb-2">{media.filename}</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-gray-400">Dimensioni:</span>
                            <span className="text-white ml-2">{media.width}×{media.height}px</span>
                        </div>
                        <div>
                            <span className="text-gray-400">Peso:</span>
                            <span className="text-white ml-2">{(media.size / 1024).toFixed(2)} KB</span>
                        </div>
                        {media.altText && (
                            <div className="col-span-2">
                                <span className="text-gray-400">Alt Text:</span>
                                <span className="text-white ml-2">{media.altText}</span>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

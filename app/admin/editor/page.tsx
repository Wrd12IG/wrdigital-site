'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

// Dynamic import to avoid SSR issues with drag-drop
const BlockEditor = dynamic(() => import('@/components/cms/BlockEditor'), {
    ssr: false,
    loading: () => (
        <div className="h-screen flex items-center justify-center bg-gray-950 text-white">
            <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
        </div>
    )
});

import { Suspense } from 'react';

function EditorContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pageId = searchParams.get('pageId');
    const [pageData, setPageData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPage = async () => {
            if (!pageId) {
                setIsLoading(false);
                return;
            }

            try {
                const res = await fetch(`/api/admin/services?id=${pageId}`);
                const data = await res.json();
                setPageData(data);
            } catch (error) {
                console.error('Error loading page:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadPage();
    }, [pageId]);

    const handleSave = async (blocks: any[]) => {
        if (!pageId) {
            alert('Errore: ID pagina mancante');
            return;
        }
        try {
            // Save blocks to the page
            const res = await fetch('/api/cms/pages/blocks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pageId,
                    blocks
                })
            });

            if (!res.ok) {
                const errText = await res.text();
                throw new Error(`Save failed: ${res.status} ${errText}`);
            }

            // Show success
            alert('Salvato con successo!');
        } catch (error: any) {
            console.error('Error saving:', error);
            alert(`Errore durante il salvataggio: ${error.message}`);
        }
    };

    const handlePublish = async (blocks: any[]) => {
        if (!pageId) {
            alert('Errore: ID pagina mancante -> Impossibile pubblicare');
            return;
        }
        try {
            const res = await fetch('/api/cms/pages/blocks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pageId,
                    blocks,
                    publish: true
                })
            });

            if (!res.ok) {
                const errText = await res.text();
                throw new Error(`Publish failed: ${res.status} ${errText}`);
            }

            alert('Pubblicato con successo!');
        } catch (error: any) {
            console.error('Error publishing:', error);
            alert(`Errore durante la pubblicazione: ${error.message}`);
        }
    };

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-950 text-white">
                <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
            </div>
        );
    }

    const getInitialBlocks = () => {
        if (!pageData?.content) return [];

        // If it's already an array, use it
        if (Array.isArray(pageData.content)) return pageData.content;

        // If it's a string, try to parse it
        if (typeof pageData.content === 'string') {
            try {
                const parsed = JSON.parse(pageData.content);
                // Ensure the parsed result is an array
                return Array.isArray(parsed) ? parsed : [];
            } catch (e) {
                console.error('Failed to parse blocks:', e);
                return [];
            }
        }

        // If it's an object but not an array (legacy format), return empty array for the block editor
        return [];
    };

    return (
        <div className="h-screen bg-gray-950">
            {/* Editor - Full Screen */}
            <BlockEditor
                pageId={pageId || undefined}
                initialBlocks={getInitialBlocks()}
                onSave={handleSave}
                onPublish={handlePublish}
                onBack={() => router.push('/admin')}
            />
        </div>
    );
}

export default function CMSEditorPage() {
    return (
        <Suspense fallback={
            <div className="h-screen flex items-center justify-center bg-gray-950 text-white">
                <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
            </div>
        }>
            <EditorContent />
        </Suspense>
    );
}

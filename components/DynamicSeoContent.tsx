'use client';

import { useEffect, useState } from 'react';
import PageFaq from './PageFaq';
import PageVideo from './PageVideo';
import InternalLinks from './InternalLinks';
import SeoSchema from './SeoSchema';
import MarkdownRenderer from '@/components/MarkdownRenderer';

interface DynamicSeoContentProps {
    pageKey: string;
    accentColor?: string;
    initialSeoData?: any;
    initialContentOverrides?: any;
}

export default function DynamicSeoContent({
    pageKey,
    accentColor = '#FACC15',
    initialSeoData = null,
    initialContentOverrides = {}
}: DynamicSeoContentProps) {
    const [seoData, setSeoData] = useState<any>(initialSeoData);
    const [contentOverrides, setContentOverrides] = useState<any>(initialContentOverrides);

    useEffect(() => {
        // Only fetch if not provided initially
        if (!initialSeoData) {
            fetch(`/api/seo/${pageKey}`)
                .then(res => res.ok ? res.json() : null)
                .then(data => setSeoData(data))
                .catch(() => { });
        }

        if (Object.keys(initialContentOverrides).length === 0) {
            fetch(`/api/admin/services-content`)
                .then(res => res.ok ? res.json() : {})
                .then(data => setContentOverrides(data))
                .catch(() => { });
        }
    }, [pageKey, initialSeoData, initialContentOverrides]);

    const hasContent = (seoData && (seoData.hasVideo || seoData.hasFaq || seoData.hasInternalLinks)) || contentOverrides[pageKey]?.extendedDescription;

    if (!hasContent) return null;

    return (
        <>
            {/* Schema.org JSON-LD */}
            {seoData?.schemaType && (
                <SeoSchema type={seoData.schemaType} data={seoData} />
            )}

            {/* Extended SEO Content */}
            {contentOverrides[pageKey]?.extendedDescription && (
                <section className="container mx-auto px-4 py-16">
                    <div className="max-w-4xl mx-auto">
                        <MarkdownRenderer content={contentOverrides[pageKey].extendedDescription} />
                    </div>
                </section>
            )}

            {/* Video Section */}
            {seoData?.hasVideo && seoData?.videoUrl && (
                <PageVideo
                    videoUrl={seoData.videoUrl}
                    title="Scopri W[r]Digital"
                />
            )}

            {/* Dynamic FAQ */}
            {seoData?.hasFaq && seoData?.pageFaqs && seoData.pageFaqs.length > 0 && (
                <PageFaq
                    items={seoData.pageFaqs}
                    accentColor={accentColor}
                />
            )}

            {/* Internal Links */}
            {seoData?.hasInternalLinks && seoData?.internalLinks && seoData.internalLinks.length > 0 && (
                <InternalLinks
                    links={seoData.internalLinks}
                    title="Esplora"
                    accentColor={accentColor}
                />
            )}
        </>
    );
}

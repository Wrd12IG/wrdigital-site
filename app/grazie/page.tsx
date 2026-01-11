import { Suspense } from 'react';
import ThankYouPageClient from '@/components/ThankYouPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Grazie - Richiesta Ricevuta | W[r]Digital',
    description: 'Grazie per averci contattato. Prenderemo in carico la tua richiesta al più presto.',
    robots: {
        index: false, // Don't index thank you pages
        follow: false
    }
};

export default function ThankYouPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <ThankYouPageClient />
        </Suspense>
    );
}

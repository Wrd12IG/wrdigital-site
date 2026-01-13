
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { bandi2026 } from '@/data/bandi';
import BandoPageClient from './BandoPageClient';

// 1. Generate Static Params for SSG
export async function generateStaticParams() {
    return bandi2026.map((bando) => ({
        slug: bando.slug,
    }));
}

// 2. SEO Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const bando = bandi2026.find((b) => b.slug === slug);

    if (!bando) return { title: 'Bando non trovato' };

    return {
        title: `${bando.title} | W[r]Digital`,
        description: `Ottieni fino a ${bando.max_amount} a fondo perduto con il ${bando.title}. Scopri come accedere ai fondi per la digitalizzazione.`,
        openGraph: {
            title: `${bando.title} - Fondi 2026`,
            description: bando.description,
        }
    };
}

export default async function BandoPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const bando = bandi2026.find((b) => b.slug === slug);

    if (!bando) {
        notFound();
    }

    return <BandoPageClient bando={bando} />;
}

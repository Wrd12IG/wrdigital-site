'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './FloatingLogos.module.css';

interface Client {
    name: string;
    logo: string;
}

const defaultClients: Client[] = [
    { name: 'FutureTech', logo: '' },
    { name: 'GlobalSystems', logo: '' },
    { name: 'NovaEnergy', logo: '' },
    { name: 'VertexDesign', logo: '' },
    { name: 'AlphaFinance', logo: '' },
    { name: 'TechCorp', logo: '' },
    { name: 'InnovateLab', logo: '' },
    { name: 'DigitalPro', logo: '' },
];

// Color palettes for placeholder icons — cycles based on name hash
const ICON_PALETTES = [
    { bg: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)', border: 'rgba(139, 92, 246, 0.5)', text: '#c4b5fd' },  // violet
    { bg: 'linear-gradient(135deg, #0c1445 0%, #1e40af 100%)', border: 'rgba(59, 130, 246, 0.5)', text: '#93c5fd' },   // blue
    { bg: 'linear-gradient(135deg, #022c22 0%, #065f46 100%)', border: 'rgba(16, 185, 129, 0.5)', text: '#6ee7b7' },   // emerald
    { bg: 'linear-gradient(135deg, #451a03 0%, #92400e 100%)', border: 'rgba(245, 158, 11, 0.5)', text: '#fcd34d' },   // amber
    { bg: 'linear-gradient(135deg, #4a044e 0%, #86198f 100%)', border: 'rgba(217, 70, 239, 0.5)', text: '#f0abfc' },  // fuchsia
    { bg: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)', border: 'rgba(56, 189, 248, 0.5)', text: '#7dd3fc' },  // sky
    { bg: 'linear-gradient(135deg, #1a0a00 0%, #7c2d12 100%)', border: 'rgba(249, 115, 22, 0.5)', text: '#fdba74' },  // orange
    { bg: 'linear-gradient(135deg, #0a0a28 0%, #1a1a5e 100%)', border: 'rgba(99, 102, 241, 0.5)', text: '#a5b4fc' },  // indigo
];

function nameToColorIndex(name: string): number {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = (hash << 5) - hash + name.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash) % ICON_PALETTES.length;
}

// Placeholder icon for clients without logo — unique color per client
const PlaceholderIcon = ({ name }: { name: string }) => {
    const initial = name.charAt(0).toUpperCase();
    const palette = ICON_PALETTES[nameToColorIndex(name)];

    return (
        <div
            className={styles.placeholderIcon}
            style={{
                background: palette.bg,
                border: `1.5px solid ${palette.border}`,
                boxShadow: `0 0 10px ${palette.border}`,
            }}
        >
            <span className={styles.placeholderInitial} style={{ color: palette.text }}>
                {initial}
            </span>
        </div>
    );
};


export default function FloatingLogos({ initialClients }: { initialClients?: Client[] }) {
    const [clients, setClients] = useState<Client[]>(initialClients || defaultClients);

    useEffect(() => {
        if (initialClients) return;

        fetch('/api/admin/clients')
            .then(res => res.ok ? res.json() : defaultClients)
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    const normalized = data.map((item: any) =>
                        typeof item === 'string' ? { name: item, logo: '' } : item
                    );
                    setClients(normalized);
                }
            })
            .catch(() => { });
    }, [initialClients]);

    // Split clients into 3 rows for the marquee effect
    const third = Math.ceil(clients.length / 3);
    const row1 = clients.slice(0, third);
    const row2 = clients.slice(third, third * 2);
    const row3 = clients.slice(third * 2);

    const renderLogoPill = (client: Client, index: number) => (
        <div key={`${client.name}-${index}`} className={styles.logoPill}>
            <div className={styles.logoIconWrapper}>
                {client.logo ? (
                    <div className={styles.logoImageWrapper}>
                        <Image
                            src={client.logo}
                            alt={client.name}
                            width={40}
                            height={40}
                            className={styles.logoImage}
                        />
                    </div>
                ) : (
                    <PlaceholderIcon name={client.name} />
                )}
            </div>
            <span className={styles.logoName}>{client.name}</span>
            <svg
                className={styles.arrowIcon}
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
        </div>
    );

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>
                    HANNO SCELTO <span className={styles.brand}>W<span className={styles.bracket}>[</span>r<span className={styles.bracket}>]</span>Digital</span>
                </h2>

                <div className={styles.marqueeContainer}>
                    {/* Row 1 - scrolls left */}
                    <div className={styles.marqueeRow}>
                        <div className={`${styles.marqueeTrack} ${styles.scrollLeft}`}>
                            {[...row1, ...row1, ...row1].map((client, i) => renderLogoPill(client, i))}
                        </div>
                    </div>

                    {/* Row 2 - scrolls right (opposite direction) */}
                    <div className={styles.marqueeRow}>
                        <div className={`${styles.marqueeTrack} ${styles.scrollRight}`}>
                            {[...row2, ...row2, ...row2].map((client, i) => renderLogoPill(client, i))}
                        </div>
                    </div>

                    {/* Row 3 - scrolls left (slower) */}
                    <div className={styles.marqueeRow}>
                        <div className={`${styles.marqueeTrack} ${styles.scrollLeftSlow}`}>
                            {[...row3, ...row3, ...row3].map((client, i) => renderLogoPill(client, i))}
                        </div>
                    </div>
                </div>

                <p className={styles.subtitle}>
                    Aziende di ogni dimensione ci affidano la loro crescita digitale
                </p>
            </div>
        </section>
    );
}

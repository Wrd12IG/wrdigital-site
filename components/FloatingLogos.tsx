'use client';

import { useState, useEffect } from 'react';
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

// Placeholder icon for clients without logo - uses brand colors
const PlaceholderIcon = ({ name }: { name: string }) => {
    // Get first letter of client name
    const initial = name.charAt(0).toUpperCase();

    return (
        <div className={styles.placeholderIcon}>
            <span className={styles.placeholderInitial}>{initial}</span>
        </div>
    );
};

export default function FloatingLogos() {
    const [clients, setClients] = useState<Client[]>(defaultClients);

    useEffect(() => {
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
    }, []);

    // Split clients into 3 rows for the marquee effect
    const third = Math.ceil(clients.length / 3);
    const row1 = clients.slice(0, third);
    const row2 = clients.slice(third, third * 2);
    const row3 = clients.slice(third * 2);

    const renderLogoPill = (client: Client, index: number) => (
        <div key={`${client.name}-${index}`} className={styles.logoPill}>
            <div className={styles.logoIconWrapper}>
                {client.logo ? (
                    <img
                        src={client.logo}
                        alt={client.name}
                        className={styles.logoImage}
                    />
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

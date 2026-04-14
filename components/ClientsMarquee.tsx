'use client';

import { useState, useEffect } from 'react';
import styles from './ClientsMarquee.module.css';

interface Client {
    name: string;
    logo: string;
}

const defaultClients: Client[] = [
    { name: 'FutureTech', logo: '' },
    { name: 'GlobalSystems', logo: '' },
    { name: 'NovaEnergy', logo: '' },
    { name: 'VertexDesign', logo: '' },
    { name: 'AlphaFinance', logo: '' }
];

export default function ClientsMarquee() {
    const [clients, setClients] = useState<Client[]>(defaultClients);

    useEffect(() => {
        fetch('/api/admin/clients')
            .then(res => res.ok ? res.json() : defaultClients)
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    // Handle both old format (string[]) and new format ({name, logo}[])
                    const normalized = data.map((item: any) =>
                        typeof item === 'string' ? { name: item, logo: '' } : item
                    );
                    setClients(normalized);
                }
            })
            .catch(() => { });
    }, []);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>
                    HANNO SCELTO <span className={styles.brand}>W<span className={styles.bracket}>[</span>r<span className={styles.bracket}>]</span>Digital</span>
                </h2>
                <div className={styles.marqueeWrapper}>
                    <div className={styles.marqueeTrack}>
                        {/* Triplico la lista per un loop infinito fluido */}
                        {[...clients, ...clients, ...clients].map((client, index) => (
                            <div key={`${client.name}-${index}`} className={styles.logoItem}>
                                {client.logo ? (
                                    <img
                                        src={client.logo}
                                        alt={client.name}
                                        className={styles.logoImage}
                                    />
                                ) : (
                                    <span className={styles.logoText}>{client.name}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

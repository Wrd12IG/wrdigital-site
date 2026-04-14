'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './InternalLinks.module.css';

interface InternalLink {
    label: string;
    url: string;
}

interface InternalLinksProps {
    links: InternalLink[];
    title?: string;
    accentColor?: string;
}

export default function InternalLinks({ links, title = "Approfondisci", accentColor = '#FACC15' }: InternalLinksProps) {
    if (!links || links.length === 0) return null;

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    className={styles.box}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ '--accent': accentColor } as any}
                >
                    <h3 className={styles.title}>{title}</h3>
                    <div className={styles.linkGrid}>
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url}
                                className={styles.link}
                            >
                                <span className={styles.arrow}>→</span>
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

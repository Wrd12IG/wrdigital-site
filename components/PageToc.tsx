'use client';

import { motion } from 'framer-motion';
import styles from './PageToc.module.css';
import { List } from 'lucide-react';

interface TocItem {
    id: string;
    label: string;
}

interface PageTocProps {
    items: TocItem[];
    accentColor?: string;
}

export default function PageToc({ items, accentColor = '#FACC15' }: PageTocProps) {
    if (!items || items.length === 0) return null;

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <motion.nav
            className={styles.toc}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ '--accent': accentColor } as any}
        >
            <h4 className={styles.title}><List className="w-4 h-4 inline-block mr-1" /> In questa pagina</h4>
            <ul className={styles.list}>
                {items.map((item, index) => (
                    <li key={index}>
                        <button
                            onClick={() => scrollToSection(item.id)}
                            className={styles.link}
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </motion.nav>
    );
}

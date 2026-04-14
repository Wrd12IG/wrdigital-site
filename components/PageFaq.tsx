'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import styles from './PageFaq.module.css';

interface FaqItem {
    q: string;
    a: string;
}

interface PageFaqProps {
    items: FaqItem[];
    accentColor?: string;
}

export default function PageFaq({ items, accentColor = '#FACC15' }: PageFaqProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    if (!items || items.length === 0) return null;

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <motion.h2
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Domande <span style={{ color: accentColor }}>Frequenti</span>
                </motion.h2>

                <div className={styles.faqList}>
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            className={styles.faqItem}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <button
                                className={`${styles.question} ${openIndex === index ? styles.active : ''}`}
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                style={{ '--accent': accentColor } as any}
                            >
                                <span>{item.q}</span>
                                <span className={styles.icon}>{openIndex === index ? '−' : '+'}</span>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        className={styles.answer}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <p>{item.a}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import styles from './About.module.css';
import { Target, Rocket, Handshake, Zap } from 'lucide-react';

const stats = [
    { value: '50+', label: 'Progetti Completati' },
    { value: '98%', label: 'Clienti Soddisfatti' },
    { value: '5+', label: 'Anni di Esperienza' },
    { value: '10M+', label: 'Utenti Raggiunti' },
];

const values = [
    {
        icon: <Target className="w-8 h-8" />,
        title: 'Data-Driven',
        description: 'Ogni decisione è supportata da dati, non da intuizioni.',
    },
    {
        icon: <Rocket className="w-8 h-8" />,
        title: 'Innovation First',
        description: 'Sperimentiamo costantemente nuove tecnologie e approcci.',
    },
    {
        icon: <Handshake className="w-8 h-8" />,
        title: 'Partnership',
        description: 'Non siamo un fornitore, siamo un partner del tuo successo.',
    },
    {
        icon: <Zap className="w-8 h-8" />,
        title: 'Velocità',
        description: 'Esecuzione rapida senza compromettere la qualità.',
    },
];

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section id="chi-siamo" ref={sectionRef} className={styles.section}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Left Column - Text */}
                    <motion.div
                        className={styles.content}
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span className={styles.label}>Chi Siamo</span>
                        <h2 className={styles.title}>
                            Un team di <span className="text-gradient">appassionati</span> del digitale.
                        </h2>
                        <p className={styles.description}>
                            Siamo WR Digital, una digital agency con sede a Milano che aiuta brand
                            ambiziosi a raggiungere risultati straordinari nel mondo digitale.
                        </p>
                        <p className={styles.description}>
                            Il nostro approccio combina creatività, tecnologia e strategia
                            data-driven per creare esperienze che generano valore reale.
                        </p>

                        {/* Stats */}
                        <div className={styles.stats}>
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    className={styles.stat}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                >
                                    <span className={styles.statValue}>{stat.value}</span>
                                    <span className={styles.statLabel}>{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column - Values */}
                    <motion.div
                        className={styles.values}
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h3 className={styles.valuesTitle}>I nostri valori</h3>
                        <div className={styles.valuesGrid}>
                            {values.map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    className={styles.valueCard}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <span className={styles.valueIcon}>{value.icon}</span>
                                    <h4 className={styles.valueTitle}>{value.title}</h4>
                                    <p className={styles.valueDescription}>{value.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Trust Badges / Logos */}
                <motion.div
                    className={styles.trust}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <p className={styles.trustLabel}>Hanno scelto WR Digital</p>
                    <div className={styles.logos}>
                        <Image
                            src="/client-logos.png"
                            alt="Loghi dei clienti partner di W[r]Digital - Agenzia Digital Marketing Milano"
                            width={800}
                            height={100}
                            className={styles.logosImage}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}


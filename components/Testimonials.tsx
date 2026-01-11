'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Testimonials.module.css';

interface Testimonial {
    id: string;
    quote: string;
    author: string;
    role?: string;
    company: string;
    rating: number;
    result?: string;
    service?: string;
}

const defaultTestimonials: Testimonial[] = [
    {
        id: '1',
        quote: 'WR Digital ha trasformato completamente la nostra presenza online. I risultati hanno superato ogni aspettativa.',
        author: 'Marco Rossi',
        company: 'TechStartup Italia',
        rating: 5,
    },
    {
        id: '2',
        quote: 'Professionalità, creatività e risultati concreti. Il team di WR Digital è diventato un partner strategico indispensabile.',
        author: 'Laura Bianchi',
        company: 'Fashion Brand Milano',
        rating: 5,
    },
    {
        id: '3',
        quote: 'Dal primo giorno hanno capito le nostre esigenze. La nostra crescita organica è stata del 380% in 6 mesi.',
        author: 'Alessandro Verdi',
        company: 'E-commerce Solutions',
        rating: 5,
    },
];

function StarRating({ rating }: { rating: number }) {
    return (
        <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
                <svg
                    key={i}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={i < rating ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
            ))}
        </div>
    );
}

export default function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const [list, setList] = useState<Testimonial[]>([]);
    const [config, setConfig] = useState({ title: 'Cosa dicono i nostri clienti.', subtitle: 'Testimonianze', description: '' });

    useEffect(() => {
        const load = async () => {
            try {
                const [resT, resC] = await Promise.all([
                    fetch('/api/admin/testimonials'),
                    fetch('/api/site-config')
                ]);
                if (resT.ok) {
                    const data = await resT.json();
                    if (data && data.length > 0) setList(data);
                    else setList(defaultTestimonials);
                }
                if (resC.ok) {
                    const siteData = await resC.json();
                    if (siteData.testimonials) setConfig(siteData.testimonials);
                }
            } catch (e) {
                setList(defaultTestimonials);
            }
        };
        load();
    }, []);

    return (
        <section ref={sectionRef} className={styles.section} id="testimonianze">
            <div className={styles.container}>
                {/* Section Header */}
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.label}>{config.subtitle}</span>
                    <h2 className={styles.title}>
                        {config.title.split(' ').map((word, i, arr) => (
                            <span key={i}>
                                {i === arr.length - 1 || i === arr.length - 2 ? (
                                    <span className="text-gradient">{word} </span>
                                ) : (
                                    <>{word} </>
                                )}
                            </span>
                        ))}
                    </h2>

                    {config.description && (
                        <motion.p
                            className={styles.description}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {config.description}
                        </motion.p>
                    )}
                </motion.div>

                {/* Grid Layout */}
                <motion.div
                    className={styles.grid}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >
                    {list.map((testimonial) => (
                        <motion.div
                            key={testimonial.id}
                            className={styles.testimonialCard}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                            }}
                        >
                            {/* Decorative Quote Icon */}
                            <div className={styles.quoteIcon}>
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                            </div>

                            {/* Header: Avatar + Info */}
                            <div className={styles.cardHeader}>
                                <div className={styles.authorAvatar}>
                                    {testimonial.author.charAt(0)}
                                </div>
                                <div className={styles.authorInfo}>
                                    <span className={styles.authorName}>
                                        {testimonial.author}
                                    </span>
                                    <span className={styles.authorRole}>
                                        {testimonial.company}{testimonial.result && (
                                            <span style={{ color: 'var(--color-accent-primary)', marginLeft: '4px', fontWeight: 600 }}>
                                                • {testimonial.result}
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </div>

                            {/* Rating */}
                            <StarRating rating={testimonial.rating || 5} />

                            {/* Quote */}
                            <blockquote className={styles.quote}>
                                "{testimonial.quote}"
                            </blockquote>

                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

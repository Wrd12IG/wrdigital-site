'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useModal } from '@/components/ModalContext';
import PageFaq from '@/components/PageFaq';
import PageVideo from '@/components/PageVideo';
import InternalLinks from '@/components/InternalLinks';
import PageToc from '@/components/PageToc';
import SeoSchema from '@/components/SeoSchema';
import styles from './ServicePage.module.css';
import { servicesData } from '@/data/services';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { Check } from 'lucide-react';
// ============ DYNAMIC HERO ANIMATIONS ============

// SEO: Matrix Code Rain (Yellow)
function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const chars = 'SEOKEYWORDRANKLINKBUILDING01'.split('');
        const fontSize = 12;
        const columns = canvas.width / fontSize;
        const drops: number[] = Array(Math.floor(columns)).fill(1);
        const draw = () => {
            ctx.fillStyle = 'rgba(0,0,0,0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#FACC15';
            ctx.font = fontSize + 'px monospace';
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
        };
        const interval = setInterval(draw, 40);
        return () => clearInterval(interval);
    }, []);
    return <canvas ref={canvasRef} className={styles.heroCanvas} />;
}

// Social: Floating Hearts
function FloatingHearts() {
    // Fixed positions to avoid hydration issues
    const hearts = [
        { x: 10, delay: 0, duration: 5 },
        { x: 25, delay: 0.5, duration: 6 },
        { x: 40, delay: 1, duration: 4.5 },
        { x: 55, delay: 1.5, duration: 5.5 },
        { x: 70, delay: 2, duration: 6.5 },
        { x: 85, delay: 2.5, duration: 5 },
        { x: 15, delay: 3, duration: 7 },
        { x: 45, delay: 3.5, duration: 4 },
        { x: 75, delay: 4, duration: 5.5 },
        { x: 90, delay: 4.5, duration: 6 },
        { x: 30, delay: 5, duration: 5 },
        { x: 60, delay: 5.5, duration: 6 },
    ];

    return (
        <div className={styles.heroCanvas}>
            {hearts.map((heart, i) => (
                <motion.div
                    key={i}
                    className={styles.floatingHeart}
                    style={{
                        left: `${heart.x}%`,
                        color: i === 3 ? '#FACC15' : '#ef4444', // One "random" yellow, others red
                        fontSize: i === 3 ? '2rem' : '1.5rem', // Make the yellow one slightly larger
                        zIndex: i === 3 ? 10 : 1
                    }}
                    initial={{ y: '10vh', opacity: 0 }}
                    animate={{ y: '-110vh', opacity: [0, 1, 1, 0] }}
                    transition={{
                        duration: heart.duration,
                        repeat: Infinity,
                        delay: heart.delay,
                        ease: "linear",
                        opacity: { times: [0, 0.1, 0.9, 1], duration: heart.duration, repeat: Infinity, delay: heart.delay }
                    }}
                >
                    ♥
                </motion.div>
            ))}
        </div>
    );
}

// Web: Speedometer Circle
function SpeedCircle() {
    return (
        <div className={styles.heroCanvas} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="200" height="200" className={styles.speedSvg}>
                <circle cx="100" cy="100" r="90" stroke="#333" strokeWidth="8" fill="none" />
                <motion.circle
                    cx="100" cy="100" r="90"
                    stroke="#FACC15"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="565"
                    strokeDashoffset="565"
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                />
            </svg>
            <motion.div
                className={styles.speedValue}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                100
            </motion.div>
        </div>
    );
}

// Ads: Rising Graph Bars
function AdsBars() {
    return (
        <div className={styles.heroCanvas} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '8px', padding: '40px' }}>
            {[40, 55, 45, 70, 60, 85, 75, 95].map((h, i) => (
                <motion.div
                    key={i}
                    className={styles.adsBar}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                />
            ))}
        </div>
    );
}

// Component map for each service
const HeroAnimations: Record<string, () => React.ReactNode> = {
    seo: MatrixRain,
    social: FloatingHearts,
    web: SpeedCircle,
    ads: AdsBars,
};

// ============ GROWTH GRAPH FOR PROOF SECTION ============
function GrowthGraph() {
    return (
        <div className={styles.growthGraphContainer}>
            <div className={styles.growthGraphLabel}>Crescita Traffico / 12 Mesi</div>
            <svg viewBox="0 0 400 150" className={styles.growthGraphSvg}>
                <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FACC15" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#FACC15" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {[1, 2, 3].map(i => <line key={i} x1="0" y1={i * 40} x2="400" y2={i * 40} stroke="rgba(255,255,255,0.05)" />)}
                <motion.path
                    d="M0,140 C50,130 80,120 120,100 C160,80 200,90 250,50 C300,10 350,20 400,5 L400,150 L0,150 Z"
                    fill="url(#areaGrad)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                />
                <motion.path
                    d="M0,140 C50,130 80,120 120,100 C160,80 200,90 250,50 C300,10 350,20 400,5"
                    fill="none"
                    stroke="#FACC15"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
            </svg>
        </div>
    );
}

// Hook per animazione count-up
function useCountUp(end: number, duration: number = 2000, startOnView: boolean = true) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });
    const hasStarted = useRef(false);

    useEffect(() => {
        if (startOnView && !isInView) return;
        if (hasStarted.current) return;
        hasStarted.current = true;

        let startTime: number;
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [end, duration, isInView, startOnView]);

    return { count, ref };
}

// Componente CountUp per le stats
function AnimatedStat({ value, label }: { value: string; label: string }) {
    const numericMatch = value.match(/([+-]?)(\d+\.?\d*)(.*)/);
    const prefix = numericMatch?.[1] || '';
    const number = parseFloat(numericMatch?.[2] || '0');
    const suffix = numericMatch?.[3] || '';
    const isDecimal = value.includes('.');

    const { count, ref } = useCountUp(isDecimal ? number * 10 : number, 1500);
    const displayValue = isDecimal ? (count / 10).toFixed(1) : count;

    return (
        <motion.div
            ref={ref}
            className={styles.statBox}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            <div className={styles.statValue}>
                {prefix}{displayValue}{suffix}
            </div>
            <div className={styles.statLabel}>{label}</div>
        </motion.div>
    );
}

// FAQ Accordion Item
function FAQItem({ question, answer, isOpen, onClick }: {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}) {
    return (
        <div className={styles.faqItem}>
            <button className={styles.faqQuestion} onClick={onClick}>
                <span>{question}</span>
                <motion.span
                    className={styles.faqIcon}
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    +
                </motion.span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={styles.faqAnswer}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p>{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Dati dei servizi con FAQ e testimonial

interface ServicePageProps {
    initialData?: any;
    slug?: string;
}

export default function ServicePage({ initialData, slug: propSlug }: ServicePageProps) {
    const params = useParams();
    const { openContactModal } = useModal();
    const slug = (propSlug || params?.slug) as string;

    // Use DB data if available, fallback to static file
    const service = initialData || servicesData[slug];

    const [openFAQ, setOpenFAQ] = useState<number | null>(null);
    const [showSticky, setShowSticky] = useState(false);
    const [expandedBenefit, setExpandedBenefit] = useState<number | null>(null);

    // Initialize state with Server Data
    const [seoData, setSeoData] = useState<any>(initialData || null);
    const [contentOverrides, setContentOverrides] = useState<any>(initialData || {});

    // Force scroll to top on mount/slug change
    useEffect(() => {
        // Immediate scroll
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

        // Safety check after a small delay to handle any layout shifts or race conditions
        const timer = setTimeout(() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }, 100);

        return () => clearTimeout(timer);
    }, [slug]);

    // Removed client-side fetches: Data is now passed via initialData from Server Component (Prisma DB)


    // Sticky CTA on scroll
    useEffect(() => {
        const handleScroll = () => {
            setShowSticky(window.scrollY > 600);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!servicesData[slug]) {
            // Gestione 404
        }
    }, [slug]);

    if (!service) return <div className={styles.notFound}>Servizio non trovato. <a href="/">Torna alla Home</a></div>;

    return (
        <div className={styles.pageContainer}>
            {/* Background Elements */}
            <div className={styles.bgGradient} />

            {/* Dynamic Hero Animation or Override Image */}
            {seoData?.hero_image_url ? (
                <div className={styles.heroAnimationWrapper}>
                    <Image
                        src={seoData.hero_image_url}
                        alt={seoData.alt_hero || service.title}
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                </div>
            ) : (
                HeroAnimations[slug] && (
                    <div className={styles.heroAnimationWrapper}>
                        {HeroAnimations[slug]()}
                    </div>
                )
            )}

            <main className={styles.main}>
                {/* Schema.org Injection */}
                {seoData?.schemaType && (
                    <SeoSchema type={seoData.schemaType} data={seoData} />
                )}

                {/* Hero Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={styles.header}
                >
                    <span className={styles.label}>{service.title}</span>
                    <h1 className={styles.title}>{seoData?.h1 || service.uvpTitle}</h1>
                    <h2 className={styles.subtitle}>{seoData?.h2_intro || service.uvpSubtitle}</h2>
                    <p className={styles.socialProof}>
                        <span className={styles.greenDot} />
                        Già scelti da <strong>{service.clientCount}+ aziende</strong> italiane nel 2025
                    </p>
                </motion.div>

                {/* Table of Contents (if enabled) */}
                {seoData?.hasToc && (
                    <PageToc
                        items={seoData.tocItems || []}
                        accentColor={service.title === 'SEO & Content' ? '#FACC15' : service.title === 'Social Media' ? '#EC4899' : service.title === 'Advertising' ? '#22C55E' : '#00D4FF'}
                    />
                )}

                {/* Main Content Grid */}
                {/* Main Content: Description Centered */}
                {/* Main Content Grid - REVERTED */}
                <div className={styles.contentGrid}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className={styles.descriptionCol}
                    >
                        {/* Animated Stats */}
                        <div id="stats" className={styles.statsRow}>
                            {service.stats.map((stat: any, i: number) => (
                                <AnimatedStat key={i} value={stat.value} label={stat.label} />
                            ))}
                        </div>

                        <p className={styles.description}>{service.description}</p>

                        <div className={styles.actions}>
                            <button onClick={openContactModal} className={styles.ctaPrimary}>
                                {service.ctaText}
                            </button>
                            <p className={styles.microCopy}>
                                <span className={styles.checkIcon}><Check className="w-4 h-4 text-green-400" /></span> Risposta in 4 ore lavorative. Nessun vincolo.
                            </p>
                        </div>

                        {/* Trust Panel */}
                        <motion.div
                            className={styles.trustPanel}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            <h4 className={styles.trustTitle}>
                                <span className="w-1.5 h-6 bg-blue-400 rounded-full mr-2 inline-block"></span>
                                Certificazioni & Garanzie
                            </h4>

                            {/* Trust Metrics Grid */}
                            <div className={styles.trustMetrics}>
                                <motion.div
                                    className={styles.trustMetric}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <div className={styles.trustMetricIcon}>
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#60a5fa" stroke="#93c5fd" strokeWidth="1.5" />
                                        </svg>
                                    </div>
                                    <div className={styles.trustMetricValue}>8+</div>
                                    <div className={styles.trustMetricLabel}>Anni Esperienza</div>
                                </motion.div>

                                <motion.div
                                    className={styles.trustMetric}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <div className={styles.trustMetricIcon}>
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 11L12 14L22 4" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className={styles.trustMetricValue}>200+</div>
                                    <div className={styles.trustMetricLabel}>Progetti</div>
                                </motion.div>

                                <motion.div
                                    className={styles.trustMetric}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <div className={styles.trustMetricIcon}>
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className={styles.trustMetricValue}>150+</div>
                                    <div className={styles.trustMetricLabel}>Clienti Attivi</div>
                                </motion.div>

                                <motion.div
                                    className={styles.trustMetric}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <div className={styles.trustMetricIcon}>
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M22 4L12 14.01L9 11.01" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className={styles.trustMetricValue}>4.9/5</div>
                                    <div className={styles.trustMetricLabel}>Rating Medio</div>
                                </motion.div>
                            </div>

                            {/* Google Certifications */}
                            <div className={styles.certificationSection}>
                                <h5 className={styles.certificationTitle}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline mr-2">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FACC15" strokeWidth="2" />
                                        <path d="M12 16V12" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M12 8H12.01" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    Certificazioni Google
                                </h5>
                                <div className={styles.certificationList}>
                                    <a
                                        href="https://skillshop.credential.net/f7a3bf03-5826-47ad-88cd-2b826ab7973b"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.certificationBadge}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="#22c55e" strokeWidth="2" />
                                            <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className={styles.certificationInfo}>
                                            <span className={styles.certificationName}>Google Ads Search</span>
                                            <span className={styles.certificationVerify}>Verifica →</span>
                                        </div>
                                    </a>

                                    <a
                                        href="https://skillshop.credential.net/f158f936-c9d1-4436-b62d-e459107a0c48"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.certificationBadge}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="#22c55e" strokeWidth="2" />
                                            <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className={styles.certificationInfo}>
                                            <span className={styles.certificationName}>Google Ads Display</span>
                                            <span className={styles.certificationVerify}>Verifica →</span>
                                        </div>
                                    </a>

                                    <a
                                        href="https://skillshop.credential.net/0af9a151-c95e-40d3-950c-661af4f03a5e"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.certificationBadge}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="#22c55e" strokeWidth="2" />
                                            <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className={styles.certificationInfo}>
                                            <span className={styles.certificationName}>Google Analytics</span>
                                            <span className={styles.certificationVerify}>Verifica →</span>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className={styles.trustBadges}>
                                <div className={styles.trustBadge}>
                                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                                    <span>Meta Business Partner</span>
                                </div>
                                <div className={styles.trustBadge}>
                                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                                    <span>ISO 9001 Qualità</span>
                                </div>
                                <div className={styles.trustBadge}>
                                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                                    <span>GDPR Compliant</span>
                                </div>
                            </div>

                            {/* Security Features */}
                            <div className={styles.trustSecurity}>
                                <div className={styles.securityItem}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.securityIcon}>
                                        <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className={styles.securityText}>Pagamenti Sicuri SSL</span>
                                </div>
                                <div className={styles.securityItem}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.securityIcon}>
                                        <path d="M3 3V21H21" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M18 17L13 12L9 16L3 10" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className={styles.securityText}>Report Trasparenti</span>
                                </div>
                                <div className={styles.securityItem}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.securityIcon}>
                                        <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className={styles.securityText}>Supporto Dedicato 24/7</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className={styles.benefitsCol}
                    >
                        <h3 id="benefits" className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                            <span className="w-2 h-8 bg-yellow-400 rounded-full mr-2"></span>
                            Power Features
                        </h3>

                        {/* STACKED FEATURES LAYOUT (Vertical Bento) */}
                        <div className="flex flex-col gap-4">
                            {(service.features || service.benefits || []).map((benefit: any, i: number) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * i }}
                                    className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-default relative overflow-hidden"
                                >
                                    <div className="relative z-10 flex gap-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                                                <Check className="w-4 h-4 text-green-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-base text-white mb-1 group-hover:text-yellow-400 transition-colors">
                                                {benefit.title}
                                            </h4>
                                            <p className="text-sm text-gray-400 leading-relaxed">
                                                {benefit.description}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Subtle Gradient Background on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                </motion.div>
                            ))}
                        </div>

                        {/* Urgency Banner */}
                        <div className="mt-6 p-4 rounded-xl bg-purple-900/20 border border-purple-500/30 flex items-center gap-3">
                            <span className="relative flex h-2 w-2 flex-shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                            </span>
                            <p className="text-xs text-purple-200 font-medium">
                                Solo 2 slot disponibili per onboarding prioritario.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Testimonial Section */}
                <motion.section
                    id="testimonials"
                    className={styles.testimonialSection}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className={styles.testimonialsGrid}>
                        {service.testimonials.map((testimonial: any, i: number) => (
                            <motion.div
                                key={i}
                                className={styles.testimonialCard}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className={styles.quoteIconSmall}>"</div>
                                <blockquote className={styles.testimonialQuoteSmall}>
                                    {testimonial.quote}
                                </blockquote>
                                <div className={styles.testimonialAuthorSmall}>
                                    <div className={styles.authorAvatarSmall}>
                                        {testimonial.author.charAt(0)}
                                    </div>
                                    <div className={styles.authorInfoSmall}>
                                        <strong>{testimonial.author}</strong>
                                        <span>{testimonial.company}</span>
                                    </div>
                                </div>
                                <div className={styles.testimonialResultSmall}>
                                    {testimonial.result}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Growth Graph - Visual Proof */}
                    <GrowthGraph />
                </motion.section>

                {/* SEO EXTENDED CONTENT (Dynamic) */}
                {contentOverrides && contentOverrides[slug]?.extendedDescription && (
                    <motion.section
                        className="w-full max-w-7xl mx-auto px-4 py-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold mb-8 text-white">Approfondimento Editoriale</h2>
                            <MarkdownRenderer content={contentOverrides[slug].extendedDescription} />
                        </div>
                    </motion.section>
                )}

                {/* Comparison Table */}
                <motion.section
                    id="comparison"
                    className={styles.comparisonSection}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className={styles.sectionTitle}>Perché scegliere W[r]Digital?</h2>
                    <div className={styles.comparisonTable}>
                        <div className={styles.tableHeader}>
                            <div className={styles.tableCell}></div>
                            <div className={styles.tableCell}>Fai da te</div>
                            <div className={styles.tableCell}>Agenzia Generica</div>
                            <div className={`${styles.tableCell} ${styles.highlight}`}>W[r]Digital</div>
                        </div>
                        {service.comparison.map((row: any, i: number) => (
                            <div key={i} className={styles.tableRow}>
                                <div className={styles.tableCell}>{row.feature}</div>
                                <div className={styles.tableCell}>{row.diy}</div>
                                <div className={styles.tableCell}>{row.agency}</div>
                                <div className={`${styles.tableCell} ${styles.highlight}`}>{row.wrdigital}</div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* FAQ Section */}
                <motion.section
                    id="faq"
                    className={styles.faqSection}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className={styles.sectionTitle}>Domande Frequenti</h2>
                    <div className={styles.faqList}>
                        {service.faq.map((item: any, i: number) => (
                            <FAQItem
                                key={i}
                                question={item.question}
                                answer={item.answer}
                                isOpen={openFAQ === i}
                                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                            />
                        ))}
                    </div>
                </motion.section>

                {/* ========== DYNAMIC SEO CONTENT FROM ADMIN ========== */}

                {/* Video Section (if configured in admin) */}
                {seoData?.hasVideo && seoData?.videoUrl && (
                    <PageVideo
                        videoUrl={seoData.videoUrl}
                        title="Scopri come lavoriamo"
                    />
                )}

                {/* Dynamic FAQ from Admin (replaces or supplements static FAQ) */}
                {seoData?.hasFaq && seoData?.pageFaqs && seoData.pageFaqs.length > 0 && (
                    <PageFaq
                        items={seoData.pageFaqs}
                        accentColor={service.title === 'SEO & Content' ? '#FACC15' : service.title === 'Social Media' ? '#EC4899' : service.title === 'Advertising' ? '#22C55E' : '#00D4FF'}
                    />
                )}

                {/* Strategic Pillar Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        margin: '4rem auto',
                        maxWidth: '800px',
                        textAlign: 'center',
                        padding: '2rem',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '1rem',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}
                >
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#e5e7eb' }}>Approfondimento Strategico</h3>
                    <p style={{ marginBottom: '1.5rem', color: '#9ca3af' }}>
                        Il nostro approccio alla {service.title} non è casuale. Si basa sui protocolli che abbiamo documentato nella nostra <Link href="/agenzia-marketing-digitale" className="text-yellow-400 font-semibold hover:underline">Pillar Page: Strategie Digitali [r]eali</Link>. Se vuoi approfondire la teoria dietro i nostri risultati, puoi consultare la sezione dedicata.
                    </p>
                    <Link href="/agenzia-marketing-digitale" className="text-yellow-400 hover:text-yellow-300 font-semibold underline underline-offset-4">
                        Leggi la Guida Strategica
                    </Link>
                </motion.div>

                {/* Internal Links for SEO Siloing */}
                {seoData?.hasInternalLinks && seoData?.internalLinks && seoData.internalLinks.length > 0 && (
                    <InternalLinks
                        links={seoData.internalLinks}
                        title="Esplora i nostri servizi"
                        accentColor={service.title === 'SEO & Content' ? '#FACC15' : service.title === 'Social Media' ? '#EC4899' : service.title === 'Advertising' ? '#22C55E' : '#00D4FF'}
                    />
                )}

                {/* Final CTA */}
                <motion.section
                    className={styles.finalCta}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Pronto a dominare {service.title}?</h2>
                    <p>Richiedi una consulenza gratuita e scopri come possiamo far crescere il tuo business.</p>
                    <button onClick={openContactModal} className={styles.ctaPrimary}>
                        {service.ctaText}
                    </button>
                </motion.section>
            </main>

            {/* Sticky CTA */}
            <AnimatePresence>
                {showSticky && (
                    <motion.div
                        className={styles.stickyCta}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <span className={styles.stickyText}>{service.uvpTitle.split(':')[0]}</span>
                        <button onClick={openContactModal} className={styles.stickyButton}>
                            {service.ctaText}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

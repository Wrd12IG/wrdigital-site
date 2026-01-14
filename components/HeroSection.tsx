'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useModal } from './ModalContext';
import styles from './HeroSection.module.css';

// Dynamic import for Three.js to avoid SSR issues
const ThreeScene = dynamic(() => import('./ThreeScene'), {
    ssr: false,
    loading: () => null
});

const services = [
    { id: 'seo', title: 'SEO', description: 'Fatti trovare quando conta davvero.' },
    { id: 'social', title: 'Social Media', description: 'Costruiamo community, non solo follower.' },
    { id: 'web', title: 'Web Design', description: 'Il tuo ufficio digitale aperto 24/7.' },
    { id: 'ads', title: 'Advertising', description: 'Campagne ROI-Positive che scalano.' },
];

interface Stats {
    traffic: string;
    roi: string;
}

// Floating chart widget component with live animations
function FloatingChart({ stats }: { stats: Stats }) {
    const [isPulsing, setIsPulsing] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsPulsing(prev => !prev);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className={styles.floatingChart}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 60px rgba(250, 204, 21, 0.3)" }}
        >
            <div className={styles.chartHeader}>
                <div className="flex items-center gap-2">
                    <motion.div
                        className="w-2 h-2 rounded-full bg-green-400"
                        animate={{ scale: isPulsing ? [1, 1.3, 1] : 1 }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span className={styles.chartTitle}>Live Analytics</span>
                </div>
                <button className={styles.chartClose}>×</button>
            </div>
            <div className={styles.chartBody}>
                <svg viewBox="0 0 200 100" className={styles.chartSvg}>
                    <defs>
                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#FACC15" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#FACC15" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#FACC15" />
                            <stop offset="100%" stopColor="#CA8A04" />
                        </linearGradient>
                    </defs>
                    <motion.path
                        d="M0,80 Q30,70 50,60 T100,45 T150,25 T200,15 L200,100 L0,100 Z"
                        fill="url(#chartGradient)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.5 }}
                    />
                    <motion.path
                        d="M0,80 Q30,70 50,60 T100,45 T150,25 T200,15"
                        fill="none"
                        stroke="url(#lineGradient)"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 1.2 }}
                    />
                    {[
                        { x: 0, y: 80 }, { x: 50, y: 60 }, { x: 100, y: 45 }, { x: 150, y: 25 }, { x: 200, y: 15 },
                    ].map((point, i) => (
                        <motion.circle
                            key={i} cx={point.x} cy={point.y} r="4" fill="#FACC15"
                            initial={{ scale: 0 }}
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [1, 0.8, 1]
                            }}
                            transition={{
                                duration: 2,
                                delay: 1.5 + i * 0.1,
                                repeat: Infinity,
                                repeatDelay: 1
                            }}
                        />
                    ))}
                </svg>
                <div className={styles.chartStats}>
                    <motion.div
                        className={styles.chartStat}
                        whileHover={{ scale: 1.05 }}
                    >
                        <motion.span
                            className={styles.chartStatValue}
                            style={{ color: '#FACC15' }}
                            animate={{ opacity: [1, 0.7, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            {stats.traffic}
                        </motion.span>
                        <span className={styles.chartStatLabel}>Traffic</span>
                    </motion.div>
                    <motion.div
                        className={styles.chartStat}
                        whileHover={{ scale: 1.05 }}
                    >
                        <motion.span
                            className={styles.chartStatValue}
                            style={{ color: '#FACC15' }}
                            animate={{ opacity: [1, 0.7, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        >
                            {stats.roi}
                        </motion.span>
                        <span className={styles.chartStatLabel}>ROI</span>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

// Decorative cursor icon
function CursorIcon() {
    return (
        <motion.div
            className={styles.cursorIcon}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
        >
            <svg viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="28" stroke="white" strokeWidth="2" opacity="0.3" />
                <circle cx="30" cy="30" r="20" stroke="white" strokeWidth="2" opacity="0.5" />
                <motion.path d="M30 10 L30 50 M10 30 L50 30" stroke="white" strokeWidth="2" opacity="0.5" />
                <motion.path d="M25 35 L35 35 L35 45 L30 50 L25 45 Z" fill="#FACC15" initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 1.8 }} />
                <motion.circle cx="30" cy="30" r="5" fill="white" initial={{ scale: 0 }} animate={{ scale: [0, 1.5, 1] }} transition={{ duration: 0.6, delay: 2 }} />
            </svg>
        </motion.div>
    );
}

// Main Component
interface HeroSectionProps {
    timestamp?: number;
    customTitle?: string;
    customSubtitle?: string;
    customDescription?: string;
    customAlt?: string;
}

export default function HeroSection({ timestamp, customTitle, customSubtitle, customDescription, customAlt }: HeroSectionProps) {
    const { openContactModal } = useModal();
    const router = useRouter();
    const timeParam = timestamp ? `?t=${timestamp}` : '';
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    // Mobile detection for lighter background
    const [isMobile, setIsMobile] = useState(true); // Default true to prevent flash

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    // Configuration State
    const [config, setConfig] = useState<any>({
        title: "W[r]Digital",
        subtitle: "Trasformiamo la tua presenza online in un generatore di profitti.",
        description: "Non vendiamo fumo, ma strategie scalabili. Dalla SEO al Web Design, portiamo il tuo brand dove i tuoi clienti lo stanno già cercando.",
        stats: { traffic: "+380%", roi: "2.5x" },
        backgroundType: 'image',
        backgroundColor: '#000000',
        useGradient: false,
        gradientColor: '#333333',
        backgroundImage: ''
    });
    const [overrideConfig, setOverrideConfig] = useState<any>(null);

    // [r]adicale Conversion Script Logic
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const urlParams = new URLSearchParams(window.location.search);
        const referrer = document.referrer ? document.referrer.toLowerCase() : '';

        const dynamicContent = {
            seo: {
                title: "L'Agenzia SEO che domina il posizionamento [r]adicale.",
                subtitle: "Non scalare solo le classifiche, scala il tuo fatturato con dati certi.",
                description: "Strategie SEO data-driven che trasformano il traffico in clienti paganti."
            },
            web: {
                title: "Web Design High-End per Brand che vogliono distinguersi.",
                subtitle: "Siti ultra-veloci, headless e progettati per la conversione pura.",
                description: "Design pixel-perfect e architetture moderne per un'esperienza utente indimenticabile."
            }
        };

        // Logic Priority: UTM > Referrer
        if (urlParams.get('utm_campaign')?.includes('seo') || urlParams.get('utm_term')?.includes('seo')) {
            setOverrideConfig(dynamicContent.seo);
        } else if (urlParams.get('utm_campaign')?.includes('web') || urlParams.get('utm_term')?.includes('web')) {
            setOverrideConfig(dynamicContent.web);
        } else if (referrer.includes('google.it') || referrer.includes('google.com')) {
            // Organic Google Traffic defaults to SEO Value Proposition
            setOverrideConfig(dynamicContent.seo);
        }
    }, []);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await fetch('/api/site-config');
                if (res.ok) {
                    const data = await res.json();
                    if (data.hero) setConfig(data.hero);
                }
            } catch (e) {
                console.error("Config fetch error", e);
            }
        };
        fetchConfig();
    }, []);

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Override logic (Custom > Override > Config)
    const displayTitle = customTitle || overrideConfig?.title || config.title;
    const displaySubtitle = customSubtitle || overrideConfig?.subtitle || config.subtitle;
    const displayDescription = customDescription || overrideConfig?.description || config.description;

    // Parse Title for bracket styling (W[r]Digital)
    const renderTitle = () => {
        if (displayTitle.includes('[r]')) {
            const parts = displayTitle.split('[r]');
            return <>{parts[0]}<span className={styles.titleLine}><span className={styles.titleBracket}>[</span><span className={styles.titleR}>r</span><span className={styles.titleBracket}>]</span></span>{parts[1]}</>;
        }

        if (displayTitle === "W[r]Digital") {
            return <span className={styles.titleLine}>W<span className={styles.titleBracket}>[</span><span className={styles.titleR}>r</span><span className={styles.titleBracket}>]</span>Digital</span>;
        }

        return <span className={styles.titleLine}>{displayTitle}</span>;
    };

    // Background styling based on config
    const bgType = config.backgroundType || 'image';
    const bgColor = config.backgroundColor || '#000000';
    const useGradient = config.useGradient || false;
    const gradColor = config.gradientColor || '#333333';
    const gradAngle = config.gradientAngle || 135;

    const heroStyles: any = {};
    if (bgType === 'color') {
        if (useGradient) {
            heroStyles.background = `linear-gradient(${gradAngle}deg, ${bgColor} 0%, ${gradColor} 100%)`;
        } else {
            heroStyles.background = bgColor; // This sets solid color AND clears any default image/gradient
        }
    }

    return (
        <section ref={containerRef} className={styles.hero} style={heroStyles}>
            {/* Mobile: Premium gradient background instead of heavy image */}
            {isMobile && bgType === 'image' && (
                <div
                    className={styles.background}
                    style={{
                        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                >
                    <div className={styles.overlay} />
                    {/* Decorative gradient orbs for mobile */}
                    <div style={{
                        position: 'absolute',
                        top: '10%',
                        right: '10%',
                        width: '300px',
                        height: '300px',
                        background: 'radial-gradient(circle, rgba(245, 223, 74, 0.15) 0%, transparent 70%)',
                        borderRadius: '50%',
                        filter: 'blur(40px)',
                    }} />
                    <div style={{
                        position: 'absolute',
                        bottom: '20%',
                        left: '5%',
                        width: '200px',
                        height: '200px',
                        background: 'radial-gradient(circle, rgba(212, 192, 58, 0.1) 0%, transparent 70%)',
                        borderRadius: '50%',
                        filter: 'blur(30px)',
                    }} />
                </div>
            )}

            {/* Desktop: Full Background Image with parallax */}
            {!isMobile && bgType === 'image' && (
                <motion.div className={styles.background} style={{ y: backgroundY }}>
                    <Image
                        src={config.backgroundImage || `/api/hero-image${timeParam}`}
                        alt={customAlt || config.backgroundImageAlt || "Agenzia Digital Marketing Milano"}
                        fill
                        priority
                        quality={90}
                        sizes="100vw"
                        unoptimized
                        className={styles.backgroundImage}
                    />
                    <div className={styles.overlay} />
                    <ThreeScene />
                </motion.div>
            )}

            {/* If Type is Color, we still might want the ThreeScene or a subtle overlay */}
            {bgType === 'color' && (
                <div className={styles.background} style={{ opacity: 0.4, pointerEvents: 'none' }}>
                    {!isMobile && <ThreeScene />}
                </div>
            )}

            {/* Content */}
            <div className={styles.content}>
                <motion.div className={styles.textContainer} style={{ y: textY, opacity }}>
                    {/* Main Title */}
                    <motion.h1 id="main-h1" className={styles.title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
                        {renderTitle()}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.h2
                        id="main-sub"
                        className={styles.subtitle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        style={{ textTransform: 'none', letterSpacing: 'normal', fontSize: '1.5rem', fontWeight: 600, marginTop: '1rem', color: '#fff' }}
                    >
                        {displaySubtitle}
                    </motion.h2>



                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.25 }}
                        style={{ maxWidth: '600px', margin: '1rem auto 0', color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}
                    >
                        {displayDescription}
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}
                    >
                        <button className="btn btn-primary" onClick={openContactModal} data-cursor="Start" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                            Inizia la tua scalata
                        </button>
                    </motion.div>
                </motion.div>

                <FloatingChart stats={config.stats} />
                <CursorIcon />

                {/* Services Bento Grid (Static for now, could be dynamic too) */}
                <motion.div className={styles.servicesGrid} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}>
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            className={styles.serviceCard}
                            data-cursor="Scopri"
                            whileHover={{ scale: 1.02, y: -5 }}
                            transition={{ duration: 0.3 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ animationDelay: `${1 + index * 0.1}s` }}
                            onClick={() => router.push(`/servizi/${service.id}`)}
                        >
                            <h3 className={styles.serviceTitle}>{service.title}</h3>
                            <p className={styles.serviceDescription}>{service.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}

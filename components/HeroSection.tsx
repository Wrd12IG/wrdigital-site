'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useModal } from './ModalContext';
import styles from './HeroSection.module.css';

// Animated counter hook
function useAnimatedCounter(target: number, duration = 1800, delay = 1200) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStarted(true);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        let start = 0;
        const step = Math.ceil(target / (duration / 16));
        const interval = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(interval);
            } else {
                setCount(start);
            }
        }, 16);
        return () => clearInterval(interval);
    }, [started, target, duration]);

    return count;
}

// Removed ThreeScene import - no more 3D for performance

const services = [
    { id: 'seo', title: 'SEO', description: 'Fatti trovare quando conta davvero.' },
    { id: 'social', title: 'Social Media', description: 'Costruiamo community, non solo follower.' },
    { id: 'web', title: 'Web Design', description: 'Il tuo ufficio digitale aperto 24/7.' },
    { id: 'ads', title: 'Advertising', description: 'Campagne ROI-Positive che scalano.' },
];

// Main Component
interface HeroSectionProps {
    timestamp?: number;
    customTitle?: string;
    customSubtitle?: string;
    customDescription?: string;
    customAlt?: string;
    initialConfig?: any;
}

export default function HeroSection({ timestamp, customTitle, customSubtitle, customDescription, customAlt, initialConfig }: HeroSectionProps) {
    const { openContactModal } = useModal();
    const router = useRouter();
    const timeParam = timestamp ? `?t=${timestamp}` : '';
    const containerRef = useRef<HTMLDivElement>(null);

    // Mobile detection for lighter background
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    // ✨ Aurora gradient: track mouse position as CSS custom props
    useEffect(() => {
        const hero = containerRef.current;
        if (!hero) return;
        const handleMouseMove = (e: MouseEvent) => {
            const rect = hero.getBoundingClientRect();
            const mx = ((e.clientX - rect.left) / rect.width) * 100;
            const my = ((e.clientY - rect.top) / rect.height) * 100;
            hero.style.setProperty('--mx', `${mx}%`);
            hero.style.setProperty('--my', `${my}%`);
        };
        hero.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => hero.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Configuration State
    const [config, setConfig] = useState<any>(initialConfig || {
        title: "W[r]Digital",
        subtitle: "Agenzia Digital Marketing a Milano e Monza Brianza\nTrasformiamo la tua presenza online in un generatore di profitti.",
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
        if (initialConfig) return;
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

    // Removed useTransform calls - no more Framer Motion animations

    // Override logic (Custom > Override > Config)
    const displayTitle = customTitle || overrideConfig?.title || config.title;
    const displaySubtitle = customSubtitle || overrideConfig?.subtitle || config.subtitle;
    const displayDescription = customDescription || overrideConfig?.description || config.description;

    // Parse Title for bracket styling (W[r]Digital)
    const renderTitle = () => {
        if (displayTitle.includes('[r]')) {
            const parts = displayTitle.split('[r]');
            // Wrap the [r] symbol and the following characters in a no-wrap span to prevent word-splitting
            const afterText = parts[1] || '';
            const firstWordMatch = afterText.match(/^\S+/);
            const firstWordPart = firstWordMatch ? firstWordMatch[0] : '';
            const restOfAfterText = afterText.substring(firstWordPart.length);

            return (
                <>
                    {parts[0]}
                    <span style={{ whiteSpace: 'nowrap', display: 'inline-block' }}>
                        <span className={styles.titleLine}>
                            <span className={styles.titleBracket}>[</span>
                            <span className={styles.titleR}>r</span>
                            <span className={styles.titleBracket}>]</span>
                        </span>
                        {firstWordPart}
                    </span>
                    {restOfAfterText}
                </>
            );
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

    const trafficCount = useAnimatedCounter(380, 1600, 1300);
    const roiCount = useAnimatedCounter(250, 1400, 1500);
    const [barWidth, setBarWidth] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setBarWidth(78), 1800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section ref={containerRef} className={styles.hero} style={heroStyles}>
            {/* Background Image (Mobile & Desktop) */}
            {bgType === 'image' && (
                <div className={styles.background}>
                    <Image
                        src={config.backgroundImage || `/hero-custom.webp`}
                        alt={customAlt || config.backgroundImageAlt || "Agenzia Digital Marketing Milano e Monza Brianza"}
                        fill
                        priority
                        fetchPriority="high"
                        loading="eager"
                        quality={60}
                        sizes="100vw"
                        className={styles.backgroundImage}
                        style={{ objectFit: 'cover' }}
                    />
                    <div className={styles.overlay} />
                </div>
            )}

            {/* If Type is Color, simple overlay */}
            {bgType === 'color' && (
                <div className={styles.background} style={{ opacity: 0.4, pointerEvents: 'none' }} />
            )}

            {/* ✨ Floating Stats Widget (desktop only) */}
            <div className={styles.floatingStats}>
                <div className={styles.statsHeader}>
                    <div className={styles.statsHeaderDot} />
                    <span className={styles.statsHeaderLabel}>Risultati Reali</span>
                </div>
                <div className={styles.statsRow}>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>+{trafficCount}%</div>
                        <div className={styles.statLabel}>Traffico Organico</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>{(roiCount / 100).toFixed(1)}x</div>
                        <div className={styles.statLabel}>ROI Medio</div>
                    </div>
                </div>
                <div className={styles.statsBarWrapper}>
                    <div className={styles.statsBarLabel}>
                        <span>Performance Score</span>
                        <span>{barWidth}%</span>
                    </div>
                    <div className={styles.statsBar}>
                        <div
                            className={styles.statsBarFill}
                            style={{ width: `${barWidth}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className={styles.content}>
                <div className={styles.textContainer}>
                {/* Main Title — brutalista stack */}
                    <div className={styles.titleStack}>
                        {/* Ghost outline layer (aria-hidden, purely decorative) */}
                        <span className={styles.titleOutline} aria-hidden="true">
                            {displayTitle.replace('[r]', '[r]')}
                        </span>
                        <h1 id="main-h1" className={`${styles.title} ${styles.animTitle}`}>
                            {renderTitle()}
                        </h1>
                    </div>

                    {/* Subtitle */}
                    <h2
                        id="main-sub"
                        className={`${styles.subtitle} ${styles.animSubtitle}`}
                        style={{ textTransform: 'none', letterSpacing: 'normal', fontSize: '1.5rem', fontWeight: 600, marginTop: '1rem', color: '#fff', whiteSpace: 'pre-line' }}
                    >
                        {displaySubtitle}
                    </h2>

                    {/* Description */}
                    <p className={styles.animDesc} style={{ maxWidth: '700px', margin: '1rem auto 0', color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                        Non vendiamo fumo, ma strategie scalabili. Come <strong>top rated digital marketing consultants</strong> e <strong>professional website designers</strong>, uniamo la <Link href="/servizi/seo" className="text-yellow-400 hover:underline">SEO</Link> al <Link href="/servizi/realizzazione-siti-web" className="text-yellow-400 hover:underline">Web Design</Link> per far crescere le e-commerce e le piccole imprese a Nova Milanese e in tutta la Brianza.
                    </p>

                    {/* CTA Button */}
                    <div className={styles.animCta} style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
                        <button className="btn btn-primary" onClick={openContactModal} data-cursor="Start" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                            Inizia la tua scalata
                        </button>
                    </div>
                </div>

                {/* Services Bento Grid */}
                <div className={`${styles.servicesGrid} ${styles.animGrid}`}>
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className={styles.serviceCard}
                            data-cursor="Scopri"
                            onClick={() => router.push(`/servizi/${service.id}`)}
                        >
                            <h3 className={styles.serviceTitle}>{service.title}</h3>
                            <p className={styles.serviceDescription}>{service.description}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

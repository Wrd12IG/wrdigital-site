'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useModal } from './ModalContext';
import styles from './HeroSection.module.css';

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
    const [isMobile, setIsMobile] = useState(true); // Default true to prevent flash

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    // Configuration State
    const [config, setConfig] = useState<any>(initialConfig || {
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
            {/* Background Image (Mobile & Desktop) */}
            {bgType === 'image' && (
                <div className={styles.background}>
                    <Image
                        src={config.backgroundImage || `/hero-custom.jpg`}
                        alt={customAlt || config.backgroundImageAlt || "Agenzia Digital Marketing Milano"}
                        fill
                        priority
                        fetchPriority="high"
                        loading="eager"
                        quality={60}
                        sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1280px"
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

            {/* Content - Simplified without heavy animations */}
            <div className={styles.content}>
                <div className={styles.textContainer}>
                    {/* Main Title */}
                    <h1 id="main-h1" className={styles.title}>
                        {renderTitle()}
                    </h1>

                    {/* Subtitle */}
                    <h2
                        id="main-sub"
                        className={styles.subtitle}
                        style={{ textTransform: 'none', letterSpacing: 'normal', fontSize: '1.5rem', fontWeight: 600, marginTop: '1rem', color: '#fff' }}
                    >
                        {displaySubtitle}
                    </h2>

                    {/* Description */}
                    <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                        Non vendiamo fumo, ma strategie scalabili. Dalla <Link href="/servizi/seo" className="text-yellow-400 hover:underline">SEO</Link> al <Link href="/servizi/realizzazione-siti-web" className="text-yellow-400 hover:underline">Web Design</Link>, portiamo il tuo brand dove i tuoi clienti lo stanno già cercando.
                    </p>

                    {/* CTA Button */}
                    <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
                        <button className="btn btn-primary" onClick={openContactModal} data-cursor="Start" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                            Inizia la tua scalata
                        </button>
                    </div>
                </div>

                {/* Removed FloatingChart and CursorIcon for performance */}

                {/* Services Bento Grid - Static, no animations */}
                <div className={styles.servicesGrid}>
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

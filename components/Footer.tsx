'use client';

import { usePathname } from 'next/navigation';
import { useModal } from './ModalContext';
import styles from './Footer.module.css';
import SocialLinks from './SocialLinks';

interface FooterProps {
    isDarkMode?: boolean;
    onToggleTheme?: () => void;
    logo?: string;
}

export default function Footer({ isDarkMode = true, onToggleTheme, logo }: FooterProps) {
    const pathname = usePathname();
    const { openContactModal } = useModal();
    const currentYear = new Date().getFullYear();

    const isAdmin = pathname?.startsWith('/admin');

    return (
        <footer className={styles.footer} role="contentinfo" style={{ display: isAdmin ? 'none' : 'block' }}>
            <div className={styles.container}>
                {/* Brand Column (Left) */}
                <div className={styles.brandColumn}>
                    <a href="/" className={styles.logo} aria-label="WR Digital Home">
                        {logo ? (
                            <img src={logo} alt="WR Digital" className="h-8 w-auto object-contain" />
                        ) : (
                            <>
                                <span className={styles.logoMain}>W</span>
                                <span className={styles.logoBracket}>[</span>
                                <span className={styles.logoR}>r</span>
                                <span className={styles.logoBracket}>]</span>
                                <span className={styles.logoMain}>Digital</span>
                            </>
                        )}
                    </a>
                    <p className={styles.payoff}>
                        Dal 2019 al fianco delle PMI lombarde. La nostra esperienza e passione ci distinguono.
                    </p>
                    <div style={{ marginTop: '8px' }}>
                        <SocialLinks />
                    </div>
                </div>

                {/* Content Column (Right - Vertical Stack: Menu Row + Contacts Row) */}
                <div className={styles.contentColumn}>
                    {/* Horizontal Menu */}
                    <nav className={styles.horizontalNav}>
                        <a href="/" className={styles.link}>Home</a>
                        <a href="/#chi-siamo" className={styles.link}>Chi Siamo</a>
                        <a href="/#servizi" className={styles.link}>Servizi</a>
                        <a href="/#lavori" className={styles.link}>Lavori</a>
                        <button onClick={openContactModal} className={styles.link}>Contatti</button>
                    </nav>

                    {/* Compact Contacts — NAP strutturato per Local SEO */}
                    <address className={styles.contactsCompact} style={{ fontStyle: 'normal' }}>
                        <div className={styles.text}>
                            WRDigital S.r.l. &mdash;{' '}
                            <span itemProp="streetAddress">Via Venezia, 2</span>,{' '}
                            <span itemProp="postalCode">20834</span>{' '}
                            <span itemProp="addressLocality">Nova Milanese</span>{' '}
                            (<abbr title="Monza Brianza">MB</abbr>)
                        </div>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <a href="tel:+393401204651" className={styles.link} itemProp="telephone">+39 340 120 4651</a>
                            <span style={{ color: 'var(--color-text-muted)', opacity: 0.3 }}>|</span>
                            <a href="mailto:info@wrdigital.it" className={styles.link} itemProp="email">info@wrdigital.it</a>
                        </div>
                    </address>
                </div>
            </div>

            {/* Certifications Section */}
            <div className={styles.certificationsSection}>
                <div className={styles.certificationsContainer}>
                    <div className={styles.certificationsHeader}>
                        <h3 className={styles.certificationsTitle}>Partner Certificato Google</h3>
                        <p className={styles.certificationsSubtitle}>
                            Il nostro team è formato e certificato direttamente da Google per garantirti
                            strategie pubblicitarie basate sulle best practice del settore.{' '}
                            <a
                                href="https://skillshop.exceedlms.com/profiles/g/wrdigital"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: '#FACC15', textDecoration: 'underline', fontSize: '0.85em' }}
                                aria-label="Verifica certificazioni Google di W[r]Digital su Google Skillshop"
                            >
                                Verifica le nostre certificazioni →
                            </a>
                        </p>
                    </div>
                    <div className={styles.certificationsGrid}>
                        <div className={styles.badgeWrapper}>
                            <img
                                src="/certifications/google-ads-search.png"
                                alt="Google Ads Search Certified"
                                className={styles.certificationBadge}
                            />
                            <span className={styles.badgeLabel}>Search Ads</span>
                        </div>
                        <div className={styles.badgeWrapper}>
                            <img
                                src="/certifications/shopping-ads.png"
                                alt="Shopping Ads Certified"
                                className={styles.certificationBadge}
                            />
                            <span className={styles.badgeLabel}>Shopping Ads</span>
                        </div>
                        <div className={styles.badgeWrapper}>
                            <img
                                src="/certifications/google-ads-measurement.png"
                                alt="Google Ads Measurement Certified"
                                className={styles.certificationBadge}
                            />
                            <span className={styles.badgeLabel}>Measurement</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className={styles.bottomBar}>
                <div className={styles.copyright}>
                    Copyright &copy; {currentYear} WRDigital S.r.l. &mdash; P.IVA IT10961410965
                </div>
                <div className={styles.legalLinks}>
                    <a href="/cookie-policy" className={styles.legalLink}>Cookie Policy</a>
                    <a href="/privacy-policy" className={styles.legalLink}>Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
}

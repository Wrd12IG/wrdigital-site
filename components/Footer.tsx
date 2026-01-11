'use client';

import { usePathname } from 'next/navigation';
import { useModal } from './ModalContext';
import styles from './Footer.module.css';
import SocialLinks from './SocialLinks';

interface FooterProps {
    isDarkMode?: boolean;
    onToggleTheme?: () => void;
}

export default function Footer({ isDarkMode = true, onToggleTheme }: FooterProps) {
    const pathname = usePathname();
    const { openContactModal } = useModal();
    const currentYear = new Date().getFullYear();

    const isAdmin = pathname?.startsWith('/admin');

    return (
        <footer className={styles.footer} role="contentinfo" style={{ display: isAdmin ? 'none' : 'block' }}>
            {!isAdmin && (
                <>
                    <div className={styles.container}>

                        {/* Brand Column (Left) */}
                        <div className={styles.brandColumn}>
                            <a href="/" className={styles.logo} aria-label="WR Digital Home">
                                <span className={styles.logoMain}>W</span>
                                <span className={styles.logoBracket}>[</span>
                                <span className={styles.logoR}>r</span>
                                <span className={styles.logoBracket}>]</span>
                                <span className={styles.logoMain}>Digital</span>
                            </a>
                            <p className={styles.payoff}>
                                La nostra esperienza, così come la nostra passione, ci distingue dalle altre agenzie.
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

                            {/* Compact Contacts */}
                            <div className={styles.contactsCompact}>
                                <div className={styles.text}>Via Venezia, 2 - 20834 Nova Milanese (MB)</div>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                    <a href="tel:+393401204651" className={styles.link}>+39 340 120 4651</a>
                                    <span style={{ color: 'var(--color-text-muted)', opacity: 0.3 }}>|</span>
                                    <a href="mailto:info@wrdigital.it" className={styles.link}>info@wrdigital.it</a>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className={styles.bottomBar}>
                        <div className={styles.copyright}>
                            Copyright © {currentYear} wrdigital - P.IVA IT10961410965
                        </div>
                        <div className={styles.legalLinks}>
                            <a href="/cookie-policy" className={styles.legalLink}>Cookie Policy</a>
                            <a href="/privacy-policy" className={styles.legalLink}>Privacy Policy</a>
                        </div>
                    </div>
                </>
            )}
        </footer>
    );
}

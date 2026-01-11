'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useModal } from './ModalContext'; // Import Modal Hook
import styles from './Navbar.module.css';

interface NavItem {
    label: string;
    href: string;
    action?: boolean;
}

const navItems: NavItem[] = [
    { label: 'Lavori', href: '/#lavori' },
    { label: 'Servizi', href: '/#servizi' },
    { label: 'Chi Siamo', href: '/#chi-siamo' },
    { label: 'Contatti', href: '#contatti', action: true },
];

interface NavbarProps {
    isDarkMode: boolean;
}

export default function Navbar({ isDarkMode }: NavbarProps) {
    const pathname = usePathname();
    const { openContactModal } = useModal();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isAdmin = pathname?.startsWith('/admin');

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }
            setIsScrolled(currentScrollY > 50);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);


    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
        if (item.action) {
            e.preventDefault();
            openContactModal();
            setIsMobileMenuOpen(false);
        } else {
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <motion.header
            className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''} ${isAdmin ? styles.hidden : ''}`}
            initial={{ y: 0 }}
            animate={{ y: isHidden && !isAdmin ? -100 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ display: isAdmin ? 'none' : 'block' }}
        >
            <div className={styles.container}>
                {/* Logo */}
                {/* Logo Animated */}
                <motion.a
                    href="/"
                    className={styles.logo}
                    data-cursor="Home"
                    aria-label="W[r]Digital Home"
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                >
                    <span className={styles.logoText}>W</span>
                    <motion.span
                        className={styles.logoBracket}
                        variants={{ rest: { x: 0 }, hover: { x: -3 } }}
                    >[</motion.span>
                    <motion.span
                        className={styles.logoR}
                        variants={{ rest: { opacity: 1, scale: 1 }, hover: { opacity: 0.8, scale: 1.1, color: '#FACC15' } }}
                    >r</motion.span>
                    <motion.span
                        className={styles.logoBracket}
                        variants={{ rest: { x: 0 }, hover: { x: 3 } }}
                    >]</motion.span>
                    <span className={styles.logoText}>Digital</span>
                </motion.a>

                {/* Desktop Navigation */}
                <nav className={styles.nav}>
                    {navItems.map((item, index) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className={styles.navLink}
                            data-cursor={item.label}
                            style={{ animationDelay: `${index * 100}ms` }}
                            onClick={(e) => handleNavClick(e, item)}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className={styles.actions}>
                    {/* Area Clienti Icon */}
                    <a
                        href="/area-clienti"
                        className={styles.iconLink}
                        aria-label="Area Clienti"
                        data-cursor="Login"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </a>

                    {/* CTA Button */}
                    <button
                        className={styles.ctaButton}
                        data-cursor="Go"
                        onClick={openContactModal}
                    >
                        Parliamo
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={styles.mobileToggle}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <motion.div
                            className={styles.hamburger}
                            animate={isMobileMenuOpen ? 'open' : 'closed'}
                        >
                            <motion.span
                                className={styles.hamburgerLine}
                                variants={{
                                    closed: { rotate: 0, y: 0 },
                                    open: { rotate: 45, y: 8 },
                                }}
                            />
                            <motion.span
                                className={styles.hamburgerLine}
                                variants={{
                                    closed: { opacity: 1 },
                                    open: { opacity: 0 },
                                }}
                            />
                            <motion.span
                                className={styles.hamburgerLine}
                                variants={{
                                    closed: { rotate: 0, y: 0 },
                                    open: { rotate: -45, y: -8 },
                                }}
                            />
                        </motion.div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className={styles.mobileMenu}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <nav className={styles.mobileNav}>
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.href}
                                    href={item.href}
                                    className={styles.mobileNavLink}
                                    onClick={(e) => {
                                        if (item.action) {
                                            e.preventDefault();
                                            openContactModal();
                                        }
                                        setIsMobileMenuOpen(false);
                                    }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {item.label}
                                </motion.a>
                            ))}
                            <motion.a
                                href="/area-clienti"
                                className={styles.mobileNavLink}
                                onClick={() => setIsMobileMenuOpen(false)}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: navItems.length * 0.1 }}
                            >
                                Area Clienti
                            </motion.a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

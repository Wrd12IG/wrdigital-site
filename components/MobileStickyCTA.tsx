'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Phone, Mail } from 'lucide-react';
import { useModal } from './ModalContext';
import { usePathname } from 'next/navigation';

export default function MobileStickyCTA() {
    const { openContactModal } = useModal();
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            // Show only after scrolling a bit
            setIsVisible(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHiddenPath = pathname?.startsWith('/admin') || pathname?.startsWith('/area-clienti');

    // Real number from footer
    const phoneNumber = "3401204651";
    const fullPhoneNumber = "+39" + phoneNumber;

    const items = [
        {
            id: 'whatsapp',
            icon: <MessageSquare size={20} />,
            label: 'WhatsApp',
            action: () => window.open(`https://wa.me/${fullPhoneNumber.replace('+', '')}?text=Salve, vorrei maggiori informazioni sui servizi W[r]Digital.`, '_blank'),
            color: 'bg-[#25D366]',
            textColor: 'text-white'
        },
        {
            id: 'phone',
            icon: <Phone size={20} />,
            label: 'Chiama',
            action: () => window.location.href = `tel:${fullPhoneNumber}`,
            color: 'bg-[#3B82F6]',
            textColor: 'text-white'
        },
        {
            id: 'modal',
            icon: <Mail size={20} />,
            label: 'Preventivo',
            action: openContactModal,
            color: 'bg-[#FACC15]',
            textColor: 'text-black'
        }
    ];

    return (
        <AnimatePresence>
            {(isVisible && !isHiddenPath) && (
                <motion.div
                    className="fixed bottom-8 right-4 z-50 flex flex-col gap-4 md:hidden"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    {items.map((item, index) => (
                        <motion.button
                            key={item.id}
                            onClick={item.action}
                            className={`${item.color} ${item.textColor} p-3.5 rounded-full shadow-lg flex items-center justify-center relative group`}
                            whileTap={{ scale: 0.9 }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {item.icon}
                        </motion.button>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

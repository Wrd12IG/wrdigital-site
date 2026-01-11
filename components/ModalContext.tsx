'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
    isContactOpen: boolean;
    openContactModal: () => void;
    closeContactModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [isContactOpen, setIsContactOpen] = useState(false);

    const openContactModal = () => setIsContactOpen(true);
    const closeContactModal = () => setIsContactOpen(false);

    // Check for hash on mount to open modal if needed
    React.useEffect(() => {
        if (typeof window !== 'undefined' && window.location.hash === '#contatti') {
            setIsContactOpen(true);
            // Optional: clear hash to avoid reopening on refresh? 
            // window.history.replaceState(null, '', ' ');
        }
    }, []);

    return (
        <ModalContext.Provider value={{ isContactOpen, openContactModal, closeContactModal }}>
            {children}
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}

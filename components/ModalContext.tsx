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

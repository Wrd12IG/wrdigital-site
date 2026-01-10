'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useEffect } from 'react';

export interface Toast {
    id: string;
    type: 'success' | 'error' | 'info';
    message: string;
    duration?: number;
}

interface ToastContainerProps {
    toasts: Toast[];
    onDismiss: (id: string) => void;
}

export default function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
    return (
        <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 max-w-md">
            <AnimatePresence>
                {toasts.map(toast => (
                    <ToastItem
                        key={toast.id}
                        toast={toast}
                        onDismiss={() => onDismiss(toast.id)}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
    // Auto dismiss
    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss();
        }, toast.duration || 3000);

        return () => clearTimeout(timer);
    }, [toast.duration, onDismiss]);

    const icons = {
        success: <CheckCircle2 className="w-5 h-5" />,
        error: <AlertCircle className="w-5 h-5" />,
        info: <Info className="w-5 h-5" />
    };

    const colors = {
        success: 'from-green-500/10 to-green-500/5 border-green-500/30 text-green-400',
        error: 'from-red-500/10 to-red-500/5 border-red-500/30 text-red-400',
        info: 'from-blue-500/10 to-blue-500/5 border-blue-500/30 text-blue-400'
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            className={`
                bg-gradient-to-r ${colors[toast.type]}
                border rounded-lg p-4 shadow-2xl backdrop-blur-sm
                flex items-center gap-3
            `}
        >
            <div className="flex-shrink-0">
                {icons[toast.type]}
            </div>
            <p className="flex-1 text-sm text-white font-medium">
                {toast.message}
            </p>
            <button
                onClick={onDismiss}
                className="flex-shrink-0 p-1 rounded-md hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
}

// Hook to use toasts
export function useToast() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (toast: Omit<Toast, 'id'>) => {
        const id = `toast-${Date.now()}-${Math.random()}`;
        setToasts(prev => [...prev, { ...toast, id }]);
    };

    const dismissToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return {
        toasts,
        addToast,
        dismissToast,
        success: (message: string) => addToast({ type: 'success', message }),
        error: (message: string) => addToast({ type: 'error', message }),
        info: (message: string) => addToast({ type: 'info', message })
    };
}

import { useState } from 'react';

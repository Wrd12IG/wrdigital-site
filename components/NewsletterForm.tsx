
'use client';

import { useState } from "react";
import { toast } from "react-hot-toast";

export default function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Iscrizione completata!');
                setEmail('');
            } else {
                toast.error(data.error || 'Errore durante l\'iscrizione');
            }
        } catch (e) {
            toast.error('Errore di connessione');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <form onSubmit={handleSubmit} className="relative bg-[#0a0a0a] rounded-lg p-1 flex items-center border border-white/10">
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="La tua email aziendale"
                    className="bg-transparent text-white w-full px-4 py-3 outline-none text-sm placeholder-gray-600 font-mono"
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="bg-white text-black font-bold text-xs uppercase px-6 py-3 rounded hover:bg-gray-200 transition-colors whitespace-nowrap disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? '...' : 'Iscriviti [r]'}
                </button>
            </form>
            <p className="text-[10px] text-gray-600 mt-3 font-mono">
                Ricevi i nostri report settimanali. No spam, solo valore.
            </p>
        </div>
    );
}


import Link from 'next/link';
import { Metadata } from 'next';
import { bandi2026 } from '@/data/bandi';

export const metadata: Metadata = {
    title: 'Incentivi e Bandi Digital Marketing 2026 | W[r]Digital',
    description: 'Scopri i bandi e gli incentivi disponibili per il 2026 per digitalizzare la tua impresa. Fondi perduti per siti web, e-commerce, SEO e advertising.',
};

export default function IncentiviPage() {
    return (
        <main className="min-h-screen pt-32 pb-20">
            {/* Background */}
            <div className="fixed inset-0 z-[-1] bg-black">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
                <div className="absolute top-20 right-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4">

                {/* HEADER */}
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 mb-6">
                        Incentivi <span className="text-yellow-400">2026</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Accedi ai fondi stanziati per la digitalizzazione delle imprese.
                        Sviluppa il tuo business con contributi a fondo perduto fino al 60%.
                    </p>
                </div>

                {/* BENTO GRID OF CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {bandi2026.map((bando) => (
                        <Link
                            key={bando.slug}
                            href={`/incentivi-2026/${bando.slug}`}
                            className="group relative"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-purple-600 rounded-2xl opacity-50 blur group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
                            <div className="relative h-full bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col hover:bg-black/80 transition-all">

                                <div className="flex justify-between items-start mb-6">
                                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-wider rounded-full border border-yellow-500/30">
                                        {bando.benefit_highlight}
                                    </span>
                                    <svg className="w-6 h-6 text-gray-500 group-hover:text-white transition-colors transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                                    {bando.title}
                                </h2>
                                <p className="text-gray-400 text-sm mb-6 flex-grow">
                                    {bando.subtitle}
                                </p>

                                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                                    <div>
                                        <span className="text-xs text-gray-500 uppercase block mb-1">Massimale</span>
                                        <span className="text-xl font-bold text-white">{bando.max_amount}</span>
                                    </div>
                                    <span className="text-sm text-gray-300 group-hover:underline decoration-yellow-500/50 underline-offset-4">
                                        Scopri di più
                                    </span>
                                </div>

                            </div>
                        </Link>
                    ))}
                </div>

                {/* FAQ or Info Section below */}
                <div className="mt-32 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">Non sai quale scegliere?</h3>
                    <p className="text-gray-400 mb-8">
                        I nostri esperti possono analizzare la tua azienda e dirti a quali bandi puoi accedere.
                    </p>
                    <Link href="/contatti" className="btn btn-secondary px-8 py-3 rounded-full border-white/20 hover:bg-white hover:text-black transition-all">
                        Parla con un consulente
                    </Link>
                </div>

            </div>
        </main>
    );
}

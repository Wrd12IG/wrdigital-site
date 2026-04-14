import EstimatorWizard from '@/components/EstimatorWizard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Calcola Preventivo Online - W[r]Digital',
    description: 'Ottieni una stima gratuita per il tuo progetto digitale. SEO, Web Design, Advertising e Social Media. Risposta in 24h.',
    alternates: {
        canonical: 'https://www.wrdigital.it/preventivo',
    },
    openGraph: {
        title: 'Calcola il tuo Preventivo Digitale | W[r]Digital',
        description: 'Configura il tuo successo. Rispondi a poche domande e ricevi una strategia su misura.',
        url: 'https://www.wrdigital.it/preventivo',
        type: 'website',
        images: [{ url: '/og-preventivo.jpg', width: 1200, height: 630, alt: 'Preventivo W[r]Digital' }],
    },
};

export default function PreventivoPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
                        Configura il tuo <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Successo</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Rispondi a 4 semplici domande per aiutarci a capire le tue esigenze.
                        Ti forniremo una strategia su misura e un preventivo trasparente.
                    </p>
                </div>

                <EstimatorWizard />

                <div className="mt-16 text-center">
                    <p className="text-sm text-gray-500">
                        Preferisci parlare direttamente con un esperto? <a href="mailto:info@wrdigital.it" className="text-white hover:text-yellow-400 underline">Scrivici una email</a> o chiamaci.
                    </p>
                </div>
            </div>
        </main>
    );
}

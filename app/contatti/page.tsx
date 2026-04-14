
import Contact from '@/components/Contact';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contatti | W[r]Digital Agency',
    description: 'Contattaci per una consulenza gratuita. Siamo pronti ad ascoltare le tue idee e trasformarle in progetti digitali di successo.',
};

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-24 pb-8">
            {/* Background with simple premium gradient */}
            <div className="fixed inset-0 z-[-1] bg-black">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Mettiamoci in contatto</h1>
                    <p className="text-gray-400">Siamo qui per aiutarti a far crescere il tuo business.</p>
                </div>
            </div>

            {/* Reusing the existing Contact Section Component */}
            <Contact />

        </main>
    );
}

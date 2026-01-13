
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { bandi2026 } from '@/data/bandi';
import Contact from '@/components/Contact';
import Link from 'next/link';

// 1. Generate Static Params for SSG
export async function generateStaticParams() {
    return bandi2026.map((bando) => ({
        slug: bando.slug,
    }));
}

// 2. SEO Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const bando = bandi2026.find((b) => b.slug === slug);

    if (!bando) return { title: 'Bando non trovato' };

    return {
        title: `${bando.title} | W[r]Digital`,
        description: `Ottieni fino a ${bando.max_amount} a fondo perduto con il ${bando.title}. Scopri come accedere ai fondi per la digitalizzazione.`,
        openGraph: {
            title: `${bando.title} - Fondi 2026`,
            description: bando.description,
        }
    };
}

export default async function BandoPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const bando = bandi2026.find((b) => b.slug === slug);

    if (!bando) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-24 pb-16">
            {/* Background Decor */}
            <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4">

                {/* Breadcrumb / Back Link */}
                <div className="mb-8">
                    <Link href="/incentivi-2026" className="text-sm text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2">
                        ← Torna agli Incentivi
                    </Link>
                </div>

                {/* HERO SECTION */}
                <section className="relative mb-20 text-center">
                    <div className="inline-block px-4 py-1 mb-6 rounded-full border border-yellow-500/30 bg-yellow-500/10 backdrop-blur-md">
                        <span className="text-yellow-400 text-sm font-semibold tracking-wider uppercase">Fondi 2026 Disponibili</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        <span className="block text-white mb-2">{bando.title}</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600">
                            {bando.subtitle}
                        </span>
                    </h1>

                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                        {bando.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a href="#contact-form" className="btn btn-primary px-8 py-4 text-black font-bold rounded-lg shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 transition-all text-lg">
                            {bando.cta}
                        </a>
                        <Link href="/incentivi-2026" className="px-8 py-4 rounded-lg border border-white/10 hover:bg-white/5 transition-all text-white">
                            Scopri altri bandi
                        </Link>
                    </div>
                </section>

                {/* KEY BENEFITS GRID (Bento Style) */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    {/* Benefit 1: Max Amount */}
                    <div className="glass p-8 rounded-2xl md:col-span-2 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl -mr-16 -mt-16 transition-all group-hover:bg-yellow-500/20" />
                        <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-2">Massimale di Spesa / Contributo</h3>
                        <div className="text-5xl md:text-6xl font-bold text-white mb-2 group-hover:scale-105 transition-transform origin-left">
                            {bando.max_amount}
                        </div>
                        <p className="text-yellow-400/80 font-medium">Fondi disponibili per la tua crescita</p>
                    </div>

                    {/* Benefit 2: Highlight */}
                    <div className="glass p-8 rounded-2xl relative overflow-hidden group">
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-transparent" />
                        <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-2">Agevolazione</h3>
                        <div className="text-3xl font-bold text-white mb-4">
                            {bando.benefit_highlight}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        </div>
                    </div>

                    {/* Benefit 3: Target */}
                    <div className="glass p-8 rounded-2xl md:col-span-1 relative overflow-hidden">
                        <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-2">Destinatari</h3>
                        <div className="text-2xl font-bold text-white mb-2">
                            {bando.target}
                        </div>
                        <p className="text-sm text-gray-400">Verifica se la tua azienda rientra nei requisiti.</p>
                    </div>

                    {/* Benefit 4: Categories */}
                    <div className="glass p-8 rounded-2xl md:col-span-2 flex flex-col justify-center">
                        <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-4">Spese Ammissibili</h3>
                        <div className="flex flex-wrap gap-2">
                            {bando.categories.map((cat, i) => (
                                <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 transition-colors">
                                    {cat}
                                </span>
                            ))}
                            <span className="px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm">
                                + Altro
                            </span>
                        </div>
                    </div>
                </section>

                {/* ELIGIBLE EXPENSES SECTION */}
                {bando.eligible_expenses_list && (
                    <section className="mb-24 max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-white mb-4">Spese Ammissibili</h2>
                            <p className="text-gray-400">Ecco cosa puoi finanziare con questo bando.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {bando.eligible_expenses_list.map((expense, index) => {
                                // Simple parser to make **bold** text work
                                const parts = expense.split(/(\*\*.*?\*\*)/g);
                                return (
                                    <div key={index} className="glass p-6 rounded-xl border-l-4 border-yellow-500 flex items-start gap-4">
                                        <div className="flex-shrink-0 mt-1 text-yellow-400">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </div>
                                        <p className="text-gray-200">
                                            {parts.map((part, i) =>
                                                part.startsWith('**') && part.endsWith('**')
                                                    ? <strong key={i} className="text-white font-semibold block mb-1 text-lg">{part.slice(2, -2)}</strong>
                                                    : <span key={i}>{part}</span>
                                            )}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* DETAILS LIST */}
                <section className="mb-24 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Dettagli del Bando</h2>
                    <div className="space-y-4">
                        {bando.details.map((detail, index) => (
                            <div key={index} className="flex items-start gap-4 p-6 glass rounded-xl hover:bg-white/5 transition-colors">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mt-1">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <p className="text-lg text-gray-200">{detail}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA FORM SECTION */}
                <section id="contact-form" className="scroll-mt-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Non perdere l'opportunità</h2>
                        <p className="text-gray-400">I fondi sono limitati. Contattaci oggi per preparare la tua domanda.</p>
                    </div>

                    {/* Reusing Contact Component, wrapped or modified via props if possible, otherwise standard */}
                    <div className="glass p-8 md:p-12 rounded-3xl border border-yellow-500/20">
                        <Contact />
                    </div>
                </section>

            </div>
        </main>
    );
}

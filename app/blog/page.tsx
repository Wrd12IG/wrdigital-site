import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import BlogFeed from '@/components/blog/BlogFeed';

export const metadata: Metadata = {
    title: 'Blog Marketing & Strategie Digitali | W[r]Digital',
    description: 'Approfondimenti tecnici, casi studio e guide per chi vuole dominare il mercato digitale. Risorse strategiche per SEO, Social e Web Design.',
};

import { prisma } from '@/lib/prisma';

async function getPosts() {
    try {
        const posts = await prisma.blogPost.findMany({
            where: { published: true },
            orderBy: { createdAt: 'desc' }
        });
        return posts as any;
    } catch (e) {
        console.error("Error fetching blog posts from Prisma:", e);
        return [];
    }
}

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <main className="min-h-screen bg-black pt-32 pb-20 font-sans selection:bg-purple-500/30">
            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-6 mb-20 text-center relative">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-900/10 rounded-full blur-[120px] -z-10" />

                <span className="text-yellow-500 font-mono text-xs uppercase tracking-[0.2em] mb-6 block animate-pulse">
                    [r]esources & insights
                </span>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-none">
                    Intelligence & <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
                        Strategie Digitali
                    </span>
                </h1>

                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                    Approfondimenti tecnici, casi studio e guide per chi non si accontenta di navigare, ma vuole dominare il mercato.
                </p>

                {/* NEWSLETTER FORM */}
                <div className="max-w-md mx-auto relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <form className="relative bg-[#0a0a0a] rounded-lg p-1 flex items-center border border-white/10">
                        <input
                            type="email"
                            placeholder="La tua email aziendale"
                            className="bg-transparent text-white w-full px-4 py-3 outline-none text-sm placeholder-gray-600 font-mono"
                        />
                        <button type="submit" className="bg-white text-black font-bold text-xs uppercase px-6 py-3 rounded hover:bg-gray-200 transition-colors whitespace-nowrap">
                            Iscriviti [r]
                        </button>
                    </form>
                    <p className="text-[10px] text-gray-600 mt-3 font-mono">
                        Ricevi i nostri report settimanali. No spam, solo valore.
                    </p>
                </div>
            </section>

            {/* BLOG FEED */}
            <BlogFeed posts={posts} />

            {/* FOOTER CTA */}
            <section className="max-w-4xl mx-auto px-6 mt-32 text-center">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-12 relative overflow-hidden group hover:border-white/20 transition-colors">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-900/20 rounded-full blur-[100px] -mr-20 -mt-20 group-hover:bg-purple-900/30 transition-colors"></div>

                    <h2 className="text-3xl font-bold text-white mb-4 relative z-10">
                        Ti senti sopraffatto dalle informazioni?
                    </h2>
                    <p className="text-gray-400 mb-8 max-w-lg mx-auto relative z-10 text-sm md:text-base">
                        Lascia che sia il team di W[r]Digital a gestire la complessità per te. Costruiamo il tuo piano d'attacco in una call strategica.
                    </p>

                    <a href="/#contatti" className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-4 px-10 rounded-full text-sm md:text-lg shadow-xl shadow-yellow-500/20 hover:scale-105 transition-transform relative z-10">
                        [ Attiva il tuo piano d'attacco ]
                    </a>
                </div>
            </section>
        </main>
    );
}

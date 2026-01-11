import { Metadata } from 'next';
import BlogFeed from '@/components/blog/BlogFeed';
import NewsletterForm from '@/components/NewsletterForm';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
    title: 'Blog & Insights | W[r]Digital',
    description: 'Esplora le ultime tendenze su Digital Marketing, SEO, AI e Crescita Aziendale. Risorse strategiche per imprenditori visionari.',
    openGraph: {
        title: 'W[r]Digital Blog - Strategie di Marketing e Innovazione',
        description: 'Guide, Analisi e Case Studies per dominare il mercato digitale.',
        url: 'https://www.wrdigital.it/blog',
        siteName: 'W[r]Digital',
        locale: 'it_IT',
        type: 'website',
        images: [
            {
                url: '/og-blog.jpg', // Ensure this image exists eventually, or fallback
                width: 1200,
                height: 630,
                alt: 'W[r]Digital Blog',
            },
        ],
    },
    alternates: {
        canonical: 'https://www.wrdigital.it/blog',
    }
};

async function getPosts() {
    try {
        const posts = await prisma.blogPost.findMany({
            where: {
                published: true,
                deleted: false
            },
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
                <NewsletterForm />
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
                        Lascia che sia il team di W[r]Digital a gestire la complessità per te. Costruiamo il tuo piano d&apos;attacco in una call strategica.
                    </p>

                    <a href="/#contatti" className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-4 px-10 rounded-full text-sm md:text-lg shadow-xl shadow-yellow-500/20 hover:scale-105 transition-transform relative z-10">
                        [ Attiva il tuo piano d&apos;attacco ]
                    </a>
                </div>
            </section>
        </main>
    );
}

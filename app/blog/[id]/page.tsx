import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { Metadata } from 'next';
import { Calendar, Clock } from 'lucide-react';

// Helper to get posts
const getPosts = () => {
    try {
        const filePath = path.join(process.cwd(), 'data', 'blog.json');
        if (!fs.existsSync(filePath)) return [];
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch { return []; }
};

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const params = await props.params;
    const posts = getPosts();
    const post = posts.find((p: any) => p.id === params.id);
    if (!post) return { title: 'Blog | W[r]Digital' };

    return {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
        keywords: post.keywords
    };
}

export default async function BlogPostPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const posts = getPosts();
    const post = posts.find((p: any) => p.id === params.id);

    if (!post) notFound();

    return (
        <main className="bg-black min-h-screen text-white">
            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <Image
                        src={post.image || '/hero-bg.png'}
                        alt={post.title}
                        fill
                        className="object-cover opacity-40"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-[#000]" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
                    <div className="mb-6 flex justify-center gap-3">
                        <span className="bg-yellow-400 text-black px-3 py-1 font-bold rounded uppercase tracking-wider text-xs shadow-[0_0_15px_rgba(250,204,21,0.4)]">
                            {post.category}
                        </span>
                        {post.status === 'draft' && <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">DRAFT PREVIEW</span>}
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight text-shadow-lg">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap justify-center items-center gap-4 text-gray-300 text-sm font-mono border-t border-white/10 pt-6 inline-block w-full">
                        <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
                        <span className="hidden md:inline">•</span>
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {post.readTime} di lettura</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <article className="container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-3xl mx-auto">
                    {/* Lead / Excerpt */}
                    <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light mb-16 border-l-4 border-yellow-400 pl-8 py-2 italic opacity-90">
                        {post.excerpt}
                    </p>

                    {/* Markdown Content */}
                    <MarkdownRenderer content={post.content} className="mb-24" />

                    {/* CTA Box Middle Content (Optional, handled by renderer if embedded, but let's add a fixed one at bottom) */}

                    {/* Links & Tags */}
                    <div className="border-t border-white/10 pt-8 mb-16">
                        <h5 className="text-xs font-bold text-gray-500 uppercase mb-4">Argomenti trattati</h5>
                        <div className="flex flex-wrap gap-2">
                            {(post.keywords || '').split(',').map((tag: string, i: number) => (
                                <span key={i} className="text-xs bg-white/5 text-gray-300 px-3 py-1 rounded-full border border-white/5 hover:bg-white/10 transition-colors">
                                    #{tag.trim()}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Author Box */}
                    <div className="bg-[#111] border border-white/10 p-8 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-6 shadow-2xl relative overflow-hidden group hover:border-yellow-400/30 transition-all duration-500">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-yellow-400/50 flex-shrink-0 shadow-[0_0_20px_rgba(250,204,21,0.2)]">
                            <Image src="/roberto-avatar.jpg" alt="Roberto" width={80} height={80} className="object-cover" />
                            {/* Fallback if no image */}
                            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-3xl font-bold text-gray-600">WD</div>
                        </div>
                        <div className="text-center md:text-left">
                            <p className="text-xs text-yellow-400 uppercase font-bold mb-2 tracking-widest">Autore & Strategist</p>
                            <h4 className="text-white font-bold text-xl mb-3">Team Strategy W[r]Digital</h4>
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                Aiutiamo aziende visionarie a scalare il proprio business attraverso Digital Transformation, AI Marketing e Strategie Data-Driven.
                            </p>
                            <a href="/contatti" className="text-white text-xs font-bold uppercase border-b border-yellow-400 pb-0.5 hover:text-yellow-400 transition-colors">
                                Richiedi una consulenza strategica →
                            </a>
                        </div>
                    </div>
                </div>
            </article>
        </main>
    );
}

'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlogCard from './BlogCard';
import Sidebar from './Sidebar';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    featured?: boolean;
    views?: number;
}

const CATEGORIES = ['All', 'SEO', 'Web Design', 'Social Media', 'Advertising', 'Strategy'];

const InFeedAd = () => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="col-span-1 md:col-span-2 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden"
    >
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-10" />
        <h3 className="text-2xl font-bold text-black mb-2 relative z-10">Vuoi saltare la teoria e passare alla pratica?</h3>
        <p className="text-black/80 mb-6 max-w-lg relative z-10">
            I nostri strategist possono applicare questo metodo al tuo business in 48 ore.
        </p>
        <button className="bg-black text-white font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform relative z-10 shadow-lg">
            Prenota una Consulenza Strategica
        </button>
    </motion.div>
);

export default function BlogFeed({ posts }: { posts: BlogPost[] }) {
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Filter Logic
    const filteredPosts = useMemo(() => {
        let filtered = selectedCategory === 'All'
            ? posts
            : posts.filter(p => p.category.includes(selectedCategory) || (selectedCategory === 'Strategy' && p.category === 'AI Strategy')); // Mapping helper
        return filtered;
    }, [selectedCategory, posts]);

    // Separate Featured (The absolute best one, or the first one marked featured)
    // If we are in "All", we show the Featured big. If filtered, maybe we just show grid?
    // Let's keep logic simple: Featured is always separate if present and category is All.
    const featuredPost = useMemo(() => posts.find(p => p.featured), [posts]);
    const gridPosts = useMemo(() => {
        if (selectedCategory === 'All' && featuredPost) {
            return filteredPosts.filter(p => p.id !== featuredPost.id);
        }
        return filteredPosts;
    }, [filteredPosts, featuredPost, selectedCategory]);

    // Flatten the list to mix Posts and Ads for clean rendering
    const feedItems = useMemo(() => {
        const items: any[] = [];
        gridPosts.forEach((post, index) => {
            if (index > 0 && index % 6 === 0) {
                items.push({ type: 'ad', id: `ad-${index}` });
            }
            items.push({ type: 'post', data: post });
        });
        return items;
    }, [gridPosts]);

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-12 relative">
            <div className="flex flex-col lg:flex-row gap-12">

                {/* MAIN FEED COLUMN */}
                <div className="flex-1">

                    {/* FILTERS */}
                    <div className="flex flex-wrap gap-2 mb-12">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-bold border transition-all ${selectedCategory === cat
                                    ? 'bg-white text-black border-white'
                                    : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                                    }`}
                            >
                                {selectedCategory === cat && <span className="mr-2 text-yellow-500">[r]</span>}
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* FEATURED POST (Only if All and exists) */}
                    {selectedCategory === 'All' && featuredPost && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-16 group cursor-pointer"
                        >
                            <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden mb-6 border border-white/10">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                                <div className="absolute bottom-0 left-0 p-8 md:p-12">
                                    <span className="text-yellow-400 font-bold uppercase tracking-widest text-xs mb-2 block">{featuredPost.category}</span>
                                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-2xl leading-tight group-hover:text-yellow-400 transition-colors">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="text-gray-300 text-lg max-w-xl line-clamp-2 md:line-clamp-none">
                                        {featuredPost.excerpt}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <AnimatePresence mode="popLayout">
                            {feedItems.map((item, index) => (
                                item.type === 'ad' ? (
                                    <InFeedAd key={item.id} />
                                ) : (
                                    <BlogCard key={item.data.id} post={item.data} index={index} />
                                )
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* EMPTY STATE */}
                    {gridPosts.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            Nessun articolo trovato in questa categoria.
                        </div>
                    )}

                    {/* PAGINATION / LOAD MORE */}
                    {gridPosts.length > 0 && (
                        <div className="mt-20 text-center">
                            <button className="text-white border-b border-yellow-500 pb-1 hover:text-yellow-400 transition-colors text-sm uppercase tracking-widest">
                                Carica altri [ + ]
                            </button>
                        </div>
                    )}
                </div>

                {/* SIDEBAR */}
                <Sidebar />
            </div>
        </div>
    );
}

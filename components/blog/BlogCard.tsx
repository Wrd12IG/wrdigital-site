'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    featured?: boolean;
    views?: number; // Optional views count
    hasResource?: boolean; // [r] badge
}

export default function BlogCard({ post, index }: { post: BlogPost; index: number }) {
    // TILT EFFECT Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative w-full h-full rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors duration-300"
        >
            <Link href={`/blog/${post.id}`} className="block h-full flex flex-col">
                {/* 1. VISUAL (Image) */}
                <div
                    className="relative w-full aspect-video overflow-hidden rounded-t-2xl"
                    style={{ transform: "translateZ(20px)" }}
                >
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Category Label */}
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-full shadow-xl">
                            {post.category}
                        </span>
                    </div>

                    {/* [r] Resource Badge if applicable */}
                    {post.hasResource && (
                        <div className="absolute top-4 right-4">
                            <span className="flex items-center justify-center w-8 h-8 bg-yellow-500 text-black font-bold rounded-full text-xs shadow-lg shadow-yellow-500/20">
                                [r]
                            </span>
                        </div>
                    )}
                </div>

                {/* Content Body */}
                <div className="p-6 flex flex-col flex-grow bg-white/5 backdrop-blur-sm rounded-b-2xl border-t border-white/5" style={{ transform: "translateZ(30px)" }}>
                    {/* 2. TITLE (H3) */}
                    <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-yellow-400 transition-colors line-clamp-2">
                        {post.title}
                    </h3>

                    {/* 3. EXCERPT */}
                    <p className="text-sm text-gray-400 mb-6 line-clamp-3 flex-grow">
                        {post.excerpt}
                    </p>

                    {/* 4. METADATA & CTA */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                        <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
                            <span className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                {post.readTime}
                            </span>
                            <span className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                {post.views || '1.2k'}
                            </span>
                        </div>

                        {/* CTA [ r ] */}
                        <div className="group/btn flex items-center gap-1 text-xs font-bold text-white uppercase tracking-wider">
                            <span className="group-hover/btn:translate-x-0.5 transition-transform">[</span>
                            <span className="text-yellow-500 group-hover/btn:text-white transition-colors group-hover/btn:shadow-[0_0_10px_rgba(255,255,255,0.8)]">r</span>
                            <span className="group-hover/btn:-translate-x-0.5 transition-transform">]</span>
                        </div>
                    </div>
                </div>

                {/* Shadow Glow Effect */}
                <div
                    className="absolute -inset-[1px] bg-gradient-to-r from-yellow-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity blur-md -z-10"
                />
            </Link>
        </motion.div>
    );
}

'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Blog.module.css';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    featured?: boolean;
}

export default function Blog() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/admin/blog');
                if (res.ok) {
                    const data = await res.json();
                    setPosts(data);
                }
            } catch (e) {
                console.error("Failed to load blog posts", e);
            }
        };
        fetchPosts();
    }, []);

    const parseDate = (dateStr: string) => {
        const months: Record<string, number> = { 'Gen': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'Mag': 4, 'Giu': 5, 'Lug': 6, 'Ago': 7, 'Set': 8, 'Ott': 9, 'Nov': 10, 'Dic': 11 };
        const parts = dateStr.split(' ');
        if (parts.length < 3) return new Date();
        return new Date(parseInt(parts[2]), months[parts[1]] || 0, parseInt(parts[0]));
    };

    const sortedPosts = [...posts].sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());
    const featuredPost = sortedPosts.find(post => post.featured);
    const regularPosts = sortedPosts.filter(post => post.id !== featuredPost?.id).slice(0, 3);

    // if (posts.length === 0) return null; // Don't hide section

    return (
        <section id="blog" ref={sectionRef} className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.label}>Insights & News</span>
                    <h2 className={styles.title}>
                        DAL NOSTRO <span className="text-gradient">BLOG.</span>
                    </h2>
                </motion.div>

                {posts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center min-h-[300px] border border-white/5 rounded-2xl bg-white/5 backdrop-blur-sm">
                        <div className="text-4xl mb-4">✍️</div>
                        <h3 className="text-xl font-bold text-white mb-2">Lavori in corso</h3>
                        <p className="text-gray-400">I nostri strategist stanno scrivendo nuovi contenuti.</p>
                        <button onClick={() => window.location.reload()} className="mt-6 text-xs text-yellow-400 hover:underline">
                            Riprova a caricare
                        </button>
                    </div>
                ) : (
                    <div className={styles.blogLayout}>
                        {featuredPost && (
                            <Link href={`/blog/${featuredPost.id}`} className="block w-full h-full group">
                                <motion.article
                                    className={styles.featuredCard}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    whileHover={{ y: -8 }}
                                    data-cursor="Leggi"
                                >
                                    <div className={styles.featuredImage}>
                                        <Image
                                            src={featuredPost.image}
                                            alt={featuredPost.title}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <div className={styles.imageOverlay} />
                                    </div>
                                    <div className={styles.featuredContent}>
                                        <span className={styles.category}>{featuredPost.category}</span>
                                        <h3 className={styles.featuredTitle}>{featuredPost.title}</h3>
                                        <p className={styles.excerpt}>{featuredPost.excerpt}</p>
                                        <div className={styles.meta}>
                                            <span>{featuredPost.date}</span>
                                            <span className={styles.dot}>•</span>
                                            <span>{featuredPost.readTime}</span>
                                        </div>
                                    </div>
                                </motion.article>
                            </Link>
                        )}

                        <div className={styles.postsGrid}>
                            {regularPosts.map((post, index) => (
                                <Link href={`/blog/${post.id}`} key={post.id} className="block w-full h-full group">
                                    <motion.article
                                        className={styles.postCard}
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                        whileHover={{ y: -5 }}
                                        data-cursor="Leggi"
                                    >
                                        <div className={styles.postImage}>
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className={styles.postContent}>
                                            <span className={styles.category}>{post.category}</span>
                                            <h4 className={styles.postTitle}>{post.title}</h4>
                                            <p className={styles.postExcerpt}>{post.excerpt}</p>
                                            <div className={styles.meta}>
                                                <span>{post.date}</span>
                                                <span className={styles.dot}>•</span>
                                                <span>{post.readTime}</span>
                                            </div>
                                        </div>
                                    </motion.article>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                <motion.div
                    className={styles.cta}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <Link href="/blog" className={styles.ctaButton}>
                        <span>Vedi tutti gli articoli</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

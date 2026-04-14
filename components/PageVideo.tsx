'use client';

import { motion } from 'framer-motion';
import styles from './PageVideo.module.css';

interface PageVideoProps {
    videoUrl: string;
    title?: string;
}

export default function PageVideo({ videoUrl, title }: PageVideoProps) {
    if (!videoUrl) return null;

    // Convert YouTube/Vimeo URLs to embed format
    let embedUrl = videoUrl;

    if (videoUrl.includes('youtube.com/watch')) {
        const videoId = new URL(videoUrl).searchParams.get('v');
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (videoUrl.includes('youtu.be/')) {
        const videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (videoUrl.includes('vimeo.com/')) {
        const videoId = videoUrl.split('vimeo.com/')[1]?.split('?')[0];
        embedUrl = `https://player.vimeo.com/video/${videoId}`;
    }

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {title && (
                    <motion.h2
                        className={styles.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {title}
                    </motion.h2>
                )}
                <motion.div
                    className={styles.videoWrapper}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <iframe
                        src={embedUrl}
                        title="Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className={styles.iframe}
                    />
                </motion.div>
            </div>
        </section>
    );
}

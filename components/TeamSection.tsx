'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './TeamSection.module.css';

const staticTeam = [
    { name: 'Valentina Dell\'Orto', role: 'CEO & Founder | Digital Marketing Manager', color: '#FACC15', avatar: '/images/team/valentina.png' },
    { name: 'Roberto Solano', role: 'CEO & Founder | Google Specialist', color: '#FACC15', avatar: '/images/team/roberto.png' },
    { name: 'Giuseppe Savino', role: 'CEO & Founder | Business Developer', color: '#FACC15', avatar: '/images/team/giuseppe.png' },
    { name: 'Bassetto Eleonora', role: 'Social Manager Senior | Account', color: '#ef4444', avatar: '/images/team/eleonora.png' },
    { name: 'Gatto Rebecca', role: 'Social Manager Senior | Account', color: '#ef4444', avatar: '/images/team/rebecca.png' },
    { name: 'Messinese Valeria', role: 'Social Manager Senior | Account', color: '#ef4444', avatar: '/images/team/valeria.png' },
    { name: 'Fallara Daniela', role: 'Graphic Designer', color: '#3b82f6', avatar: '/images/team/daniela.png' },
    { name: 'Francesconi Lorenzo', role: 'Graphic Designer', color: '#3b82f6', avatar: '/images/team/lorenzo.png' },
    { name: 'Gjashta Enxhi', role: 'Graphic Designer', color: '#3b82f6', avatar: '/images/team/enxhi.png' },
    { name: 'Tarricone Giulia', role: 'Social Manager Junior', color: '#22c55e', avatar: '/images/team/giulia.png' },
];

export default function TeamSection() {
    const [bio, setBio] = useState("Siamo un collettivo di creativi, sviluppatori e strategist. Non seguiamo i trend, li anticipiamo.");
    const [teamImage, setTeamImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await fetch('/api/site-config');
                if (res.ok) {
                    const data = await res.json();
                    if (data.team?.bio) setBio(data.team.bio);
                    if (data.team?.image && data.team.image !== '/team-placeholder.jpg') setTeamImage(data.team.image);
                }
            } catch (e) { console.error(e); }
        };
        fetchConfig();
    }, []);

    return (
        <section id="chi-siamo" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <motion.h2 className={styles.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        CHI SIAMO
                    </motion.h2>
                    <motion.div className={styles.subtitle} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', lineHeight: 1.8 }}>
                        {/* Render bio text. If it contains "W[r]Digital", we could highlight it, but simple text is safer for dynamic content */}
                        {bio}
                    </motion.div>
                </div>

                {/* Optional Dynamic Team Image */}
                {teamImage && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="mb-12 relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden">
                        <Image src={teamImage} alt="Il team di W[r]Digital - Esperti di Digital Marketing, SEO e Web Development a Milano" fill style={{ objectFit: 'cover' }} className="hover:scale-105 transition-transform duration-700" />
                    </motion.div>
                )}

                <div className={styles.grid}>
                    {staticTeam.map((member, index) => (
                        <motion.div key={index} className={styles.card} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ y: -10 }}>
                            <div className={styles.imagePlaceholder} style={{ background: member.avatar ? 'transparent' : `linear-gradient(135deg, #1a1a1a 0%, ${member.color}15 100%)` }}>
                                {member.avatar ? (
                                    <Image src={member.avatar} alt={member.name} fill style={{ objectFit: 'cover' }} />
                                ) : (
                                    <span style={{ color: member.color, fontSize: '2rem', fontWeight: 700 }}>{member.name.split(' ').map(n => n[0]).join('')}</span>
                                )}
                            </div>
                            <div className={styles.info}>
                                <h3 className={styles.name}>{member.name}</h3>
                                <div className={styles.role} style={{ color: member.color }}>{member.role}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

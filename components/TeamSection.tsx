'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './TeamSection.module.css';

const staticTeam = [
    { name: "Valentina Dell'Orto",  role: 'CEO & Founder | Digital Marketing Manager', color: '#FACC15', avatar: '/images/team/valentina.jpg',  tag: 'Founder', stats: { xp: '15+ Anni', stat1: 'Visione Strategica', stat2: 'Leadership', bio: 'Guida l\'agenzia trasformando la visione in strategie digitali concrete e misurabili.' } },
    { name: 'Roberto Solano',       role: 'CEO & Founder | Google Specialist',         color: '#FACC15', avatar: '/images/team/roberto.jpg',    tag: 'Founder', stats: { xp: '20+ Anni', stat1: 'Google Ads', stat2: 'Analisi Dati', bio: 'Ottimizza le performance chirurgicamente, trasformando i click in reale valore di business.' } },
    { name: 'Giuseppe Savino',      role: 'CEO & Founder | Business Developer',        color: '#FACC15', avatar: '/images/team/beppe.jpg',      tag: 'Founder', stats: { xp: '20+ Anni', stat1: 'Networking', stat2: 'Sviluppo', bio: 'Costruisce relazioni di valore ed espande le opportunità di business dell\'agenzia.' } },
    { name: 'Eleonora Bassetto',    role: 'Social Manager Senior | Account',           color: '#f472b6', avatar: '/images/team/eleonora.jpg',   tag: 'Senior',  stats: { xp: '5+ Anni', stat1: 'Gestione Clienti', stat2: 'Social PR', bio: 'Coordina i progetti con precisione, garantendo il massimo livello di servizio ai clienti.' } },
    { name: 'Rebecca Gatto',        role: 'Social Manager Senior | Account',           color: '#f472b6', avatar: '/images/team/rebecca.jpg',    tag: 'Senior',  stats: { xp: '5+ Anni', stat1: 'Content Strategy', stat2: 'Copywriting', bio: 'Crea narrazioni coinvolgenti che danno voce e personalità ai brand sui social.' } },
    { name: 'Valeria Messinese',    role: 'Social Manager Senior | Account',           color: '#f472b6', avatar: '/images/team/valeria.jpg',    tag: 'Senior',  stats: { xp: '5+ Anni', stat1: 'Social Strategy', stat2: 'Community', bio: 'Sviluppa strategie social orientate all\'engagement e alla crescita delle community.' } },
    { name: 'Daniela Fallara',      role: 'Graphic Designer',                          color: '#60a5fa', avatar: '/images/team/daniela.jpg',    tag: 'Design',  stats: { xp: '4+ Anni', stat1: 'Visual Design', stat2: 'Branding', bio: 'Traduce le idee in identità visive forti, moderne e memorabili.' } },
    { name: 'Lorenzo Francesconi',  role: 'Graphic Designer',                          color: '#60a5fa', avatar: '/images/team/lorenzo.jpg',    tag: 'Design',  stats: { xp: '4+ Anni', stat1: 'UI/UX Design', stat2: 'Illustrazione', bio: 'Progetta esperienze utente intuitive con un occhio attento all\'estetica.' } },
    { name: 'Enxhi Gjashta',        role: 'Graphic Designer',                          color: '#60a5fa', avatar: '/images/team/enxhi.jpg',      tag: 'Design',  stats: { xp: '3+ Anni', stat1: 'Motion Graphics', stat2: 'Layout', bio: 'Dà vita ai pixel creando design dinamici e animazioni fluide.' } },
    { name: 'Giulia Tarricone',     role: 'Social Manager Junior',                     color: '#34d399', avatar: '/images/team/giulia.jpg',     tag: 'Team',    stats: { xp: '2+ Anni', stat1: 'Trend Analysis', stat2: 'Video Edit', bio: 'Scova le ultime tendenze e crea contenuti social freschi e virali.' } },
    { name: 'Denise Cianflone',     role: 'Social Manager Junior',                     color: '#34d399', avatar: '/images/team/denise.jpg',     tag: 'Team',    stats: { xp: '2+ Anni', stat1: 'Social Ads', stat2: 'Reporting', bio: 'Analizza i dati e ottimizza i contenuti per massimizzare la reach organica e paid.' } },
    { name: 'Giada Morena',         role: 'Social Manager Junior',                     color: '#34d399', avatar: '/images/team/giada.jpg',      tag: 'Team',    stats: { xp: '2+ Anni', stat1: 'Creatività', stat2: 'Engagement', bio: 'Sviluppa idee creative per campagne social che catturano l\'attenzione.' } },
    { name: 'Luca Ena',             role: 'Web Developer Manager',                     color: '#818cf8', avatar: '/images/team/luca.jpg',       tag: 'Dev',     stats: { xp: '8+ Anni', stat1: 'Full Stack', stat2: 'Performance', bio: 'Costruisce architetture web veloci, sicure e scalabili per ogni tipo di progetto.' } },
];

// Float animation durations per card (for staggered bobbing)
const FLOAT_DURATIONS = [3.2, 2.8, 3.6, 3.0, 2.6, 3.4, 2.9, 3.7, 3.1, 2.7, 3.3, 3.9, 2.5];
const FLOAT_DELAYS    = [0.0, 0.5, 1.0, 0.3, 0.8, 0.2, 0.7, 0.1, 0.6, 0.4, 0.9, 0.15, 0.55];

// --- Playful 3D Tilt Card ---
function TeamCard({ member, index }: { member: typeof staticTeam[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const rafRef  = useRef<number>(0);
    const rotRef  = useRef({ x: 0, y: 0 });

    const targetRef = useRef({ x: 0, y: 0 });

    const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width  / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        
        const tiltFactor = 12;
        targetRef.current.x = -dy * tiltFactor;
        targetRef.current.y =  dx * tiltFactor;

        cancelAnimationFrame(rafRef.current);
        const animate = () => {
            const distX = targetRef.current.x - rotRef.current.x;
            const distY = targetRef.current.y - rotRef.current.y;
            rotRef.current.x += distX * 0.12;
            rotRef.current.y += distY * 0.12;
            
            if (el) {
                el.style.transform = `perspective(1000px) rotateX(${rotRef.current.x}deg) rotateY(${rotRef.current.y}deg) scale(1.04)`;
            }
            
            if (Math.abs(distX) > 0.05 || Math.abs(distY) > 0.05) {
                rafRef.current = requestAnimationFrame(animate);
            }
        };
        animate();
    }, []);

    const onMouseLeave = useCallback(() => {
        cancelAnimationFrame(rafRef.current);
        const el = cardRef.current;
        if (!el) return;
        const reset = () => {
            rotRef.current.x *= 0.85;
            rotRef.current.y *= 0.85;
            if (el) el.style.transform = `perspective(1000px) rotateX(${rotRef.current.x}deg) rotateY(${rotRef.current.y}deg) scale(1)`;
            if (Math.abs(rotRef.current.x) > 0.05 || Math.abs(rotRef.current.y) > 0.05) {
                rafRef.current = requestAnimationFrame(reset);
            } else {
                if (el) el.style.transform = '';
            }
        };
        reset();
    }, []);

    return (
        <motion.div
            className={styles.cardWrapper}
            data-tag={member.tag}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: Math.min(index * 0.08, 0.8), ease: [0.22, 1, 0.36, 1] }}
            style={{
                // CSS custom props for the float keyframe timing
                ['--float-dur' as string]: `${FLOAT_DURATIONS[index % FLOAT_DURATIONS.length]}s`,
                ['--float-delay' as string]: `${FLOAT_DELAYS[index % FLOAT_DELAYS.length]}s`,
            }}
        >
            <div
                ref={cardRef}
                className={styles.jsTiltContainer}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
            >
                <div className={styles.flipper}>
                    
                    {/* --- FRONT OF CARD --- */}
                    <div className={styles.front} data-tag={member.tag} style={{ '--accent': member.color } as React.CSSProperties}>
                        <span className={styles.roleTag}>
                            {member.tag}
                        </span>

                        <div className={styles.photo}>
                            <Image
                                src={member.avatar}
                                alt={member.name}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                                className={styles.photoImg}
                            />
                            <div className={styles.photoGradient} />
                        </div>

                        <div className={styles.info}>
                            <h3 className={styles.name}>{member.name}</h3>
                            <p className={styles.role}>{member.role}</p>
                        </div>
                        <div className={styles.shine} />
                    </div>

                    {/* --- BACK OF CARD (Stats) --- */}
                    <div className={styles.back} style={{ '--accent': member.color } as React.CSSProperties}>
                        <div className={styles.statsHeader}>
                            <div className={styles.statsLevel}>EXPERT</div>
                            <div className={styles.statsRole}>{member.tag}</div>
                        </div>
                        <p className={styles.statsBio}>"{member.stats.bio}"</p>
                        <div className={styles.statsGrid}>
                            <div className={styles.statItem}>
                                <span className={styles.statLabel}>ESPERIENZA</span>
                                <span className={styles.statValue}>{member.stats.xp}</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statLabel}>SKILL 1</span>
                                <span className={styles.statValue}>{member.stats.stat1}</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statLabel}>SKILL 2</span>
                                <span className={styles.statValue}>{member.stats.stat2}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
}

// --- Main Section ---
export default function TeamSection({ initialBio, initialImage }: { initialBio?: string; initialImage?: string }) {
    const [bio, setBio] = useState(initialBio || 'Un team multidisciplinare di esperti uniti da un unico obiettivo: trasformare la complessità digitale in opportunità di crescita misurabili.');
    const cleanInitialImage = (initialImage && initialImage !== '/team-placeholder.jpg') ? initialImage : null;
    const [teamImage, setTeamImage] = useState<string | null>(cleanInitialImage);

    useEffect(() => {
        const hasRealImage = initialImage && initialImage !== '/team-placeholder.jpg';
        if (initialBio && hasRealImage) return;
        fetch('/api/site-config')
            .then(r => r.ok ? r.json() : {})
            .then((data: { team?: { bio?: string; image?: string } }) => {
                if (data.team?.bio) setBio(data.team.bio);
                if (data.team?.image && data.team.image !== '/team-placeholder.jpg') setTeamImage(data.team.image);
            })
            .catch(() => {});
    }, [initialBio, initialImage]);

    return (
        <section id="chi-siamo" className={styles.section}>
            <div className={styles.container}>

                {/* Header */}
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.label}>Il Nostro Team</span>
                    <h2 className={styles.title}>CHI SIAMO</h2>
                    <p className={styles.bio}>{bio}</p>
                </motion.div>

                {/* Optional team photo */}
                {teamImage && (
                    <motion.div
                        className={styles.teamPhoto}
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <Image src={teamImage} alt="Il team di W[r]Digital" fill style={{ objectFit: 'cover' }} />
                    </motion.div>
                )}

                {/* Team grid */}
                <div className={styles.grid}>
                    {staticTeam.map((member, i) => (
                        <TeamCard key={i} member={member} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

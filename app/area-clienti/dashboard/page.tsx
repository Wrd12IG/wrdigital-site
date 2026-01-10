'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './page.module.css';
import { FileText, Folder, BarChart, Hand, MessageCircle } from 'lucide-react';

interface DriveFile {
    id: string;
    name: string;
    mimeType: string;
    size: string;
    modifiedTime: string;
    webViewLink: string;
    iconLink: string;
}

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [files, setFiles] = useState<DriveFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDemo, setIsDemo] = useState(false);

    // State per la navigazione
    const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
    const [folderStack, setFolderStack] = useState<{ id: string, name: string }[]>([]);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/area-clienti');
        }
    }, [status, router]);

    useEffect(() => {
        if (session) {
            // Se siamo alla root, currentFolderId è null
            fetchFiles(currentFolderId);
        }
    }, [session, currentFolderId]);

    const fetchFiles = async (folderId: string | null) => {
        setLoading(true);
        try {
            const url = folderId
                ? `/api/drive/files?folderId=${folderId}`
                : '/api/drive/files';

            const res = await fetch(url);
            const data = await res.json();

            if (data.files) {
                setFiles(data.files);
                setIsDemo(data.isDemo);
            }
        } catch (error) {
            console.error('Errore caricamento file:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileClick = (file: DriveFile) => {
        if (file.mimeType.includes('folder')) {
            // Naviga dentro la cartella
            setFolderStack(prev => [...prev, { id: file.id, name: file.name }]);
            setCurrentFolderId(file.id);
        } else {
            // Scarica il file via Proxy
            // Apre in una nuova finestra che triggera il download e si chiude
            window.open(`/api/drive/download?fileId=${file.id}`, '_blank');
        }
    };

    const handleGoBack = () => {
        if (folderStack.length === 0) return;

        const newStack = [...folderStack];
        newStack.pop(); // Rimuovi corrente

        setFolderStack(newStack);
        // Se stack vuoto, torna a root (null), altrimenti all'ultimo
        const prevFolderId = newStack.length > 0 ? newStack[newStack.length - 1].id : null;
        setCurrentFolderId(prevFolderId);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('it-IT', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const getFileIcon = (mimeType: string) => {
        if (mimeType.includes('folder')) {
            return (
                <svg viewBox="0 0 24 24" fill="currentColor" className={styles.fileIconSvg}>
                    <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
                </svg>
            );
        }
        if (mimeType.includes('pdf')) {
            return <span className={styles.fileIconText}>PDF</span>;
        }
        if (mimeType.includes('sheet') || mimeType.includes('excel')) {
            return <span className={`${styles.fileIconText} ${styles.excel}`}>XLS</span>;
        }
        if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) {
            return <span className={`${styles.fileIconText} ${styles.ppt}`}>PPT</span>;
        }
        if (mimeType.includes('document') || mimeType.includes('word')) {
            return <span className={`${styles.fileIconText} ${styles.doc}`}>DOC</span>;
        }
        if (mimeType.includes('image')) {
            return <span className={`${styles.fileIconText} ${styles.img}`}>IMG</span>;
        }
        return <span className={styles.fileIconText}>FILE</span>;
    };

    // Count file types for stats
    const getStats = () => {
        const folders = files.filter(f => f.mimeType.includes('folder')).length;
        const documents = files.filter(f => !f.mimeType.includes('folder')).length;
        return { folders, documents, total: files.length };
    };

    if (status === 'loading' || loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loaderWrapper}>
                    <div className={styles.loader} />
                    <p>Caricamento...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    const stats = getStats();

    return (
        <div className={styles.container}>
            <div className={styles.bgGradient} />

            <main className={styles.main}>
                {/* Header */}
                <motion.header
                    className={styles.header}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className={styles.headerLeft}>
                        <h1 className={styles.logo}>
                            W<span className={styles.accent}>[r]</span>Digital
                        </h1>
                        <span className={styles.divider}>|</span>
                        <span className={styles.areaLabel}>Area Clienti</span>
                    </div>
                    <div className={styles.headerRight}>
                        {(session.user as any)?.role === 'admin' && (
                            <button
                                onClick={() => router.push('/admin')}
                                className="mr-4 px-4 py-2 bg-purple-600/20 text-purple-400 border border-purple-600/50 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-purple-600/30 transition-all"
                            >
                                Control Room
                            </button>
                        )}
                        <span className={styles.userName}>
                            Ciao, <strong>{session.user?.name}</strong>
                        </span>
                        <button
                            onClick={() => signOut({ callbackUrl: '/area-clienti' })}
                            className={styles.logoutButton}
                        >
                            Esci
                        </button>
                    </div>
                </motion.header>

                {/* Welcome Section */}
                <motion.section
                    className={styles.welcomeSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h2 className={styles.welcomeTitle}>
                        Benvenuto, <span className={styles.highlight}>{session.user?.name?.split(' ')[0]}</span>! <Hand className="w-5 h-5 inline-block" />
                    </h2>
                    <p className={styles.welcomeSubtitle}>
                        Qui trovi tutti i tuoi documenti, report e materiali condivisi dal team W<span className={styles.accent}>[</span><span style={{ color: '#FFFFFF' }}>r</span><span className={styles.accent}>]</span>Digital.
                    </p>

                    {/* Quick Stats */}
                    <div className={styles.quickStats}>
                        <div className={styles.statCard}>
                            <FileText className="w-8 h-8" />
                            <div className={styles.statInfo}>
                                <span className={styles.statNumber}>{stats.documents}</span>
                                <span className={styles.statLabel}>Documenti</span>
                            </div>
                        </div>
                        <div className={styles.statCard}>
                            <Folder className="w-8 h-8" />
                            <div className={styles.statInfo}>
                                <span className={styles.statNumber}>{stats.folders}</span>
                                <span className={styles.statLabel}>Cartelle</span>
                            </div>
                        </div>
                        <div className={styles.statCard}>
                            <BarChart className="w-8 h-8" />
                            <div className={styles.statInfo}>
                                <span className={styles.statNumber}>{stats.total}</span>
                                <span className={styles.statLabel}>Totale File</span>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Content */}
                <motion.section
                    className={styles.content}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className={styles.contentHeader}>
                        <div className="flex items-center gap-4">
                            {folderStack.length > 0 && (
                                <button
                                    onClick={handleGoBack}
                                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors flex items-center justify-center text-white"
                                    title="Indietro"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                                </button>
                            )}
                            <div>
                                <h2>{folderStack.length > 0 ? folderStack[folderStack.length - 1].name : 'I tuoi documenti'}</h2>
                                {folderStack.length > 0 && <span className="text-xs text-gray-400 block mt-1">Navigazione Sicura</span>}
                            </div>
                        </div>
                        {isDemo && (
                            <span className={styles.demoBadge}>
                                Modalità Demo
                            </span>
                        )}
                    </div>

                    {files.length === 0 ? (
                        <div className={styles.emptyState}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                            <p>Cartella vuota</p>
                            <span>Non ci sono file in questa cartella.</span>
                        </div>
                    ) : (
                        <div className={styles.filesGrid}>
                            <AnimatePresence mode='wait'>
                                {files.map((file, index) => (
                                    <motion.div
                                        key={file.id}
                                        onClick={() => handleFileClick(file)}
                                        className={`${styles.fileCard} cursor-pointer hover:border-purple-500/50 transition-all`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ y: -4, scale: 1.02 }}
                                        role="button"
                                    >
                                        <div className={styles.fileIcon}>
                                            {getFileIcon(file.mimeType)}
                                        </div>
                                        <div className={styles.fileInfo}>
                                            <h3 className={styles.fileName}>{file.name}</h3>
                                            <div className={styles.fileMeta}>
                                                <span>{file.size}</span>
                                                <span>•</span>
                                                <span>{formatDate(file.modifiedTime)}</span>
                                            </div>
                                        </div>
                                        <div className={styles.fileAction}>
                                            {file.mimeType.includes('folder') ? (
                                                <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                                            ) : (
                                                <svg className="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                                    <polyline points="7 10 12 15 17 10" />
                                                    <line x1="12" y1="15" x2="12" y2="3" />
                                                </svg>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </motion.section>

                {/* Help Banner */}
                <motion.div
                    className={styles.helpBanner}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <MessageCircle className="w-6 h-6" />
                    <div className={styles.helpContent}>
                        <h4>Hai bisogno di aiuto?</h4>
                        <p>
                            Per qualsiasi domanda sui tuoi documenti o report, scrivici a{' '}
                            <a href="mailto:info@wrdigital.it">info@wrdigital.it</a>
                        </p>
                    </div>
                </motion.div>

                {/* Footer */}
                <footer className={styles.footer}>
                    <p>© {new Date().getFullYear()} W[r]Digital. Tutti i diritti riservati.</p>
                </footer>
            </main>
        </div>
    );
}

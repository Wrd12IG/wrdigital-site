'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesData } from '@/data/services';
import ServicesManager from '@/components/admin/ServicesManager';
import FAQSuggestionsPanel from '@/components/admin/FAQSuggestionsPanel';
import SeoDashboard from '@/components/admin/SeoDashboard';



import {
    Globe, Save, Search, Target, Sparkles, Bot, Rocket, Smartphone,
    Mail, Lightbulb, Briefcase, FileText, TrendingUp, Monitor, Folder, Home,
    LogOut, Settings, AlertTriangle, Newspaper, ArrowLeft, Star,
    Upload, Video, Facebook as FacebookIcon, Instagram as InstagramIcon, RotateCcw,
    Youtube, Linkedin, Twitter, Music, Link2 as Link, List, Tag, Gem, Calendar, HelpCircle, Check, X, Zap
} from 'lucide-react';

// Icons
const IconHome = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const IconUsers = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const IconFolder = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>;
const IconUpload = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
const IconKey = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>;
const IconTrash = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const IconSettings = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IconImage = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const IconBriefcase = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const IconCog = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IconRocket = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const IconNewspaper = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>;

// Types
interface Project { id?: string; title: string; client: string; category: string; year: string; description: string; results: any[]; tags: string[]; image: string; color: string; showOnHome?: boolean; }
interface Client { name: string; logo: string; url?: string; description?: string; socials?: Record<string, string>; showInSuccessStories?: boolean; selectedSocials?: string[]; }
const defaultProject: Project = { title: '', client: '', category: 'Web Development', year: '2025', description: '', results: [{ label: '', value: '' }], tags: [], image: '/hero-bg.png', color: '#00d4ff', showOnHome: false };

export default function AdminPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Data
    const [users, setUsers] = useState<any[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [siteConfig, setSiteConfig] = useState<any>({
        hero: { title: '', subtitle: '', description: '', stats: { traffic: '', roi: '' } },
        social: { facebook: '', linkedin: '', instagram: '', youtube: '' },
        team: { bio: '', image: '' },
        testimonials: { title: '', subtitle: '', description: '' }
    });
    // NEW DATA STATES
    const [servicesConfig, setServicesConfig] = useState<any>({});
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [faqItems, setFaqItems] = useState<any[]>([]);
    const [faqSuggestions, setFaqSuggestions] = useState<any[]>([]); // NEW: AI FAQ Suggestions
    const [faqSuggestionsLoading, setFaqSuggestionsLoading] = useState(false); // NEW: Loading state
    const [clientsList, setClientsList] = useState<Client[]>([]);

    // Freepik Integration
    const [freepikQuery, setFreepikQuery] = useState('');
    const [freepikResults, setFreepikResults] = useState<any[]>([]);
    const [searchingFreepik, setSearchingFreepik] = useState(false);

    const [seoMeta, setSeoMeta] = useState<any>({});
    const [servicesContent, setServicesContent] = useState<any>({});
    const [blogPosts, setBlogPosts] = useState<any[]>([]);
    const [selectedPost, setSelectedPost] = useState<any | null>(null);
    const [suggestedTrends, setSuggestedTrends] = useState<any[]>([]); // Added
    const [isLoading, setIsLoading] = useState(true);

    // UI State
    const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'site' | 'portfolio' | 'services' | 'testimonials' | 'faq' | 'clients' | 'seo' | 'blog'>('dashboard');
    const [modalUser, setModalUser] = useState(false);
    const [modalPassword, setModalPassword] = useState<{ open: boolean, email: string } & any>({ open: false, email: '' });
    const [modalUpload, setModalUpload] = useState<{ open: boolean, user: any } & any>({ open: false, user: null });
    const [modalProject, setModalProject] = useState<{ open: boolean, project: Project | null }>({ open: false, project: null });

    // Forms
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [passwordData, setPasswordData] = useState('');
    const [fileData, setFileData] = useState<File | null>(null);
    const [projectForm, setProjectForm] = useState<Project>(defaultProject);
    const [projectImageFile, setProjectImageFile] = useState<File | null>(null);

    // Site Config Forms
    const [heroFile, setHeroFile] = useState<File | null>(null);
    const [teamImageFile, setTeamImageFile] = useState<File | null>(null);
    const [analysisStep, setAnalysisStep] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const email = session?.user?.email?.toLowerCase();
    const isAllowed = (session?.user as any)?.role === 'admin' || email === 'roberto@wrdigital.it' || email === 'info@wrdigital.it';

    const [isRefreshing, setIsRefreshing] = useState(false);

    const refreshAllData = async () => {
        setIsRefreshing(true);
        try {
            const [cRes, pRes, bRes] = await Promise.all([
                fetch('/api/admin/clients'),
                fetch('/api/portfolio'),
                fetch('/api/admin/blog')
            ]);
            if (cRes.ok) setClientsList(await cRes.json());
            if (pRes.ok) setProjects(await pRes.json());
            if (bRes.ok) {
                const blogData = await bRes.json();
                setBlogPosts(blogData.posts || blogData);
            }
        } finally { setIsRefreshing(false); }
    };

    useEffect(() => {
        if (status === 'authenticated' && isAllowed) {
            const loadData = async () => {
                try {
                    const [resUsers, resProjects, resConfig, resServices, resTestimonials, resFaq, resClients, resSeo, resBlog] = await Promise.all([
                        fetch('/api/admin/users'),
                        fetch('/api/portfolio'),
                        fetch('/api/site-config'),
                        fetch('/api/admin/services'),
                        fetch('/api/admin/testimonials'),
                        fetch('/api/admin/faq'),
                        fetch('/api/admin/clients'),
                        fetch('/api/admin/seo-meta'),
                        fetch('/api/admin/blog')
                    ]);
                    if (resUsers.ok) setUsers(await resUsers.json());
                    if (resProjects.ok) setProjects(await resProjects.json());
                    if (resConfig.ok) setSiteConfig(await resConfig.json());
                    if (resServices.ok) setServicesConfig(await resServices.json());
                    if (resTestimonials.ok) setTestimonials(await resTestimonials.json());
                    if (resFaq.ok) setFaqItems(await resFaq.json());
                    if (resClients.ok) setClientsList(await resClients.json());
                    if (resBlog.ok) setBlogPosts(await resBlog.json());
                    if (resSeo.ok) {
                        const loadedSeo = await resSeo.json();
                        // Apply Default Schema if missing
                        ['home', 'seo', 'social', 'ads', 'web', 'portfolio', 'contatti'].forEach(key => {
                            if (!loadedSeo[key]) loadedSeo[key] = {};
                            if (!loadedSeo[key].schemaType) {
                                loadedSeo[key].schemaType = key === 'home' ? 'Organization' : 'Service';
                            }
                        });
                        setSeoMeta(loadedSeo);
                    }

                    const resContent = await fetch('/api/admin/services-content');
                    if (resContent.ok) setServicesContent(await resContent.json());
                } catch (err: any) {
                    console.error('Initialization error:', err);
                } finally { setIsLoading(false); }
            };
            loadData();
        }
    }, [status, isAllowed]);


    // --- ACTIONS ---
    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setUsers(await (await fetch('/api/admin/users')).json());
                setModalUser(false);
                setFormData({ name: '', email: '', password: '' });
                alert('Utente creato!');
            } else {
                const data = await res.json();
                alert('Errore: ' + data.error);
            }
        } finally { setIsSubmitting(false); }
    };
    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/admin/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: modalPassword.email, newPassword: passwordData })
            });
            if (res.ok) {
                setModalPassword({ open: false, email: '' });
                setPasswordData('');
                alert('Password aggiornata!');
            } else {
                const data = await res.json();
                alert('Errore: ' + data.error);
            }
        } finally { setIsSubmitting(false); }
    };
    const handleUpload = async (e: React.FormEvent) => { e.preventDefault(); if (!fileData) return; setIsSubmitting(true); const d = new FormData(); d.append('file', fileData); d.append('folderId', modalUpload.user.driveFolderId); try { await fetch('/api/drive/upload', { method: 'POST', body: d }); setModalUpload({ open: false }); alert('Caricato!'); } finally { setIsSubmitting(false); } };
    const handleDeleteUser = async (email: string) => {
        if (!confirm(`Eliminare definitivamente l'utente ${email}?`)) return;
        try {
            const res = await fetch('/api/admin/users', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.toLowerCase() })
            });
            if (res.ok) {
                setUsers(await (await fetch('/api/admin/users')).json());
                alert('Utente eliminato.');
            } else {
                alert('Errore eliminazione.');
            }
        } catch (e) { alert('Errore server.'); }
    };

    // Site Config Actions
    const handleHeroUpload = async (e: React.FormEvent) => { e.preventDefault(); if (!heroFile) return; setIsSubmitting(true); const d = new FormData(); d.append('file', heroFile); try { await fetch('/api/admin/hero-image', { method: 'POST', body: d }); setHeroFile(null); alert('Sfondo Uploaded!'); window.location.reload(); } finally { setIsSubmitting(false); } };

    // AI Generation
    const [aiLoading, setAiLoading] = useState<string | null>(null);
    const handleGenerateAI = async (pageKey: string, type: 'meta' | 'og' | 'faq' | 'article') => {
        setAiLoading(`${pageKey}-${type}`);
        try {
            const res = await fetch('/api/admin/ai-generate', {
                method: 'POST',
                body: JSON.stringify({ pageKey, type })
            });
            const data = await res.json();

            if (type === 'article') {
                setServicesContent((prev: any) => ({
                    ...prev,
                    [pageKey]: {
                        ...(prev[pageKey] || {}),
                        extendedDescription: data.article
                    }
                }));
            } else {
                setSeoMeta((prev: any) => {
                    const currentData = prev[pageKey] || {};
                    let newData = { ...currentData };

                    if (type === 'meta') {
                        newData.title = data.title;
                        newData.description = data.description;
                        newData.keywords = data.keywords;
                    } else if (type === 'og') {
                        newData.ogTitle = data.ogTitle;
                        newData.ogDescription = data.ogDescription;
                    } else if (type === 'faq') { // Fix: Correctly mapping the response 'faqs' to 'pageFaqs'
                        newData.hasFaq = true;
                        newData.pageFaqs = data.faqs;
                    }
                    return { ...prev, [pageKey]: newData };
                });
            }
        } catch (e) {
            alert('AI Generation Error');
        } finally {
            setAiLoading(null);
        }
    };

    const handleHeroReset = async () => { if (confirm('Reset?')) try { await fetch('/api/admin/hero-image', { method: 'DELETE' }); alert('Reset!'); window.location.reload(); } catch (e) { } };

    const handleSaveSiteConfig = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Upload Team Image if new
            let teamImageUrl = siteConfig.team?.image || '';
            if (teamImageFile) {
                const imgData = new FormData(); imgData.append('file', teamImageFile);
                const uploadRes = await fetch('/api/admin/portfolio/upload', { method: 'POST', body: imgData }); // Reuse upload
                if (uploadRes.ok) { const { url } = await uploadRes.json(); teamImageUrl = url; }
            }

            const newConfig = { ...siteConfig, team: { ...siteConfig.team, image: teamImageUrl } };

            const res = await fetch('/api/admin/site-config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newConfig)
            });
            if (res.ok) {
                setSiteConfig(newConfig);
                setTeamImageFile(null);
                alert('Configurazione salvata con successo!');
            }
        } finally { setIsSubmitting(false); }
    };

    // TRENDS MOCK
    const MOCK_TRENDS = [
        { keyword: "AI SEO 2026", volume: "+300%", difficulty: "Medium", topic: "SEO" },
        { keyword: "TikTok B2B Strategy", volume: "+150%", difficulty: "High", topic: "Social" },
        { keyword: "Voice Search Optimization", volume: "+120%", difficulty: "Low", topic: "SEO" },
        { keyword: "React Server Components", volume: "+90%", difficulty: "High", topic: "Web Dev" }
    ];

    const handleAnalyzeTrends = async () => {
        setIsSubmitting(true);
        setAnalysisStep('Connessione AI in corso...');
        try {
            const res = await fetch('/api/admin/ai-generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'trends' })
            });

            // Simulazione step mentre l'AI elabora
            const steps = [
                'Scansione motori di ricerca...',
                'Analisi volumi 2026...',
                'Filtraggio opportunità...',
                'Finalizzazione report...'
            ];

            let i = 0;
            const timer = setInterval(() => {
                if (i < steps.length) setAnalysisStep(steps[i++]);
            }, 1000);

            const data = await res.json();
            clearInterval(timer);

            let trendsArray = [];
            if (Array.isArray(data)) {
                trendsArray = data;
            } else if (data && Array.isArray(data.trends)) {
                trendsArray = data.trends;
            } else if (data && Array.isArray(data.items)) {
                trendsArray = data.items;
            } else {
                console.error('Invalid Data Structure:', data);
                setIsSubmitting(false);
                setAnalysisStep('');
                return;
            }

            setAnalysisStep('Analisi completata!');
            setSuggestedTrends(trendsArray);
            setTimeout(() => {
                setIsSubmitting(false);
                setAnalysisStep('');
            }, 1000);
        } catch (e) {
            setIsSubmitting(false);
            setAnalysisStep('');
            console.error(e);
            alert('Errore durante l\'analisi.');
        }
    };

    const handleCreateFromTrend = async (trend: any) => {
        setIsSubmitting(true);
        setAnalysisStep('Avvio generazione bozza...');
        try {
            setAnalysisStep('Scrittura articolo con AI...');
            const res = await fetch('/api/admin/ai-generate', { method: 'POST', body: JSON.stringify({ type: 'blog-post', topic: trend.keyword }) });
            const data = await res.json();

            setAnalysisStep('Ottimizzazione SEO...');
            const resSeo = await fetch('/api/admin/ai-generate', { method: 'POST', body: JSON.stringify({ type: 'blog-seo', topic: trend.keyword }) });
            const dataSeo = await resSeo.json();

            setAnalysisStep('Salvataggio bozza...');
            const newPost = {
                id: Date.now().toString(),
                title: data.title,
                excerpt: data.excerpt,
                content: data.content,
                category: trend.topic,
                date: new Date().toLocaleDateString('it-IT'),
                readTime: '6 min',
                image: data.image || '/hero-bg.png',
                featured: false,
                status: 'draft',
                metaTitle: dataSeo.metaTitle,
                metaDescription: dataSeo.metaDescription,
                keywords: dataSeo.keywords
            };

            const updated = [...blogPosts, newPost];
            await fetch('/api/admin/blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated) });
            setBlogPosts(updated);
            setSelectedPost(newPost);

            setAnalysisStep('Bozza pronta nell\'editor!');
            setTimeout(() => {
                setIsSubmitting(false);
                setAnalysisStep('');
            }, 1000);
        } catch (e) {
            console.error(e);
            setAnalysisStep('Errore durante la creazione');
            setTimeout(() => {
                setIsSubmitting(false);
                setAnalysisStep('');
            }, 2000);
        }
    };

    const handleGenerateBlogAI = async (field: 'content' | 'seo') => {
        if (!selectedPost) return;
        setIsSubmitting(true);
        try {
            const endpointType = field === 'content' ? 'blog-post' : 'blog-seo';
            const topic = selectedPost.title || selectedPost.category;
            const res = await fetch('/api/admin/ai-generate', { method: 'POST', body: JSON.stringify({ type: endpointType, topic }) });
            const data = await res.json();

            if (field === 'content') {
                setSelectedPost({ ...selectedPost, content: data.content, excerpt: data.excerpt, image: data.image || selectedPost.image });
            } else {
                const generatedTags = typeof data.keywords === 'string' ? data.keywords.split(',').map((k: string) => k.trim()) : (Array.isArray(data.keywords) ? data.keywords : []);
                setSelectedPost({ ...selectedPost, metaTitle: data.metaTitle, metaDescription: data.metaDescription, tags: generatedTags });
            }
        } finally { setIsSubmitting(false); }
    };

    // Blog Handlers
    const handleSaveBlog = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPost) return;

        // Update or Add
        let newPosts = [...blogPosts];
        const idx = newPosts.findIndex(p => p.id === selectedPost.id);
        if (idx !== -1) {
            newPosts[idx] = selectedPost;
        } else {
            newPosts.push({ ...selectedPost, id: Date.now().toString() });
        }

        setIsSubmitting(true);
        try {
            const payload = newPosts.map(p => ({
                ...p,
                published: p.status === 'published',
                date: p.date || new Date().toLocaleDateString('it-IT'),
                readTime: p.readTime || '5 min',
                featured: p.featured || false,
                tags: p.tags || [],
                metaTitle: p.metaTitle,
                metaDescription: p.metaDescription
            }));

            const res = await fetch('/api/admin/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                setBlogPosts(newPosts);
                setSelectedPost(null);
                alert('Articolo salvato!');
            }
        } finally { setIsSubmitting(false); }
    };

    const handleSaveService = async (slug: string, data: any, isDelete = false) => {
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/admin/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug, serviceData: data, deleteSlug: isDelete ? slug : undefined })
            });
            if (res.ok) {
                const updated = await (await fetch('/api/admin/services')).json();
                setServicesConfig(updated);
                if (!isDelete) alert('Landing Page salvata con successo!');
                else alert('Landing Page eliminata.');
            } else {
                alert('Errore durante il salvataggio.');
            }
        } catch (e) {
            alert('Errore di connessione.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteBlogPost = async (id: string) => {
        if (!confirm('Eliminare articolo?')) return;
        const newPosts = blogPosts.filter(p => p.id !== id);
        setIsSubmitting(true);
        try {
            await fetch('/api/admin/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPosts)
            });
            setBlogPosts(newPosts);
            if (selectedPost?.id === id) setSelectedPost(null);
        } finally { setIsSubmitting(false); }
    };

    const handleTogglePublish = async () => {
        if (!selectedPost) return;
        const newStatus = selectedPost.status === 'draft' ? 'published' : 'draft';
        const updatedPost = { ...selectedPost, status: newStatus };
        setSelectedPost(updatedPost);

        const newPosts = [...blogPosts];
        const idx = newPosts.findIndex(p => p.id === updatedPost.id);
        if (idx !== -1) newPosts[idx] = updatedPost;

        setIsSubmitting(true);
        try {
            const payload = newPosts.map(p => ({
                ...p,
                published: p.status === 'published',
                date: p.date || new Date().toLocaleDateString('it-IT'),
                readTime: p.readTime || '5 min',
                featured: p.featured || false,
                tags: p.tags || [],
                metaTitle: p.metaTitle,
                metaDescription: p.metaDescription
            }));

            await fetch('/api/admin/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            setBlogPosts(newPosts);
        } finally { setIsSubmitting(false); }
    };

    // NEW SECTION SAVE HANDLERS
    const handleSaveServices = async () => {
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/admin/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(servicesConfig) });
            if (res.ok) alert('Servizi salvati!');
        } finally { setIsSubmitting(false); }
    };

    const handleSaveTestimonials = async () => {
        const res = await fetch('/api/admin/testimonials', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testimonials)
        });
        return res.ok;
    };

    const handleSaveFaq = async () => {
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/admin/faq', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(faqItems) });
            if (res.ok) alert('FAQ salvate!');
        } finally { setIsSubmitting(false); }
    };

    // NEW: Generate FAQ Suggestions from Google Queries / Topic
    const handleGenerateFaqSuggestions = async (input: { queries?: string[], topic?: string }) => {
        setFaqSuggestionsLoading(true);
        try {
            const res = await fetch('/api/admin/faq-suggestions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(input)
            });

            if (!res.ok) {
                const error = await res.json();
                alert(`Errore: ${error.error || 'Generazione fallita'}`);
                return;
            }

            const data = await res.json();
            setFaqSuggestions(data.suggestions || []);

            if (data.suggestions && data.suggestions.length > 0) {
                alert(`✨ ${data.suggestions.length} suggerimenti FAQ generati con successo!`);
            } else {
                alert('⚠️ Nessun suggerimento generato');
            }
        } catch (error: any) {
            console.error('FAQ Suggestions Error:', error);
            alert('Errore nella generazione dei suggerimenti');
        } finally {
            setFaqSuggestionsLoading(false);
        }
    };

    // NEW: Add suggestion to FAQ list
    const handleAddSuggestionToFaq = (suggestion: any) => {
        const newFaq = {
            id: Date.now().toString(),
            question: suggestion.question,
            answer: suggestion.answer,
            service: 'seo', // Default, can be changed later
            priority: suggestion.priority || 5,
            keywords: suggestion.keywords || []
        };
        setFaqItems([...faqItems, newFaq]);
        // Remove from suggestions
        setFaqSuggestions(faqSuggestions.filter(s => s.question !== suggestion.question));
    };


    const handleSaveClients = async () => {
        setIsSubmitting(true);
        console.log('Saving clients:', clientsList);
        try {
            const res = await fetch('/api/admin/clients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clientsList)
            });
            if (res.ok) {
                alert('✅ Partner salvati correttamente!');
            } else {
                const errData = await res.json();
                alert('❌ Errore durante il salvataggio: ' + (errData.error || 'Errore sconosciuto'));
            }
        } catch (err: any) {
            alert('❌ Errore di connessione: ' + err.message);
        } finally { setIsSubmitting(false); }
    };

    const handleAddClient = () => {
        const newClient = {
            name: '',
            logo: '',
            url: '',
            socials: {},
            selectedSocials: [],
            showInSuccessStories: false
        };
        // Add NEW client at the BEGINNING (not end) so it's immediately visible
        setClientsList(prev => [newClient, ...prev]);
        console.log('✅ Nuovo cliente aggiunto IN CIMA alla lista', newClient);
    };

    const handleSearchFreepik = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!freepikQuery) return;
        setSearchingFreepik(true);
        try {
            const res = await fetch(`/api/admin/freepik?query=${encodeURIComponent(freepikQuery)}`);
            if (res.ok) {
                const data = await res.json();
                if (data.results) setFreepikResults(data.results);
                if (data.warning) alert(data.warning);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSearchingFreepik(false);
        }
    };


    const handleSaveSeo = async () => {
        setIsSubmitting(true);
        try {
            const [resSeo, resContent] = await Promise.all([
                fetch('/api/admin/seo-meta', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(seoMeta) }),
                fetch('/api/admin/services-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(servicesContent) })
            ]);
            if (resSeo.ok && resContent.ok) alert('SEO e Contenuti salvati!');
            else alert('Errore nel salvataggio parziale.');
        } finally { setIsSubmitting(false); }
    };

    // SEO Score Calculator (W[r]Digital 2026 Complete Checklist)
    const calculateSeoScore = (pageData: any, pageKey: string) => {
        if (!pageData) return { score: 0, categories: [], color: 'red' };

        const categories: { name: string; score: number; maxScore: number; items: { label: string; status: 'ok' | 'warn' | 'error'; hint?: string }[] }[] = [];

        // 1. FONDAMENTA TECNICHE (20 punti)
        const techItems: any[] = [];
        let techScore = 0;
        const hasCleanUrl = pageKey && !pageKey.includes('?');
        if (hasCleanUrl) { techScore += 5; techItems.push({ label: 'URL pulita', status: 'ok' }); }
        else { techItems.push({ label: 'URL con parametri', status: 'warn', hint: 'Evita parametri inutili' }); }
        techScore += 5; techItems.push({ label: 'HTTPS attivo', status: 'ok' });
        const hasSchema = pageData.schemaType && pageData.schemaType.length > 0;
        if (hasSchema) { techScore += 10; techItems.push({ label: 'Schema.org configurato', status: 'ok' }); }
        else { techItems.push({ label: 'Schema.org mancante', status: 'error', hint: 'Aggiungi Service, Organization' }); }
        categories.push({ name: 'Fondamenta Tecniche', score: techScore, maxScore: 20, items: techItems });

        // 2. OTTIMIZZAZIONE ON-PAGE (35 punti)
        const onPageItems: any[] = [];
        let onPageScore = 0;
        const titleLen = (pageData.title || '').length;
        if (titleLen >= 50 && titleLen <= 60) { onPageScore += 10; onPageItems.push({ label: `Title ottimale (${titleLen}/60)`, status: 'ok' }); }
        else if (titleLen > 0) { onPageScore += 5; onPageItems.push({ label: `Title: ${titleLen} caratteri`, status: 'warn', hint: '50-60 caratteri ideali' }); }
        else { onPageItems.push({ label: 'Title mancante!', status: 'error' }); }
        const descLen = (pageData.description || '').length;
        const descHasCTA = /scopri|contatta|richiedi|ottieni|inizia/i.test(pageData.description || '');
        if (descLen >= 140 && descLen <= 160) { onPageScore += 10; onPageItems.push({ label: `Description ottimale (${descLen}/160)`, status: 'ok' }); }
        else if (descLen > 0) { onPageScore += 5; onPageItems.push({ label: `Description: ${descLen} caratteri`, status: 'warn', hint: '140-160 caratteri ideali' }); }
        else { onPageItems.push({ label: 'Description mancante!', status: 'error' }); }
        if (descHasCTA) { onPageScore += 5; onPageItems.push({ label: 'Description con CTA', status: 'ok' }); }
        else { onPageItems.push({ label: 'Aggiungi CTA alla Description', status: 'warn', hint: 'Scopri, Contatta, Richiedi' }); }
        const keywords = (pageData.keywords || '').split(',').filter((k: string) => k.trim());
        if (keywords.length >= 5) { onPageScore += 10; onPageItems.push({ label: `${keywords.length} keywords semantiche`, status: 'ok' }); }
        else if (keywords.length > 0) { onPageScore += 5; onPageItems.push({ label: `Solo ${keywords.length} keywords`, status: 'warn', hint: 'Aggiungi termini correlati (5-10)' }); }
        else { onPageItems.push({ label: 'Keywords mancanti!', status: 'error' }); }
        categories.push({ name: "On-Page", score: onPageScore, maxScore: 35, items: onPageItems });

        // 3. SOCIAL & SHARING (20 punti)
        const socialItems: any[] = [];
        let socialScore = 0;
        if ((pageData.ogTitle || '').length > 0) { socialScore += 5; socialItems.push({ label: 'OG Title', status: 'ok' }); }
        else { socialItems.push({ label: 'OG Title mancante', status: 'error' }); }
        if ((pageData.ogDescription || '').length > 0) { socialScore += 5; socialItems.push({ label: 'OG Description', status: 'ok' }); }
        else { socialItems.push({ label: 'OG Description mancante', status: 'error' }); }
        if ((pageData.ogImage || '').length > 0) { socialScore += 10; socialItems.push({ label: 'OG Image', status: 'ok' }); }
        else { socialItems.push({ label: 'OG Image mancante!', status: 'error', hint: 'Fondamentale per social' }); }
        categories.push({ name: "Social", score: socialScore, maxScore: 20, items: socialItems });

        // 4. STRATEGIA 2026 (25 punti)
        const stratItems: any[] = [];
        let stratScore = 0;
        if (pageData.hasFaq) { stratScore += 8; stratItems.push({ label: 'Sezione FAQ', status: 'ok' }); }
        else { stratItems.push({ label: 'Aggiungi FAQ', status: 'warn', hint: 'Intercetta ricerche vocali' }); }
        if (pageData.hasVideo) { stratScore += 7; stratItems.push({ label: 'Video presente', status: 'ok' }); }
        else { stratItems.push({ label: 'Aggiungi video', status: 'warn', hint: 'Aumenta Dwell Time' }); }
        if (pageData.hasInternalLinks) { stratScore += 5; stratItems.push({ label: 'Link interni (Siloing)', status: 'ok' }); }
        else { stratItems.push({ label: 'Link interni mancanti', status: 'warn' }); }
        if (pageData.hasToc) { stratScore += 5; stratItems.push({ label: 'Indice contenuti (TOC)', status: 'ok' }); }
        else { stratItems.push({ label: 'Aggiungi TOC', status: 'warn' }); }
        categories.push({ name: "Strategia 2026", score: stratScore, maxScore: 25, items: stratItems });

        const totalScore = categories.reduce((sum, cat) => sum + cat.score, 0);
        const maxScore = categories.reduce((sum, cat) => sum + cat.maxScore, 0);
        const percentage = Math.round((totalScore / maxScore) * 100);
        const color = percentage >= 80 ? 'green' : percentage >= 50 ? 'yellow' : 'red';
        return { score: percentage, categories, color, totalScore, maxScore };
    };
    const openNewProject = () => { setProjectForm(defaultProject); setProjectImageFile(null); setModalProject({ open: true, project: null }); }
    const openEditProject = (p: Project) => { setProjectForm(p); setProjectImageFile(null); setModalProject({ open: true, project: p }); }
    const handleSaveProject = async (e: React.FormEvent) => {
        e.preventDefault(); setIsSubmitting(true);
        try {
            let img = projectForm.image;
            if (projectImageFile) { const d = new FormData(); d.append('file', projectImageFile); const r = await fetch('/api/admin/portfolio/upload', { method: 'POST', body: d }); if (r.ok) img = (await r.json()).url; }
            const p = { ...projectForm, image: img, tags: (projectForm.tags || []).map((t: string) => t.trim()).filter(Boolean) };
            const r = await fetch('/api/admin/portfolio', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: modalProject.project ? 'update' : 'create', project: p }) });
            if (r.ok) { setProjects(await (await fetch('/api/portfolio')).json()); setModalProject({ open: false, project: null }); alert('Progetto Salvato!'); }
        } finally { setIsSubmitting(false); }
    };
    const handleDeleteProject = async (id: string) => { if (!confirm('Eliminare?')) return; await fetch('/api/admin/portfolio', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'delete', id }) }); setProjects(await (await fetch('/api/portfolio')).json()); };
    const handleToggleHomeProject = async (project: Project) => {
        const updatedProject = { ...project, showOnHome: !project.showOnHome };
        const r = await fetch('/api/admin/portfolio', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'update', project: updatedProject }) });
        if (r.ok) setProjects(await (await fetch('/api/portfolio')).json());
    };


    // --- RENDER ---
    if (status === 'loading') return <div className="min-h-screen bg-black flex items-center justify-center text-white">Verifica in corso...</div>;

    if (status === 'unauthenticated' || !isAllowed) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4 text-center">
                <div className="mb-8">
                    <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                        <AlertTriangle className="w-10 h-10 text-red-500" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Accesso Riservato</h1>
                    <p className="text-gray-400 max-w-md mx-auto">
                        Devi essere autenticato come amministratore per visualizzare questa pagina.
                    </p>
                </div>

                <div className="flex flex-col gap-4 w-full max-w-xs">
                    <button
                        onClick={() => router.push('/area-clienti')}
                        className="bg-white text-black font-bold py-3 px-6 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                    >
                        Vai al Login
                    </button>
                    <button
                        onClick={() => router.push('/')}
                        className="text-gray-400 hover:text-white transition-all text-sm"
                    >
                        Torna alla Home
                    </button>
                </div>
            </div>
        );
    }
    if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Caricamento...</div>;

    const stats = { totalUsers: users.length, connectedDrives: users.filter(u => u.driveFolderId).length };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30">
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 flex min-h-screen">
                {/* Vertical Sidebar */}
                <aside className="w-64 flex-shrink-0 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 fixed h-screen overflow-y-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                            Admin Control
                        </h1>
                        <p className="text-xs text-gray-500 mt-1">W[r]Digital Dashboard</p>
                    </div>

                    {/* Vertical Navigation */}
                    <nav className="space-y-1">
                        <div className="flex gap-4">
                            <button onClick={refreshAllData} disabled={isRefreshing} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                                <RotateCcw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} /> Riprova Sincronizzazione
                            </button>
                        </div>
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-3">Start</div>
                        <TabButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<IconHome />} label="Overview" color="purple" />

                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 mt-4 px-3">Generale</div>
                        <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')} icon={<IconUsers />} label="Dashboard / Utenti" color="purple" />
                        <TabButton active={activeTab === 'site'} onClick={() => setActiveTab('site')} icon={<IconCog />} label="Configurazione Sito" color="blue" />


                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 mt-6 px-3">Contenuti</div>
                        <a
                            href="/admin/editor"
                            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all hover:bg-cyan-500/10 text-gray-300 hover:text-cyan-400 border border-transparent hover:border-cyan-500/30"
                        >
                            <FileText className="w-5 h-5" />
                            <span>✨ CMS Editor V2</span>
                        </a>
                        <TabButton active={activeTab === 'services'} onClick={() => setActiveTab('services')} icon={<IconSettings />} label="Gestione Servizi" color="green" />
                        <TabButton active={activeTab === 'blog'} onClick={() => setActiveTab('blog')} icon={<IconNewspaper />} label="Blog & News" color="orange" />
                        <TabButton active={activeTab === 'portfolio'} onClick={() => setActiveTab('portfolio')} icon={<IconBriefcase />} label="Portfolio" color="pink" />

                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 mt-6 px-3">Elementi</div>
                        <TabButton active={activeTab === 'testimonials'} onClick={() => setActiveTab('testimonials')} icon={<IconUsers />} label="Testimonial" color="yellow" />
                        <TabButton active={activeTab === 'clients'} onClick={() => setActiveTab('clients')} icon={<IconBriefcase />} label="Loghi Partner (HP)" color="indigo" />
                        <TabButton active={activeTab === 'faq'} onClick={() => setActiveTab('faq')} icon={<IconFolder />} label="FAQ & Q&A" color="teal" />
                    </nav>

                    {/* Logout Button at bottom */}
                    <div className="mt-auto pt-8 border-t border-white/10">
                        <button
                            onClick={() => signOut({ callbackUrl: '/area-clienti' })}
                            className="w-full text-sm text-gray-400 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-all text-left"
                        >
                            <LogOut className="w-4 h-4 inline-block mr-1" /> Esci
                        </button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 ml-64 p-8 pt-32">

                    <AnimatePresence mode="wait">
                        {/* DASHBOARD */}
                        {activeTab === 'dashboard' && (
                            <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <SeoDashboard />
                            </motion.div>
                        )}

                        {/* USERS TAB */}
                        {activeTab === 'users' && (
                            <motion.div key="users" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <div className="flex justify-end mb-6"><button onClick={() => setModalUser(true)} className="btn-primary-small">+ Nuovo Cliente</button></div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <StatCard label="Clienti" value={stats.totalUsers} icon={<IconUsers />} />
                                    <StatCard label="Drive" value={stats.connectedDrives} icon={<IconFolder />} color="blue" />
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden p-4">
                                    <table className="w-full text-left text-sm">
                                        <thead className="text-gray-400 uppercase text-xs border-b border-white/5"><tr><th className="p-4">Cliente</th><th className="p-4">Email</th><th className="p-4">Stato</th><th className="p-4 text-right">Azioni</th></tr></thead>
                                        <tbody className="divide-y divide-white/5">{users.map(u => (<tr key={u.id}><td className="p-4 font-bold">{u.name}</td><td className="p-4 text-gray-400">{u.email}</td><td className="p-4">{u.driveFolderId ? <span className="text-green-400">OK</span> : <span className="text-gray-600">-</span>}</td><td className="p-4 text-right flex justify-end gap-2"><IconButton icon={<IconUpload />} onClick={() => setModalUpload({ open: true, user: u })} disabled={!u.driveFolderId} /><IconButton icon={<IconKey />} onClick={() => setModalPassword({ open: true, email: u.email })} /><IconButton icon={<IconTrash />} onClick={() => handleDeleteUser(u.email)} color="red" /></td></tr>))}</tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {/* SITE CONFIG TAB */}
                        {activeTab === 'site' && (
                            <motion.div key="site" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                {/* Hero Background */}
                                <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                                    <h2 className="text-2xl font-bold mb-4 text-yellow-500">Sfondo Hero Section</h2>
                                    <form onSubmit={handleHeroUpload} className="flex gap-4 items-center">
                                        <input type="file" accept="image/*" onChange={e => setHeroFile(e.target.files?.[0] || null)} className="bg-black/50 p-2 rounded-xl text-sm w-full max-w-sm border border-white/10" />
                                        <Button submit loading={isSubmitting} disabled={!heroFile}>Carica Foto</Button>
                                        <button type="button" onClick={handleHeroReset} className="px-4 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30">Ripristina</button>
                                    </form>
                                </div>

                                {/* Favicon & Icon Color */}
                                <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-6">
                                    <h2 className="text-2xl font-bold mb-4 text-yellow-500">Favicon & Icone SVG</h2>

                                    {/* Favicon Upload */}
                                    <div>
                                        <h3 className="text-lg font-bold mb-3 text-blue-400">Favicon del Sito</h3>
                                        <div className="flex gap-4 items-center">
                                            <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 border border-white/10">
                                                {siteConfig.favicon ? (
                                                    <img src={siteConfig.favicon} alt="Favicon" className="w-full h-full object-contain" />
                                                ) : (
                                                    <span className="text-gray-500 text-xs text-center">Nessuna<br />favicon</span>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <input
                                                    type="file"
                                                    accept="image/x-icon,image/png,image/svg+xml"
                                                    onChange={async (e) => {
                                                        const file = e.target.files?.[0];
                                                        if (!file) return;
                                                        const formData = new FormData();
                                                        formData.append('file', file);
                                                        const res = await fetch('/api/admin/portfolio/upload', { method: 'POST', body: formData });
                                                        if (res.ok) {
                                                            const { url } = await res.json();
                                                            setSiteConfig({ ...siteConfig, favicon: url });
                                                        }
                                                    }}
                                                    className="bg-black/50 p-2 rounded-xl text-sm w-full border border-white/10"
                                                />
                                                <p className="text-xs text-gray-500 mt-2">Formato consigliato: ICO, PNG o SVG (32x32px)</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* SVG Icon Color */}
                                    <div className="border-t border-white/10 pt-6">
                                        <h3 className="text-lg font-bold mb-3 text-blue-400">Colore Icone SVG</h3>
                                        <div className="flex gap-4 items-center">
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="color"
                                                    value={siteConfig.iconColor || '#FACC15'}
                                                    onChange={(e) => setSiteConfig({ ...siteConfig, iconColor: e.target.value })}
                                                    className="w-16 h-16 rounded-lg cursor-pointer border-2 border-white/20"
                                                />
                                                <div>
                                                    <p className="text-sm font-bold text-white">{siteConfig.iconColor || '#FACC15'}</p>
                                                    <p className="text-xs text-gray-500">Colore primario delle icone SVG</p>
                                                </div>
                                            </div>
                                            <div className="flex-1 flex gap-2 flex-wrap">
                                                {['#FACC15', '#EC4899', '#22C55E', '#3B82F6', '#8B5CF6', '#F97316', '#10B981'].map(color => (
                                                    <button
                                                        key={color}
                                                        onClick={() => setSiteConfig({ ...siteConfig, iconColor: color })}
                                                        className="w-10 h-10 rounded-lg border-2 hover:scale-110 transition-transform"
                                                        style={{ backgroundColor: color, borderColor: siteConfig.iconColor === color ? '#fff' : 'transparent' }}
                                                        title={color}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mt-4 p-4 bg-black/30 rounded-xl border border-white/10">
                                            <p className="text-xs text-gray-400 mb-3">Preview icone:</p>
                                            <div className="flex gap-4 items-center">
                                                <Rocket className="w-8 h-8" style={{ color: siteConfig.iconColor || '#FACC15' }} />
                                                <Sparkles className="w-8 h-8" style={{ color: siteConfig.iconColor || '#FACC15' }} />
                                                <Target className="w-8 h-8" style={{ color: siteConfig.iconColor || '#FACC15' }} />
                                                <TrendingUp className="w-8 h-8" style={{ color: siteConfig.iconColor || '#FACC15' }} />
                                                <Bot className="w-8 h-8" style={{ color: siteConfig.iconColor || '#FACC15' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* Full Site Config Form */}
                                <form onSubmit={handleSaveSiteConfig} className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-8 relative">
                                    {/* Sticky Save Header */}
                                    <div className="flex justify-between items-center border-b border-white/10 pb-6 sticky top-0 bg-[#0F0F0F] z-20 pt-2 -mt-2">
                                        <h2 className="text-2xl font-bold text-white">Configurazione Sito</h2>
                                        <button type="submit" disabled={isSubmitting} className="bg-white text-black px-6 py-2 rounded-xl font-bold hover:bg-gray-200 transition-all flex items-center gap-2 shadow-lg shadow-white/10">
                                            {isSubmitting ? 'Salvataggio...' : <><Save className="w-4 h-4 inline-block mr-1" /> Salva Tutto</>}
                                        </button>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold mb-4 text-blue-400">Hero Section</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input label="Titolo Principale" value={siteConfig.hero?.title} onChange={(v: any) => setSiteConfig({ ...siteConfig, hero: { ...siteConfig.hero, title: v } })} />
                                            <Input label="Sottotitolo" value={siteConfig.hero?.subtitle} onChange={(v: any) => setSiteConfig({ ...siteConfig, hero: { ...siteConfig.hero, subtitle: v } })} />
                                            <div className="md:col-span-2"><Input label="Descrizione" value={siteConfig.hero?.description} onChange={(v: any) => setSiteConfig({ ...siteConfig, hero: { ...siteConfig.hero, description: v } })} /></div>
                                            <div className="p-4 bg-black/20 rounded-xl border border-white/5 md:col-span-2">
                                                <h3 className="text-sm font-bold text-yellow-500 mb-2">Floating Stats Widget</h3>
                                                <div className="flex gap-4">
                                                    <Input label="Traffic (es +380%)" value={siteConfig.hero?.stats?.traffic} onChange={(v: any) => setSiteConfig({ ...siteConfig, hero: { ...siteConfig.hero, stats: { ...siteConfig.hero.stats, traffic: v } } })} />
                                                    <Input label="ROI (es 2.5x)" value={siteConfig.hero?.stats?.roi} onChange={(v: any) => setSiteConfig({ ...siteConfig, hero: { ...siteConfig.hero, stats: { ...siteConfig.hero.stats, roi: v } } })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-white/10 pt-8">
                                        <h3 className="text-xl font-bold mb-4 text-blue-400">Social Links (Footer)</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input label="Instagram URL" value={siteConfig.social?.instagram} onChange={(v: any) => setSiteConfig({ ...siteConfig, social: { ...siteConfig.social, instagram: v } })} />
                                            <Input label="LinkedIn URL" value={siteConfig.social?.linkedin} onChange={(v: any) => setSiteConfig({ ...siteConfig, social: { ...siteConfig.social, linkedin: v } })} />
                                            <Input label="Facebook URL" value={siteConfig.social?.facebook} onChange={(v: any) => setSiteConfig({ ...siteConfig, social: { ...siteConfig.social, facebook: v } })} />
                                            <Input label="YouTube URL" value={siteConfig.social?.youtube} onChange={(v: any) => setSiteConfig({ ...siteConfig, social: { ...siteConfig.social, youtube: v } })} />
                                        </div>
                                    </div>

                                    <div className="border-t border-white/10 pt-8">
                                        <h3 className="text-xl font-bold mb-4 text-blue-400">Chi Siamo (Team)</h3>
                                        <div className="grid grid-cols-1 gap-6">
                                            <Input label="Bio / Manifesto" value={siteConfig.team?.bio} onChange={(v: any) => setSiteConfig({ ...siteConfig, team: { ...siteConfig.team, bio: v } })} />
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-500 mb-2">Immagine Team (Opzionale)</label>
                                                <input type="file" accept="image/*" onChange={e => setTeamImageFile(e.target.files?.[0] || null)} className="w-full bg-black/50 p-3 rounded-xl border border-white/10 text-sm" />
                                                {siteConfig.team?.image && <p className="text-xs text-gray-500 mt-2">Attuale caricata: {siteConfig.team.image}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {/* PORTFOLIO TAB */}
                        {activeTab === 'portfolio' && (
                            <motion.div key="portfolio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold">Progetti</h2><button onClick={openNewProject} className="btn-primary-small">+ Add Progetto</button></div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {projects.map(p => (
                                        <div key={p.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group">
                                            <img src={p.image} className="h-40 w-full object-cover opacity-60 group-hover:opacity-100" />
                                            <div className="p-4 relative">
                                                <h3 className="font-bold">{p.title}</h3>
                                                <p className="text-xs text-gray-400">{p.client}</p>
                                                <div className="absolute bottom-4 right-4 flex gap-2">
                                                    <button
                                                        onClick={() => handleToggleHomeProject(p)}
                                                        className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${p.showOnHome ? 'bg-green-500 text-white border-green-400' : 'bg-black/50 text-gray-400 border-white/10 hover:bg-white/20'}`}
                                                        title="Pubblica in Homepage"
                                                    >
                                                        <Star className={`w-4 h-4 ${p.showOnHome ? 'fill-current' : ''}`} />
                                                    </button>
                                                    <IconButton icon={<IconSettings />} onClick={() => openEditProject(p)} />
                                                    <IconButton icon={<IconTrash />} onClick={() => p.id && handleDeleteProject(p.id)} color="red" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}




                        {/* SERVICES LP TAB - Dynamic Manager */}
                        {activeTab === 'services' && (
                            <ServicesManager />
                        )}

                        {/* TESTIMONIALS TAB */}
                        {activeTab === 'testimonials' && (
                            <motion.div key="testimonials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-bold">Testimonial</h2>
                                    <div className="flex gap-2">
                                        <button onClick={() => setTestimonials([...testimonials, { id: Date.now().toString(), quote: '', author: '', company: '', result: '', service: 'seo', rating: 5 }])} className="bg-white/10 px-4 py-2 rounded-xl text-sm">+ Aggiungi</button>
                                        <button
                                            onClick={async () => {
                                                setIsSubmitting(true);
                                                try {
                                                    await Promise.all([
                                                        handleSaveTestimonials(),
                                                        fetch('/api/admin/site-config', {
                                                            method: 'POST',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify(siteConfig)
                                                        })
                                                    ]);
                                                    alert('Testimonial e Intestazioni salvati!');
                                                } finally {
                                                    setIsSubmitting(false);
                                                }
                                            }}
                                            disabled={isSubmitting}
                                            className="bg-yellow-500 text-black px-6 py-2 rounded-xl font-bold text-sm"
                                        >
                                            {isSubmitting ? 'Salva...' : <><Save className="w-4 h-4 inline-block mr-1" /> Salva Tutto</>}
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                                    <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Intestazione Sezione</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <Input
                                            label="Sottotitolo (Label)"
                                            value={siteConfig.testimonials?.subtitle || ''}
                                            onChange={(v: any) => setSiteConfig({ ...siteConfig, testimonials: { ...siteConfig.testimonials, subtitle: v } })}
                                        />
                                        <Input
                                            label="Titolo Principale"
                                            value={siteConfig.testimonials?.title || ''}
                                            onChange={(v: any) => setSiteConfig({ ...siteConfig, testimonials: { ...siteConfig.testimonials, title: v } })}
                                        />
                                    </div>
                                    <Input
                                        label="Descrizione Breve (Bio della sezione)"
                                        value={siteConfig.testimonials?.description || ''}
                                        onChange={(v: any) => setSiteConfig({ ...siteConfig, testimonials: { ...siteConfig.testimonials, description: v } })}
                                    />
                                </div>

                                <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Elenco Testimonianze ({testimonials.length})</h3>
                                {testimonials.map((t, i) => (
                                    <div key={t.id || i} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative">
                                        <button onClick={() => setTestimonials(testimonials.filter((_, idx) => idx !== i))} className="absolute top-4 right-4 text-red-400 hover:text-red-300"><X className="w-4 h-4" /></button>
                                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                            <Input label="Autore" value={t.author} onChange={(v: any) => { const arr = [...testimonials]; arr[i].author = v; setTestimonials(arr); }} />
                                            <Input label="Azienda" value={t.company} onChange={(v: any) => { const arr = [...testimonials]; arr[i].company = v; setTestimonials(arr); }} />
                                            <Input label="Risultato" value={t.result} onChange={(v: any) => { const arr = [...testimonials]; arr[i].result = v; setTestimonials(arr); }} />
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-500 mb-2">Rating</label>
                                                <select value={t.rating || 5} onChange={e => { const arr = [...testimonials]; arr[i].rating = parseInt(e.target.value); setTestimonials(arr); }} className="w-full bg-black/50 p-3 rounded-xl border border-white/10 text-sm">
                                                    {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stelle</option>)}
                                                </select>
                                            </div>
                                            <div><label className="block text-xs font-semibold text-gray-500 mb-2">Servizio</label><select value={t.service} onChange={e => { const arr = [...testimonials]; arr[i].service = e.target.value; setTestimonials(arr); }} className="w-full bg-black/50 p-3 rounded-xl border border-white/10 text-sm"><option value="seo">SEO</option><option value="social">Social</option><option value="ads">Ads</option><option value="web">Web</option></select></div>
                                        </div>
                                        <div className="mt-4"><Input label="Citazione" value={t.quote} onChange={(v: any) => { const arr = [...testimonials]; arr[i].quote = v; setTestimonials(arr); }} /></div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {/* FAQ TAB */}
                        {activeTab === 'faq' && (
                            <motion.div key="faq" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-bold">FAQ</h2>
                                    <div className="flex gap-2">
                                        <button onClick={() => setFaqItems([...faqItems, { id: Date.now().toString(), question: '', answer: '', service: 'seo' }])} className="bg-white/10 px-4 py-2 rounded-xl">+ Aggiungi</button>
                                        <button onClick={handleSaveFaq} disabled={isSubmitting} className="bg-orange-500 text-black px-6 py-2 rounded-xl font-bold">{isSubmitting ? 'Salva...' : <><Save className="w-4 h-4 inline-block mr-1" /> Salva</>}</button>
                                    </div>
                                </div>

                                {/* AI Suggestions Panel */}
                                <FAQSuggestionsPanel
                                    suggestions={faqSuggestions}
                                    loading={faqSuggestionsLoading}
                                    onGenerate={handleGenerateFaqSuggestions}
                                    onAddToFaq={handleAddSuggestionToFaq}
                                />

                                {/* Existing FAQ Items */}
                                <div className="space-y-4">
                                    <h3 className="text-md font-bold text-gray-400"><FileText className="w-4 h-4 inline-block mr-1" /> FAQ Esistenti ({faqItems.length})</h3>
                                    {faqItems.map((f, i) => (
                                        <div key={f.id || i} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative">
                                            <button onClick={() => setFaqItems(faqItems.filter((_, idx) => idx !== i))} className="absolute top-4 right-4 text-red-400 hover:text-red-300"><X className="w-4 h-4" /></button>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="md:col-span-2"><Input label="Domanda" value={f.question} onChange={(v: any) => { const arr = [...faqItems]; arr[i].question = v; setFaqItems(arr); }} /></div>
                                                <div><label className="block text-xs font-semibold text-gray-500 mb-2">Servizio</label><select value={f.service} onChange={e => { const arr = [...faqItems]; arr[i].service = e.target.value; setFaqItems(arr); }} className="w-full bg-black/50 p-3 rounded-xl border border-white/10"><option value="seo">SEO</option><option value="social">Social</option><option value="ads">Ads</option><option value="web">Web</option></select></div>
                                            </div>
                                            <div className="mt-4"><Input label="Risposta" value={f.answer} onChange={(v: any) => { const arr = [...faqItems]; arr[i].answer = v; setFaqItems(arr); }} /></div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* CLIENTS MARQUEE TAB */}
                        {activeTab === 'clients' && (
                            <motion.div key="clients" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-bold">Loghi Partner (HP)</h2>
                                    <div className="flex gap-2">
                                        <button onClick={handleAddClient} className="bg-white/10 px-4 py-2 rounded-xl text-sm hover:bg-white/20 transition-colors">+ Aggiungi</button>
                                        <button onClick={handleSaveClients} disabled={isSubmitting} className="bg-cyan-500 text-black px-6 py-2 rounded-xl font-bold text-sm">{isSubmitting ? 'Salva...' : <><Save className="w-4 h-4 inline-block mr-1" /> Salva</>}</button>
                                    </div>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                    <p className="text-sm text-gray-400 mb-4">Gestione manuale dei partner: inserisci il nome del brand e carica il relativo logo.</p>
                                    <div className="space-y-4">
                                        {clientsList.map((c, i) => (
                                            <div key={i} className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-3">
                                                <div className="flex gap-4 items-center">
                                                    {/* Logo Preview */}
                                                    <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 border border-white/20">
                                                        {c.logo ? <img src={c.logo} alt={c.name} className="w-full h-full object-contain p-1" /> : <div className="text-gray-900 text-[10px] font-bold text-center">NESSUN<br />LOGO</div>}
                                                    </div>

                                                    <div className="flex-1 space-y-3">
                                                        <div className="flex gap-4">
                                                            <input
                                                                value={c.name}
                                                                onChange={e => { const arr = [...clientsList]; arr[i] = { ...arr[i], name: e.target.value }; setClientsList(arr); }}
                                                                placeholder="Nome Brand (es. Winblu)"
                                                                className="flex-1 bg-black/50 p-3 rounded-xl border border-white/10"
                                                            />
                                                            <input
                                                                value={(c as any).description || ''}
                                                                onChange={e => { const arr = [...clientsList]; arr[i] = { ...arr[i], description: e.target.value }; setClientsList(arr); }}
                                                                placeholder="Settore / Descrizione breve"
                                                                className="flex-1 bg-black/50 p-3 rounded-xl border border-white/10"
                                                            />
                                                        </div>

                                                        {/* Manual Logo Upload */}
                                                        <div className="flex items-center gap-2">
                                                            <label className="cursor-pointer bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm border border-white/10">
                                                                <Upload className="w-4 h-4 inline-block mr-1" /> Carica Logo
                                                                <input
                                                                    type="file"
                                                                    accept="image/png,image/jpeg,image/svg+xml"
                                                                    className="hidden"
                                                                    onChange={async (e) => {
                                                                        const file = e.target.files?.[0];
                                                                        if (!file) return;
                                                                        const formData = new FormData();
                                                                        formData.append('file', file);
                                                                        const res = await fetch('/api/admin/portfolio/upload', { method: 'POST', body: formData });
                                                                        if (res.ok) {
                                                                            const { url } = await res.json();
                                                                            const arr = [...clientsList];
                                                                            arr[i] = { ...arr[i], logo: url };
                                                                            setClientsList(arr);
                                                                        }
                                                                    }}
                                                                />
                                                            </label>
                                                            {c.logo && <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Logo Caricato ✓</span>}
                                                        </div>
                                                    </div>

                                                    {/* Delete */}
                                                    <button onClick={() => setClientsList(clientsList.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-300 px-3"><X className="w-4 h-4" /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* BLOG TAB */}
                        {
                            activeTab === 'blog' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-bold"><Newspaper className="w-6 h-6 inline-block mr-2" /> Blog Editor & SEO Strategy</h2>
                                        <button
                                            onClick={() => setSelectedPost({ id: Date.now().toString(), title: 'Nuovo Articolo', featured: false, category: 'SEO', excerpt: '', content: '', date: new Date().toLocaleDateString('it-IT'), readTime: '5 min', image: '/hero-bg.png', status: 'draft', tags: [] })}
                                            className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"
                                        >
                                            + Nuovo Manuale
                                        </button>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Sidebar List & Trends */}
                                        <div className="md:w-1/3 space-y-6">
                                            {/* Trends Section */}
                                            <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 p-4 rounded-xl border border-white/10">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h4 className="font-bold text-white flex items-center gap-2">
                                                        <TrendingUp className="w-4 h-4" /> Market Trends
                                                        {isSubmitting && <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-ping"></span>}
                                                    </h4>
                                                    <button
                                                        onClick={handleAnalyzeTrends}
                                                        disabled={isSubmitting}
                                                        className={`text-xs px-2 py-1 rounded transition-colors ${isSubmitting ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-200'}`}
                                                    >
                                                        {isSubmitting ? 'Analisi...' : 'Analizza'}
                                                    </button>
                                                </div>
                                                {isSubmitting ? (
                                                    <div className="py-8 text-center flex flex-col items-center gap-3 animate-pulse">
                                                        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                                        <p className="text-xs font-mono text-purple-300 italic">{analysisStep}</p>
                                                    </div>
                                                ) : suggestedTrends.length === 0 ? (
                                                    <p className="text-xs text-gray-400">Clicca "Analizza" per trovare nuove opportunità SEO basate sui volumi di ricerca.</p>
                                                ) : (
                                                    <div className="space-y-2">
                                                        {suggestedTrends.map((trend, i) => (
                                                            <div key={i} className="bg-black/40 p-3 rounded-lg flex justify-between items-center group">
                                                                <div>
                                                                    <div className="font-bold text-sm text-white">{trend.keyword}</div>
                                                                    <div className="text-[10px] text-green-400">{trend.volume} Vol • {trend.difficulty} Diff</div>
                                                                </div>
                                                                <button onClick={() => handleCreateFromTrend(trend)} className="text-[10px] bg-purple-500 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    Genera Bozza
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Posts List */}
                                            <div className="space-y-3">
                                                <h4 className="font-bold text-gray-400 text-xs uppercase tracking-wider">Articoli Recenti</h4>
                                                {[...blogPosts].reverse().map((post: any) => (
                                                    <div
                                                        key={post.id}
                                                        onClick={() => setSelectedPost(post)}
                                                        className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedPost?.id === post.id ? 'bg-purple-900/20 border-purple-500' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                                                    >
                                                        <div className="flex justify-between items-start mb-1">
                                                            <h4 className="font-bold text-sm line-clamp-1">{post.title}</h4>
                                                            <div className="flex gap-1">
                                                                {post.status === 'draft' && <span className="text-[10px] bg-gray-500 text-white px-1 rounded">DRAFT</span>}
                                                                {post.featured && <span className="text-[10px] bg-yellow-500 text-black px-1 rounded font-bold flex items-center gap-1"><Star className="w-3 h-3 fill-current" /></span>}
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between text-xs text-gray-500">
                                                            <span>{post.date}</span>
                                                            <span>{post.category}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Editor */}
                                        <div className="md:w-2/3 bg-black/20 p-6 rounded-2xl border border-white/10">
                                            {selectedPost ? (
                                                <form onSubmit={handleSaveBlog} className="space-y-4">
                                                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
                                                        <div className="flex items-center gap-3">
                                                            <h3 className="font-bold text-lg">Editor Articolo</h3>
                                                            {selectedPost.status === 'draft' && <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded">BOZZA</span>}
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button type="button" onClick={handleTogglePublish} className={`text-xs px-3 py-1 rounded font-bold ${selectedPost.status === 'draft' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'}`}>
                                                                {selectedPost.status === 'draft' ? 'Pubblica' : 'Riporta a Bozza'}
                                                            </button>
                                                            <button type="button" onClick={() => handleDeleteBlogPost(selectedPost.id)} className="text-red-400 text-sm hover:underline">Elimina</button>
                                                        </div>
                                                    </div>

                                                    <Input label="Titolo" value={selectedPost.title} onChange={(v: string) => setSelectedPost({ ...selectedPost, title: v })} />

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Categoria</label>
                                                            <select
                                                                className="w-full bg-[#222] border border-white/10 p-3 rounded-lg text-white"
                                                                value={selectedPost.category}
                                                                onChange={(e) => setSelectedPost({ ...selectedPost, category: e.target.value })}
                                                            >
                                                                <option>SEO</option>
                                                                <option>Social Media</option>
                                                                <option>Advertising</option>
                                                                <option>Web Dev</option>
                                                                <option>Strategy</option>
                                                                <option>AI & Tech</option>
                                                            </select>
                                                        </div>
                                                        <Input label="Data" value={selectedPost.date} onChange={(v: string) => setSelectedPost({ ...selectedPost, date: v })} />
                                                    </div>

                                                    <div className="bg-purple-900/10 p-4 rounded-xl border border-purple-500/20">
                                                        <div className="flex justify-between items-center mb-3">
                                                            <h4 className="font-bold text-purple-300 text-sm"><Rocket className="w-3 h-3 inline-block mr-1" /> Ottimizzazione SEO</h4>
                                                            <button type="button" onClick={() => handleGenerateBlogAI('seo')} className="text-[10px] bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-400"><Sparkles className="w-3 h-3 inline-block mr-1" /> Genera Meta con AI</button>
                                                        </div>
                                                        <div className="space-y-3">
                                                            <Input label="Meta Title (Max 60 chars)" value={selectedPost.metaTitle} onChange={(v: string) => setSelectedPost({ ...selectedPost, metaTitle: v })} />
                                                            <div>
                                                                <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Meta Description (Max 160 chars)</label>
                                                                <textarea className="w-full bg-[#222] border border-white/10 rounded-lg p-2 text-white h-16 text-xs" value={selectedPost.metaDescription} onChange={(e) => setSelectedPost({ ...selectedPost, metaDescription: e.target.value })} />
                                                            </div>
                                                            <Input
                                                                label="Tags (separati da virgola)"
                                                                value={Array.isArray(selectedPost.tags) ? selectedPost.tags.join(', ') : (selectedPost.tags || '')}
                                                                onChange={(v: string) => setSelectedPost({ ...selectedPost, tags: v.split(',').map(s => s.trim()).filter(Boolean) })}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <Input label="Tempo Lettura" value={selectedPost.readTime} onChange={(v: string) => setSelectedPost({ ...selectedPost, readTime: v })} />
                                                        <div className="flex items-center gap-2 pt-6">
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedPost.featured || false}
                                                                onChange={(e) => setSelectedPost({ ...selectedPost, featured: e.target.checked })}
                                                                className="w-5 h-5 rounded border-gray-600"
                                                            />
                                                            <span className="text-sm font-bold">In Evidenza (Featured)</span>
                                                        </div>
                                                    </div>

                                                    <Input label="Immagine URL" value={selectedPost.image} onChange={(v: string) => setSelectedPost({ ...selectedPost, image: v })} />

                                                    <div>
                                                        <label className="text-xs text-gray-500 uppercase font-bold mb-1 block flex justify-between">
                                                            Contenuto (Markdown)
                                                            <button type="button" onClick={() => handleGenerateBlogAI('content')} className="text-[10px] bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-400"><Sparkles className="w-3 h-3 inline-block mr-1" /> Scrivi Articolo Completo</button>
                                                        </label>
                                                        <textarea
                                                            className="w-full bg-[#111] border border-white/10 rounded-lg p-4 text-white h-96 font-mono text-sm leading-relaxed focus:border-purple-500 outline-none"
                                                            value={selectedPost.content}
                                                            onChange={(e) => setSelectedPost({ ...selectedPost, content: e.target.value })}
                                                            placeholder="# Titolo 1\n\nParagrafo..."
                                                        />
                                                    </div>

                                                    <Button submit><Save className="w-4 h-4 inline-block mr-1" /> Salva Modifiche</Button>
                                                </form>
                                            ) : (
                                                <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-50">
                                                    <ArrowLeft className="w-10 h-10 text-gray-500 mb-2" />
                                                    <p>Seleziona un trend o un articolo</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        }

                    </AnimatePresence >
                </main >
                {/* MODALS REUSED */}
                <Modal isOpen={modalUser} onClose={() => setModalUser(false)} title="Nuovo Cliente">
                    <form onSubmit={handleCreateUser} className="space-y-4">
                        <Input label="Nome" value={formData.name} onChange={(v: any) => setFormData({ ...formData, name: v })} />
                        <Input label="Email" value={formData.email} onChange={(v: any) => setFormData({ ...formData, email: v })} />
                        <Input label="Pass" type="password" value={formData.password} onChange={(v: any) => setFormData({ ...formData, password: v })} />
                        <Button submit loading={isSubmitting}>Crea</Button>
                    </form>
                </Modal>
                <Modal isOpen={modalPassword.open} onClose={() => setModalPassword({ open: false, email: '' })} title={`Cambia Password: ${modalPassword.email}`}>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <Input label="Nuova Password" type="password" value={passwordData} onChange={(v: any) => setPasswordData(v)} />
                        <Button submit loading={isSubmitting}>Aggiorna Password</Button>
                    </form>
                </Modal>
                <Modal isOpen={modalUpload.open} onClose={() => setModalUpload({ open: false })} title="Upload"><form onSubmit={handleUpload} className="space-y-4"><input type="file" onChange={e => setFileData(e.target.files?.[0] || null)} className="w-full bg-white/5 p-3 rounded-lg" /><Button submit disabled={!fileData} loading={isSubmitting}>Upload</Button></form></Modal>
                <Modal isOpen={modalProject.open} onClose={() => setModalProject({ open: false, project: null })} title={modalProject.project ? 'Modifica Progetto' : 'Nuovo Progetto'}>
                    <form onSubmit={handleSaveProject} className="space-y-4 max-h-[80vh] overflow-auto pr-2">
                        {/* Basic Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Titolo Progetto" value={projectForm.title} onChange={(v: any) => setProjectForm({ ...projectForm, title: v })} />
                            <Input label="Nome Cliente" value={projectForm.client} onChange={(v: any) => setProjectForm({ ...projectForm, client: v })} />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Categoria</label>
                                <select className="w-full bg-[#222] border border-white/10 p-3 rounded-lg text-white" value={projectForm.category} onChange={e => setProjectForm({ ...projectForm, category: e.target.value })}>
                                    <option>Web Development</option>
                                    <option>SEO & Content</option>
                                    <option>Social Media</option>
                                    <option>Advertising</option>
                                    <option>Branding</option>
                                    <option>E-Commerce</option>
                                </select>
                            </div>
                            <Input label="Anno" value={projectForm.year} onChange={(v: any) => setProjectForm({ ...projectForm, year: v })} />
                            <div>
                                <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Colore Accent</label>
                                <div className="flex gap-2 items-center">
                                    <input type="color" value={projectForm.color} onChange={e => setProjectForm({ ...projectForm, color: e.target.value })} className="w-12 h-10 rounded cursor-pointer" />
                                    <input type="text" value={projectForm.color} onChange={e => setProjectForm({ ...projectForm, color: e.target.value })} className="flex-1 bg-[#222] border border-white/10 p-3 rounded-lg text-white text-sm" />
                                </div>
                            </div>
                        </div>

                        {/* Visibility Toggle */}
                        <div className="bg-purple-900/20 border border-purple-500/30 p-3 rounded-lg flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${projectForm.showOnHome ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
                                    {projectForm.showOnHome ? <Star className="w-4 h-4 fill-current" /> : <Monitor className="w-4 h-4" />}
                                </div>
                                <div>
                                    <h5 className="text-sm font-bold text-white">Pubblica in Homepage</h5>
                                    <p className="text-[10px] text-gray-400">Se attivo, questo progetto sarà visibile nella sezione Storie di Successo.</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={projectForm.showOnHome || false}
                                    onChange={e => setProjectForm({ ...projectForm, showOnHome: e.target.checked })}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                        </div>

                        {/* Image */}
                        {/* Image Selection with Unsplash Integration */}
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <label className="text-xs text-gray-500 uppercase font-bold mb-3 block">Immagine Copertina</label>

                            <div className="space-y-4">
                                {/* Current Image Preview */}
                                {projectForm.image && (
                                    <div className="relative w-full h-32 rounded-lg overflow-hidden border border-white/10 group">
                                        <img src={projectForm.image} alt="Cover" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-xs font-bold text-white">Attuale</span>
                                        </div>
                                    </div>
                                )}

                                {/* Tabs / Options */}
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Option 1: File Upload */}
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 mb-2 flex items-center gap-1"><Upload className="w-3 h-3" /> Upload Locale</div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => setProjectImageFile(e.target.files?.[0] || null)}
                                            className="w-full bg-[#222] border border-white/10 p-2 rounded-lg text-xs text-gray-400 file:bg-white/10 file:border-0 file:rounded file:px-2 file:py-1 file:text-xs file:text-white"
                                        />
                                    </div>

                                    {/* Option 2: Freepik Search */}
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 mb-2 flex items-center gap-1"><Search className="w-3 h-3" /> Cerca su Freepik</div>
                                        <div className="flex gap-2">
                                            <input
                                                value={freepikQuery}
                                                onChange={e => setFreepikQuery(e.target.value)}
                                                onKeyDown={e => e.key === 'Enter' && handleSearchFreepik(e)}
                                                placeholder="Es: Tech office, Laptop..."
                                                className="flex-1 bg-[#222] border border-white/10 p-2 rounded-lg text-xs text-white outline-none focus:border-purple-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleSearchFreepik}
                                                disabled={searchingFreepik}
                                                className="bg-purple-600 hover:bg-purple-500 text-white px-3 rounded-lg flex items-center justify-center disabled:opacity-50"
                                            >
                                                {searchingFreepik ? <span className="animate-spin text-xs">↻</span> : <Search className="w-3 h-3" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Freepik Results Grid */}
                                {freepikResults.length > 0 && (
                                    <div className="mt-3">
                                        <div className="text-[10px] text-gray-500 mb-2 uppercase tracking-wider font-bold">Risultati Freepik</div>
                                        <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                                            {freepikResults.map((result: any) => (
                                                <div
                                                    key={result.id}
                                                    onClick={() => setProjectForm({ ...projectForm, image: result.urls.regular })}
                                                    className="aspect-video relative rounded-lg overflow-hidden cursor-pointer border border-transparent hover:border-purple-500 group"
                                                >
                                                    <img src={result.urls.small || result.urls.regular} alt={result.alt_description} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <Check className="w-4 h-4 text-white" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Descrizione Progetto</label>
                            <textarea
                                value={projectForm.description}
                                onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
                                className="w-full bg-[#222] border border-white/10 p-3 rounded-lg text-white h-24 resize-none"
                                placeholder="Descrivi il progetto, le sfide affrontate e le soluzioni..."
                            />
                        </div>

                        {/* Results */}
                        <div className="bg-white/5 p-4 rounded-xl space-y-3">
                            <div className="flex justify-between items-center">
                                <label className="text-xs text-gray-400 uppercase font-bold">Risultati (KPI)</label>
                                <button type="button" onClick={() => setProjectForm({ ...projectForm, results: [...projectForm.results, { label: '', value: '' }] })} className="text-xs bg-white/10 px-3 py-1 rounded">+ Aggiungi</button>
                            </div>
                            {projectForm.results.map((r: any, i: number) => (
                                <div key={i} className="flex gap-2 items-center">
                                    <input placeholder="es. +350%" value={r.value || ''} onChange={e => { const arr = [...projectForm.results]; arr[i].value = e.target.value; setProjectForm({ ...projectForm, results: arr }); }} className="w-1/3 bg-[#333] border border-white/10 p-2 rounded text-white text-sm" />
                                    <input placeholder="es. Traffico Organico" value={r.label || ''} onChange={e => { const arr = [...projectForm.results]; arr[i].label = e.target.value; setProjectForm({ ...projectForm, results: arr }); }} className="flex-1 bg-[#333] border border-white/10 p-2 rounded text-white text-sm" />
                                    {projectForm.results.length > 1 && <button type="button" onClick={() => setProjectForm({ ...projectForm, results: projectForm.results.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 px-2"><X className="w-3 h-3" /></button>}
                                </div>
                            ))}
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Tags (separati da virgola)</label>
                            <input
                                type="text"
                                value={(projectForm.tags || []).join(',')}
                                onChange={e => setProjectForm({ ...projectForm, tags: e.target.value.split(',') })}
                                className="w-full bg-[#222] border border-white/10 p-3 rounded-lg text-white"
                                placeholder="Next.js, React, SEO, E-commerce..."
                            />
                        </div>

                        <Button submit><Save className="w-4 h-4 inline-block mr-1" /> Salva Progetto</Button>
                    </form>
                </Modal>

                {/* DB Status Overlay - Reassurance for USER */}
                <div className="fixed bottom-4 left-4 z-[100] bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-xl text-[10px] text-gray-400 font-mono pointer-events-none">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-white font-bold uppercase tracking-wider">Storage Status (DB)</span>
                    </div>
                    <div>Clients: {clientsList.length}</div>
                    <div>Projects: {projects.length}</div>
                    <div>Posts: {blogPosts.length}</div>
                    <div>DB Path: .../prisma/dev.db</div>
                </div>
            </div>
        </div>
    );
}



// UI Components Simplified - Updated Input for uncontrolled fix
function TabButton({ active, onClick, icon, label, color }: any) {
    const colorMap: Record<string, string> = {
        purple: 'bg-purple-600 text-white',
        yellow: 'bg-yellow-500 text-black',
        blue: 'bg-blue-600 text-white',
        green: 'bg-green-600 text-white',
        pink: 'bg-pink-600 text-white',
        orange: 'bg-orange-500 text-black',
        cyan: 'bg-cyan-500 text-black',
        red: 'bg-red-600 text-white'
    };
    const c = active ? (colorMap[color] || 'bg-gray-600 text-white') : 'text-gray-400 hover:text-white';
    return <button onClick={onClick} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all text-sm ${c}`}>{icon} {label}</button>;
}
function StatCard({ label, value, icon, color = 'purple' }: any) { return <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex justify-between"><div><p className="text-gray-400 text-xs">{label}</p><h3 className="text-2xl font-bold">{value}</h3></div><div className={`text-${color}-400`}>{icon}</div></div> }
function IconButton({ icon, onClick, disabled, color }: any) { return <button onClick={onClick} disabled={disabled} className={`p-2 rounded hover:bg-white/10 ${color === 'red' ? 'text-red-500' : ''}`}>{icon}</button> }
function Modal({ isOpen, onClose, title, children }: any) { if (!isOpen) return null; return <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"><div className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-2xl relative"><button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X className="w-4 h-4" /></button><h3 className="text-xl font-bold mb-4">{title}</h3>{children}</div></div> }
function Input({ label, value, onChange, type = 'text' }: any) { return <div><label className="text-xs text-gray-500 uppercase font-bold mb-1 block">{label}</label><input type={type} className="w-full bg-[#222] border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 outline-none" value={value ?? ''} onChange={e => onChange(e.target.value)} /></div> }
function Button({ children, submit, loading, disabled }: any) { return <button type={submit ? 'submit' : 'button'} disabled={loading || disabled} className="w-full bg-white text-black font-bold p-3 rounded-lg hover:bg-gray-200 disabled:opacity-50">{loading ? '...' : children}</button> }

function getWordCount(data: any) {
    if (!data) return 0;
    const text = [data.title, data.description, ...(data.benefits || []).map((b: any) => b.description), ...(data.faq || []).map((f: any) => f.answer)].join(' ');
    return text.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
}

function CheckItem({ label, checked, manual }: any) {
    return (
        <div className={`flex items-center gap-2 p-2 rounded ${checked ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
            <span className={checked ? 'text-green-400' : 'text-red-400'}>{checked ? <Check className="w-3 h-3 inline-block" /> : <X className="w-3 h-3 inline-block" />}</span>
            <span className={`flex-1 ${checked ? 'text-white' : 'text-gray-400'}`}>{label}</span>
            {manual && <span className="text-[10px] text-gray-500 border border-white/10 px-1 rounded">CHECK</span>}
        </div>
    );
}

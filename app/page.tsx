// Server Component
export const revalidate = 0;
import HeroSection from '@/components/HeroSection';
import ParticlesWrapper from '@/components/ParticlesWrapper'; // Wrapper for client-side particles
import FloatingLogos from '@/components/FloatingLogos';
import dynamic from 'next/dynamic';

const CaseStudies = dynamic(() => import('@/components/CaseStudies'));
const Services = dynamic(() => import('@/components/Services'));
const TeamSection = dynamic(() => import('@/components/TeamSection'));
const Testimonials = dynamic(() => import('@/components/Testimonials'));
const Blog = dynamic(() => import('@/components/Blog'));
const DynamicSeoContent = dynamic(() => import('@/components/DynamicSeoContent'));
const Contact = dynamic(() => import('@/components/Contact'));


import { prisma } from '@/lib/prisma';
import staticTestimonials from '@/data/testimonials.json';
import staticClients from '@/data/clients.json';

async function getHomeData() {
  try {
    const [seoConfig, homePage, clients, configs, dbProjects, testimonials, blogPosts] = await Promise.all([
      prisma.siteConfig.findUnique({ where: { key: 'seo-meta' } }),
      prisma.page.findUnique({ where: { slug: 'home' } }),
      prisma.client.findMany({ where: { deleted: false }, orderBy: { order: 'asc' } }),
      prisma.siteConfig.findMany(),
      prisma.project.findMany({ where: { deleted: false }, orderBy: { createdAt: 'desc' } }),
      prisma.testimonial.findMany({ where: { deleted: false }, orderBy: { createdAt: 'desc' } }),
      prisma.blogPost.findMany({ where: { deleted: false, published: true }, orderBy: { createdAt: 'desc' }, take: 10 })
    ]);

    const siteConfig = configs.reduce((acc: Record<string, any>, config: { key: string, value: string }) => {
      try {
        let parsed = JSON.parse(config.value);
        if (typeof parsed === 'string') parsed = JSON.parse(parsed);
        acc[config.key] = parsed;
      } catch (e) {
        acc[config.key] = config.value;
      }
      return acc;
    }, {} as Record<string, any>);

    // Normalize projects with extra safety against double-stringification
    const projects = dbProjects.map(p => {
      let resultsArr: any[] = [];
      try {
        let parsed = typeof p.results === 'string' ? JSON.parse(p.results) : p.results;
        if (typeof parsed === 'string') parsed = JSON.parse(parsed);
        resultsArr = Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        resultsArr = [];
      }

      let tagsArr: string[] = [];
      try {
        let parsed = typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags;
        if (typeof parsed === 'string') parsed = JSON.parse(parsed);
        tagsArr = Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        tagsArr = [];
      }

      return {
        ...p,
        results: resultsArr,
        tags: tagsArr
      };
    });

    let data: any = {};
    let contentOverrides: any = {};

    if (seoConfig) {
      const parsed = JSON.parse(seoConfig.value);
      data = parsed['home'] || {};
    }

    if (homePage) {
      try {
        let parsedContent = JSON.parse(homePage.content);
        if (typeof parsedContent === 'string') parsedContent = JSON.parse(parsedContent); // Handle double-stringification
        contentOverrides['home'] = parsedContent;
      } catch (e) {
        console.error('Error parsing homePage content:', e);
      }
    }

    // Fallback to static data if DB is empty (e.g. production with no DB access)
    const finalTestimonials = testimonials.length > 0
      ? testimonials
      : (staticTestimonials as any[]).filter((t: any) => !t.deleted);
    const finalClients = clients.length > 0
      ? clients
      : (staticClients as any[]).filter((c: any) => !c.deleted);

    return { ...data, contentOverrides, clients: finalClients, siteConfig, projects, testimonials: finalTestimonials, blogPosts };
  } catch (e) {
    console.error('Error fetching home data:', e);
  }
  // On complete DB failure, use static data as fallback
  const fallbackTestimonials = (staticTestimonials as any[]).filter((t: any) => !t.deleted);
  const fallbackClients = (staticClients as any[]).filter((c: any) => !c.deleted);
  return { clients: fallbackClients, siteConfig: {}, projects: [], testimonials: fallbackTestimonials, blogPosts: [] };
}

import AsFeaturedIn from '@/components/AsFeaturedIn';

export default async function Home() {
  const serverTimestamp = Date.now();
  const homeData = await getHomeData();

  return (
    <>
      {/* Animated Background Particles */}
      <ParticlesWrapper />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection
          timestamp={serverTimestamp}
          customTitle={homeData.h1}
          customSubtitle={homeData.h2_intro}
          customAlt={homeData.alt_hero}
          initialConfig={homeData.siteConfig.hero}
        />

        {/* PR and Media Mentions */}
        <AsFeaturedIn />

        {/* Hanno Scelto W[r]Digital - Marquee */}
        <FloatingLogos initialClients={homeData.clients} />

        {/* Case Studies / Storie di Successo */}
        <CaseStudies initialProjects={homeData.projects} />

        {/* Services -> Landing Pages */}
        <Services />

        {/* Chi Siamo / Team */}
        <TeamSection
          initialBio={homeData.siteConfig.team?.bio}
          initialImage={homeData.siteConfig.team?.image}
        />

        {/* Testimonials */}
        <Testimonials
          initialTestimonials={homeData.testimonials}
          initialConfig={homeData.siteConfig.testimonials}
        />

        {/* Blog */}
        <Blog initialPosts={homeData.blogPosts} />

        {/* Dynamic SEO Content (FAQ, Video, Links from Admin) */}
        <DynamicSeoContent
          pageKey="home"
          accentColor="#FACC15"
          initialSeoData={homeData}
          initialContentOverrides={homeData.contentOverrides || {}}
        />

        {/* Contact */}
        <Contact />
      </main>
    </>
  );
}

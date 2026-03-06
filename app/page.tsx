// Server Component
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

async function getHomeData() {
  try {
    const [seoConfig, homePage, clients, configs, dbProjects, testimonials, blogPosts] = await Promise.all([
      prisma.siteConfig.findUnique({ where: { key: 'seo-meta' } }),
      prisma.page.findUnique({ where: { slug: 'home' } }),
      prisma.client.findMany({ where: { deleted: false }, orderBy: { order: 'asc' } }),
      prisma.siteConfig.findMany(),
      prisma.project.findMany({ where: { deleted: false }, orderBy: { createdAt: 'desc' } }),
      prisma.testimonial.findMany({ where: { deleted: false }, orderBy: { createdAt: 'desc' } }),
      prisma.blogPost.findMany({ where: { deleted: false, published: true }, orderBy: { createdAt: 'desc' }, take: 4 })
    ]);

    const siteConfig = configs.reduce((acc: Record<string, any>, config: { key: string, value: string }) => {
      try {
        acc[config.key] = JSON.parse(config.value);
      } catch (e) {
        acc[config.key] = config.value;
      }
      return acc;
    }, {} as Record<string, any>);

    // Normalize projects
    const projects = dbProjects.map(p => ({
      ...p,
      results: typeof p.results === 'string' ? JSON.parse(p.results) : p.results || [],
      tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags || []
    }));

    let data: any = {};
    let contentOverrides: any = {};

    if (seoConfig) {
      const parsed = JSON.parse(seoConfig.value);
      data = parsed['home'] || {};
    }

    if (homePage) {
      try {
        const parsedContent = JSON.parse(homePage.content);
        contentOverrides['home'] = parsedContent;
      } catch (e) { }
    }

    return { ...data, contentOverrides, clients, siteConfig, projects, testimonials, blogPosts };
  } catch (e) {
    console.error('Error fetching home data:', e);
  }
  return { clients: [], siteConfig: {}, projects: [], testimonials: [], blogPosts: [] };
}

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

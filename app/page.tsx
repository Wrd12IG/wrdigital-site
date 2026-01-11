// Server Component
import HeroSection from '@/components/HeroSection';
import ParticlesWrapper from '@/components/ParticlesWrapper'; // Wrapper for client-side particles
import ClientsMarquee from '@/components/ClientsMarquee';
import CaseStudies from '@/components/CaseStudies';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import TeamSection from '@/components/TeamSection';
import Testimonials from '@/components/Testimonials';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import DynamicSeoContent from '@/components/DynamicSeoContent';


import { prisma } from '@/lib/prisma';

async function getHomeData() {
  try {
    const [seoConfig, homePage] = await Promise.all([
      prisma.siteConfig.findUnique({ where: { key: 'seo-meta' } }),
      prisma.page.findUnique({ where: { slug: 'home' } })
    ]);

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

    return { ...data, contentOverrides };
  } catch (e) {
    console.error('Error fetching home data:', e);
  }
  return {};
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
        />

        {/* Hanno Scelto W[r]Digital - Marquee */}
        <ClientsMarquee />

        {/* Case Studies / Storie di Successo */}
        <CaseStudies />

        {/* Services -> Landing Pages */}
        <Services />

        {/* Chi Siamo / Team */}
        <TeamSection />

        {/* Testimonials */}
        <Testimonials />

        {/* Blog */}
        <Blog />

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

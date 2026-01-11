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
    const config = await prisma.siteConfig.findUnique({ where: { key: 'seo-meta' } });
    if (config) {
      const data = JSON.parse(config.value);
      return data['home'] || {};
    }
  } catch (e) { }
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

        {/* Portfolio - Integreted in Case Studies */}
        {/* <Portfolio /> */}

        {/* Chi Siamo / Team */}
        <TeamSection />

        {/* Testimonials */}
        <Testimonials />

        {/* Blog */}
        <Blog />

        {/* Dynamic SEO Content (FAQ, Video, Links from Admin) */}
        <DynamicSeoContent pageKey="home" accentColor="#FACC15" />

        {/* Contact */}
        <Contact />
      </main>
    </>
  );
}

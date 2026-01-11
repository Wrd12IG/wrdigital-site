import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from '@/components/ToastContext';
import { ModalProvider } from '@/components/ModalContext';
import ContactModal from '@/components/ContactModal';
import CookieBanner from '@/components/CookieBanner';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import MicrosoftClarity from '@/components/MicrosoftClarity';
import { Providers } from '@/components/Providers';
import DynamicSiteConfig from '@/components/DynamicSiteConfig';
import MobileStickyCTA from '@/components/MobileStickyCTA';
import FloatingCTA from '@/components/FloatingCTA';
import DynamicFavicon from '@/components/DynamicFavicon';
import StructuredData from '@/components/StructuredData';



import fs from 'fs';
import path from 'path';

import { prisma } from '@/lib/prisma';

async function getSiteConfig() {
  try {
    const configs = await prisma.siteConfig.findMany();
    return configs.reduce((acc: Record<string, any>, config: { key: string, value: string }) => {
      try {
        acc[config.key] = JSON.parse(config.value);
      } catch (e) {
        acc[config.key] = config.value;
      }
      return acc;
    }, {} as Record<string, any>);
  } catch (e) {
    try {
      const filePath = path.join(process.cwd(), 'data/site-config.json');
      if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
      }
    } catch (err) { }
    return { favicon: '/favicon.ico' };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  const favicon = config.favicon || '/favicon.ico';

  return {
    metadataBase: new URL('https://www.wrdigital.it'),
    title: "Agenzia Digital Marketing Milano | ROI Garantito | W[r]Digital",
    description: "Agenzia Digital Marketing a Milano: SEO, SEM, Social Media e Web Development. +300% traffico organico garantito. Consulenza gratuita.",
    keywords: "agenzia digital marketing milano, web agency milano, SEO milano, social media marketing, consulenza digital marketing, agenzia seo milano",
    authors: [{ name: "WR Digital" }],
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: "website",
      url: "https://www.wrdigital.it",
      title: "W[r]Digital | Agenzia Digital Marketing Milano - ROI Garantito",
      description: "Trasformiamo il tuo business con strategie digitali ad alto ROI: SEO, SEM, Social Media e Web Design. +300% traffico organico garantito.",
      siteName: "W[r]Digital",
      images: [{
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "W[r]Digital - Agenzia Digital Marketing Milano",
      }],
      locale: "it_IT",
    },
    twitter: {
      card: "summary_large_image",
      title: "W[r]Digital | Agenzia Digital Marketing Milano",
      description: "Strategie digitali ad alto ROI: SEO, SEM, Social Media. +300% traffico organico. Consulenza gratuita.",
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: favicon,
      apple: favicon,
    },
  };
}


import { Inter, Outfit } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" suppressHydrationWarning className={`${inter.variable} ${outfit.variable}`}>
      <head />
      <body suppressHydrationWarning>
        <DynamicSiteConfig />
        <StructuredData />
        <Providers>
          <ToastProvider>
            <ModalProvider>
              <CustomCursor />
              <Navbar isDarkMode={true} />
              {children}
              <Footer isDarkMode={true} />
              <ContactModal />
              <FloatingCTA />
              <CookieBanner />
              <GoogleAnalytics />
              <MicrosoftClarity />
            </ModalProvider>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}

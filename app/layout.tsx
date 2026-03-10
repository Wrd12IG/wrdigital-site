import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ToastProvider } from '@/components/ToastContext';
import { ModalProvider } from '@/components/ModalContext';
import dynamic from 'next/dynamic';

const CustomCursor = dynamic(() => import('@/components/CustomCursor'));
const CookieBanner = dynamic(() => import('@/components/CookieBanner'));
const FloatingCTA = dynamic(() => import('@/components/FloatingCTA'));
const ContactModal = dynamic(() => import('@/components/ContactModal'));

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import MicrosoftClarity from '@/components/MicrosoftClarity';
import { Providers } from '@/components/Providers';
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
    keywords: "agenzia digital marketing milano, web agency milano, SEO milano, consulenza SEO, realizzazione siti web milano, social media marketing, pubblicità online, google ads milano, lead generation, crescita aziendale",
    authors: [{ name: "WR Digital Team", url: "https://www.wrdigital.it" }],
    creator: "WR Digital",
    publisher: "WR Digital",
    alternates: {
      canonical: '/',
      languages: {
        'it-IT': 'https://www.wrdigital.it',
      },
    },
    openGraph: {
      type: "website",
      url: "https://www.wrdigital.it",
      title: "W[r]Digital | Agenzia Digital Marketing Milano - ROI Garantito",
      description: "Trasformiamo il tuo business con strategie digitali ad alto ROI: SEO, SEM, Social Media e Web Design. +300% traffico organico garantito.",
      siteName: "W[r]Digital",
      images: [{
        url: config.ogImage || "/og-image.png",
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
      images: [config.ogImage || "/og-image.png"],
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

import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'optional',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await getSiteConfig();

  return (
    <html lang="it" suppressHydrationWarning className={inter.variable} style={{ '--icon-color': config?.iconColor || '#eab308' } as React.CSSProperties}>
      <head>
      </head>
      <body suppressHydrationWarning>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TTFQPZFF"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Script
          id="google-tag-manager"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TTFQPZFF');`
          }}
        />
        <StructuredData config={config} />
        <Providers>
          <ToastProvider>
            <ModalProvider>
              <CustomCursor />
              <Navbar isDarkMode={true} logo={config.logo} />
              {children}
              <Footer isDarkMode={true} logo={config.logo} />
              <ContactModal />
              <FloatingCTA />
              <CookieBanner />
              <GoogleAnalytics />
              <MicrosoftClarity />
              <SpeedInsights />
            </ModalProvider>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}

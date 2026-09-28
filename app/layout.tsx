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
const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'));
const GoogleTagManager = dynamic(() => import('@/components/GoogleTagManager'));
const Footer = dynamic(() => import('@/components/Footer'));
const GoogleAnalytics = dynamic(() => import('@/components/GoogleAnalytics'));
const MicrosoftClarity = dynamic(() => import('@/components/MicrosoftClarity'));

import Navbar from '@/components/Navbar';
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
    title: "Agenzia Digital Marketing a Monza e Milano | WR Digital",
    description: "Agenzia digital marketing a Monza e Milano: SEO, Google Ads, social media e siti web per PMI, con risultati misurati e report chiari. Preventivo gratuito.",
    authors: [{ name: "WR Digital", url: "https://www.wrdigital.it" }],
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
      title: "Agenzia Digital Marketing a Monza e Milano | WR Digital",
      description: "Agenzia digital marketing a Monza e Milano: SEO, Google Ads, social media e siti web per PMI, con risultati misurati e report chiari. Preventivo gratuito.",
      siteName: "WR Digital",
      images: [{
        url: config.ogImage || "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WR Digital - Agenzia Digital Marketing Monza e Milano",
      }],
      locale: "it_IT",
    },
    twitter: {
      card: "summary_large_image",
      title: "Agenzia Digital Marketing a Monza e Milano | WR Digital",
      description: "SEO, Google Ads, social media e siti web per PMI a Monza e Milano, con risultati misurati e report chiari. Preventivo gratuito.",
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
    verification: {
      google: "MbjmW_1P52VYzSgD6Po3oPxWWakpSkU8UNKoPOuz5o4",
    },
  };
}

import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
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
        {/* Leadfeeder – company visitor identification */}
        <Script
          id="leadfeeder-tracker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(ss,ex){ window.ldfdr=window.ldfdr||function(){(ldfdr._q=ldfdr._q||[]).push([].slice.call(arguments));}; (function(d,s){ fs=d.getElementsByTagName(s)[0]; function ce(src){ var cs=d.createElement(s); cs.src=src; cs.async=1; fs.parentNode.insertBefore(cs,fs); }; ce('https://sc.lfeeder.com/lftracker_v1_'+ss+(ex?'_'+ex:'')+'.js'); })(document,'script'); })('YEgkB8lbb2w4ep3Z');`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ScrollProgress />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TTFQPZFF"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
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
              <GoogleTagManager />
              <SpeedInsights />
            </ModalProvider>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}

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



export const metadata: Metadata = {
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
      url: "/og-image.jpg", // Make sure this image actually exists or is handled
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
    icon: '/favicon.ico',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <DynamicSiteConfig />
        <DynamicFavicon />
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
              <MobileStickyCTA />
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

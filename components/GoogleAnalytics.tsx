'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const GA_MEASUREMENT_ID = 'G-9S4Q8TPFDS';

export default function GoogleAnalytics() {
    const [consentGiven, setConsentGiven] = useState(false);

    useEffect(() => {
        const checkConsent = () => {
            const saved = localStorage.getItem('wrdigital-cookie-consent');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    if (parsed.statistics === true) {
                        setConsentGiven(true);
                    } else {
                        setConsentGiven(false);
                    }
                } catch (e) {
                    setConsentGiven(false);
                }
            } else {
                setConsentGiven(false);
            }
        };

        checkConsent();
        window.addEventListener('cookie-consent-update', checkConsent);
        return () => window.removeEventListener('cookie-consent-update', checkConsent);
    }, []);

    // Always render a container to keep DOM stable
    return (
        <div id="ga-container" style={{ display: 'none' }}>
            {consentGiven && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="lazyOnload">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());

                            gtag('config', '${GA_MEASUREMENT_ID}', {
                                page_path: window.location.pathname,
                            });
                        `}
                    </Script>
                </>
            )}
        </div>
    );
}

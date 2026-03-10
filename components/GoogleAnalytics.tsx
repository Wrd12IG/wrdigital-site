'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const GA_IDS = ['G-YTDQN2FZZ4', 'G-9S4Q8TPFDS', 'GT-TWTRG3B', 'G-YGRJH93RJW'];

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
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_IDS[0]}`}
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="lazyOnload">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());

                            ${GA_IDS.map(id => `gtag('config', '${id}', { page_path: window.location.pathname });`).join('\n')}

                            window.gtagSendEvent = function(url) {
                                var callback = function () {
                                    if (typeof url === 'string') {
                                        window.location = url;
                                    }
                                };
                                gtag('event', 'conversion_event_contact', {
                                    'event_callback': callback,
                                    'event_timeout': 2000
                                });
                                return false;
                            }
                        `}
                    </Script>
                </>
            )}
        </div>
    );
}

'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const CLARITY_ID = 'pgbrsow8bb';

export default function MicrosoftClarity() {
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

    return (
        <div id="clarity-container" style={{ display: 'none' }}>
            {consentGiven && (
                <Script id="microsoft-clarity" strategy="lazyOnload">
                    {`
                    (function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    })(window, document, "clarity", "script", "${CLARITY_ID}");
                `}
                </Script>
            )}
        </div>
    );
}

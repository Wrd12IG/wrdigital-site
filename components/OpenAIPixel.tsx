'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const OPENAI_PIXEL_ID = 'TPnWCpvXSkqBANbNHeu7in';

// OpenAI Ads pixel: caricato solo con consenso marketing (stessa logica di MarketingPixels)
export default function OpenAIPixel() {
    const [consentGiven, setConsentGiven] = useState(false);

    useEffect(() => {
        const checkConsent = () => {
            try {
                const saved = localStorage.getItem('wrdigital-cookie-consent');
                setConsentGiven(saved ? JSON.parse(saved).marketing === true : false);
            } catch {
                setConsentGiven(false);
            }
        };

        checkConsent();
        window.addEventListener('cookie-consent-update', checkConsent);
        return () => window.removeEventListener('cookie-consent-update', checkConsent);
    }, []);

    if (!consentGiven) return null;

    return (
        <Script id="openai-pixel" strategy="afterInteractive">
            {`!function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f)}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");oaiq("init",{pixelId:"${OPENAI_PIXEL_ID}",debug:true});`}
        </Script>
    );
}

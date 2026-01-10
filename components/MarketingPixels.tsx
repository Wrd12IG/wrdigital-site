'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

// REPLACE THESE WITH REAL IDs
const META_PIXEL_ID = 'YOUR_META_PIXEL_ID';
const LINKEDIN_PARTNER_ID = 'YOUR_LINKEDIN_PARTNER_ID';
const TIKTOK_PIXEL_ID = 'YOUR_TIKTOK_PIXEL_ID';

export default function MarketingPixels() {
    const [consentGiven, setConsentGiven] = useState(false);

    useEffect(() => {
        const checkConsent = () => {
            const saved = localStorage.getItem('wrdigital-cookie-consent');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    // Check specifically for marketing consent
                    if (parsed.marketing === true) {
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

    if (!consentGiven) return null;

    return (
        <>
            {/* Meta Pixel */}
            <Script id="meta-pixel" strategy="afterInteractive">
                {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${META_PIXEL_ID}');
                fbq('track', 'PageView');
                `}
            </Script>

            {/* LinkedIn Insight Tag */}
            <Script id="linkedin-tag" strategy="afterInteractive">
                {`
                window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
                window._linkedin_data_partner_ids.push("${LINKEDIN_PARTNER_ID}");
                (function(l) {
                if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q=[]}
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript";b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);})(window.lintrk);
                `}
            </Script>

            {/* TikTok Pixel */}
            <Script id="tiktok-pixel" strategy="afterInteractive">
                {`
                !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
                ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],
                ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
                for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
                ttq.instance=function(t){for(var e=ttq.methods[i=0];i<ttq.methods.length;i++)ttq.setAndDefer(t,ttq.methods[i]);return t},
                ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
                ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};
                var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;
                var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};

                ttq.load('${TIKTOK_PIXEL_ID}');
                ttq.page();
                }(window, document, 'ttq');
                `}
            </Script>
        </>
    );
}

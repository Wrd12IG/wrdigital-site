'use client';

import { useEffect, useRef } from 'react';

declare global {
    interface Window {
        turnstile?: {
            render: (el: HTMLElement, opts: Record<string, unknown>) => string;
            remove: (id: string) => void;
        };
    }
}

const SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

/** Captcha invisibile Cloudflare. Non rende nulla se NEXT_PUBLIC_TURNSTILE_SITE_KEY non è impostata. */
export default function Turnstile({ onToken }: { onToken: (token: string) => void }) {
    const ref = useRef<HTMLDivElement>(null);
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

    useEffect(() => {
        if (!siteKey || !ref.current) return;
        let widgetId: string | undefined;
        const mount = () => {
            if (!ref.current || !window.turnstile) return;
            widgetId = window.turnstile.render(ref.current, {
                sitekey: siteKey,
                size: 'flexible',
                callback: onToken,
                'expired-callback': () => onToken(''),
                'error-callback': () => onToken(''),
            });
        };
        if (window.turnstile) {
            mount();
        } else {
            let script = document.querySelector<HTMLScriptElement>(`script[src="${SRC}"]`);
            if (!script) {
                script = document.createElement('script');
                script.src = SRC;
                script.async = true;
                document.head.appendChild(script);
            }
            script.addEventListener('load', mount);
        }
        return () => {
            if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
        };
    }, [siteKey, onToken]);

    if (!siteKey) return null;
    return <div ref={ref} />;
}

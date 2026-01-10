'use client';

import { useEffect } from 'react';

export default function DynamicSiteConfig() {
    useEffect(() => {
        // Fetch site config
        fetch('/api/admin/site-config')
            .then(res => res.ok ? res.json() : null)
            .then(config => {
                if (!config) return;

                // Update favicon
                if (config.favicon) {
                    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
                    link.type = 'image/x-icon';
                    link.rel = 'shortcut icon';
                    link.href = config.favicon;
                    if (!document.querySelector("link[rel*='icon']")) {
                        document.getElementsByTagName('head')[0].appendChild(link);
                    }
                }

                // Update SVG icon color via CSS variable
                if (config.iconColor) {
                    document.documentElement.style.setProperty('--icon-color', config.iconColor);
                }
            })
            .catch(() => { });
    }, []);

    return null;
}

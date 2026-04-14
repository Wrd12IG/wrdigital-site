'use client';

import { useEffect, useState } from 'react';

export default function DynamicSiteConfig() {
    useEffect(() => {
        fetch('/api/admin/site-config')
            .then(res => res.ok ? res.json() : null)
            .then(config => {
                if (!config) return;

                // Update SVG icon color via CSS variable
                if (config.iconColor) {
                    document.documentElement.style.setProperty('--icon-color', config.iconColor);
                }
            })
            .catch(() => { });
    }, []);

    // Always return a stable node instead of null
    return <div id="site-config-stable" style={{ display: 'none' }} />;
}

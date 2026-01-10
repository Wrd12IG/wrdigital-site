'use client';

import { useEffect } from 'react';

export default function DynamicFavicon() {
    useEffect(() => {
        // Fetch site config to get favicon URL
        fetch('/api/site-config')
            .then(res => res.json())
            .then(data => {
                console.log('🎯 Site config loaded:', data);
                if (data.favicon) {
                    console.log('📌 Setting favicon to:', data.favicon);
                    
                    // Remove existing favicon links
                    const existingLinks = document.querySelectorAll("link[rel~='icon']");
                    existingLinks.forEach(link => link.remove());
                    
                    // Create new favicon link with cache-busting
                    const link = document.createElement('link');
                    link.rel = 'icon';
                    link.type = 'image/png';
                    link.href = `${data.favicon}?t=${Date.now()}`; // Cache-busting
                    document.head.appendChild(link);
                    
                    console.log('✅ Favicon updated successfully');
                }
            })
            .catch(err => console.error('❌ Failed to load favicon:', err));
    }, []);

    return null;
}

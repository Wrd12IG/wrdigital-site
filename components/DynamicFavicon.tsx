'use client';

import { useEffect, useState } from 'react';

export default function DynamicFavicon() {
    const [favicon, setFavicon] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/site-config')
            .then(res => res.json())
            .then(data => {
                if (data.favicon) {
                    setFavicon(data.favicon);
                }
            })
            .catch(() => { });
    }, []);

    // Returning a hidden div and the link tag
    // React 19 / Next.js 15 will hoist the link tag to the head
    return (
        <div style={{ display: 'none' }}>
            {favicon && (
                <link rel="icon" href={`${favicon}?t=${Date.now()}`} />
            )}
        </div>
    );
}

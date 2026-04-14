'use client';

import { useEffect, useRef } from 'react';

interface LivePreviewProps {
    blocks: any[];
    device: 'mobile' | 'tablet' | 'desktop';
    className?: string;
}

export default function LivePreview({ blocks, device, className = '' }: LivePreviewProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (!iframeRef.current) return;

        const iframe = iframeRef.current;
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!doc) return;

        // Generate HTML from blocks
        const html = generatePreviewHTML(blocks);

        // Update iframe content
        try {
            doc.open('text/html', 'replace');
            doc.write(html);
            doc.close();
        } catch (error) {
            console.error('Error updating live preview:', error);
        }
    }, [blocks, device]);

    return (
        <iframe
            ref={iframeRef}
            className={`w-full h-full border-0 bg-white ${className}`}
            title="Live Preview"
            sandbox="allow-same-origin allow-scripts"
        />
    );
}

// Generate HTML from blocks with real rendering
function generatePreviewHTML(blocks: any[]): string {
    const blocksHTML = blocks.map(block => renderBlock(block)).join('\n');

    return `
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #ffffff;
            background-color: #000000;
        }
        
        .block-section {
            transition: all 0.3s ease;
        }

        /* Hero Styles */
        .hero {
            min-height: 500px;
            display: flex;
            align-items: center;
            padding: 4rem 2rem;
            background: transparent;
            color: inherit;
            position: relative;
            overflow: hidden;
            width: 100%;
        }
        .hero-content {
            position: relative;
            z-index: 10;
            max-width: 1000px;
            width: 100%;
            margin: 0 auto;
        }
        .hero h1 {
            font-size: 3.5rem;
            font-weight: 800;
            margin-bottom: 1.5rem;
            line-height: 1.1;
            color: white;
        }
        .hero .subtitle {
            font-size: 1.25rem;
            margin-bottom: 2.5rem;
            opacity: 0.95;
            color: rgba(255,255,255,0.8);
        }
        .hero-cta {
            display: inline-block;
            padding: 1.25rem 3rem;
            background: #eab308;
            color: black;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 700;
            transition: all 0.2s;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .hero-cta:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 20px 40px rgba(234, 179, 8, 0.3);
        }

        /* Text Block Styles */
        .text-block {
            max-width: 900px;
            margin: 0 auto;
            padding: 4rem 2rem;
            color: white;
        }
        .text-block h1, .text-block h2, .text-block h3 { color: white; margin-bottom: 1.5rem; }
        .text-block p { margin-bottom: 1.2rem; }
        
        /* CTA Styles */
        .cta-block {
            background: transparent;
            color: white;
            padding: 6rem 2rem;
            margin: 0;
            width: 100%;
        }
        .cta-container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 4rem;
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 40px;
            backdrop-filter: blur(10px);
        }
        .cta-block h2 {
            font-size: 3rem;
            margin-bottom: 1.5rem;
            font-weight: 800;
        }
        .cta-block div {
            font-size: 1.2rem;
            margin-bottom: 2.5rem;
            opacity: 0.8;
        }
        .cta-button {
            display: inline-block;
            padding: 1.25rem 3rem;
            background: #eab308;
            color: black;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 700;
            transition: all 0.2s;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 20px 40px rgba(234, 179, 8, 0.2);
        }

        /* Columns */
        .columns-container {
            display: flex;
            flex-wrap: wrap;
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
            padding: 4rem 2rem;
        }
        .column {
            flex: 1;
            min-width: 300px;
            background: rgba(255,255,255,0.02);
            padding: 2.5rem;
            border-radius: 24px;
            border: 1px solid rgba(255,255,255,0.05);
        }

        /* Stats */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 3rem;
            max-width: 1200px;
            margin: 0 auto;
            padding: 5rem 2rem;
            text-align: center;
        }
        .stat-item h3 {
            font-size: 4rem;
            font-weight: 900;
            color: #eab308;
            margin-bottom: 0.5rem;
        }
        .stat-item p {
            font-size: 1.1rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            opacity: 0.6;
        }

        /* Spacer & Divider */
        .spacer { height: var(--spacer-height, 60px); }
        .divider { max-width: 1200px; margin: 2rem auto; padding: 0 2rem; }
        .divider hr { border: none; border-top: 2px solid rgba(255,255,255,0.1); }

        /* Typography Helper */
        .align-left { text-align: left; }
        .align-center { text-align: center; }
        .align-right { text-align: right; }
        
        .flex-center { justify-content: center; }
        .flex-left { justify-content: flex-start; }
        .flex-right { justify-content: flex-end; }

        .button-inline { display: flex; align-items: center; gap: 2rem; flex-wrap: wrap; }
    </style>
</head>
<body>
    ${blocksHTML}
</body>
</html>
    `;
}

// Helper to generate background styles
function getBackgroundStyle(blockContent: any): string {
    const bgType = blockContent.backgroundType || 'none';
    const bgColor = blockContent.backgroundColor || 'transparent';
    const useGradient = blockContent.useGradient || false;
    const gradColor = blockContent.gradientColor || '#333333';
    const gradAngle = blockContent.gradientAngle || 135;
    const gradPos = blockContent.gradientPosition ?? 100;

    let style = '';
    if (bgType === 'color') {
        if (useGradient) {
            style += `background: linear-gradient(${gradAngle}deg, ${bgColor} 0%, ${gradColor} ${gradPos}%);`;
        } else {
            style += `background: ${bgColor};`;
        }
    }
    return style;
}

// Render individual block
function renderBlock(block: any): string {
    const content = block.content;
    const styles = block.styles || {};
    const bgStyle = getBackgroundStyle(content);
    const hasBackgroundImage = content.backgroundType === 'image' && content.backgroundImage;
    const alignment = content.alignment || 'left';
    const btnPos = content.buttonPosition || 'below';

    // Spacing from Advanced tab
    const paddingY = styles.paddingY !== undefined ? `${styles.paddingY}rem` : '6rem';
    const paddingX = styles.paddingX !== undefined ? `${styles.paddingX}rem` : '2rem';
    const blockStyle = `${bgStyle} padding: ${paddingY} ${paddingX};`;

    let innerHTML = '';

    switch (block.type) {
        case 'hero':
            innerHTML = `
                <div class="hero align-${alignment}">
                    <div class="hero-content ${btnPos === 'inline' ? 'button-inline' : ''}">
                        <div>
                            <h1>${escapeHtml(content.title || 'Titolo Hero')}</h1>
                            <div class="subtitle">${content.subtitle || 'Sottotitolo'}</div>
                        </div>
                        ${content.ctaText ? `
                            <div>
                                <a href="${content.ctaLink || '#'}" class="hero-cta">
                                    ${escapeHtml(content.ctaText)}
                                </a>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
            break;

        case 'text-block':
            innerHTML = `
                <div class="text-block align-${alignment}">
                    ${content.content || '<p>Aggiungi del contenuto...</p>'}
                </div>
            `;
            break;

        case 'cta':
            innerHTML = `
                <div class="cta-block">
                    <div class="cta-container align-${alignment} ${btnPos === 'inline' ? 'button-inline' : ''}">
                        <div>
                            <h2>${escapeHtml(content.title || 'Pronto a iniziare?')}</h2>
                            <div>${content.description || '<p>Contattaci oggi stesso per una consulenza gratuita.</p>'}</div>
                        </div>
                        <a href="${content.buttonLink || '#'}" class="cta-button">
                            ${escapeHtml(content.buttonText || 'Parliamo del tuo progetto')}
                        </a>
                    </div>
                </div>
            `;
            break;

        case 'stats':
            const stats = content.items || [];
            innerHTML = `
                <div class="stats-grid">
                    ${stats.map((s: any) => `
                        <div class="stat-item">
                            <h3>${escapeHtml(s.value || '0')}</h3>
                            <p>${escapeHtml(s.label || 'Label')}</p>
                        </div>
                    `).join('')}
                </div>
            `;
            break;

        case 'testimonials':
            const reviews = content.items || [];
            innerHTML = `
                <div class="testimonials-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; max-width: 1200px; margin: 0 auto; padding: 4rem 2rem;">
                    ${reviews.map((r: any) => `
                        <div class="testimonial-card" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 2rem; border-radius: 20px;">
                            ${r.avatar ? `<div style="margin-bottom: 1.5rem;"><img src="${escapeHtml(r.avatar)}" alt="${escapeHtml(r.name)}" style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover; border: 2px solid rgba(255,255,255,0.1);"></div>` : ''}
                            <div style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 1.5rem; opacity: 0.9; font-style: italic;">"${escapeHtml(r.quote || '')}"</div>
                            <div>
                                <div style="font-weight: 700; color: #eab308;">${escapeHtml(r.name || 'Nome Cliente')}</div>
                                <div style="font-size: 0.8rem; opacity: 0.5; text-transform: uppercase; letter-spacing: 0.05em;">${escapeHtml(r.role || 'Ruolo')}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            break;

        case 'faq':
            const faqs = content.items || [];
            innerHTML = `
                <div class="faq-container" style="max-width: 800px; margin: 0 auto; padding: 4rem 2rem;">
                    ${faqs.map((f: any) => `
                        <div class="faq-item" style="margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 2rem;">
                            <h3 style="font-size: 1.25rem; margin-bottom: 1rem; color: #eab308;">${escapeHtml(f.question || 'Domanda?')}</h3>
                            <div style="opacity: 0.7; line-height: 1.7;">${escapeHtml(f.answer || 'Risposta...')}</div>
                        </div>
                    `).join('')}
                </div>
            `;
            break;

        case 'columns':
            const cols = content.items || [];
            innerHTML = `
                <div class="columns-container">
                    ${cols.map((c: any) => `
                        <div class="column">
                            ${c.content || 'Contenuto colonna...'}
                        </div>
                    `).join('')}
                </div>
            `;
            break;

        case 'spacer':
            innerHTML = `<div class="spacer" style="height: ${content.height || 60}px;"></div>`;
            break;

        case 'divider':
            innerHTML = `
                <div class="divider">
                    <hr style="border-top: 2px ${content.style || 'solid'} ${content.color || 'rgba(255,255,255,0.1)'};"/>
                </div>
            `;
            break;

        case 'video':
            const videoUrl = content.url || '';
            let finalUrl = videoUrl;
            if (videoUrl && (content.autoplay || content.muted)) {
                const separator = videoUrl.includes('?') ? '&' : '?';
                const params = [];
                if (content.autoplay) params.push('autoplay=1');
                if (content.muted) params.push('muted=1'); // Muted often required for autoplay
                finalUrl += separator + params.join('&');
            }

            innerHTML = `
                <div class="video-container" style="max-width: 1000px; margin: 0 auto; padding: 4rem 2rem;">
                    ${content.title ? `<h3 style="text-align: center; margin-bottom: 2rem; font-size: 1.5rem;">${escapeHtml(content.title)}</h3>` : ''}
                    <div style="aspect-ratio: 16/9; background: #000; display: flex; align-items: center; justify-content: center; border-radius: 12px; overflow: hidden;">
                        ${videoUrl ? `<iframe src="${finalUrl}" style="width: 100%; height: 100%; border: 0;" allowfullscreen allow="autoplay; encrypted-media"></iframe>` : '<div style="color: #666;">Video Placeholder</div>'}
                    </div>
                </div>
            `;
            break;

        case 'code':
            innerHTML = `
                <div class="code-block" style="padding: 2rem; overflow-x: auto;">
                    ${content.code || '<!-- Code Block -->'}
                </div>
            `;
            break;

        default:
            innerHTML = `
                <div style="padding: 4rem; text-align: center; color: #666; font-style: italic; background: rgba(0,0,0,0.2); border-radius: 20px;">
                    Blocco "${block.type}" - Preview Rendered
                </div>
            `;
    }

    // Advanced Visibility (simplified for preview)
    const isHidden = block.hidden?.desktop; // Assuming preview is desktop-first
    if (isHidden) return '';

    return `
        <div class="block-section" style="${blockStyle} position: relative; overflow: hidden; width: 100%;">
            ${hasBackgroundImage ? `
                <img src="${content.backgroundImage}" 
                     alt="" 
                     style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: ${content.backgroundOpacity || 0.3}; z-index: 1;" 
                />
            ` : ''}
            <div style="position: relative; z-index: 2;">
                ${innerHTML}
            </div>
        </div>
    `;
}

// Helper to escape HTML
function escapeHtml(unsafe: string): string {
    if (typeof unsafe !== 'string') return '';
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

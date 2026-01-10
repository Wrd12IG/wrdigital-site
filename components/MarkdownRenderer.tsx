import React from 'react';

interface MarkdownRendererProps {
    content: string;
    className?: string;
}

export default function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
    if (!content) return null;

    // Helper to colorize brackets [ ] in yellow
    const parseBrackets = (text: string, keyPrefix: string) => {
        const parts = text.split(/([\[\]])/g);
        return parts.map((part, j) => {
            if (part === '[' || part === ']') {
                return <span key={`${keyPrefix}-${j}`} className="text-yellow-400 font-bold">{part}</span>;
            }
            return part;
        });
    };

    // Helper to parse inline styles (bold) and apply brackets coloring
    const parseInline = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return (
                    <strong key={i} className="text-white font-bold">
                        {parseBrackets(part.slice(2, -2), `bold-${i}`)}
                    </strong>
                );
            }
            return <React.Fragment key={i}>{parseBrackets(part, `normal-${i}`)}</React.Fragment>;
        });
    };

    // Split by newlines to process blocks
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];

    let currentParagraph: React.ReactNode[] = [];

    // Helper to flush paragraph
    const flushParagraph = (key: number) => {
        if (currentParagraph.length > 0) {
            elements.push(
                <p key={`p-${key}`} className="text-gray-300 leading-relaxed mb-6 text-lg font-light">
                    {currentParagraph}
                </p>
            );
            currentParagraph = [];
        }
    };

    lines.forEach((line, index) => {
        const trimmed = line.trim();

        if (!trimmed) {
            flushParagraph(index);
            return;
        }

        if (trimmed.startsWith('### ')) {
            flushParagraph(index);
            elements.push(
                <h3 key={`h3-${index}`} className="text-2xl font-bold text-white mt-12 mb-6 border-l-4 border-yellow-400 pl-4">
                    {parseInline(trimmed.slice(4))}
                </h3>
            );
        } else if (trimmed.startsWith('## ')) {
            flushParagraph(index);
            elements.push(
                <h2 key={`h2-${index}`} className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mt-16 mb-8 tracking-tight">
                    {parseInline(trimmed.slice(3))}
                </h2>
            );
        } else if (trimmed.startsWith('- ')) {
            flushParagraph(index);
            elements.push(
                <li key={`li-${index}`} className="text-gray-300 ml-6 mb-2 list-disc pl-2 marker:text-yellow-400">
                    {parseInline(trimmed.slice(2))}
                </li>
            );
        } else {
            // It's a paragraph line. Use a space if appending.
            if (currentParagraph.length > 0) currentParagraph.push(' ');
            currentParagraph.push(parseInline(trimmed)); // Fix: push result of parseInline which returns nodes
        }
    });

    flushParagraph(lines.length);

    return (
        <div className={`prose prose-invert max-w-none ${className}`}>
            {elements}
        </div>
    );
}

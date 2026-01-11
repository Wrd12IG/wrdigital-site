import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
    content: string;
    className?: string;
}

// Helper to colorize brackets [ ] in yellow within text
const HighlightBrackets = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {React.Children.map(children, (child) => {
                if (typeof child === 'string') {
                    const parts = child.split(/([\[\]])/g);
                    return parts.map((part, i) => {
                        if (part === '[' || part === ']') {
                            return <span key={i} className="text-yellow-400 font-bold">{part}</span>;
                        }
                        return part;
                    });
                }
                return child;
            })}
        </>
    );
};

export default function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
    if (!content) return null;

    return (
        <div className={`prose prose-invert max-w-none ${className}`}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    // Headers
                    h2: ({ children }) => (
                        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mt-16 mb-8 tracking-tight">
                            <HighlightBrackets>{children}</HighlightBrackets>
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-2xl font-bold text-white mt-12 mb-6 border-l-4 border-yellow-400 pl-4">
                            <HighlightBrackets>{children}</HighlightBrackets>
                        </h3>
                    ),
                    // Paragraphs
                    p: ({ children }) => (
                        <p className="text-gray-300 leading-relaxed mb-6 text-lg font-light">
                            <HighlightBrackets>{children}</HighlightBrackets>
                        </p>
                    ),
                    // Lists
                    ul: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>,
                    li: ({ children }) => (
                        <li className="text-gray-300 marker:text-yellow-400">
                            <HighlightBrackets>{children}</HighlightBrackets>
                        </li>
                    ),
                    // Bold/Strong
                    strong: ({ children }) => (
                        <strong className="text-white font-bold">
                            <HighlightBrackets>{children}</HighlightBrackets>
                        </strong>
                    ),
                    // Tables
                    table: ({ children }) => (
                        <div className="overflow-x-auto my-8 border border-white/10 rounded-xl">
                            <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                                {children}
                            </table>
                        </div>
                    ),
                    thead: ({ children }) => <thead className="bg-white/5 font-bold text-white">{children}</thead>,
                    tbody: ({ children }) => <tbody className="divide-y divide-white/10 bg-transparent">{children}</tbody>,
                    tr: ({ children }) => <tr className="hover:bg-white/5 transition-colors">{children}</tr>,
                    th: ({ children }) => <th className="px-4 py-3 text-yellow-500 uppercase text-xs tracking-wider">{children}</th>,
                    td: ({ children }) => <td className="px-4 py-3 text-gray-300 whitespace-pre-wrap">{children}</td>,
                    // Blockquotes
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-purple-500 pl-4 py-2 my-6 bg-purple-900/10 italic text-gray-400 rounded-r-lg">
                            {children}
                        </blockquote>
                    ),
                    // Links
                    a: ({ href, children }) => (
                        <a href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-4 decoration-yellow-400/30 transition-colors">
                            {children}
                        </a>
                    )
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}

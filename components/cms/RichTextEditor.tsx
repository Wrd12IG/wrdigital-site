'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import ImageExtension from '@tiptap/extension-image';
import {
    Bold, Italic, Strikethrough, Code, Link2, Unlink,
    List, ListOrdered, Quote, Undo, Redo, Heading1,
    Heading2, Heading3, Image, Maximize2, X, AlertCircle,
    Check, CornerDownLeft
} from 'lucide-react';
import { useCallback, useState, useImperativeHandle, forwardRef, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import AIAssistant from './AIAssistant';

// Extend Image to support width attribute and render it as a style
const CustomImage = ImageExtension.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            width: {
                default: null,
                renderHTML: attributes => {
                    if (!attributes.width) return {};
                    return {
                        width: attributes.width,
                        style: `width: ${attributes.width}; max-width: 100%; height: auto; display: block;`
                    };
                },
                parseHTML: element => element.getAttribute('width'),
            }
        };
    },
});

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
    onImageClick?: () => void;
}

export interface RichTextEditorRef {
    insertImage: (url: string, alt?: string, size?: string) => void;
    focus: () => void;
}

const RichTextEditor = forwardRef<RichTextEditorRef, RichTextEditorProps>(({
    content,
    onChange,
    placeholder = 'Inizia a scrivere...',
    onImageClick
}, ref) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Link Popover State
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [linkText, setLinkText] = useState('');
    const [isLinkWithSelection, setIsLinkWithSelection] = useState(false);

    // Use an internal ref for onChange to prevent dependency loops or re-initializations
    const onChangeRef = useRef(onChange);
    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3]
                }
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-yellow-400 underline cursor-pointer'
                }
            }),
            CustomImage.configure({
                HTMLAttributes: {
                    class: 'rounded-lg cursor-default'
                }
            })
        ],
        content: content,
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none focus:outline-none min-h-[200px] px-4 py-3'
            }
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            if (onChangeRef.current) {
                onChangeRef.current(html);
            }
        }
    });

    // Content sync
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            const currentHTML = editor.getHTML();
            if (content !== currentHTML) {
                editor.commands.setContent(content, { emitUpdate: false });
            }
        }
    }, [content, editor]);

    // Handle Link Logic
    const openLinkInput = useCallback(() => {
        if (!editor) return;

        const { from, to } = editor.state.selection;
        const isSelected = from !== to;
        const previousUrl = editor.getAttributes('link').href || '';

        setIsLinkWithSelection(isSelected);
        setLinkUrl(previousUrl || 'https://');
        setLinkText('');
        setShowLinkInput(true);
    }, [editor]);

    const applyLink = useCallback(() => {
        if (!editor || !linkUrl) return;

        if (isLinkWithSelection) {
            editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
        } else {
            editor.chain().focus().insertContent({
                type: 'text',
                text: linkText || linkUrl,
                marks: [{ type: 'link', attrs: { href: linkUrl } }]
            }).run();
        }
        setShowLinkInput(false);
    }, [editor, linkUrl, linkText, isLinkWithSelection]);

    useImperativeHandle(ref, () => ({
        insertImage: (url: string, alt?: string, size?: string) => {
            if (editor) {
                let width = null;
                if (size === 'small') width = '300px';
                if (size === 'medium') width = '600px';
                if (size === 'large') width = '1000px';

                editor.chain().focus().setImage({
                    src: url,
                    alt: alt,
                    // @ts-ignore - custom attribute
                    width: width
                }).run();
            }
        },
        focus: () => {
            if (editor) {
                editor.chain().focus().run();
            }
        }
    }), [editor]);

    const addImage = useCallback(() => {
        if (!editor) return;
        if (onImageClick) {
            onImageClick();
        } else {
            const url = window.prompt('Inserisci URL immagine:');
            if (url) {
                editor.chain().focus().setImage({ src: url }).run();
            }
        }
    }, [editor, onImageClick]);

    if (!editor) {
        return null;
    }

    const charCount = editor.getText().length;
    const wordCount = editor.getText().split(/\s+/).filter(w => w.length > 0).length;

    const editorLayout = (
        <div className={`
            border border-white/10 rounded-lg overflow-hidden flex flex-col
            ${isFullscreen
                ? 'fixed inset-4 z-[99999] bg-[#0f172a] shadow-2xl cursor-auto'
                : 'bg-white/5 w-full relative'
            }
        `}>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-2 border-b border-white/10 bg-gray-800/80 sticky top-0 z-10">
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                    title="Grassetto"
                >
                    <Bold className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                    title="Corsivo"
                >
                    <Italic className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    isActive={editor.isActive('strike')}
                    title="Barrato"
                >
                    <Strikethrough className="w-4 h-4" />
                </ToolbarButton>

                <div className="w-px h-6 bg-white/10 mx-1" />

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    isActive={editor.isActive('heading', { level: 1 })}
                    title="Titolo 1"
                >
                    <Heading1 className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive('heading', { level: 2 })}
                    title="Titolo 2"
                >
                    <Heading2 className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    isActive={editor.isActive('heading', { level: 3 })}
                    title="Titolo 3"
                >
                    <Heading3 className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    isActive={editor.isActive('paragraph')}
                    title="Testo Normale"
                >
                    <span className="text-xs font-bold px-1">P</span>
                </ToolbarButton>

                <div className="w-px h-6 bg-white/10 mx-1" />

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                    title="Elenco Puntato"
                >
                    <List className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive('orderedList')}
                    title="Elenco Numerato"
                >
                    <ListOrdered className="w-4 h-4" />
                </ToolbarButton>

                <div className="w-px h-6 bg-white/10 mx-1" />

                {/* Link & Image */}
                <div className="relative">
                    <ToolbarButton
                        onClick={openLinkInput}
                        isActive={editor.isActive('link')}
                        title="Inserisci Link"
                    >
                        <Link2 className="w-4 h-4" />
                    </ToolbarButton>

                    {/* CUSTOM LINK INPUT OVERLAY */}
                    {showLinkInput && (
                        <div className="absolute top-full left-0 mt-2 p-4 bg-gray-900 border border-yellow-400/30 rounded-xl shadow-2xl z-[100] w-72 space-y-3 animate-in fade-in zoom-in duration-200">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-bold text-yellow-400 uppercase">Inserisci Link</span>
                                <button onClick={() => setShowLinkInput(false)} className="text-gray-500 hover:text-white">
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                            <input
                                autoFocus
                                type="text"
                                placeholder="URL (es: https://...)"
                                value={linkUrl}
                                onChange={(e) => setLinkUrl(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && applyLink()}
                                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-yellow-400 outline-none"
                            />
                            {!isLinkWithSelection && (
                                <input
                                    type="text"
                                    placeholder="Testo da mostrare"
                                    value={linkText}
                                    onChange={(e) => setLinkText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && applyLink()}
                                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-yellow-400 outline-none"
                                />
                            )}
                            <button
                                onClick={applyLink}
                                className="w-full py-2 bg-yellow-400 text-black rounded-lg text-xs font-bold hover:bg-yellow-300 flex items-center justify-center gap-2"
                            >
                                <Check className="w-3 h-3" />
                                Conferma Link
                            </button>
                        </div>
                    )}
                </div>

                <ToolbarButton
                    onClick={addImage}
                    title="Inserisci Immagine"
                >
                    <Image className="w-4 h-4" />
                </ToolbarButton>

                <div className="w-px h-6 bg-white/10 mx-1" />

                <ToolbarButton
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    title="Annulla"
                >
                    <Undo className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    title="Ripristina"
                >
                    <Redo className="w-4 h-4" />
                </ToolbarButton>

                <div className="flex-1" />

                <ToolbarButton
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    isActive={isFullscreen}
                    title={isFullscreen ? "Esci da tutto schermo" : "Tutto schermo"}
                >
                    {isFullscreen ? <X className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </ToolbarButton>
            </div>

            {/* Editor Content Area */}
            <div className={`relative flex-1 overflow-auto bg-gray-900/40 min-h-[150px]`}>
                <EditorContent editor={editor} className="h-full" />
                {editor.isEmpty && (
                    <div className="absolute top-4 left-4 text-gray-500 pointer-events-none italic">
                        {placeholder}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 text-[10px] uppercase tracking-wider font-bold border-t border-white/10 bg-black/40 flex items-center justify-between">
                <div className="flex gap-4 text-white/40">
                    <span>{charCount} caratteri</span>
                    <span>{wordCount} parole</span>
                </div>
                {content && content.length > 10 && (
                    <AIAssistant
                        content={content}
                        onApply={(newContent) => {
                            editor.commands.setContent(newContent);
                            onChangeRef.current(newContent);
                        }}
                    />
                )}
            </div>
        </div>
    );

    if (isFullscreen && isMounted) {
        return createPortal(
            <div className="fixed inset-0 z-[99998] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                {editorLayout}
            </div>,
            document.body
        );
    }

    return editorLayout;
});

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;

function ToolbarButton({
    onClick,
    isActive,
    disabled,
    children,
    title
}: {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    title?: string;
}) {
    return (
        <button
            type="button"
            onMouseDown={(e) => {
                e.preventDefault();
                onClick();
            }}
            disabled={disabled}
            title={title}
            className={`
                p-2 rounded-md transition-all duration-200
                ${isActive
                    ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20 scale-105'
                    : 'text-gray-400 hover:text-white hover:bg-white/10 active:scale-95'
                }
                ${disabled ? 'opacity-20 cursor-not-allowed' : ''}
            `}
        >
            {children}
        </button>
    );
}

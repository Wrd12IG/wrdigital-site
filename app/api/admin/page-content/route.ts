import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

// File for static page content (non-database pages)
const STATIC_CONTENT_FILE = path.join(process.cwd(), 'data', 'page-content.json');

// Helper to ensure data directory exists
function ensureDataDir() {
    const dir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// GET: Fetch page content
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('pageId');
    const pageType = searchParams.get('type'); // 'service' or 'static'

    try {
        // For service pages, get content from database
        if (pageType === 'service' && pageId) {
            const page = await prisma.page.findFirst({
                where: {
                    OR: [
                        { slug: pageId },
                        { slug: pageId.replace('/servizi/', '') }
                    ]
                }
            });

            if (page) {
                let content = {};
                try {
                    content = JSON.parse(page.content);
                } catch (e) { }

                // Extract text content from the page structure
                const textContent = extractTextFromContent(content);

                return NextResponse.json({
                    pageId: page.id,
                    slug: page.slug,
                    title: page.title,
                    textContent,
                    rawContent: content
                });
            }
        }

        // For static pages, get from JSON file
        ensureDataDir();
        if (fs.existsSync(STATIC_CONTENT_FILE)) {
            const data = JSON.parse(fs.readFileSync(STATIC_CONTENT_FILE, 'utf8'));
            if (pageId && data[pageId]) {
                return NextResponse.json({
                    pageId,
                    textContent: data[pageId].textContent || '',
                    lastUpdated: data[pageId].lastUpdated
                });
            }
            return NextResponse.json(data);
        }

        return NextResponse.json({});
    } catch (error) {
        console.error('Error loading page content:', error);
        return NextResponse.json({ error: 'Failed to load content' }, { status: 500 });
    }
}

// POST: Save page content
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { pageId, pageType, textContent, slug } = body;

        // For service pages, update database
        if (pageType === 'service' && pageId) {
            // Find the page
            const page = await prisma.page.findFirst({
                where: {
                    OR: [
                        { slug: pageId },
                        { slug: slug?.replace('/servizi/', '') }
                    ]
                }
            });

            if (page) {
                let content: any = {};
                try {
                    content = JSON.parse(page.content);
                } catch (e) { }

                // Update the description/mainText field
                content.description = textContent;
                content.mainText = textContent;

                await prisma.page.update({
                    where: { id: page.id },
                    data: {
                        content: JSON.stringify(content),
                        updatedAt: new Date()
                    }
                });

                return NextResponse.json({
                    success: true,
                    message: 'Content updated in database',
                    savedTo: 'database'
                });
            }
        }

        // For static pages, save to JSON file
        ensureDataDir();
        let data: Record<string, any> = {};
        if (fs.existsSync(STATIC_CONTENT_FILE)) {
            data = JSON.parse(fs.readFileSync(STATIC_CONTENT_FILE, 'utf8'));
        }

        data[pageId] = {
            textContent,
            lastUpdated: new Date().toISOString()
        };

        fs.writeFileSync(STATIC_CONTENT_FILE, JSON.stringify(data, null, 2));

        return NextResponse.json({
            success: true,
            message: 'Content saved to file',
            savedTo: 'file'
        });
    } catch (error) {
        console.error('Error saving page content:', error);
        return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
    }
}

// Helper function to extract text content from page structure
function extractTextFromContent(content: any): string {
    const textParts: string[] = [];

    // Common text fields in page content
    const textFields = [
        'description', 'mainText', 'heroDescription', 'introText',
        'text', 'body', 'content', 'paragraph'
    ];

    function extractFromObject(obj: any) {
        if (!obj || typeof obj !== 'object') return;

        // Check for text fields
        for (const field of textFields) {
            if (obj[field] && typeof obj[field] === 'string') {
                textParts.push(obj[field]);
            }
        }

        // Check for sections/blocks with text
        if (Array.isArray(obj.sections)) {
            obj.sections.forEach((section: any) => extractFromObject(section));
        }
        if (Array.isArray(obj.blocks)) {
            obj.blocks.forEach((block: any) => extractFromObject(block));
        }
        if (Array.isArray(obj.items)) {
            obj.items.forEach((item: any) => extractFromObject(item));
        }
        if (Array.isArray(obj.faq)) {
            obj.faq.forEach((item: any) => {
                if (item.question) textParts.push(item.question);
                if (item.answer) textParts.push(item.answer);
            });
        }
        if (Array.isArray(obj.benefits)) {
            obj.benefits.forEach((item: any) => {
                if (typeof item === 'string') textParts.push(item);
                if (item.title) textParts.push(item.title);
                if (item.description) textParts.push(item.description);
            });
        }
    }

    extractFromObject(content);

    return textParts.join('\n\n');
}

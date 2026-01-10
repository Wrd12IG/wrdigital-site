import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import sharp from 'sharp';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/avif'];
const THUMBNAIL_SIZE = 300;
const MAX_DIMENSION = 2400; // Auto-resize if larger

// Ensure upload directory exists
async function ensureUploadDir() {
    if (!existsSync(UPLOAD_DIR)) {
        await mkdir(UPLOAD_DIR, { recursive: true });
    }
}

// GET: Lista media con paginazione
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        const search = searchParams.get('search');

        const where: any = {};
        if (search) {
            where.OR = [
                { filename: { contains: search } },
                { altText: { contains: search } }
            ];
        }

        const [media, total] = await Promise.all([
            prisma.media.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit
            }),
            prisma.media.count({ where })
        ]);

        // Parse variants JSON
        const parsed = media.map(m => ({
            ...m,
            variants: m.variants ? JSON.parse(m.variants) : null
        }));

        return NextResponse.json({
            media: parsed,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error: any) {
        console.error('Error fetching media:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Upload e processa immagine
export async function POST(request: NextRequest) {
    try {
        await ensureUploadDir();

        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        const altText = formData.get('altText') as string | null;
        const requireAlt = formData.get('requireAlt') === 'true'; // Default to false

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uniqueId = randomUUID();
        const ext = path.extname(file.name);
        const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9-_]/g, '-');
        const uniqueName = `${baseName}-${uniqueId.slice(0, 8)}`;

        // Get image metadata
        const metadata = await sharp(buffer).metadata();
        const { width = 0, height = 0 } = metadata;

        // Prepare image processing pipeline
        let processedBuffer = buffer;
        let finalWidth = width;
        let finalHeight = height;

        // Auto-resize if too large
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
            const resized = await sharp(buffer)
                .resize(MAX_DIMENSION, MAX_DIMENSION, { fit: 'inside', withoutEnlargement: true })
                .toBuffer({ resolveWithObject: true });
            processedBuffer = resized.data as any; // Type mismatch fix for Next.js build
            finalWidth = resized.info.width;
            finalHeight = resized.info.height;
        }

        // Generate variants
        const variants: Record<string, string> = {};

        // 1. Original (optimized)
        const originalPath = path.join(UPLOAD_DIR, `${uniqueName}${ext}`);
        await writeFile(originalPath, processedBuffer);
        const originalUrl = `/uploads/${uniqueName}${ext}`;

        // 2. WebP version
        const webpPath = path.join(UPLOAD_DIR, `${uniqueName}.webp`);
        await sharp(processedBuffer)
            .webp({ quality: 85 })
            .toFile(webpPath);
        variants.webp = `/uploads/${uniqueName}.webp`;

        // 3. AVIF version (smaller, newer format)
        const avifPath = path.join(UPLOAD_DIR, `${uniqueName}.avif`);
        await sharp(processedBuffer)
            .avif({ quality: 80 })
            .toFile(avifPath);
        variants.avif = `/uploads/${uniqueName}.avif`;

        // 4. Thumbnail
        const thumbPath = path.join(UPLOAD_DIR, `${uniqueName}-thumb.webp`);
        await sharp(processedBuffer)
            .resize(THUMBNAIL_SIZE, THUMBNAIL_SIZE, { fit: 'cover' })
            .webp({ quality: 80 })
            .toFile(thumbPath);
        variants.thumbnail = `/uploads/${uniqueName}-thumb.webp`;

        // Get final file size
        const optimizedStats = await sharp(processedBuffer).toBuffer({ resolveWithObject: true });

        // Save to database
        const media = await prisma.media.create({
            data: {
                filename: file.name,
                url: originalUrl,
                altText: altText?.trim() || null,
                mimeType: file.type,
                size: optimizedStats.info.size,
                width: finalWidth,
                height: finalHeight,
                variants: JSON.stringify(variants)
            }
        });

        return NextResponse.json({
            success: true,
            media: {
                ...media,
                variants,
                savedBytes: file.size - optimizedStats.info.size,
                compressionRatio: ((1 - optimizedStats.info.size / file.size) * 100).toFixed(1) + '%'
            }
        });
    } catch (error: any) {
        console.error('Error uploading media:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT: Aggiorna metadata (alt text, focal point)
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, altText, focalPoint } = body;

        if (!id) {
            return NextResponse.json({ error: 'Media ID required' }, { status: 400 });
        }

        const media = await prisma.media.update({
            where: { id },
            data: {
                altText: altText?.trim() || undefined,
                focalPoint: focalPoint ? JSON.stringify(focalPoint) : undefined
            }
        });

        return NextResponse.json({
            success: true,
            media: {
                ...media,
                variants: media.variants ? JSON.parse(media.variants) : null
            }
        });
    } catch (error: any) {
        console.error('Error updating media:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE: Rimuovi media e tutti i file
export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'Media ID required' }, { status: 400 });
        }

        const media = await prisma.media.findUnique({ where: { id } });
        if (!media) {
            return NextResponse.json({ error: 'Media not found' }, { status: 404 });
        }

        // Delete all variant files
        const variants = media.variants ? JSON.parse(media.variants) : {};
        const filesToDelete = [
            path.join(process.cwd(), 'public', media.url),
            ...Object.values(variants).map((v: any) => path.join(process.cwd(), 'public', v))
        ];

        for (const filePath of filesToDelete) {
            try {
                await unlink(filePath);
            } catch (e) {
                // File might not exist, continue
            }
        }

        // Delete from database
        await prisma.media.delete({ where: { id } });

        return NextResponse.json({ success: true, message: 'Media deleted' });
    } catch (error: any) {
        console.error('Error deleting media:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

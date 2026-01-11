import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET: Lista tutti i servizi (Array)
// GET: Lista tutti i servizi (Array) oppure singolo servizio se ?id=...
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    try {
        if (id) {
            const page = await prisma.page.findUnique({
                where: { id },
                include: { seo: true }
            });

            if (!page) {
                return NextResponse.json({ error: 'Page not found' }, { status: 404 });
            }

            return NextResponse.json({
                id: page.id,
                slug: page.slug,
                title: page.title,
                content: page.content, // parsed by frontend
                seo: page.seo || {}
            });
        }

        const pages = await prisma.page.findMany({ include: { seo: true }, orderBy: { updatedAt: 'desc' } });

        // Mappa per il frontend
        const services = pages.map(p => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            content: p.content,
            published: p.published,
            seo: p.seo || {}
        }));

        return NextResponse.json(services);
    } catch (error) {
        console.error("Database fetch failed:", error);
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}

// POST: Crea o Aggiorna un servizio
export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email?.toLowerCase();
    const isAdmin = (session?.user as any)?.role === 'admin' || email === 'roberto@wrdigital.it' || email === 'info@wrdigital.it';

    if (!session || !isAdmin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id, slug, title, content, seo, originalSlug } = body;

        // 1. Logic Slug Lock / Redirect
        if (originalSlug && originalSlug !== slug) {
            console.log(`[Slug Lock] Creating Redirect 301: /servizi/${originalSlug} -> /servizi/${slug}`);
            try {
                await prisma.redirect.create({
                    data: {
                        oldUrl: `/servizi/${originalSlug}`,
                        newUrl: `/servizi/${slug}`,
                        statusCode: 301,
                        active: true
                    }
                });
            } catch (e) {
                console.error("Failed to create redirect record (maybe exists?)", e);
            }
        }

        let page;

        // 2. Upsert Page
        if (id && id !== 'new') {
            // Update
            page = await prisma.page.update({
                where: { id },
                data: {
                    slug,
                    title,
                    content, // Expecting stringified JSON
                    published: body.published // Allow updating published status
                }
            });
        } else {
            // Create
            page = await prisma.page.create({
                data: {
                    slug,
                    title,
                    content,
                    published: body.published ?? false // Default to Draft
                }
            });
        }

        // 3. Upsert SEO Metadata
        if (seo) {
            await prisma.seoMetadata.upsert({
                where: { pageId: page.id },
                update: {
                    metaTitle: seo.metaTitle || undefined,
                    metaDescription: seo.metaDescription || undefined,
                    canonicalUrl: seo.canonicalUrl || undefined,
                    ogImage: seo.ogImage || undefined,
                    robotsIndex: seo.robotsIndex ?? true,
                    robotsFollow: seo.robotsFollow ?? true
                },
                create: {
                    pageId: page.id,
                    metaTitle: seo.metaTitle,
                    metaDescription: seo.metaDescription,
                    canonicalUrl: seo.canonicalUrl,
                    ogImage: seo.ogImage,
                    robotsIndex: seo.robotsIndex ?? true,
                    robotsFollow: seo.robotsFollow ?? true
                }
            });
        }

        return NextResponse.json({ success: true, id: page.id, message: 'Service saved successfully' });

    } catch (error) {
        console.error("Error saving service:", error);
        return NextResponse.json({ error: 'Failed to save service' }, { status: 500 });
    }
}

// DELETE: Rimuove un servizio
export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email?.toLowerCase();
    const isAdmin = (session?.user as any)?.role === 'admin' || email === 'roberto@wrdigital.it' || email === 'info@wrdigital.it';

    if (!session || !isAdmin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        let id;
        try {
            const body = await request.json();
            id = body.id;
        } catch (e) {
            // Body parsing failed or empty, try query params
        }

        if (!id) {
            const { searchParams } = new URL(request.url);
            id = searchParams.get('id');
        }

        console.log('[API DELETE] Request for ID:', id);

        if (!id) {
            console.log('[API DELETE] No ID provided');
            return NextResponse.json({ error: 'ID required' }, { status: 400 });
        }

        const deleted = await prisma.page.delete({ where: { id } });
        console.log('[API DELETE] Deleted page:', deleted.id);

        return NextResponse.json({ success: true, message: 'Service deleted' });

    } catch (error: any) {
        console.error("Error deleting service:", error);
        if (error.code === 'P2025') {
            return NextResponse.json({ error: 'Service not found or already deleted' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
    }
}

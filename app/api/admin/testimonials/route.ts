import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const testimonials = await prisma.testimonial.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(testimonials);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email?.toLowerCase();
    const isAdmin = (session?.user as any)?.role === 'admin' || email === 'roberto@wrdigital.it' || email === 'info@wrdigital.it';

    if (!session || !isAdmin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await request.json();

        // If data is an array, we are replacing all (old behavior)
        // For a more robust API we'd do individual CRUD, but let's keep it compatible with the current UI for now.
        if (Array.isArray(data)) {
            // Transaction to clear and re-insert
            await prisma.$transaction([
                prisma.testimonial.deleteMany(),
                prisma.testimonial.createMany({
                    data: data.map((t: any) => ({
                        id: t.id?.toString() || undefined,
                        quote: t.quote,
                        author: t.author,
                        company: t.company,
                        rating: t.rating || 5,
                        result: t.result,
                        service: t.service
                    }))
                })
            ]);
        } else {
            // Single creation
            await prisma.testimonial.create({
                data: {
                    quote: data.quote,
                    author: data.author,
                    company: data.company,
                    rating: data.rating || 5,
                    result: data.result,
                    service: data.service
                }
            });
        }

        return NextResponse.json({ success: true });
    } catch (e: any) {
        console.error('Error saving testimonials:', e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import staticTestimonials from '@/data/testimonials.json';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        let testimonials = await prisma.testimonial.findMany({
            where: { deleted: false },
            orderBy: { createdAt: 'desc' }
        });

        if (!testimonials || testimonials.length === 0) {
            console.log('Database empty, using static fallback for Testimonials');
            // Filter static data to match query logic (deleted: false)
            testimonials = (staticTestimonials as any[]).filter(t => !t.deleted);
        }

        return NextResponse.json(testimonials);
    } catch (error: any) {
        console.error('Public Testimonials API Error:', error);
        // Fallback on error
        const fallback = (staticTestimonials as any[]).filter(t => !t.deleted);
        return NextResponse.json(fallback);
    }
}

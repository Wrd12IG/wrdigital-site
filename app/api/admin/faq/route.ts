import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const faqs = await prisma.faq.findMany({
            orderBy: { order: 'asc' }
        });
        return NextResponse.json(faqs);
    } catch { return NextResponse.json([]); }
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

        if (Array.isArray(data)) {
            // Bulk replace
            await prisma.$transaction([
                prisma.faq.deleteMany(),
                prisma.faq.createMany({
                    data: data.map((faq: any, index: number) => ({
                        id: faq.id || undefined,
                        question: faq.question,
                        answer: faq.answer,
                        category: faq.category || 'General',
                        order: faq.order ?? index
                    }))
                })
            ]);
        } else {
            // Individual upsert
            await prisma.faq.upsert({
                where: { id: data.id || 'new' },
                update: {
                    question: data.question,
                    answer: data.answer,
                    category: data.category,
                    order: data.order
                },
                create: {
                    question: data.question,
                    answer: data.answer,
                    category: data.category,
                    order: data.order
                }
            });
        }

        return NextResponse.json({ success: true });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

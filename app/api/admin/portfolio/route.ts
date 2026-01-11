import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const isAdmin = (session: any) => {
    return (session?.user as any)?.role === 'admin' || session?.user?.email === 'roberto@wrdigital.it';
};

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const body = await req.json();
        const { action, project, id } = body;

        if (action === 'create' || action === 'update') {
            if (!project) return NextResponse.json({ error: 'Missing project data' }, { status: 400 });

            const data = {
                title: project.title,
                client: project.client,
                category: project.category,
                year: project.year,
                description: project.description,
                results: typeof project.results === 'string' ? project.results : JSON.stringify(project.results),
                tags: typeof project.tags === 'string' ? project.tags : JSON.stringify(project.tags),
                image: project.image,
                color: project.color || '#FACC15',
                showOnHome: project.showOnHome || false
            };

            const upsertedProject = await prisma.project.upsert({
                where: { id: project.id?.toString() || 'new' },
                update: data,
                create: { ...data, id: project.id?.toString() }
            });

            return NextResponse.json({ success: true, project: upsertedProject });
        }

        if (action === 'delete') {
            if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
            await prisma.project.delete({
                where: { id: id.toString() }
            });
            return NextResponse.json({ success: true });
        }

        if (action === 'save_all') {
            if (!body.projects || !Array.isArray(body.projects)) return NextResponse.json({ error: 'Missing projects array' }, { status: 400 });

            await prisma.$transaction([
                prisma.project.deleteMany(),
                prisma.project.createMany({
                    data: body.projects.map((p: any) => ({
                        id: p.id?.toString(),
                        title: p.title,
                        client: p.client,
                        category: p.category,
                        year: p.year,
                        description: p.description,
                        results: JSON.stringify(p.results),
                        tags: JSON.stringify(p.tags),
                        image: p.image,
                        color: p.color || '#FACC15',
                        showOnHome: p.showOnHome || false
                    }))
                })
            ]);

            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

    } catch (error) {
        console.error("Portfolio Admin Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

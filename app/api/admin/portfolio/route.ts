import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const isAdmin = (session: any) => {
    const role = (session?.user as any)?.role;
    const email = session?.user?.email?.toLowerCase();
    return role === 'admin' || email === 'roberto@wrdigital.it';
};

export async function POST(req: Request) {
    console.log('--- LOG: PORTFOLIO POST START ---');
    try {
        const session = await getServerSession(authOptions);
        if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const body = await req.json();
        const { action, project, id } = body;
        console.log('Action:', action);

        if (action === 'create' || action === 'update') {
            if (!project) return NextResponse.json({ error: 'Missing project data' }, { status: 400 });

            const serialize = (val: any) => {
                if (typeof val === 'string') return val;
                try { return JSON.stringify(val || []); } catch { return '[]'; }
            };

            const data = {
                title: project.title,
                client: project.client,
                category: project.category,
                year: project.year,
                description: project.description,
                results: serialize(project.results),
                tags: serialize(project.tags),
                image: project.image,
                color: project.color || '#FACC15',
                showOnHome: project.showOnHome || false
            };

            const upsertedProject = await prisma.project.upsert({
                where: { id: project.id?.toString() || 'new' },
                update: data,
                create: { ...data, id: project.id?.toString() || undefined }
            });

            const returnProject = {
                ...upsertedProject,
                results: JSON.parse(upsertedProject.results as string),
                tags: JSON.parse(upsertedProject.tags as string)
            };

            return NextResponse.json({ success: true, project: returnProject });
        }

        if (action === 'delete') {
            if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
            await prisma.project.update({
                where: { id: id.toString() },
                data: { deleted: true }
            });
            return NextResponse.json({ success: true });
        }

        if (action === 'save_all') {
            if (!body.projects || !Array.isArray(body.projects)) return NextResponse.json({ error: 'Missing projects array' }, { status: 400 });

            const serialize = (val: any) => {
                if (typeof val === 'string') return val;
                try { return JSON.stringify(val || []); } catch { return '[]'; }
            };

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
                        results: serialize(p.results),
                        tags: serialize(p.tags),
                        image: p.image,
                        color: p.color || '#FACC15',
                        showOnHome: p.showOnHome || false
                    }))
                })
            ]);
        }

        // Sync everything back to JSON for backup/seed purposes
        try {
            const fs = require('fs');
            const path = require('path');
            const allProjects = await prisma.project.findMany({
                where: { deleted: false },
                orderBy: { createdAt: 'desc' }
            });
            // Parse JSON strings back to objects for the JSON file
            const forJson = allProjects.map(p => ({
                ...p,
                results: JSON.parse(p.results as string),
                tags: JSON.parse(p.tags as string)
            }));
            const filePath = path.join(process.cwd(), 'data/portfolio.json');
            fs.writeFileSync(filePath, JSON.stringify(forJson, null, 2));
        } catch (err) {
            console.error('Failed to sync portfolio JSON:', err);
        }

        if (action === 'delete' || action === 'save_all' || action === 'create' || action === 'update') {
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

    } catch (error) {
        console.error("Portfolio Admin Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

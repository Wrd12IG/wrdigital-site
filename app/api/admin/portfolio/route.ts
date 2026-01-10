import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'portfolio.json');

// Helper Auth
const isAdmin = (session: any) => {
    return (session?.user as any)?.role === 'admin' || session?.user?.email === 'roberto@wrdigital.it';
};

// Helper Read/Write
const getProjects = () => {
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
};

const saveProjects = (projects: any[]) => {
    // Assicura che la dir esista
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 4));
};

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const body = await req.json();
        const { action, project, id } = body;

        let projects = getProjects();

        if (action === 'create' || action === 'update') {
            if (!project) return NextResponse.json({ error: 'Missing project data' }, { status: 400 });

            // Se update, rimuovi vecchio
            if (action === 'update') {
                projects = projects.filter((p: any) => p.id !== project.id);
            } else {
                // Se create, genera ID se non c'è (o usiamo timestamp)
                if (!project.id) project.id = Date.now().toString();
            }

            // Aggiungi in cima
            projects.unshift(project);
            saveProjects(projects);
            return NextResponse.json({ success: true, project });
        }

        if (action === 'delete') {
            if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
            projects = projects.filter((p: any) => p.id !== id);
            saveProjects(projects);
            return NextResponse.json({ success: true });
        }

        if (action === 'save_all') {
            if (!body.projects || !Array.isArray(body.projects)) return NextResponse.json({ error: 'Missing projects array' }, { status: 400 });
            saveProjects(body.projects);
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

    } catch (error) {
        console.error("Portfolio Admin Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

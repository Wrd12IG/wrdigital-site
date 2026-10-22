import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function isAdminSession(): Promise<boolean> {
    const session = await getServerSession(authOptions);
    return (session?.user as any)?.role === 'admin';
}

/** Da usare all'inizio di un handler: se ritorna una risposta, restituiscila. */
export async function requireAdmin(): Promise<NextResponse | null> {
    if (await isAdminSession()) return null;
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

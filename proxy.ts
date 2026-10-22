import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Aree riservate: richiedono un token NextAuth con role=admin.
// Le GET pubbliche usate dal sito vitrina restano aperte.
const PUBLIC_GET = new Set(['/api/admin/clients', '/api/admin/site-config']);

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (req.method === 'GET' && PUBLIC_GET.has(pathname)) return NextResponse.next();

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if ((token as any)?.role === 'admin') return NextResponse.next();

    if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = '/area-clienti';
    url.search = '';
    return NextResponse.redirect(url);
}

export const config = {
    matcher: ['/admin/:path*', '/api/admin/:path*', '/api/cms/:path*', '/api/indexnow'],
};

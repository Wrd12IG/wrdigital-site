import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const count = await prisma.user.count();
        const admin = await prisma.user.findUnique({
            where: { email: 'roberto@wrdigital.it' },
            select: { email: true, role: true }
        });

        return NextResponse.json({
            status: 'ok',
            usersCount: count,
            adminFound: !!admin,
            adminRole: admin?.role || 'none',
            timestamp: new Date().toISOString()
        });
    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            message: error.message
        }, { status: 500 });
    }
}

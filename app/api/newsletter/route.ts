
import { NextResponse } from 'next/server';
import { transporter, mailOptions } from '@/lib/nodemailer';
import { NewsletterTemplate } from '@/lib/email-template';

import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
    try {
        const headersList = await headers();
        const ip = headersList.get('x-forwarded-for') || 'unknown';

        // 1. Security: Rate Limiting
        const rateLimit = await checkRateLimit(ip);
        if (!rateLimit.allowed) {
            return NextResponse.json({ error: 'Troppe richieste. Riprova tra un\'ora.' }, { status: 429 });
        }

        const { email, privacyAccepted } = await request.json();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'Email non valida' }, { status: 400 });
        }

        if (!privacyAccepted) {
            return NextResponse.json({ error: 'Devi accettare la privacy policy' }, { status: 400 });
        }

        // Log Consenso GDPR
        const userAgent = headersList.get('user-agent') || 'unknown';

        await prisma.consentLog.create({
            data: {
                email,
                ipAddress: ip,
                userAgent,
                consentType: 'newsletter',
                consentVersion: 'v1.0',
                consentText: 'Ho letto e accetto la Privacy Policy e acconsento alla ricezione della newsletter.',
                accepted: true
            }
        });

        // Save Newsletter Lead
        await prisma.lead.create({
            data: {
                email,
                source: 'newsletter',
                ipAddress: ip,
                status: 'new'
            }
        });

        // Invio notifica via SMTP
        await transporter.sendMail({
            ...mailOptions,
            to: 'info@wrdigital.it, roberto@wrdigital.it',
            subject: '💚 Nuova Iscrizione Newsletter',
            html: NewsletterTemplate(email)
        });

        return NextResponse.json({ success: true, message: 'Iscrizione confermata' });

    } catch (error) {
        return NextResponse.json({ error: 'Errore interno' }, { status: 500 });
    }
}

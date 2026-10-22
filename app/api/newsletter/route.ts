
import { NextResponse } from 'next/server';
import { transporter, mailOptions } from '@/lib/nodemailer';
import { NewsletterTemplate } from '@/lib/email-template';

import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { checkRateLimit } from '@/lib/rate-limit';
import { clientIp, isEmail, isPhone, singleLine, verifyTurnstile } from '@/lib/spam-guard';

export async function POST(request: Request) {
    try {
        const headersList = await headers();
        const ip = clientIp(headersList);

        // 1. Security: Rate Limiting
        const rateLimit = await checkRateLimit(ip, 'newsletter-ip', 5, 3600);
        if (!rateLimit.allowed) {
            return NextResponse.json({ error: 'Troppe richieste. Riprova tra un\'ora.' }, { status: 429 });
        }

        const body = await request.json();
        if (!body || typeof body !== 'object') {
            return NextResponse.json({ error: 'Richiesta non valida' }, { status: 400 });
        }

        // Honeypot: i bot compilano il campo nascosto, rispondiamo "ok" senza fare nulla.
        if (typeof body.hp_site === 'string' && body.hp_site.trim() !== '') {
            return NextResponse.json({ success: true, message: 'Iscrizione confermata' });
        }

        if (!(await verifyTurnstile(body.cf_token, ip))) {
            return NextResponse.json({ error: 'Verifica anti-spam non superata' }, { status: 400 });
        }

        const email = singleLine(body.email, 254).toLowerCase();
        const phone = singleLine(body.phone, 25);
        const privacyAccepted = body.privacyAccepted === true;

        if (!isEmail(email)) {
            return NextResponse.json({ error: 'Email non valida' }, { status: 400 });
        }

        if (!isPhone(phone)) {
            return NextResponse.json({ error: 'Telefono non valido' }, { status: 400 });
        }

        if (!privacyAccepted) {
            return NextResponse.json({ error: 'Devi accettare la privacy policy' }, { status: 400 });
        }

        // Log Consenso GDPR
        const userAgent = (headersList.get('user-agent') || 'unknown').slice(0, 300);

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
                phone: phone || null,
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
            html: NewsletterTemplate(email, phone)
        });

        return NextResponse.json({ success: true, message: 'Iscrizione confermata' });

    } catch (error) {
        return NextResponse.json({ error: 'Errore interno' }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import { transporter, mailOptions } from '@/lib/nodemailer';
import { EmailTemplate, ClientConfirmationTemplate } from '@/lib/email-template';

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

        const body = await request.json();
        const { name, email, message, company, service, privacyAccepted } = body;

        // Validazione
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Campi obbligatori mancanti' }, { status: 400 });
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
                consentType: 'contact_form',
                consentVersion: 'v1.0',
                consentText: 'Ho letto e accetto la Privacy Policy e acconsento al trattamento dei dati personali.',
                accepted: true
            }
        });

        // Save Lead to DB
        await prisma.lead.create({
            data: {
                name,
                email,
                company: company || null,
                message,
                source: service === 'preventivo' ? 'wizard' : 'contact_form',
                services: service,
                ipAddress: ip,
                status: 'new'
            }
        });

        // 1. Invio Email Admin (Notifica Interna)
        await transporter.sendMail({
            ...mailOptions,
            to: 'info@wrdigital.it, roberto@wrdigital.it',
            replyTo: email,
            subject: `🔥 Lead: ${name} (${company || 'Privato'})`,
            html: EmailTemplate({ name, email, message, company, service })
        });

        // 2. Invio Email Cliente (Conferma Ricezione)
        await transporter.sendMail({
            ...mailOptions,
            to: email, // Al cliente
            subject: 'Abbiamo ricevuto la tua richiesta - W[r]Digital',
            html: ClientConfirmationTemplate(name)
        });

        return NextResponse.json({ success: true, message: 'Messaggio inviato' });

    } catch (error: any) {
        console.error('SMTP Error:', error);
        return NextResponse.json({ error: 'Errore invio email' }, { status: 500 });
    }
}

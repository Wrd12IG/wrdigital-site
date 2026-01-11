
import { NextResponse } from 'next/server';
import { transporter, mailOptions } from '@/lib/nodemailer';
import { NewsletterTemplate } from '@/lib/email-template';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'Email non valida' }, { status: 400 });
        }

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

import { NextResponse } from 'next/server';
import { transporter, mailOptions } from '@/lib/nodemailer';
import { EmailTemplate } from '@/lib/email-template';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message, company, service } = body;

        // Validazione
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Campi obbligatori mancanti' }, { status: 400 });
        }

        // Invio Email Admin
        await transporter.sendMail({
            ...mailOptions,
            to: 'info@wrdigital.it, roberto@wrdigital.it',
            replyTo: email,
            subject: `🔥 Lead: ${name} (${company || 'Privato'})`,
            html: EmailTemplate({ name, email, message, company, service })
        });

        return NextResponse.json({ success: true, message: 'Messaggio inviato' });

    } catch (error: any) {
        console.error('SMTP Error:', error);
        return NextResponse.json({ error: 'Errore invio email' }, { status: 500 });
    }
}

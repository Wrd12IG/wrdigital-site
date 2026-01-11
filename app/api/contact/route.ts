import { NextResponse } from 'next/server';
import { transporter, mailOptions } from '@/lib/nodemailer';

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
            subject: `Nuovo Contatto Web: ${name}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #333;">Nuova richiesta dal sito web</h2>
                    <p><strong>Nome:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Azienda:</strong> ${company || '-'}</p>
                    <p><strong>Servizio:</strong> ${service || '-'}</p>
                    <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;" />
                    <p><strong>Messaggio:</strong></p>
                    <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
                </div>
            `
        });

        return NextResponse.json({ success: true, message: 'Messaggio inviato' });

    } catch (error: any) {
        console.error('SMTP Error:', error);
        return NextResponse.json({ error: 'Errore invio email' }, { status: 500 });
    }
}

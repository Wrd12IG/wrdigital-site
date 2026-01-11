import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message, company, service } = body;

        // Validazione Server-side di base
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Tutti i campi obbligatori devono essere compilati.' },
                { status: 400 }
            );
        }

        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY mancante nel file .env');
            return NextResponse.json({ error: 'Errore configurazione server email' }, { status: 500 });
        }

        // Invio Email Reale tramite Resend
        await resend.emails.send({
            from: 'W[r]Digital Site <onboarding@resend.dev>', // Usa il dominio di test o uno verificato
            to: ['info@wrdigital.it', 'roberto@wrdigital.it'],
            replyTo: email, // Rispondi direttamente al cliente
            subject: `Nuovo Contatto Web: ${name}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #333;">Nuova richiesta dal sito web</h2>
                    <p><strong>Nome:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Azienda:</strong> ${company || '-'}</p>
                    <p><strong>Servizio d'interesse:</strong> ${service || 'Generico'}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="font-size: 16px; color: #555;"><strong>Messaggio:</strong></p>
                    <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
                </div>
            `
        });

        console.log('Email inviata con successo:', { name, email });

        return NextResponse.json(
            { success: true, message: 'Messaggio inviato con successo!' },
            { status: 200 }
        );

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Si è verificato un errore interno del server.' },
            { status: 500 }
        );
    }
}

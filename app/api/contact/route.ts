import { NextResponse } from 'next/server';

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

        // Simulazione ritardo invio email (per vedere l'animazione di caricamento)
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // QUI ANDREBBE L'INTEGRAZIONE REALE CON RESEND / SENDGRID
        // Esempio con Resend:
        // await resend.emails.send({
        //     from: 'onboarding@resend.dev',
        //     to: 'tuamail@wrdigital.it',
        //     subject: `Nuovo contatto web da ${name}`,
        //     html: `<p>Messaggio: ${message}</p>`
        // });

        console.log('Messaggio ricevuto:', { name, email, company, service, message });

        return NextResponse.json(
            { success: true, message: 'Messaggio inviato con successo!' },
            { status: 200 }
        );

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Si è verificato un errore interno del server.' },
            { status: 500 }
        );
    }
}

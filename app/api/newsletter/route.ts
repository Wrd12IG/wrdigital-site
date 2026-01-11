
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'Email non valida' }, { status: 400 });
        }

        if (process.env.RESEND_API_KEY) {
            await resend.emails.send({
                from: 'W[r]Digital Site <onboarding@resend.dev>',
                to: ['info@wrdigital.it', 'roberto@wrdigital.it'],
                subject: 'Nuova Iscrizione Newsletter',
                html: `<p>Nuova iscrizione ricevuta: <strong>${email}</strong></p>`
            });
        }

        return NextResponse.json({ success: true, message: 'Iscrizione confermata' });

    } catch (error) {
        return NextResponse.json({ error: 'Errore interno' }, { status: 500 });
    }
}

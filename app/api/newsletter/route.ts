
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'Email non valida' }, { status: 400 });
        }

        // Qui potresti salvare nel DB o inviare a Mailchimp/Resend
        // Per ora simuliamo successo e logghiamo
        console.log('Nuovo iscritto newsletter:', email);

        // Esempio salvataggio su un modello ipotetico (se esistesse)
        // await prisma.newsletterSubscriber.create({ data: { email } });

        return NextResponse.json({ success: true, message: 'Iscrizione confermata' });

    } catch (error) {
        return NextResponse.json({ error: 'Errore interno' }, { status: 500 });
    }
}

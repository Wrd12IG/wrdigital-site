import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message, company, service, privacyAccepted } = body;

        // Validazione base
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Campi obbligatori mancanti' }, { status: 400 });
        }

        if (!privacyAccepted) {
            return NextResponse.json({ error: 'Devi accettare la privacy policy' }, { status: 400 });
        }

        // Try to save to database (optional, graceful failure)
        let dbSaved = false;
        try {
            const { prisma } = await import('@/lib/prisma');
            const { headers } = await import('next/headers');
            const headersList = await headers();
            const ip = headersList.get('x-forwarded-for') || 'unknown';
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
            dbSaved = true;
        } catch (dbError) {
            console.warn('Database save failed (continuing):', dbError);
        }

        // Try to send emails (optional, graceful failure)
        let emailSent = false;
        try {
            const { transporter, mailOptions } = await import('@/lib/nodemailer');
            const { EmailTemplate, ClientConfirmationTemplate } = await import('@/lib/email-template');

            // Email to admin
            await transporter.sendMail({
                ...mailOptions,
                to: 'info@wrdigital.it, roberto@wrdigital.it',
                replyTo: email,
                subject: `🔥 Lead: ${name} (${company || 'Privato'})`,
                html: EmailTemplate({ name, email, message, company, service })
            });

            // Email to client
            await transporter.sendMail({
                ...mailOptions,
                to: email,
                subject: 'Abbiamo ricevuto la tua richiesta - W[r]Digital',
                html: ClientConfirmationTemplate(name)
            });
            emailSent = true;
        } catch (emailError) {
            console.warn('Email send failed (continuing):', emailError);
        }

        // Log the submission for debugging
        console.log('Contact form submitted:', {
            name,
            email,
            service,
            dbSaved,
            emailSent,
            timestamp: new Date().toISOString()
        });

        // Always return success to the user (form was received)
        return NextResponse.json({
            success: true,
            message: 'Messaggio inviato',
            details: { dbSaved, emailSent }
        });

    } catch (error: any) {
        console.error('Contact form error:', error);
        return NextResponse.json({
            error: 'Errore durante l\'invio. Riprova più tardi.'
        }, { status: 500 });
    }
}

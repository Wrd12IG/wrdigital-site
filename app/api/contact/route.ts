import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { clean, clientIp, countLinks, isEmail, isPhone, singleLine, verifyTurnstile } from '@/lib/spam-guard';

const OK = () => NextResponse.json({ success: true, message: 'Messaggio inviato' });
const BAD = (error: string, status = 400) => NextResponse.json({ error }, { status });

export async function POST(request: Request) {
    try {
        const ip = clientIp(request.headers);

        // Rate limit per IP: 5 richieste/ora
        if (!(await checkRateLimit(ip, 'contact-ip', 5, 3600)).allowed) {
            return BAD('Troppe richieste. Riprova più tardi.', 429);
        }

        let body: any;
        try {
            body = await request.json();
        } catch {
            return BAD('Richiesta non valida');
        }
        if (!body || typeof body !== 'object') return BAD('Richiesta non valida');

        // Honeypot: solo i bot compilano il campo nascosto. Rispondiamo "ok" senza fare nulla.
        if (typeof body.hp_site === 'string' && body.hp_site.trim() !== '') return OK();

        if (!(await verifyTurnstile(body.cf_token, ip))) return BAD('Verifica anti-spam non superata');

        const name = singleLine(body.name, 100);
        const email = singleLine(body.email, 254).toLowerCase();
        const phone = singleLine(body.phone, 25);
        const message = clean(body.message, 3000);
        const company = singleLine(body.company, 150);
        const website = singleLine(body.website, 200);
        const service = singleLine(body.service, 100);

        if (!name || !email || !phone || !message) return BAD('Campi obbligatori mancanti');
        if (!isEmail(email)) return BAD('Email non valida');
        if (!isPhone(phone)) return BAD('Telefono non valido');
        if (body.privacyAccepted !== true) return BAD('Devi accettare la privacy policy');

        // Il nome non deve contenere link; il messaggio al massimo 2 (il wizard ne inserisce uno).
        if (countLinks(name) > 0 || countLinks(company) > 0) return OK();
        if (countLinks(message) > 2) return OK();

        // Un solo invio all'ora per indirizzo email: impedisce di usare il form per bombardare terzi.
        if (!(await checkRateLimit(email, 'contact-email', 1, 3600)).allowed) return OK();

        let dbSaved = false;
        try {
            const { prisma } = await import('@/lib/prisma');
            const userAgent = (request.headers.get('user-agent') || 'unknown').slice(0, 300);

            await prisma.consentLog.create({
                data: {
                    email,
                    ipAddress: ip,
                    userAgent,
                    consentType: 'contact_form',
                    consentVersion: 'v1.0',
                    consentText: 'Ho letto e accetto la Privacy Policy e acconsento al trattamento dei dati personali.',
                    accepted: true,
                },
            });

            await prisma.lead.create({
                data: {
                    name,
                    email,
                    phone,
                    company: company || null,
                    website: website || null,
                    message,
                    source: service === 'preventivo' ? 'wizard' : 'contact_form',
                    services: service,
                    ipAddress: ip,
                    status: 'new',
                },
            });
            dbSaved = true;
        } catch (dbError) {
            console.warn('Database save failed (continuing):', dbError);
        }

        let emailSent = false;
        try {
            const { transporter, mailOptions } = await import('@/lib/nodemailer');
            const { EmailTemplate, ClientConfirmationTemplate } = await import('@/lib/email-template');

            await transporter.sendMail({
                ...mailOptions,
                to: 'info@wrdigital.it, roberto@wrdigital.it',
                replyTo: email,
                subject: `🔥 Lead: ${name} (${company || 'Privato'})`,
                html: EmailTemplate({ name, email, phone, message, company, service }),
            });

            await transporter.sendMail({
                ...mailOptions,
                to: email,
                subject: 'Abbiamo ricevuto la tua richiesta - W[r]Digital',
                html: ClientConfirmationTemplate(name),
            });
            emailSent = true;
        } catch (emailError) {
            console.warn('Email send failed (continuing):', emailError);
        }

        console.log('Contact form submitted:', { service, dbSaved, emailSent, timestamp: new Date().toISOString() });

        return NextResponse.json({ success: true, message: 'Messaggio inviato' });
    } catch (error) {
        console.error('Contact form error:', error);
        return BAD("Errore durante l'invio. Riprova più tardi.", 500);
    }
}

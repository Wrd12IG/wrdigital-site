import nodemailer from 'nodemailer';

// Configurazione Transporter Unica per tutta l'app. Le credenziali arrivano solo dalle variabili d'ambiente.
export const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // STARTTLS
    requireTLS: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export const mailOptions = {
    from: '"W[r]Digital Site" <info@wrdigital.it>', // Mittente verificato su Brevo
};

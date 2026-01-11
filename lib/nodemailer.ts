
import nodemailer from 'nodemailer';

// Configurazione Transporter Unica per tutta l'app
export const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // true per 465, false per altre porte
    auth: {
        user: '768ca0001@smtp-brevo.com', // Login SMTP Brevo (spesso coincide con l'email account o un ID specifico)
        // NOTA: In produzione usare process.env.SMTP_PASSWORD
        // Qui usiamo la chiave fornita temporaneamente per configurazione espressa
        pass: process.env.SMTP_PASSWORD,
    },
});

export const mailOptions = {
    from: '"W[r]Digital Site" <info@wrdigital.it>', // Mittente verificato su Brevo
};


import * as dotenv from 'dotenv';
import path from 'path';
import nodemailer from 'nodemailer';

// Manual loading of env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function testEmail() {
    console.log('--- SMTP DEBUG ---');
    console.log('Host: smtp-relay.brevo.com');
    console.log('Port: 587');
    console.log('User:', process.env.SMTP_USER);
    console.log('Pass Length:', process.env.SMTP_PASSWORD?.length || 0);

    const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    try {
        console.log('Sending test email...');
        const info = await transporter.sendMail({
            from: '"W[r]Digital Test" <info@wrdigital.it>',
            to: 'roberto@wrdigital.it, info@wrdigital.it',
            subject: 'Test SMTP Config - Antigravity',
            text: 'Se ricevi questa mail, la configurazione SMTP è corretta.',
        });
        console.log('SUCCESS! Message ID:', info.messageId);
    } catch (error: any) {
        console.error('ERROR during SMTP test:');
        console.error(error.message);
        if (error.code) console.error('Error Code:', error.code);
        if (error.command) console.error('Command:', error.command);
    }
}

testEmail();

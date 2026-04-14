
import { transporter, mailOptions } from '../lib/nodemailer';

async function testEmail() {
    console.log('Testing email configuration from lib/nodemailer...');

    try {
        const info = await transporter.sendMail({
            ...mailOptions,
            to: 'roberto@wrdigital.it, info@wrdigital.it',
            subject: 'Test Email - Verificating Config',
            text: 'This is a test email sent using the same configuration as the contact form.',
            html: '<b>Test Email sent from the workspace!</b>',
        });

        console.log('Email sent successfully!');
        console.log('Message ID:', info.messageId);
    } catch (error) {
        console.error('Failed to send email:', error);
    }
}

testEmail();

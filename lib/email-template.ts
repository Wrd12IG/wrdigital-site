
export const EmailTemplate = (data: { name: string; email: string; message?: string; service?: string; company?: string }) => `
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuovo Lead W[r]Digital</title>
</head>
<body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; color: #333;">
    <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <div style="background-color: #000000; padding: 30px; text-align: center; border-bottom: 3px solid #FACC15;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px;">W[<span style="color: #FACC15;">r</span>]Digital</h1>
            <p style="color: #888; font-size: 12px; text-transform: uppercase; margin-top: 10px; letter-spacing: 1px;">Nuova Richiesta Contatto</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px;">
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px;">Ciao Team,</p>
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px;">È arrivata una nuova richiesta dal sito web. Ecco i dettagli del potenziale cliente:</p>
            
            <div style="background-color: #f9f9f9; padding: 25px; border-radius: 8px; border: 1px solid #eeeeee;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 12px; text-transform: uppercase; width: 30%;">Nome</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; font-size: 15px;">${data.name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 12px; text-transform: uppercase;">Email</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; font-size: 15px;">
                            <a href="mailto:${data.email}" style="color: #2563EB; text-decoration: none;">${data.email}</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 12px; text-transform: uppercase;">Azienda</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; font-size: 15px;">${data.company || '-'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 12px; text-transform: uppercase;">Interesse</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #FACC15; font-weight: bold; font-size: 15px;">${data.service || 'Generico'}</td>
                    </tr>
                </table>
            </div>

            ${data.message ? `
            <div style="margin-top: 30px;">
                <p style="color: #888; font-size: 12px; text-transform: uppercase; margin-bottom: 10px;">Messaggio:</p>
                <div style="background-color: #fff8f0; border-left: 4px solid #FACC15; padding: 20px; font-style: italic; color: #555;">
                    "${data.message}"
                </div>
            </div>
            ` : ''}

            <!-- Action Button -->
            <div style="margin-top: 40px; text-align: center;">
                <a href="mailto:${data.email}" style="display: inline-block; background-color: #000000; color: #ffffff; padding: 14px 30px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                    Rispondi Ora
                </a>
            </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f1f1f1; padding: 20px; text-align: center; font-size: 12px; color: #999;">
            <p style="margin: 0;">Lead generato automaticamente da wrdigital.it</p>
            <p style="margin: 5px 0 0 0;">&copy; ${new Date().getFullYear()} W[r]Digital</p>
        </div>
    </div>
</body>
</html>
`;

export const NewsletterTemplate = (email: string) => `
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Nuova Iscrizione Newsletter</title>
</head>
<body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
        <div style="background-color: #000000; padding: 30px; text-align: center; border-bottom: 3px solid #22C55E;">
             <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px;">W[<span style="color: #FACC15;">r</span>]Digital</h1>
             <p style="color: #22C55E; font-size: 12px; text-transform: uppercase; margin-top: 10px; letter-spacing: 1px; font-weight: bold;">Nuova Iscrizione</p>
        </div>
        <div style="padding: 50px 30px; text-align: center;">
            <div style="background-color: #f0fdf4; border: 1px dashed #22C55E; padding: 20px; border-radius: 10px; display: inline-block; margin-bottom: 20px;">
                <p style="margin: 0; font-size: 18px; font-weight: bold; color: #15803d;">${email}</p>
            </div>
            <p style="color: #666; margin: 0;">si è appena iscritto alla newsletter.</p>
        </div>
    </div>
</body>
</html>
`;

export const ClientConfirmationTemplate = (name: string) => `
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Ricevuta Richiesta Contatto</title>
</head>
<body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
        <div style="background-color: #000000; padding: 30px; text-align: center; border-bottom: 3px solid #FACC15;">
             <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px;">W[<span style="color: #FACC15;">r</span>]Digital</h1>
        </div>
        <div style="padding: 40px;">
            <p style="font-size: 16px; margin-bottom: 20px;">Ciao <strong>${name}</strong>,</p>
            <p style="font-size: 16px; line-height: 1.6; color: #555;">Abbiamo ricevuto la tua richiesta. Il nostro team sta già analizzando il tuo messaggio e ti risponderemo entro 24 ore lavorative.</p>
            <p style="font-size: 16px; line-height: 1.6; color: #555;">Nel frattempo, se vuoi dare un'occhiata ai nostri ultimi lavori, visita il nostro <a href="https://wrdigital.it/#lavori" style="color: #FACC15; font-weight: bold; text-decoration: none;">Portfolio</a>.</p>
            
            <div style="margin-top: 40px; text-align: center; border-top: 1px solid #eee; padding-top: 30px;">
                <p style="font-size: 12px; color: #999;">A presto,<br>Il team di W[r]Digital</p>
            </div>
        </div>
    </div>
</body>
</html>
`;

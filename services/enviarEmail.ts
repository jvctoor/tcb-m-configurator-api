import nodemailer from 'nodemailer';

interface EmailOptions {
    to: string;
    subject: string;
    text: string;
}

async function enviarEmail(opcoes: EmailOptions): Promise<void> {
    // Configuração do transporte do Nodemailer

    const transporter = nodemailer.createTransport({
        host: 'email-ssl.com.br',
        port: 465,
        secure: true,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL_REMETENTE,
            pass: process.env.SENHA_EMAIL
        }
    });

    // Configuração do email
    const mailOptions = {
        from: process.env.EMAIL_REMETENTE,
        to: opcoes.to,
        subject: opcoes.subject,
        text: opcoes.text
    };

    try {
        // Envia o email
        await transporter.sendMail(mailOptions);
        console.log(`Email enviado com sucesso: ${opcoes.to}`);
    } catch (error) {
        console.error('Erro ao enviar o email:', error);
    }
}

export default enviarEmail;

import nodemailer from 'nodemailer';

interface EmailOptions {
    to: string;
    subject: string;
    text: string;
}

async function enviarEmail(opcoes: EmailOptions): Promise<void> {
    // Configuração do transporte do Nodemailer
    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.SENHA_EMAIL
        }
    });

    // Configuração do email
    const mailOptions = {
        from: process.env.EMAIL,
        to: opcoes.to,
        subject: opcoes.subject,
        text: opcoes.text
    };

    try {
        // Envia o email
        await transporter.sendMail(mailOptions);
        console.log('Email enviado com sucesso');
    } catch (error) {
        console.error('Erro ao enviar o email:', error);
    }
}

export default enviarEmail;

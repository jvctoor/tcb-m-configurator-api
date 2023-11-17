import nodemailer from 'nodemailer';

interface EmailOptions {
    to: string;
    subject: string;
    text: string;
}

async function enviarEmail(opcoes: EmailOptions): Promise<void> {
    // Configuração do transporte do Nodemailer

    // console.log(process.env.EMAIL_REMETENTE)

    const transporter = nodemailer.createTransport({
        host: 'email-ssl.com.br',
        port: 465,
        secure: true,
        requireTLS: true,
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

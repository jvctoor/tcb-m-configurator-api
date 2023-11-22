"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
function enviarEmail(opcoes) {
    return __awaiter(this, void 0, void 0, function* () {
        // Configuração do transporte do Nodemailer
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
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
            yield transporter.sendMail(mailOptions);
            console.log(`Email enviado com sucesso: ${opcoes.to}`);
        }
        catch (error) {
            console.error(`Erro ao enviar o email para ${opcoes.to}, usuario: ${process.env.EMAIL_REMETENTE}, senha: ${process.env.SENHA_EMAIL}:`, error);
        }
    });
}
exports.default = enviarEmail;

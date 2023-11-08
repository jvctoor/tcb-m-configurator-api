"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autenticarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function autenticarToken(req, res, next) {
    const token = req.header('Authorization');
    console.log(token);
    if (!token) {
        return res.status(401).json({ mensagem: 'Token não fornecido' });
    }
    jsonwebtoken_1.default.verify(token, process.env.CHAVE_SECRETA, (err, usuario) => {
        if (err) {
            return res.status(403).json({ mensagem: 'Falha na autenticação do token' });
        }
        req.usuario = usuario;
        next();
    });
}
exports.autenticarToken = autenticarToken;

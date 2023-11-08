"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.signup = exports.login = void 0;
const usuarioDAO_1 = __importDefault(require("../daos/usuarioDAO"));
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const usuarioDAO = new usuarioDAO_1.default();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //console.log("comecei a buscar")
        const user = yield usuarioDAO.getUsuarioByUsuario(req.body.usuario);
        //console.log(user)
        if (!user) {
            res.send(400);
        }
        const senha = req.body.senha;
        const senhaCorreta = yield bcrypt.compare(senha, user.senha);
        if (!senhaCorreta) {
            res.send(401);
        }
        const token = jwt.sign({ id: user.idUsuario, email: user.email }, process.env.CHAVE_SECRETA, { expiresIn: '7d' } // O token expira em 1 hora
        );
        res.send({ authToken: token });
    }
    catch (error) {
        res.status(400).send("Usuário não encontrado");
    }
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuario, email, senha } = req.body;
        // Verificar se o e-mail já está cadastrado
        try {
            const usuarioExistente = yield usuarioDAO.getUsuarioByUsuario(usuario);
            if (usuarioExistente) {
                return res.status(400).json({ mensagem: 'Este usuário já está cadastrado' });
            }
        }
        catch (error) {
            console.log("Erro no get");
        }
        // Criar um novo usuário
        const novoUsuario = yield usuarioDAO.criarUsuario(email, senha, usuario);
        return res.send({ mensagem: 'Usuário cadastrado com sucesso', usuario: novoUsuario });
    }
    catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        return res.status(500).json({ mensagem: 'Ocorreu um erro ao cadastrar o usuário' });
    }
});
exports.signup = signup;

import UsuarioDAO from '../daos/usuarioDAO'
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import e, { request, Request, Response } from 'express';

const usuarioDAO = new UsuarioDAO()

export const login = async (req: Request, res: Response) => {

    try {
        //console.log("comecei a buscar")
        const user = await usuarioDAO.getUsuarioByUsuario(req.body.usuario)
        //console.log(user)

        if (!user) {
            res.send(400)
        }
        const senha = req.body.senha;
        const senhaCorreta = await bcrypt.compare(senha, user.senha);
        
        if (!senhaCorreta) {
            res.send(401)
        }

        const token = jwt.sign(
            { id: user.idUsuario, email: user.email },
            process.env.CHAVE_SECRETA as string,
            { expiresIn: '7d' } // O token expira em 1 hora
        );

        res.send({authToken: token});
    } catch (error) {
        res.status(400).send("Usuário não encontrado")
    }
}

export const signup = async (req: Request, res: Response) => {
    try {
        const { usuario, email, senha } = req.body;

        // Verificar se o e-mail já está cadastrado
        try {
            const usuarioExistente = await usuarioDAO.getUsuarioByUsuario(usuario);

            if (usuarioExistente) {
                return res.status(400).json({ mensagem: 'Este usuário já está cadastrado' });
            }
        } catch(error) {
            console.log("Erro no get")
        }

        // Criar um novo usuário
        const novoUsuario = await usuarioDAO.criarUsuario(
            email,
            senha,
            usuario
        );

        return res.send({ mensagem: 'Usuário cadastrado com sucesso', usuario: novoUsuario });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        return res.status(500).json({ mensagem: 'Ocorreu um erro ao cadastrar o usuário' });
    }
}
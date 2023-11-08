import { PrismaClient, Prisma } from '@prisma/client'
import internal from 'stream';
const prisma = new PrismaClient()
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class UsuarioDAO {

    async criarUsuario(email: string, senha: string, usuario: string) {
        const senhaHash = await bcrypt.hash(senha, 10);

        const novoUsuario = await prisma.usuario.create({
            data: {
              usuario,
              senha: senhaHash,
              email
            }
          });

          return novoUsuario

    }

    async getUsuarioByUsuario(usuario: string) {

        const user = await prisma.usuario.findUnique({
            where: {
              usuario: usuario,
            },
          });

          if (!user) {
            throw new Error('Usuário não encontrado');
          }
        
          return user

    }

    async getUsuarioByEmail(email: string) {

        const user = await prisma.usuario.findUnique({
            where: {
              email: email,
            },
          });

          if (!user) {
            throw new Error('Usuário não encontrado');
          }
        
          return user

    }

}



export default UsuarioDAO;
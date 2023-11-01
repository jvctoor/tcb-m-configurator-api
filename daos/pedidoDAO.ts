import { PrismaClient, Prisma } from '@prisma/client'
import internal from 'stream';
const prisma = new PrismaClient()

class PedidoDAO {

    async createPedido(nome: string, empresa: string, telefone: string, email: string, interfaces: {quantidade: number, valor: number, imagem: string }[], observacoes?: string) {
        return prisma.pedido.create({
            data: {
              nome,
              empresa,
              telefone,
              email,
              observacoes,
              interfaces: {
                create: interfaces,
              },
            }, include: {
                interfaces: true
            },
          });
    }

    async getAllPedidos() {
        return prisma.pedido.findMany({
            include: {
                interfaces: true
            }
        })
    }
}

export default PedidoDAO;
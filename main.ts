import { PrismaClient, Prisma } from '@prisma/client'
import PedidoDAO from './daos/pedidoDAO'

const prisma = new PrismaClient()

async function main() {

    const pedidoDAO: PedidoDAO = new PedidoDAO();

    const interfaces = [
        { quantidade: 1, valor: 90.20, imagem: "google.com"},
        { quantidade: 2, valor: 100.50, imagem: "google.com"},
      ];

    const user = await pedidoDAO.createPedido("João", "Foursys", "1313030011", "jv1ctor24@f.com", interfaces, "obs");

    const pedidos = await pedidoDAO.getAllPedidos()
    console.log(JSON.stringify(pedidos, null, 2))
    //console.log(user);

}

//main();


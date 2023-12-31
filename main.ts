import { PrismaClient, Prisma } from '@prisma/client'
import PedidoDAO from './daos/pedidoDAO'
import IPedido from './models/pedidoModel';
import enviarEmail from './services/enviarEmail'

const prisma = new PrismaClient()

async function main() {

  // const pedidoDAO: PedidoDAO = new PedidoDAO();

  // const itens_interface1 = [
  //   {descricao: "modulo 1", preco: 129.90, cod: 1, imagem: "imagem.com"},
  //   {descricao: "modulo 2", preco: 539.90, cod: 1, imagem: "imagem.com"},
  // ]

  // const itens_interface2 = [
  //   {descricao: "modulo 3", preco: 29.90, cod: 1, imagem: "imagem.com"},
  //   {descricao: "modulo 4", preco: 39.90, cod: 1, imagem: "imagem.com"},
  // ]

  // const ambientes = ["Lista de string 1", "Lista de string 2"]

  // const interfaces = [
  //     { quantidade: 1, valor: 90.20, imagem: "url.com", itens_selecionados: itens_interface1 ,ambiente: ambientes},
  //     { quantidade: 2, valor: 100.50, imagem: "url.com", itens_selecionados: itens_interface2, ambiente: ambientes},
  //   ];

  // const cabos = [
  //   { lista_itens: {descricao: "Cabo coaxial", preco:350, imagem: "url", tipo:"Cabo", cod: 1}, quantidade: 2, valor: 79.90 },
  //   { lista_itens: {descricao: "Cabo coaxial 2", preco:120, imagem: "url", tipo:"Cabo2", cod: 2}, quantidade: 2, valor: 79.90 }
  // ]

  // const pedido: IPedido = {
  //   nome: "João",
  //   empresa: "Foursys",
  //   telefone: "13981699801",
  //   email: "jvctor23@gmail.com",
  //   interfaces,
  //   cabos,
  //   observacoes: "Entrega discreta por favor"
  // }

  // const user = await pedidoDAO.createPedido(pedido);

  // const pedidos = await pedidoDAO.getAllPedidos()
  // console.log(JSON.stringify(pedidos, null, 2))
  // //console.log(user);

  const emailOpt = {
    to: "jvctor23@gmail.com",
    subject: "Seu pedido foi gerado!",
    text: `Confira aqui seu pedido: http://localhost:3000/pdf/download/3?mostraPreco=1`
  }

  const emailOptGerente = {
    to: "jvctor23@gmail.com",
    subject: "Novo pedido gerado!",
    text: `Confira aqui o pedido: http://localhost:3000/pdf/download/3?mostraPreco=1`
  }
  await enviarEmail(emailOpt)
  //await enviarEmail(emailOptGerente)

}

main();


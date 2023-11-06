import { PrismaClient, Prisma } from '@prisma/client'
import internal from 'stream';
const prisma = new PrismaClient()
import IPedido from '../models/pedidoModel'

class PedidoDAO {

    async createPedido(pedido: IPedido
    ) {

        const interfacesData = pedido.interfaces.map(interfaceItem => ({
            quantidade: interfaceItem.quantidade,
            valor: interfaceItem.valor,
            imagem: interfaceItem.imagem,
            itens: {
                create: interfaceItem.itens_selecionados.map(item => ({
                    descricao: item.descricao,
                    cod: item.cod,
                    imagem: item.imagem,
                    preco: item.preco
                }))
            },
            ambientes: interfaceItem.ambiente || interfaceItem.ambiente == "Informe o ambiente" ? {
                create: interfaceItem.ambiente.map(ambiente => ({
                    ambiente: ambiente
                }))
            } : undefined
        }));

        const cabosData = pedido.cabos.map(cabo => ({
            nome: cabo.lista_itens.descricao,
            cod: cabo.lista_itens.cod,
            imagem: cabo.lista_itens.imagem,
            quantidade: cabo.quantidade,
            preco: cabo.lista_itens.preco
        }));

        return prisma.pedido.create({
            data: {
                nome: pedido.nome,
                empresa: pedido.empresa,
                telefone: pedido.telefone,
                email: pedido.email,
                observacoes: pedido.observacoes,
                interfaces: {
                    create: interfacesData
                },
                cabos: {
                    create: cabosData,
                }
            }, include: {
                interfaces: {
                    include: {
                        ambientes: true,
                        itens: true
                    }
                },
                cabos: true
            },
        });
    }

    async getAllPedidos() {
        return prisma.pedido.findMany({
            include: {
                interfaces: {
                    include: {
                        ambientes: true,
                        itens: true
                    }
                },
                cabos: true
            }
        })
    }

    async getPedidoById(id: number) {
        return prisma.pedido.findUnique({
            where: {
                idPedido: id
            },
            include: {
                cabos: true,
                interfaces: {
                    include: {
                        ambientes:true,
                        itens:true
                    }
                }
            }
        })
    }
}

export default PedidoDAO;
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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PedidoDAO {
    createPedido(pedido) {
        return __awaiter(this, void 0, void 0, function* () {
            const interfacesData = pedido.interfaces.map(interfaceItem => ({
                quantidade: interfaceItem.quantidade,
                valor: interfaceItem.valor,
                imagem: interfaceItem.imagem,
                itens: {
                    create: interfaceItem.itens_selecionados.map(item => ({
                        descricao: item.descricao,
                        preco: item.preco
                    }))
                },
                ambientes: {
                    create: interfaceItem.ambiente.map(ambiente => ({
                        ambiente: ambiente
                    }))
                }
            }));
            const cabosData = pedido.cabos.map(cabo => ({
                nome: cabo.lista_itens.descricao,
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
        });
    }
    getAllPedidos() {
        return __awaiter(this, void 0, void 0, function* () {
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
            });
        });
    }
    getPedidoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.pedido.findUnique({
                where: {
                    idPedido: id
                },
                include: {
                    cabos: true,
                    interfaces: {
                        include: {
                            ambientes: true,
                            itens: true
                        }
                    }
                }
            });
        });
    }
}
exports.default = PedidoDAO;

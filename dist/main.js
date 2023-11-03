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
const client_1 = require("@prisma/client");
const pedidoDAO_1 = __importDefault(require("./daos/pedidoDAO"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const pedidoDAO = new pedidoDAO_1.default();
        const itens_interface1 = [
            { descricao: "modulo 1", preco: 129.90 },
            { descricao: "modulo 2", preco: 539.90 },
        ];
        const itens_interface2 = [
            { descricao: "modulo 3", preco: 29.90 },
            { descricao: "modulo 4", preco: 39.90 },
        ];
        const ambientes = ["Lista de string 1", "Lista de string 2"];
        const interfaces = [
            { quantidade: 1, valor: 90.20, imagem: "url.com", itens_selecionados: itens_interface1, ambiente: ambientes },
            { quantidade: 2, valor: 100.50, imagem: "url.com", itens_selecionados: itens_interface2, ambiente: ambientes },
        ];
        const cabos = [
            { lista_itens: { descricao: "Cabo coaxial", preco: 350, imagem: "url", tipo: "Cabo" }, quantidade: 2, valor: 79.90 },
            { lista_itens: { descricao: "Cabo coaxial 2", preco: 120, imagem: "url", tipo: "Cabo2" }, quantidade: 2, valor: 79.90 }
        ];
        const pedido = {
            nome: "João",
            empresa: "Foursys",
            telefone: "13981699801",
            email: "jvctor23@gmail.com",
            interfaces,
            cabos,
            observacoes: "Entrega discreta por favor"
        };
        const user = yield pedidoDAO.createPedido(pedido);
        const pedidos = yield pedidoDAO.getAllPedidos();
        console.log(JSON.stringify(pedidos, null, 2));
        //console.log(user);
    });
}
main();

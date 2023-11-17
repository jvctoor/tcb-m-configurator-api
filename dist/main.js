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
const enviarEmail_1 = __importDefault(require("./services/enviarEmail"));
const prisma = new client_1.PrismaClient();
function main() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
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
        };
        const emailOptGerente = {
            to: (_b = (_a = process.env.EMAIL_GERENCIAL) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "",
            subject: "Novo pedido gerado!",
            text: `Confira aqui o pedido: http://localhost:3000/pdf/download/3?mostraPreco=1`
        };
        yield (0, enviarEmail_1.default)(emailOpt);
        yield (0, enviarEmail_1.default)(emailOptGerente);
    });
}
main();

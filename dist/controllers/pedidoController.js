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
exports.createPedido = void 0;
const pedidoDAO_1 = __importDefault(require("../daos/pedidoDAO"));
const pedidoDAO = new pedidoDAO_1.default();
function verificaPedido(pedido) {
    if (!pedido) {
        throw new Error('Erro no param: Pedido');
    }
    if (!pedido.nome) {
        throw new Error('Erro no param: Nome');
    }
    if (!pedido.empresa) {
        throw new Error('Erro no param: Empresa');
    }
    if (!pedido.telefone) {
        throw new Error('Erro no param: Telefone');
    }
    if (!pedido.email) {
        throw new Error('Erro no param: Email');
    }
    if (!pedido.interfaces) {
        pedido.interfaces = [];
    }
    if (!pedido.cabos) {
        pedido.cabos = [];
    }
    return pedido;
}
const createPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pedido = req.body.pedido;
    try {
        const pedidoFormatado = verificaPedido(pedido);
        try {
            const pedidoInserido = yield pedidoDAO.createPedido(pedidoFormatado);
            res.send({ message: "Pedido inserido!", payload: pedidoInserido });
        }
        catch (e) {
            if (e instanceof Error) {
                const errorMessage = e.message;
                res.status(400).send({ payload: errorMessage });
            }
        }
    }
    catch (e) {
        if (e instanceof Error) {
            const errorMessage = e.message;
            res.status(400).send({ payload: errorMessage });
        }
        else {
            res.status(500).send({ payload: 'Ocorreu um erro no servidor.' });
        }
    }
});
exports.createPedido = createPedido;

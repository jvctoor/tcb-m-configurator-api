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
exports.getPedidoById = exports.getAllPedidos = exports.createPedido = void 0;
const pedidoDAO_1 = __importDefault(require("../daos/pedidoDAO"));
const enviarEmail_1 = __importDefault(require("../services/enviarEmail"));
const pedidoDAO = new pedidoDAO_1.default();
function verificaPedido(pedido) {
    if (!pedido) {
        throw new Error('Erro no param: Pedido');
    }
    if (!pedido.nome) {
        throw new Error('Erro no param: Nome');
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
    var _a;
    const pedido = req.body.pedido;
    try {
        const pedidoFormatado = verificaPedido(pedido);
        try {
            const pedidoInserido = yield pedidoDAO.createPedido(pedidoFormatado);
            const host = req.get('host');
            const protocol = req.protocol;
            const url = `${protocol}://${host}/pdf/download/${pedidoInserido.idPedido}`;
            const emailOpt = {
                to: pedidoInserido.email,
                subject: "Seu pedido foi gerado!",
                text: `Confira aqui seu pedido: ${url}`
            };
            const emailOptGerente = {
                to: (_a = process.env.EMAIL_GERENCIAL) !== null && _a !== void 0 ? _a : "",
                subject: "Novo pedido gerado!",
                text: `Confira aqui o pedido: ${url}`
            };
            (0, enviarEmail_1.default)(emailOpt);
            (0, enviarEmail_1.default)(emailOptGerente);
            res.send({ message: "Pedido inserido com sucesso!", pdfUrl: url, payload: pedidoInserido, });
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
const getAllPedidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pedidos = yield pedidoDAO.getAllPedidos();
        //Calculando valor total de cada pedido - Dado derivado
        pedidos.forEach(pedido => {
            let totalPedido = 0;
            if (pedido.interfaces && pedido.interfaces.length > 0) {
                pedido.interfaces.forEach((intf, indiceInterface) => {
                    if (intf.itens && intf.itens.length > 0) {
                        intf.itens.forEach((item, indiceItem) => {
                            totalPedido += intf.quantidade * item.preco;
                        });
                    }
                });
            }
            if (pedido.cabos && pedido.cabos.length > 0) {
                pedido.cabos.forEach((cabo) => {
                    totalPedido += cabo.quantidade * cabo.preco;
                });
            }
            pedido["valorTotal"] = totalPedido.toFixed(2);
        });
        if (pedidos) {
            res.send({ message: "Sucesso!", total: pedidos.length, payload: pedidos });
        }
        else {
            res.send({ message: "Nada por aqui!", total: 0, payload: [] });
        }
    }
    catch (e) {
        if (e instanceof Error) {
            const errorMessage = e.message;
            res.status(400).send({ payload: errorMessage });
        }
    }
});
exports.getAllPedidos = getAllPedidos;
const getPedidoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const pedido = yield pedidoDAO.getPedidoById(parseInt(id));
        if (pedido) {
            res.send({ message: "Sucesso!", payload: pedido });
        }
        else {
            res.send({ message: "Ops! Nada por aqui" });
        }
    }
    catch (e) {
        if (e instanceof Error) {
            const errorMessage = e.message;
            res.status(400).send({ payload: errorMessage });
        }
    }
});
exports.getPedidoById = getPedidoById;

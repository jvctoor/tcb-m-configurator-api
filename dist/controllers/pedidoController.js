"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs = __importStar(require("fs"));
const pedidoDAO_1 = __importDefault(require("../daos/pedidoDAO"));
const path = __importStar(require("path"));
const pdfService_1 = require("../services/pdfService");
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
            const filePath = path.join(__dirname, "..", 'pdfs', `pedido-${pedidoInserido.idPedido}.pdf`);
            try {
                const pdf = yield (0, pdfService_1.generatePDF)(pedidoInserido.idPedido);
                res.contentType("application/pdf");
                console.log("PDF Gerado");
                res.send(pdf);
                // Mover o código de exclusão aqui
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error("Erro ao apagar:", err);
                    }
                    else {
                        console.log("Arquivo apagado com sucesso");
                    }
                });
            }
            catch (error) {
                console.error("Erro ao gerar PDF:", error);
            }
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

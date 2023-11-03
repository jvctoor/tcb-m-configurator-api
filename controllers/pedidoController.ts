import { resolveSoa } from 'dns';
import e, { request, Request, Response } from 'express';
import { readdirSync } from 'fs';
import PedidoDAO from '../daos/pedidoDAO';
import IPedido from '../models/pedidoModel';
import { generateTemplate, downloadPDF } from '../services/pdfService';

const pedidoDAO: PedidoDAO = new PedidoDAO();

function verificaPedido(pedido: IPedido): IPedido {
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
        pedido.interfaces = []
    }

    if (!pedido.cabos) {
        pedido.cabos = []
    }
    return pedido;
}


export const createPedido = async (req: Request, res: Response) => {
    const pedido = req.body.pedido;
    try {
        const pedidoFormatado = verificaPedido(pedido)
        try {
            const pedidoInserido = await pedidoDAO.createPedido(pedidoFormatado)
            // res.send(pedidoInserido)
            const template = await generateTemplate(pedidoInserido.idPedido);
            const host = req.get('host');
            const protocol = req.protocol;
            const url = `${protocol}://${host}/pdf/pedidoId/${pedidoInserido.idPedido}`;
            const pdf = await downloadPDF(url);
            res.contentType("application/pdf")
            console.log("PDF Gerado")
            res.send(pdf);
        } catch (e) {
            if (e instanceof Error) {
                const errorMessage = e.message;
                res.status(400).send({ payload: errorMessage });
            }
        }
    } catch (e) {
        if (e instanceof Error) {
            const errorMessage = e.message;
            res.status(400).send({ payload: errorMessage });
        } else {
            res.status(500).send({ payload: 'Ocorreu um erro no servidor.' });
        }
    }
}

export const getAllPedidos = async (req: Request, res: Response) => {
    try {
        const pedidos = await pedidoDAO.getAllPedidos();
        if (pedidos) {
            res.send({ message: "Sucesso!", total: pedidos.length, payload: pedidos })
        } else {
            res.send({ message: "Nada por aqui!", total: 0, payload: [] })
        }
    } catch (e) {
        if (e instanceof Error) {
            const errorMessage = e.message;
            res.status(400).send({ payload: errorMessage });
        }
    }
}

export const getPedidoById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const pedido = await pedidoDAO.getPedidoById(parseInt(id));
        if (pedido) {
            res.send({ message: "Sucesso!", payload: pedido })
        } else {
            res.send({ message: "Ops! Nada por aqui" })
        }
    } catch (e) {
        if (e instanceof Error) {
            const errorMessage = e.message;
            res.status(400).send({ payload: errorMessage });
        }
    }
}
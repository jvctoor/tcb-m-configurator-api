import { resolveSoa } from 'dns';
import e, { request, Request, Response } from 'express';
import * as fs from 'fs';
import PedidoDAO from '../daos/pedidoDAO';
import * as path from 'path';
import IPedido from '../models/pedidoModel';

const pedidoDAO: PedidoDAO = new PedidoDAO();

function verificaPedido(pedido: IPedido): IPedido {
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
            const host = req.get('host');
            const protocol = req.protocol;
            const url = `${protocol}://${host}/pdf/download/${pedidoInserido.idPedido}`;
            res.send({message: "Pedido inserido com sucesso!", pdfUrl: url, payload: pedidoInserido,})
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
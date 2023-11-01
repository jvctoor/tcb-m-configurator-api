import { resolveSoa } from 'dns';
import e, { Request, Response } from 'express';
import { readdirSync } from 'fs';
import PedidoDAO from '../daos/pedidoDAO';
import IPedido from '../models/pedidoModel'

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

    if(!pedido.interfaces) {
        pedido.interfaces = []
    }

    if(!pedido.cabos) {
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
            res.send({message: "Pedido inserido!", payload: pedidoInserido})
        } catch(e) {
            if (e instanceof Error) {
                const errorMessage = e.message;
                res.status(400).send({payload: errorMessage});
        }}
    } catch(e) {
        if (e instanceof Error) {
            const errorMessage = e.message;
            res.status(400).send({payload: errorMessage});
        } else {
            res.status(500).send({payload: 'Ocorreu um erro no servidor.'});
        }
    }
}
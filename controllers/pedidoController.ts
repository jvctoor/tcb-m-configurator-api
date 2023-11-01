import { Request, Response } from 'express';
import PedidoDAO from '../daos/pedidoDAO';
import IPedido from '../models/pedidoModel'

const pedidoDAO: PedidoDAO = new PedidoDAO();

export const createPedido = async (req: Request, res: Response) => {
    res.send("Teste");
}
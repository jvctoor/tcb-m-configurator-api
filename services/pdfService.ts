import e, { request, Request, Response } from 'express';
import * as ejs from 'ejs';
import * as pdf from 'html-pdf';
import * as path from 'path';
import * as puppeteer from 'puppeteer';
import PedidoDAO from '../daos/pedidoDAO';
import IPedido from '../models/pedidoModel'

const pedidoDAO: PedidoDAO = new PedidoDAO();

export const generateTemplate = async (id: number) => {
    const pedido = await pedidoDAO.getPedidoById(id);
    ejs.renderFile(path.join(__dirname, "..", "utils", "invoice-model.ejs"), {pedido: pedido}, async (error, html) => {
        if (error) {
            console.log("Erro")
        }
        return html;
    })
}


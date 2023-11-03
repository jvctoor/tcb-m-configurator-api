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

export const downloadPDF = async (url: string) => {
    const browser = await puppeteer.launch({headless: "new"})
    const page = await browser.newPage()

    await page.goto(url, {
        waitUntil: 'networkidle0'
    })

    const pdf = await page.pdf({
        printBackground: true,
        format: 'Letter'
    })

    await browser.close()

    return pdf;
}
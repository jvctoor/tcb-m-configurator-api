import e, { request, Request, Response } from 'express';
import * as ejs from 'ejs';
import * as pdf from 'html-pdf';
import * as path from 'path';
import * as puppeteer from 'puppeteer';
import PedidoDAO from '../daos/pedidoDAO';
import IPedido from '../models/pedidoModel'

const pedidoDAO: PedidoDAO = new PedidoDAO();

export const generatePDF = async (req: Request, res: Response) => {
    const pedido = await pedidoDAO.getPedidoById(parseInt(req.params.id));
    //console.log(JSON.stringify({pedido: pedido}, null, 2))

    ejs.renderFile(path.join(__dirname, "..", "utils", "invoice-model.ejs"), { pedido: pedido }, (error, html) => {
        if (error) {
            console.log("Erro")
            return res.status(500).send(error)
        }


        const options = {
            height: "11.25in",
            width: "8.5in",
            header: {
                height: "20mm"
            },
            footer: {
                height: "20mm"
            }

        }

        try {
            pdf.create(html, options).toFile(`pedido-${parseInt(req.params.id)}.pdf`, (err, data) => {
                if (err) {
                    console.log("Erro dentro")
                    return res.status(500).send(err);
                }
                res.contentType("application/pdf");
                res.sendFile(data.filename);
            });
        } catch (error) {
            console.log("Erro fora")
            return res.status(500).send(error);
        }

    })

}

export const getPDFById = async (req: Request, res: Response) => {
    const pedido = await pedidoDAO.getPedidoById(parseInt(req.params.id));
    //console.log(console.log(JSON.stringify(pedido, null, 2)))
    ejs.renderFile(path.join(__dirname, "..", "utils", "invoice-model.ejs"), { pedido: pedido }, async (error, html) => {
        if (error) {
            console.log("Erro")
            return res.status(500).send(error)
        }
        //res.redirect(`/pdf/download/${parseInt(req.params.id)}`)
        return res.send(html);
    })
}

export const downloadPDF = async (req: Request, res: Response) => {
    const browser = await puppeteer.launch({
        headless: true,
        'args': [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });
    const page = await browser.newPage()

    const host = req.get('host');
    const protocol = req.protocol;

    const url = `${protocol}://${host}/pdf/viewTemplate/${req.params.id}`;

    await page.goto(url, {
        waitUntil: 'networkidle0'
    })

    const pdf = await page.pdf({
        printBackground: true,
        format: 'Letter',
        margin: {
            top: '20mm', // Define a margem superior como 20mm
            bottom: '20mm', // Define a margem inferior como 20mm
            left: '20mm', // Define a margem esquerda como 20mm
            right: '20mm' // Define a margem direita como 20mm
        }
    })

    await browser.close()

    res.contentType("application/pdf")
    res.send(pdf);
}


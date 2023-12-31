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
    const mostraPreco = req.query.mostraPreco ? Number(req.query.mostraPreco) : 0;
    console.log(mostraPreco)
    //console.log(console.log(JSON.stringify(pedido, null, 2)))
    ejs.renderFile(path.join(__dirname, "..", "utils", "invoice-model.ejs"), { pedido: pedido, mostrarPreco: mostraPreco }, async (error, html) => {
        if (error) {
            console.log(error)
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

    const mostraPreco = req.query.mostraPreco ? req.query.mostraPreco : 0;

    const url = `${protocol}://${host}/pdf/viewTemplate/${req.params.id}?mostraPreco=${mostraPreco}`;

    await page.goto(url, {
        waitUntil: 'networkidle0'
    })

    const pdf = await page.pdf({
        printBackground: true,
        displayHeaderFooter: true,
        format: 'Letter',
        margin: {
            top: '5mm', // Define a margem superior como 20mm
            bottom: '5mm', // Define a margem inferior como 20mm
            left: '5mm', // Define a margem esquerda como 20mm
            right: '5mm' // Define a margem direita como 20mm
        },
        footerTemplate: `
        <div style="display: flex; justify-content: flex-end; align-items: center; width: 100%; margin-right: 5mm;">
        <span class="pageNumber" style="font-size: 15px; margin-right: 5px;"></span>
        <p style="font-size: 15px; margin-right: 5px;">de</p>
        <span class="totalPages" style="font-size: 15px;"></span>
        </div>
        `,
        headerTemplate: `<p></p>`


    })

    await browser.close()

    const nomeDoArquivo = `Configurador-TCB-${req.params.id}.pdf`;

    // Adicione um cabeçalho Content-Disposition para especificar o nome do arquivo no download
    res.setHeader('Content-Disposition', `inline; filename="${nomeDoArquivo}"`);
    res.contentType("application/pdf")
    res.send(pdf);
}


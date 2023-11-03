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
exports.downloadPDF = exports.getPDFById = exports.generatePDF = void 0;
const ejs = __importStar(require("ejs"));
const pdf = __importStar(require("html-pdf"));
const path = __importStar(require("path"));
const puppeteer = __importStar(require("puppeteer"));
const pedidoDAO_1 = __importDefault(require("../daos/pedidoDAO"));
const pedidoDAO = new pedidoDAO_1.default();
const generatePDF = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pedido = yield pedidoDAO.getPedidoById(parseInt(req.params.id));
    //console.log(JSON.stringify({pedido: pedido}, null, 2))
    ejs.renderFile(path.join(__dirname, "..", "utils", "invoice-model.ejs"), { pedido: pedido }, (error, html) => {
        if (error) {
            console.log("Erro");
            return res.status(500).send(error);
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
        };
        try {
            pdf.create(html, options).toFile(`pedido-${parseInt(req.params.id)}.pdf`, (err, data) => {
                if (err) {
                    console.log("Erro dentro");
                    return res.status(500).send(err);
                }
                res.contentType("application/pdf");
                res.sendFile(data.filename);
            });
        }
        catch (error) {
            console.log("Erro fora");
            return res.status(500).send(error);
        }
    });
});
exports.generatePDF = generatePDF;
const getPDFById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pedido = yield pedidoDAO.getPedidoById(parseInt(req.params.id));
    ejs.renderFile(path.join(__dirname, "..", "utils", "invoice-model.ejs"), { pedido: pedido }, (error, html) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            console.log("Erro");
            return res.status(500).send(error);
        }
        //res.redirect(`/pdf/download/${parseInt(req.params.id)}`)
        return res.send(html);
    }));
});
exports.getPDFById = getPDFById;
const downloadPDF = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer.launch({ headless: "new" });
    const page = yield browser.newPage();
    const host = req.get('host');
    const protocol = req.protocol;
    const url = `${protocol}://${host}/pdf/viewTemplate/${req.params.id}`;
    yield page.goto(url, {
        waitUntil: 'networkidle0'
    });
    const pdf = yield page.pdf({
        printBackground: true,
        format: 'Letter'
    });
    yield browser.close();
    res.contentType("application/pdf");
    res.send(pdf);
});
exports.downloadPDF = downloadPDF;

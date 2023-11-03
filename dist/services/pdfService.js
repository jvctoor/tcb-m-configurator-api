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
exports.downloadPDF = exports.generateTemplate = void 0;
const ejs = __importStar(require("ejs"));
const path = __importStar(require("path"));
const puppeteer = __importStar(require("puppeteer"));
const pedidoDAO_1 = __importDefault(require("../daos/pedidoDAO"));
const pedidoDAO = new pedidoDAO_1.default();
const generateTemplate = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const pedido = yield pedidoDAO.getPedidoById(id);
    ejs.renderFile(path.join(__dirname, "..", "utils", "invoice-model.ejs"), { pedido: pedido }, (error, html) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            console.log("Erro");
        }
        return html;
    }));
});
exports.generateTemplate = generateTemplate;
const downloadPDF = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer.launch({ headless: "new" });
    const page = yield browser.newPage();
    yield page.goto(url, {
        waitUntil: 'networkidle0'
    });
    const pdf = yield page.pdf({
        printBackground: true,
        format: 'Letter'
    });
    yield browser.close();
    return pdf;
});
exports.downloadPDF = downloadPDF;

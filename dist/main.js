"use strict";
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
const client_1 = require("@prisma/client");
const pedidoDAO_1 = __importDefault(require("./daos/pedidoDAO"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const pedidoDAO = new pedidoDAO_1.default();
        const interfaces = [
            { quantidade: 1, valor: 90.20, imagem: "google.com" },
            { quantidade: 2, valor: 100.50, imagem: "google.com" },
        ];
        const user = yield pedidoDAO.createPedido("João", "Foursys", "1313030011", "jv1ctor24@f.com", interfaces, "obs");
        const pedidos = yield pedidoDAO.getAllPedidos();
        console.log(JSON.stringify(pedidos, null, 2));
        //console.log(user);
    });
}
//main();

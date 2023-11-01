"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const body_parser_1 = __importDefault(require("body-parser"));
const pedidoController_1 = require("./controllers/pedidoController");
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'TCB-M Configurator - Ultimate API 4Makers Team Santos x Sorocaba',
            version: '1.0.0',
            description: 'Documentação da API',
        },
    },
    apis: ['./index.ts'], // Caminho dos seus arquivos de rotas
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
server_1.default.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
server_1.default.use(body_parser_1.default.json());
server_1.default.get('/', (req, res) => {
    res.send("Hello Joao");
});
/**
 * @swagger
 * /pedido:
 *   post:
 *     tags:
 *       - Pedidos
 *     description: Inserir Pedido
 *     parameters:
 *       - in: body
 *         name: pedido
 *         required: true
 *         description: O pedido.
 *         schema:
 *           type: object
 *           properties:
 *             pedido:
 *               $ref: '#/definitions/IPedido'
 *     responses:
 *       200:
 *         description: Sucesso
 */
server_1.default.post('/pedido', pedidoController_1.createPedido);
/**
 * @swagger
 * definitions:
 *   IPedido:
 *     type: object
 *     properties:
 *       nome:
 *         type: string
 *       empresa:
 *         type: string
 *       telefone:
 *         type: string
 *       email:
 *         type: string
 *       interfaces:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             quantidade:
 *               type: number
 *             valor:
 *               type: number
 *             imagem:
 *               type: string
 *             itens:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   descricao:
 *                     type: string
 *                   preco:
 *                     type: number
 *                   quantidade:
 *                     type: number
 *             ambientes:
 *               type: array
 *               items:
 *                 type: string
 *       cabos:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             nome:
 *               type: string
 *             quantidade:
 *               type: number
 *             preco:
 *               type: number
 *       observacoes:
 *         type: string
 */ 

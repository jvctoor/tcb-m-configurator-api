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
 * /pedido:
 *   get:
 *     tags:
 *       - Pedidos
 *     description: Get todos os pedidos
 *     responses:
 *       200:
 *         description: Sucesso
 */
server_1.default.get('/pedido', pedidoController_1.getAllPedidos);
/**
* @swagger
* /pdf/pedidoId/{id_pedido}:
*   get:
*     tags:
*       - Pdf
*     description: Obter documento PDF de um pedido
*     parameters:
*       - in: path
*         name: id_pedido
*         required: true
*         schema:
*           type: integer
*         description: ID do pedido a ser obtido
*     responses:
*       200:
*         description: Sucesso
*/
server_1.default.get('/pdf/pedidoId/:id', (req, res) => {
    res.status(500).send("Em implementação");
});
/**
 * @swagger
 * /pedido/{id}:
 *   get:
 *     tags:
 *       - Pedidos
 *     description: Obter pedido pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido a ser obtido
 *     responses:
 *       200:
 *         description: Sucesso
 */
server_1.default.get('/pedido/:id', pedidoController_1.getPedidoById);
/**
* @swagger
* definitions:
*   IPedido:
*     type: object
*     properties:
*       nome:
*         type: string
*         default: "João"  # Valor padrão para o campo "nome"
*       empresa:
*         type: string
*         default: "foursys"  # Valor padrão para o campo "empresa"
*       telefone:
*         type: string
*         default: "1398169810"  # Valor padrão para o campo "telefone"
*       email:
*         type: string
*         default: "jvctor23@gmail.com"  # Valor padrão para o campo "email"
*       interfaces:
*         type: array
*         items:
*           type: object
*           properties:
*             quantidade:
*               type: number
*               default: 2  # Valor padrão para o campo "quantidade"
*             valor:
*               type: number
*               default: 2000.90  # Valor padrão para o campo "valor"
*             imagem:
*               type: string
*               default: "url"  # Valor padrão para o campo "imagem"
*             itens:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   descricao:
*                     type: string
*                     default: "modulo 1"  # Valor padrão para o campo "descricao"
*                   preco:
*                     type: number
*                     default: 20.0  # Valor padrão para o campo "preco"
*                   quantidade:
*                     type: number
*                     default: 3  # Valor padrão para o campo "quantidade"
*             ambientes:
*               type: array
*               items:
*                 type: string
*                 default: "Sala de estar"  # Valor padrão para o campo "ambientes"
*       cabos:
*         type: array
*         items:
*           type: object
*           properties:
*             nome:
*               type: string
*               default: "Cabo Do joão"  # Valor padrão para o campo "nome"
*             quantidade:
*               type: number
*               default: 3  # Valor padrão para o campo "quantidade"
*             preco:
*               type: number
*               default: 2.90  # Valor padrão para o campo "preco"
*       observacoes:
*         type: string
*         default: "obs"  # Valor padrão para o campo "observacoes"
*/ 

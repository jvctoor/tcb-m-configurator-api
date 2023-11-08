import app from './server';
import express, { Express, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import bodyParser from 'body-parser';
import { createPedido, getAllPedidos, getPedidoById } from './controllers/pedidoController';
import { getPDFById, downloadPDF, generatePDF } from './controllers/pdfController';
import { login, signup } from './controllers/usuarioController';
import { autenticarToken } from './services/autenticarToken';

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

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
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
 app.post('/pedido', createPedido);


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
 app.get('/pedido', autenticarToken, getAllPedidos);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     description: Login
 *     parameters:
 *       - in: body
 *         schema:
 *             properties:
 *               usuario:
 *                 type: string
 *               senha:
 *                 type: string
 *             required:
 *               - usuario
 *               - senha
 *     responses:
 *       200:
 *         description: Sucesso
 */
 app.post('/auth/login', login);

 /**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags:
 *       - Auth
 *     description: Sign Up
 *     parameters:
 *       - in: body
 *         schema:
 *             properties:
 *               usuario:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *             required:
 *               - usuario
 *               - senha
 *               - email
 *     responses:
 *       200:
 *         description: Sucesso
 */
  app.post('/auth/signup', signup);


 /**
 * @swagger
 * /pdf/viewTemplate/{id_pedido}:
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
 *       - in: query
 *         name: mostraPreco
 *         required: false
 *         schema:
 *           type: boolean
 *         description: true ou false, define se preço aparece no pdf
 *     responses:
 *       200:
 *         description: Sucesso
 */
 app.get('/pdf/viewTemplate/:id', getPDFById)

  /**
 * @swagger
 * /pdf/download/{id_pedido}:
 *   get:
 *     tags:
 *       - Pdf
 *     description: Gera um PDF a partir de um ID
 *     parameters:
 *       - in: path
 *         name: id_pedido
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido a ser obtido
 *       - in: query
 *         name: mostraPreco
 *         required: false
 *         schema:
 *           type: boolean
 *         description: true ou false, define se preço aparece no pdf
 *     responses:
 *       200:
 *         description: Sucesso
 */
 app.get('/pdf/download/:id', downloadPDF)

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
  app.get('/pedido/:id', getPedidoById);

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
 *             itens_selecionados:
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
 *             ambiente:
 *               type: array
 *               items:
 *                 type: string
 *                 default: "Sala de estar"  # Valor padrão para o campo "ambientes"
 *       cabos:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             lista_itens:
 *               type: object
 *               properties:
 *                 cod:
 *                   type: number
 *                 descricao:
 *                   type: string
 *                   default: "Cabo Do joão"  # Valor padrão para o campo "descricao"
 *                 imagem:
 *                   type: string
 *                   default: "url"  # Valor padrão para o campo "imagem"
 *                 preco:
 *                   type: number
 *                   default: 2.90  # Valor padrão para o campo "preco"
 *                 tipo:
 *                   type: string
 *                   default: "Tipo padrão"  # Valor padrão para o campo "tipo"
 *             quantidade:
 *               type: number
 *               default: 3  # Valor padrão para o campo "quantidade"
 *             valor:
 *               type: number
 *               default: 2.90  # Valor padrão para o campo "preco"
 *       observacoes:
 *         type: string
 *         default: "obs"  # Valor padrão para o campo "observacoes"
 */

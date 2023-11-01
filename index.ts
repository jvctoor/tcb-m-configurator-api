import app from './server';
import express, { Express, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import bodyParser from 'body-parser';
import { createPedido } from './controllers/pedidoController';

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
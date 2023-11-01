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
 *     responses:
 *       200:
 *         description: Sucesso
 */
 app.post('/pedido', createPedido);


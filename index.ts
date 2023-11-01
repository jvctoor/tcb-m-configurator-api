import app from './server';
import express, { Express, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

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

/**
 * @swagger
 * /:
 *   get:
 *     description: Hello
 *     responses:
 *       200:
 *         description: Sucesso
 */
app.get('/', (req: Request, res: Response) => {
  res.send("Hello Joao");
});
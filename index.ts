import express, { Express, Request, Response } from 'express';

import dotenv from 'dotenv';

dotenv.config();

// Middlewares e configurações aqui

const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Hello, Tiago</title>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        h1 {
          font-family: Arial, sans-serif;
          font-size: 5em;
          color: #333;
        }
      </style>
    </head>
    <body>
      <h1>Hello, Xano!</h1>
    </body>
    </html>
  `;
  res.send(htmlContent);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});


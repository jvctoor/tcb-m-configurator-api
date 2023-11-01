require('dotenv').config();

const express = require('express');
const app = express();

// Middlewares e configurações aqui

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
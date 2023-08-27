const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log(`Recibida una solicitud a ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('¡Hola! Esta es una aplicación web de cine.');
});

module.exports = app;

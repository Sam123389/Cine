const express = require('express');
const basicAuth = require('basic-auth');

const app = express();

const auth = (req, res, next) => {
  const user = basicAuth(req);

  if (!user || user.name !== 'usuario' || user.pass !== 'contrasena') {
    res.set('WWW-Authenticate', 'Basic realm="example"');
    return res.status(401).send('Autenticación requerida.');
  }

  next();
};

app.get('/recurso-protegido', auth, (req, res) => {
  res.send('¡Bienvenido al recurso protegido!');
});

app.get('/', (req, res) => {
  res.send('¡Hola! Esta es una ruta pública.');
});

module.exports = app;

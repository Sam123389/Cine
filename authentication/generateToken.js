const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const secretKey = 'default_secret_key';

app.get('/api/token', (req, res) => {
  const payload = { user_id: 1234, username: 'usuario' };
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/api/data', verifyToken, (req, res) => {
  const data = { mensaje: 'Estos son datos super protegidos' };
  res.send(data);
});

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(404).json({ error: 'Token no existente' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(404).json({ error: 'Token no está proporcionado' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    req.user = decoded;
    next();
  });
}

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

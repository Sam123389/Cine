const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secretKey = 'default_secret_key';

const authenticate = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Token no proporcionado.' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado.' });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken;

    const user = await User.findById(decodedToken.user_id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido.' });
  }
};

module.exports = authenticate;


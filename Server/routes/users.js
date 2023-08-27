const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/usersController');
const authenticate = require('./authMiddleware');

router.post(
  '/',
  [
    authenticate,
    body('username').notEmpty().withMessage('El nombre de usuario es requerido.'),
    body('email').isEmail().withMessage('Ingrese un correo electrónico válido.'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
  ],
  userController.createUser
);

router.get('/', authenticate, userController.getAllUsers);
router.get('/:username', authenticate, userController.getOneUser);

router.patch(
  '/:id',
  [
    authenticate,
    param('id').isMongoId().withMessage('El ID proporcionado no es válido.'),
    body('username').notEmpty().withMessage('El nombre de usuario es requerido.'),
    body('email').isEmail().withMessage('Ingrese un correo electrónico válido.'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
  ],
  userController.editUser
);

module.exports = router;

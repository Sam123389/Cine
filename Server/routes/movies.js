const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const movieController = require('../controllers/moviesController');
const authenticate = require('./authMiddleware');

const createMovieValidation = [
  body('title').notEmpty().withMessage('El título es obligatorio.'),
  body('genre').notEmpty().withMessage('El género es obligatorio.'),
  body('year').isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage('El año debe ser válido.'),
  body('createdBy').notEmpty().withMessage('El creador es obligatorio.')
];

const updateMovieValidation = [
  param('id').notEmpty().withMessage('El ID es obligatorio.'),
  body('title').notEmpty().withMessage('El título es obligatorio.'),
  body('genre').notEmpty().withMessage('El género es obligatorio.'),
  body('year').isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage('El año debe ser válido.')
];

router.get('/', authenticate, movieController.getAllMovies);
router.get('/:id', authenticate, movieController.getOneMovie);
router.post('/', authenticate, createMovieValidation, movieController.createMovie);
router.patch('/:id', authenticate, updateMovieValidation, movieController.updateMovie);
router.delete('/:id', authenticate, movieController.deleteMovie);

module.exports = router;

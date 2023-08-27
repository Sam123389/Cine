const express = require('express');
const router = express.Router();
const movieRouter = require('./movies');
const userRouter = require('./users');
const authenticate = require('./authMiddleware');

router.use('/movies', authenticate, movieRouter);
router.use('/users', authenticate, userRouter);

module.exports = router;

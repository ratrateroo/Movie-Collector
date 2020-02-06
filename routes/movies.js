const path = require('path');

const express = require('express');

const moviesController = require('../controllers/movies');

const adminData = require('./admin');

const router = express.Router();

router.get('/', moviesController.getMovies);
router.get('/movies/:movieId', moviesController.getMovies);

module.exports = router;
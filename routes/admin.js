const path = require('path');

const express = require('express');

const moviesController = require('../controllers/movies');

const router = express.Router();

//const movies = [];

router.get('/add-movies', moviesController.getAddMovies);
  
router.post('/add-movies', moviesController.postAddMovies);

module.exports = router;
// exports.routes = router;
// exports.movies = movies;
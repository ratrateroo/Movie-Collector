const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const moviesController = require('../controllers/movies');

const router = express.Router();

//const movies = [];

router.get('/add-movies', adminController.getAddMovies);
  
router.post('/add-movies', adminController.postAddMovies);

router.get('/my-movies', adminController.getMyMovies);
module.exports = router;
// exports.routes = router;
// exports.movies = movies;
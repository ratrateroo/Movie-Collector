const path = require('path');

const express = require('express');

const moviesController = require('../controllers/movies');

const adminData = require('./admin');

const router = express.Router();

router.get('/', moviesController.getMovies);

router.get('/my-movies', moviesController.getMyMovies);



module.exports = router;
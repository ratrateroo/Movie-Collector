const path = require('path');

const express = require('express');

const moviesController = require('../controllers/movies');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', moviesController.getMovies);
router.get('/movies/:movieId', moviesController.getMovie);
router.get('/favorite', moviesController.getFavorite);
router.post('/favorite', moviesController.postFavorite);
module.exports = router;
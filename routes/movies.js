const path = require('path');

const express = require('express');

const moviesController = require('../controllers/movies');

const isAuth = require('../middleware/is-auth');

const router = express.Router();


router.get('/', moviesController.getMovies);
router.get('/movies/:movieId', moviesController.getMovie);
router.get('/saved-movies', moviesController.getSavedMovies);
router.post('/favorite', moviesController.postFavorite);

router.get('/load-movies/:pageNumber', moviesController.getLoadMovies);
module.exports = router;
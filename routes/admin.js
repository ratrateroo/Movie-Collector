const express = require('express');

const adminController = require('../controllers/admin');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

//const movies = [];

router.get('/add-movies',  adminController.getAddMovies);
  
router.post('/add-movies', adminController.postAddMovies);
router.post('/add-to-collection', isAuth, adminController.postAddToCollection);

router.get('/my-movies', isAuth, adminController.getMyMovies);
router.get('/edit-movie/:movieId', isAuth, adminController.getEditMovie);
router.post('/edit-movie', adminController.postEditMovie);
router.post('/delete-movie', adminController.postDeleteMovie);

router.get('/edit-profile', adminController.getEditProfile);
module.exports = router;
// exports.routes = router;
// exports.movies = movies;
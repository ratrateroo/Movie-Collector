const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    //res.sendFile(path.join(rootDir, 'views', 'movies.html'));
    res.render('movies', { 
        pageTitle: 'Movies', 
        path: '/',
        activeMovies: true});
});

router.get('/my-movies', (req, res, next) => {
    // console.log('my-movies.html', adminData.movies);
    // res.sendFile(path.join(rootDir, 'views', 'my-movies.html'));
    const movies = adminData.movies;
    res.render('my-movies', { 
        movies: movies, 
        pageTitle: 'My Movies', 
        path: '/my-movies', 
        hasMovies: movies.length > 0,
        activeMyMovies: true
    });
});



module.exports = router;
const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const movies = [];

router.get('/add-movies', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-movies.html'));
  });
  
router.post('/add-movies', (req, res, next) => {
      console.log(req.body);
      movies.push({ 
        title: req.body.title,
        year: req.body.year
       });
      res.redirect('/');
  });

//module.exports = router;
exports.routes = router;
exports.movies = movies;
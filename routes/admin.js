const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/add-movies', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-movies.html'));
  });
  
router.post('/movie', (req, res, next) => {
      console.log(req.body);
      //res.send('<h1>Movie '+ req.body.title +' Page</h1>');
      res.redirect('/');
  });

module.exports = router;
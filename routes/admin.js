const express = require('express');

const router = express.Router();

router.get('/login', (req, res, next) => {
    res.send('<form action="/admin/movie" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
  });
  
router.post('/movie', (req, res, next) => {
      console.log(req.body);
      //res.send('<h1>Movie '+ req.body.title +' Page</h1>');
      res.redirect('/movie');
  });

module.exports = router;
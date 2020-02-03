const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/login', (req, res, next) => {
    res.send('<form action="/movie" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
  });
  
  app.post('/movie', (req, res, next) => {
      console.log(req.body);
      //res.send('<h1>Movie '+ req.body.title +' Page</h1>');
      res.redirect('/');
  });




app.use('/', (req, res, next) => {
    console.log('Middleware Again');
    //res.send('<h1>Movie Page</h1>');
    res.send('<h1>Movie '+ req.body.title +' Page</h1>');
});


app.listen(3000);
const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const moviesRoutes = require('./routes/movies');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/admin', adminRoutes);
app.use(moviesRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1> Page not found!</h1>')
}) ;

app.listen(3000);
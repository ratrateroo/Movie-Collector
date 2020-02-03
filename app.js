const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const moviesRoutes = require('./routes/movies');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(adminRoutes);
app.use(moviesRoutes);











app.listen(3000);
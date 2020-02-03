const http = require('http');

const express = require('express');

const app = express();

app.use('/login' ,(req, res, next) => {
    console.log('Middleware');
    res.send('<h1>Login Page</h1>');
});


app.use('/', (req, res, next) => {
    console.log('Middleware Again');
    res.send('<h1>Movie Page</h1>');
});


app.listen(3000);
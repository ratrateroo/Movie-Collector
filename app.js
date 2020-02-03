const http = require('http');

const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('Middleware Again');
    res.send('<h1>Middleware Again</h1>');
});


app.listen(3000);
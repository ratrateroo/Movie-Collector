const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('Middleware Again');
    //res.send('<h1>Movie Page</h1>');
    res.send('<h1>Movie '+ req.body.title +' Page</h1>');
});

module.exports = router;
const Movie = require('../models/movie');

// exports.getMovie = (req, res, next) => {
//     const movieId = req.params.movieId;
//     console.log(movieId);
//     res.redirect('/');
// }

exports.getMovies = (req, res, next) => {
    
    Movie.fetchAll(movies => {
        res.render('movies/movies', { 
            movies: movies,
            pageTitle: 'Movies', 
            path: 'movies/movies',
            activeMovies: true
        });
    });
    
};
const Movie = require('../models/movie');







exports.getMovie = (req, res, next) => {
    const movieId = req.params.movieId;
    console.log(movieId);
    res.redirect('/');
}

exports.getMovies = (req, res, next) => {
    const movies = Movie.fetchAll();
    res.render('admin/movies', { 
        movies: movies,
        pageTitle: 'Movies', 
        path: '/admin/movies',
        activeMovies: true});
};
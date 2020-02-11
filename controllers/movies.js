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

exports.getMovie = (req, res, next) => {
    
    const movieId = req.params.movieId;
    // Movie.findById(movieId, movie => {
    //     console.log(movie);
    // });
    // res.redirect('/');

    Movie.findById(movieId)
        .then(movie => {
            res.render('movies/movie', {
            movie: movie,
            pageTitle: movie.title,
            path: 'movies/movies'
            });
            console.log(movie);
        })
        .catch(error => console.log(error));
    
};

exports.getFavorite =  (req, res, next) => {
    // console.log('my-movies.html', adminData.movies);
    // res.sendFile(path.join(rootDir, 'views', 'my-movies.html'));
    Movie.fetchAll()
    .then(movies => {
        res.render('movies/favorite', { 
            movies: movies, 
            pageTitle: 'My Favorite', 
            path: '/favorite',
            activeMyMovies: true
        });
    })
    .catch(error => {
        console.log(error);
    });
};

exports.postFavorite = (req, res, next) => {
    const movieId = req.body.movieId;
    Movie.findById(movieId)
    .then(movie => {
        return req.user.addToFavorite(movie);
    })
    .then(result => {
        console.log(result);
    });
};
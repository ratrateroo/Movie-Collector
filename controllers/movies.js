const Movie = require('../models/movie');

// exports.getMovie = (req, res, next) => {
//     const movieId = req.params.movieId;
//     console.log(movieId);
//     res.redirect('/');
// }

exports.getMovies = (req, res, next) => {
    // console.log(req.get('Cookie'));
    // const isLoggedIn = req
    // .get('Cookie')
    // .split(';')[0]
    // .trim()
    // .split('=')[1];
    Movie.find(movies => {
        res.render('movies/movies', { 
            movies: movies,
            pageTitle: 'Movies', 
            path: 'movies/movies',
            activeMovies: true,
            isAuthenticated: req.session.isLoggedIn
        });
    });
    
};

exports.getMovie = (req, res, next) => {
    const movieId = req.params.movieId;
    Movie.findById(movieId)
        .then(movie => {
            console.log('Get Movie: ' + movie);
            res.render('movies/movie', {
                movie: movie,
                pageTitle: movie.title,
                path: 'movies/movies',
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(error => console.log(error));
};

exports.getFavorite =  (req, res, next) => {
    // console.log('my-movies.html', adminData.movies);
    // res.sendFile(path.join(rootDir, 'views', 'my-movies.html'));
    Movie.find()
    .then(movies => {
        res.render('movies/favorite', { 
            movies: movies, 
            pageTitle: 'My Favorite', 
            path: 'movies/favorite',
            activeMyMovies: true,
            isAuthenticated: req.session.isLoggedIn
        });
    })
    .catch(error => {
        console.log(error);
    });
};

exports.getFavorite = (req, res, next) => {
    req.user
    .populate('favorite.items.movieId')
    .execPopulate()
    .then(user => {
      const movies = user.favorite.items;
      console.log('Favorite Movies: ' + movies);
        res.render('movies/favorite', {
          path: '/favorite',
          pageTitle: 'Favorite Movies',
          movies: movies,
          isAuthenticated: req.session.isLoggedIn
        });
      })
      .catch(err => console.log(err));
  };

exports.postFavorite = (req, res, next) => {
    const movieId = req.body.movieId;
    Movie.findById(movieId)
    .then(movie => {
    console.log('Add to favorite: Done');
    return req.user.addToFavorite(movie);
        
    })
    .then(result => {
        console.log(result);
        res.redirect('/favorite');
      })
    .catch(err => {
        console.log('add to favorite error: '+ err);
        
      });
};
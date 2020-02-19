const fetch = require('node-fetch');
const Movie = require('../models/movie');
const { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, POSTER_SIZE } = require('../config/configfile');




const fetchMovies = (endpoint) => {

    fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            // console.log(result)
            // console.log('Movies',...Movies)
            // console.log('result',...result.results)
            setMovies([...Movies, ...result.results])
            setMainMovieImage(MainMovieImage || result.results[0])
            setCurrentPage(result.page)
        }, setLoading(false))
        .catch(error => console.error('Error:', error)
        )
}

const mymovies = {};

exports.getMovies = (req, res, next) => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetch(endpoint)
            .then(movies => movies.json())
            .then(movies => movies.results)
            .then(movies => {
                console.log(movies);
                res.render('movies/movies', { 
                    movies: movies,
                    pageTitle: 'Movies', 
                    path: 'movies/movies',
                    activeMovies: true,
                    isAuthenticated: req.session.isLoggedIn
                });
            })
            .catch(error => console.log(error));
            



//     Movie.find(movies => {
//         const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
//         console.log(endpoint);   
//         fetch(endpoint)
//             .then(movies => movies.json())
//             .then(movies => {
                
//                 console.log(movies.results);
//             })
//    .catch(error => console.error('Error:', error));
//         res.render('movies/movies', { 
//             movies: movies,
//             pageTitle: 'Movies', 
//             path: 'movies/movies',
//             activeMovies: true,
//             isAuthenticated: req.session.isLoggedIn
//         });
//     });
    
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
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



exports.getMovies = (req, res, next) => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetch(endpoint)
            .then(movies => movies.json())
            .then(movies => movies.results)
            .then(movies => {
                console.log(movies[0]);
                console.log(IMAGE_BASE_URL);
                console.log(IMAGE_SIZE);
                console.log(POSTER_SIZE);
                res.render('movies/movies', { 
                    movies: movies,
                    imageBaseUrl: IMAGE_BASE_URL,
                    imageSize: IMAGE_SIZE,
                    posterSize: POSTER_SIZE,
                    pageTitle: 'Movies', 
                    path: 'movies/movies',
                    activeMovies: true,
                    isAuthenticated: req.session.isLoggedIn,
                    csrfToken: req.csrfToken()
                });
            })
            .catch(error => console.log(error));
            




    
};

exports.getMovie = (req, res, next) => {
    const movieId = req.params.movieId;
    const endpoint =`${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    fetch(endpoint)
            .then(movie => movie.json())
             
            .then(movie => {
                console.log(movie);
                console.log(IMAGE_BASE_URL);
                console.log(IMAGE_SIZE);
                console.log(POSTER_SIZE);
                res.render('movies/movie', { 
                    movie: movie,
                    pageTitle: movie.title,
                    imageBaseUrl: IMAGE_BASE_URL,
                    imageSize: IMAGE_SIZE,
                    posterSize: POSTER_SIZE,    
                    path: 'movies/movies',
                    activeMovies: true,
                    isAuthenticated: req.session.isLoggedIn
                });
            })
            .catch(error => console.log(error));

    // Movie.findById(movieId)
    //     .then(movie => {
    //         console.log('Get Movie: ' + movie);
    //         res.render('movies/movie', {
    //             movie: movie,
    //             pageTitle: movie.title,
    //             path: 'movies/movies',
    //             isAuthenticated: req.session.isLoggedIn
    //         });
    //     })
    //     .catch(error => console.log(error));
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
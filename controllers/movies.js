const fetch = require('node-fetch');
const Movie = require('../models/movie');
const { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, POSTER_SIZE } = require('../config/configfile');




/* const fetchMovies = (endpoint) => {

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

const movieCollection = {};
for (let step = 1; step < 10; step++) {
    let endpoint = `http://api.themoviedb.org/3/movie/popular?api_key=89b4364a619aa310c8bdc1b4f924c9b8&language=en-US&page=${step}`;
    fetch(endpoint)
            .then(movies => movies.json())
            .then(movies => movies.results)
            .then(movies => {
                {
                    return { ...movieCollection, movies }
                }
            })
            .then(result => {
                movieCollection = result;
                console.log(movieCollection);
            });
  }
  let movieCollection = {};
  let storeMovies = (entries) => {
    let mergedObj = { ...entries, ...movieCollection };
    return mergedObj;   
  }
  let movieCollection = {};
  for (let step = 0; step < 10; step++) {
    
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=89b4364a619aa310c8bdc1b4f924c9b8&language=en-US&page=' + (step+1))
    .then(movies => movies.json())
    .then(movies => {
        return summary = {...movieCollection, ...movies.results};
    })
    .then(result => console.log(result))
    
    .catch(error => console.log(error));

  }
  console.log(movieCollection); */

   
  





exports.getMovies = (req, res, next) => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    console.log(endpoint);
    fetch(endpoint)
            .then(movies => movies.json())
            .then(movies => movies.results)
            .then(movies => {
                // console.log(movies[0]);
                // console.log(IMAGE_BASE_URL);
                // console.log(IMAGE_SIZE);
                // console.log(POSTER_SIZE);
                res.render('movies/movies', { 
                    movies: movies,
                    imageBaseUrl: IMAGE_BASE_URL,
                    imageSize: IMAGE_SIZE,
                    posterSize: POSTER_SIZE,
                    pageTitle: 'Movies', 
                    path: 'movies/movies',
                    activeMovies: true
                    
                });
            })
            .catch(error => console.log(error));
            
            // let movieCollection = [];
            // for (let step = 0; step < 2; step++) {
              
            //   fetch('https://api.themoviedb.org/3/movie/popular?api_key=89b4364a619aa310c8bdc1b4f924c9b8&language=en-US&page=' + (step+1))
            //   .then(movies => movies.json())
            //   .then(movies => {
            //       const arr = [];
            //       arr.push(movies.results);
            //       console.log('Array: ' + arr);

            //   })
            //   //.then(result => console.log(result))
              
            //   .catch(error => console.log(error));
          
            // }
            //console.log(movieCollection);
            // let objArray = [];
            // let result = objArray.map((obj) => {
            //     let rObj = {}
            //         rObj[Object.key(obj)] = Object.values(obj)
            //         return rObj
            // })
            // console.log(result);

        //  res.render('movies/movies', { 
        //         movies: arr,
        //         imageBaseUrl: IMAGE_BASE_URL,
        //         imageSize: IMAGE_SIZE,
        //         posterSize: POSTER_SIZE,
        //         pageTitle: 'Movies', 
        //         path: 'movies/movies',
        //         activeMovies: true
        //     });
            




    
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
const fetch = require('node-fetch');

const Movie = require('../models/movie');
const { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, POSTER_SIZE } = require('../config/configfile');

exports.getAddMovies = (req, res, next) => {
    if (!req.session.isLoggedIn) {
      return res.redirect('/login');
    }
    res.render('admin/add-movies', { 
      pageTitle: 'Add Movies', 
      path: '/admin/add-movies',
      activeAddMovies: true,
      formsCSS:true,
      isAuthenticated: req.session.isLoggedIn });
};

exports.postAddMovies = (req, res, next) => {
    const title = req.body.title;
    const year = req.body.year;
    const imageUrl = req.body.imageUrl;
    //const movie = new Movie(title, year, imageUrl, null, req.user._id);
    const movie = new Movie({
        title: title,
        year: year,
        imageUrl: "../badboysforlife.jpg",
        userId: req.user
    });
    movie.save()
    .then(result => {
        console.log('Post Added Movie:' + result);
        res.redirect('../../my-movies');  
    })
    .catch(error => {
        console.log('Post Add Movie Error: ' + error);
    }); 
       
};

exports.postAddToCollection = (req, res, next) => {

  const movieId = req.body.movieId;
  
  const endpoint =`${API_URL}movie/${movieId}?api_key=${API_KEY}`;

  fetch(endpoint)
            .then(movie => movie.json())
            .then(result => {
              console.log(result);
              const movie = new Movie({
                title: result.title,
                year: result.release_date,
                imageUrl: IMAGE_BASE_URL + IMAGE_SIZE + result.poster_path,
                userId: req.user
                
            });
            return movie.save();
            })
            .then(result => {
              
              res.redirect('/admin/my-movies');
                     
          })
          .catch(error => {
              console.log('Post Add Movie Error: ' + error);
          }); 


  // const title = req.body.title;
  // const year = req.body.year;
  // const imageUrl = req.body.imageUrl;
  // //const movie = new Movie(title, year, imageUrl, null, req.user._id);
  // const movie = new Movie({
  //     title: title,
  //     year: year,
  //     imageUrl: "../badboysforlife.jpg",
  //     userId: req.user
  // });
  // movie.save()
  // .then(result => {
  //     console.log('Post Added Movie:' + result);
  //     res.redirect('my-movies');  
  // })
  // .catch(error => {
  //     console.log('Post Add Movie Error: ' + error);
  // }); 


    
  //   fetch(endpoint)
  //           .then(movie => movie.json())
             
  //           .then(movie => {
  //               console.log(movie);
  //               console.log(IMAGE_BASE_URL);
  //               console.log(IMAGE_SIZE);
  //               console.log(POSTER_SIZE);
  //               res.render('movies/movie', { 
  //                   movie: movie,
  //                   pageTitle: movie.title,
  //                   imageBaseUrl: IMAGE_BASE_URL,
  //                   imageSize: IMAGE_SIZE,
  //                   posterSize: POSTER_SIZE,    
  //                   path: 'movies/movies',
  //                   activeMovies: true,
  //                   isAuthenticated: req.session.isLoggedIn
  //               });
  //           })
  //           .catch(error => console.log(error));
     
};

exports.getMyMovies = (req, res, next) => {
     
    Movie.find({
        userId: req.user._id
      })
      // .select('title year -_id')
      // .populate('userId','firstName')
      .then(movies => {
        console.log('Get My Movies: Done');
        res.render('admin/my-movies', {
          movies: movies,
          pageTitle: 'My Movies',
          path: 'admin/my-movies',
          activeMyMovies: true,
          isAuthenticated: req.session.isLoggedIn
        });
      })
      .catch(error => {
        console.log(error);
      });

/*         Movie.find()
          // .select('title year -_id')
          // .populate('userId','firstName')
          .then(movies => {
            console.log('Get My Movies: Done');
            res.render('admin/my-movies', {
              movies: movies,
              pageTitle: 'My Movies',
              path: 'my-movies',
              activeMyMovies: true,
              isAuthenticated: req.session.isLoggedIn
            })
          })
          .catch(error => {
            console.log(error);
          }); */
};

exports.getEditMovie = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/');
    }
    
    const movieId = req.params.movieId;
    Movie.findById(movieId)
      .then(movie => {
        if (!movie) {
          return res.redirect('/');
        }
        res.render('admin/edit-movie', {
          pageTitle: 'Edit Movie',
          path: '/admin/edit-movie',
          editing: editMode,
          movie: movie,
          isAuthenticated: req.session.isLoggedIn
        });
      })
      .catch(err => console.log(err));
  };

  exports.postEditMovie = (req, res, next) => {
    const movieId = req.body.movieId;
    const updatedTitle = req.body.title;
    const updatedYear = req.body.year;
    const updatedImageUrl = req.body.imageUrl;
   
  
    Movie.findById(movieId)
      .then(movie => {
        movie.title = updatedTitle;
        movie.year = updatedYear;
        movie.imageUrl = updatedImageUrl;
        return movie.save();
      })
      .then(result => {
        console.log('Updated Movie: ' + result);
        res.redirect('/admin/my-movies');
      })
      .catch(err => console.log(err));
  };

  exports.postDeleteMovie = (req, res, next) => {
    const movieId = req.body.movieId;
    Movie.findByIdAndRemove(movieId)
      .then(() => {
        console.log('Deleted Movie');
        res.redirect('/admin/my-movies');
      })
      .catch(err => console.log(err));
  };

  
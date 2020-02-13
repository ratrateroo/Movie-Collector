const Movie = require('../models/movie');

exports.getAddMovies = (req, res, next) => {
    //res.sendFile(path.join(rootDir, 'views', 'add-movies.html'));
    res.render('admin/add-movies', { 
      pageTitle: 'Add Movies', 
      path: '/admin/add-movies',
      activeAddMovies: true,
      formsCSS:true });
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
        res.redirect('my-movies');  
    })
    .catch(error => {
        console.log('Post Add Movie Error: ' + error);
    }); 
       
};

exports.getMyMovies = (req, res, next) => {
    // console.log('my-movies.html', adminData.movies);
    // res.sendFile(path.join(rootDir, 'views', 'my-movies.html'));
    Movie.find()
        // .select('title year -_id')
        // .populate('userId','firstName')
        .then(movies => {
            console.log('Get My Movies: ' + movies);
            res.render('admin/my-movies', {
                movies: movies,
                pageTitle: 'My Movies',
                path: 'admin/my-movies',
                activeMyMovies: true
            });
        })
        .catch(error => {
            console.log(error);
        });
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
          movie: movie
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
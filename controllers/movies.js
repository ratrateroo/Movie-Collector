const Movie = require('../models/movie');

exports.getAddMovies = (req, res, next) => {
    //res.sendFile(path.join(rootDir, 'views', 'add-movies.html'));
    res.render('add-movies', { 
      pageTitle: 'Add Movies', 
      path: '/admin/add-movies',
      activeAddMovies: true,
      formsCSS:true });
  };

exports.postAddMovies = (req, res, next) => {
    const movie = new Movie(req.body.title, req.body.year);
    movie.save();
    res.redirect('/my-movies');    
};

exports.getMovies = (req, res, next) => {
    const movies = Movie.fetchAll();
    res.render('movies', { 
        movies: movies,
        pageTitle: 'Movies', 
        path: '/',
        activeMovies: true});
};

exports.getMyMovies =  (req, res, next) => {
    // console.log('my-movies.html', adminData.movies);
    // res.sendFile(path.join(rootDir, 'views', 'my-movies.html'));
    const movies = Movie.fetchAll();
    res.render('my-movies', { 
        movies: movies, 
        pageTitle: 'My Movies', 
        path: '/my-movies',
        activeMyMovies: true
    });
}
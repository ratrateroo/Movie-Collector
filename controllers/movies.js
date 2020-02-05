const movies = [];

exports.getAddMovies = (req, res, next) => {
    //res.sendFile(path.join(rootDir, 'views', 'add-movies.html'));
    res.render('add-movies', { 
      pageTitle: 'Add Movies', 
      path: '/admin/add-movies',
      activeAddMovies: true,
      formsCSS:true });
  };

exports.postAddMovies = (req, res, next) => {
    console.log(req.body);
    movies.push({ 
      title: req.body.title,
      year: req.body.year
     });
    res.redirect('/my-movies');    
};

exports.getMovies = (req, res, next) => {
    //res.sendFile(path.join(rootDir, 'views', 'movies.html'));
    res.render('movies', { 
        pageTitle: 'Movies', 
        path: '/',
        activeMovies: true});
};

exports.getMyMovies =  (req, res, next) => {
    // console.log('my-movies.html', adminData.movies);
    // res.sendFile(path.join(rootDir, 'views', 'my-movies.html'));
    
    res.render('my-movies', { 
        movies: movies, 
        pageTitle: 'My Movies', 
        path: '/my-movies',
        activeMyMovies: true
    });
}
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
        imageUrl: "../badboysforlife.jpg"
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

exports.getMyMovies =  (req, res, next) => {
    // console.log('my-movies.html', adminData.movies);
    // res.sendFile(path.join(rootDir, 'views', 'my-movies.html'));
    Movie.fetchAll()
    .then(movies => {
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
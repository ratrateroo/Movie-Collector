const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
//const expressHbs = require('express-handlebars');


const app = express();

//app.engine('handlebars', expressHbs());
//app.set('view engine', 'handlebars');
//app.engine('hbs', expressHbs({extname: 'hbs', defaultLayout:'main-layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const moviesRoutes = require('./routes/movies');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(moviesRoutes);

app.use((req, res, next) => {
    //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
}) ;

app.listen(3000);
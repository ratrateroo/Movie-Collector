const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');


const app = express();

app.engine('handlebars', expressHbs());
app.set('view engine', 'handlebars');
app.set('views', 'views');

const adminData = require('./routes/admin');
const moviesRoutes = require('./routes/movies');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(moviesRoutes);

app.use((req, res, next) => {
    //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404');
}) ;

app.listen(3000);
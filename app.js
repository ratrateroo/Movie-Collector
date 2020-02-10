const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
//const expressHbs = require('express-handlebars');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
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

app.use(errorController.get404);

mongoConnect(() => {    
    app.listen(3000);
});

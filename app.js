const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
//const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');
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

app.use((req, res, next) => {
    User.findById("5e456631864dce0f38140117")
        .then(user => {
            req.user = user;
            console.log("User ID: " + user._id);
            next();
        })
        .catch(error => console.log(error));
});

app.use('/admin', adminRoutes);
app.use(moviesRoutes);

app.use(errorController.get404);

mongoose
    .connect(
        'mongodb+srv://ratrateroo:UltraPassword@moviecollector-icuyt.mongodb.net/movie?retryWrites=true&w=majority'
    )
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    title: 'Mr',
                    firstName: 'Mark',
                    lastName: 'Tarectecan',
                    email: 'email@email.com',
                    password: 'ultrapassword',
                    favorite: {
                        items: []
                    }
                });
                user.save();
            }
        });
        app.listen(3000);
    })

    .catch(error => {
        console.log('Mongoose Error: ' + error);
    });
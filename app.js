const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');

const errorController = require('./controllers/error');
//const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const MONGODB_URI = 'mongodb+srv://ratrateroo:UltraPassword@moviecollector-icuyt.mongodb.net/movie?retryWrites=true&w=majority';



const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});
const csrfProtection = csrf();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images');
    },
    filename: (req, file, cb) => {
      let dateobj = new Date();
      //cb(null, dateobj.toISOString() + '-' + file.originalname);
      //cb(null, new Date().toISOString() + '-' + file.originalname);
      //cb(null, file.filename + '-' + file.originalname);
      cb(null, Date.now().toString() + '-' + file.originalname);
    }
  });
    
  const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        console.log('error here');
      }
  };

//app.engine('handlebars', expressHbs());
//app.set('view engine', 'handlebars');
//app.engine('hbs', expressHbs({extname: 'hbs', defaultLayout:'main-layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const moviesRoutes = require('./routes/movies');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(
    multer( { storage: fileStorage, fileFilter: fileFilter }).single('image')
  );
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: store
}));
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
      }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            console.log("User ID: " + user._id);
            console.log("User ID: " + user.firstName);
            next();
        })
        .catch(error => console.log(error));
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken =  req.csrfToken();
    next();
});

app.use('/admin', adminRoutes);
app.use(moviesRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
    .connect(MONGODB_URI)
    .then(result => {
        // User.findOne().then(user => {
        //     if (!user) {
        //         const user = new User({
        //             title: 'Mr',
        //             firstName: 'Mark',
        //             lastName: 'Tarectecan',
        //             email: 'email@email.com',
        //             password: 'ultrapassword',
        //             favorite: {
        //                 items: []
        //             }
        //         });
        //         user.save();
        //     }
        // });
        app.listen(3000);
    })

    .catch(error => {
        console.log('Mongoose Error: ' + error);
    });
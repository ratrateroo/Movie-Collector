const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    // const isLoggedIn = req
    // .get('Cookie')
    // .split(';')[0]
    // .trim()
    // .split('=')[1];
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: req.flash('error')
    });
      
};

exports.postLogin = (req, res, next) => {
   const email = req.body.email;
   const password = req.body.password;
   
    User.findOne({ email: email })
        .then(user => {
        
            if (!user) {
                req.flash('error', 'Invalid email or password.');
                console.log("No user");
                return res.redirect('/login');
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        console.log(user);
                        console.log("Logged In");
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                        });
                        
                    }
                    console.log("Not Logged In");
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                });
        })
        .catch(err =>  console.log(err));

    
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);        
        res.redirect('/');
    });
};


exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
      path: 'admin/signup',
      pageTitle: 'Signup',
      isAuthenticated: false
    });
  }

  exports.postSignup = (req, res, next) => {
    const title = req.body.title;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({email: email})
        .then(userDoc => {
            if (userDoc) {
                return res.redirect('/signup');
            }
            return bcrypt
            .hash(password, 12)
            .then(hashedPassword => {
                const user = new User({
                    title: title,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hashedPassword,
                    collectionMovie: { items: [] }
                });
                return user.save();
            })
            .then(result => {
            res.redirect('/login');
            })
        })      
        .catch(err => console.log(err));
  }
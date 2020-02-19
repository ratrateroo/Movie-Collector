const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {    
    console.log(req.get('Cookie'));
    // const isLoggedIn = req
    // .get('Cookie')
    // .split(';')[0]
    // .trim()
    // .split('=')[1];
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    });
      
};

exports.postLogin = (req, res, next) => {
    //res.setHeader('Set-Cookie', 'loggedIn=true');
    req.session.isLoggedIn = true;
    res.redirect('/');
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
            return bcrypt.hash(password, 12);
            
        })
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
        .then(resulst => {
            res.redirect('/login');
        })
        .catch(err => console.log(err));
  }
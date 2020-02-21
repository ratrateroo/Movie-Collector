const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { validationResult } = require('express-validator/check');



exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    // const isLoggedIn = req
    // .get('Cookie')
    // .split(';')[0]
    // .trim()
    // .split('=')[1];
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: message
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
                    req.flash('error', 'Invalid email or password.');
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
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/signup', {
      path: 'admin/signup',
      pageTitle: 'Signup',
      isAuthenticated: false,
      errorMessage: message
    });
  }

  exports.postSignup = (req, res, next) => {
    const title = req.body.title;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('auth/signup', {
            path: 'admin/signup',
            pageTitle: 'Signup',
            isAuthenticated: false,
            errorMessage: errors.array()[0].msg
          });
    }
    User.findOne({email: email})
        .then(userDoc => {
            if (userDoc) {
                req.flash('error', 'E-mail exists already.');
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

  exports.getReset = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    res.render('auth/reset', {
        path: 'admin/reset',
        pageTitle: 'Reset Password',
        errorMessage: message
      });
  }

  exports.postReset = (req, res, next) => {
      crypto.randomBytes(32, (err, buffer) => {
          if (err) {
              console.log(err);
              return res.redirect('/reset');
          }
          const token = buffer.toString('hex');
          User.findOne({email: req.body.email})
                .then(user => {
                    if (!user) {
                        req.flash('error', 'No account with that email found.');
                        return res.redirect('/reset');
                    }
                    user.resetToken = token;
                    user.resetTokenExpiration = Date.now() + 3600000;
                    return user.save();
                })
                .then(result => {
                    return res.redirect('/reset/' + token);
                })
                .catch(err => console.log(err));
      })
  }

exports.getNewPassword = (req, res, next) => {
    const token = req.params.token;
    User.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now()}})
    .then(user => {
        let message = req.flash('error');
        if (message.length > 0) {
            message = message[0];
        } else {
        message = null;
        }
        res.render('auth/new-password', {
            path: '/new-password',
            pageTitle: 'Update Password',            
            errorMessage: message,
            userId: user._id.toString(),
            passwordToken: token
        });
    })
    .catch(err => console.log(err));

    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    
      
}

exports.postNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const token = req.body.passwordToken;
    let resetUser;
    User.findOne({
            resetToken: token,
            resetTokenExpiration: {
                $gt: Date.now()
            },
            _id: userId
        })
        .then(user => {
            resetUser = user;
            return bcrypt.hash(newPassword, 12);
        })
        .then(hashedPassword => {
            resetUser.password = hashedPassword;
            resetUser.resetToken = undefined;
            resetUser.resetTokenExpiration = undefined;
            return resetUser.save();
        })
        .then(result => {
            return res.redirect('/login');
        })
        .catch(err => console.log(err));

}

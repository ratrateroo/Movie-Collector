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
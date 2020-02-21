const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');
const router = express.Router();

router.get('/login', authController.getLogin);
router.post('/login',
[
    check('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    ,
    body(
        'password',
        'The password must can be alphanumeric with at least 6 characters.'
        )
        .isLength({min: 6})
        .isAlphanumeric(),
    ]
, authController.postLogin);
router.get('/signup', authController.getSignup);
router.post('/signup',
    [
    check('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
        // if (value === 'sample@email.com'){
        //     throw new Error('This email address is forbidden.')
        // }
        // return true;
        return User.findOne({email: value}).then(userDoc => {
            if (userDoc) {
                return Promise.reject(
                    'E-mail exists already.'
                );
            }
        });
    }),
    body(
        'password',
        'The password must can be alphanumeric with at least 6 characters.'
        )
        .isLength({min: 6})
        .isAlphanumeric(),
    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords have to match.');
            }
            return true;
        })
    ],
    authController.postSignup);
router.post('/logout', authController.postLogout);
router.get('/reset', authController.getReset);
router.post('/reset', authController.postReset);
router.get('/reset/:token', authController.getNewPassword);
router.post('/new-password', authController.postNewPassword);

module.exports = router;
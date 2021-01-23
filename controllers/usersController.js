const User = require('../models/user');
const passport = require('passport');

const getUserParams = body => {
        return {
            name: {
                first: body.firstname,
                last: body.lastname,
            },
            email: body.email,
            password: body.password,
            zipCode: body.zipcode,
            municipality: body.municipality
        };
    };

module.exports = {
    indexView: (req, res, next) => {
        res.render('../views/users/index.pug');
    },

    login: (req, res, next) => {
        res.render('../views/users/login.pug');
    },

    authenticate: (req, res, next) => {
        User.findOne({
            email: req.body.email
        })
            .then(user => {
                if (user) {
                    user.passwordComparison(req.body.password)
                        .then(passwordsMatch => {
                            if (passwordsMatch) {
                                res.locals.redirect = `/payment/stripe`;
                                req.flash('success', `${user.email} has logged in successfully!`);
                                res.locals.user = user;
                            } else {
                                req.flash('error','The password given was incorrect!');
                                res.locals.redirect = '/users/login';
                            }
                            next();
                        });
                } else {
                    req.flash('error','The email given has not been registered to our serivce!');
                    res.locals.redirect = '/users/login';
                    next();
                }
            })
            .catch(error => {
                console.log(`Error logging in user: ${error.message}`);
                next(error);
            });
    },

    signup: (req, res, next) => {
        res.render('../views/users/signup.pug');
    },

    create: (req, res, next) => {
        if (req.skip) next();

        let newUser = new User(getUserParams(req.body));
        User.register(newUser, req.body.password, (error, user) => {
            if (user) {
                req.flash(
                    'success',
                    `Created user for ${user.email} successfully!`
                );
                res.locals.redirect = '/users/login';
                next();
            } else {
                req.flash(
                    'error',
                    `Failed to create new user due to the following: ${error.message}`
                );
                res.locals.redirect = '/users/signup';
                next();
            }
        })
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath !== undefined) res.redirect(redirectPath);
        else next();
    },
}
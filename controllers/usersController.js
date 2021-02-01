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
    index: (req, res, next) => {
        User.find()
            .then(users => {
                res.locals.users = users;
                next();
        })
        .catch(error => {
            console.log(`Error fetching users: ${error.message}`);
            next(error);
        });
    },

    indexView: (req, res, next) => {
        res.render('../views/users/index.pug');
    },

    login: (req, res, next) => {
        res.render('../views/users/login.pug');
    },

    authenticate: passport.authenticate('local', {
        failureRedirect: '/users/login',
        failureFlash: 'Login was insuccessful.',
        successRedirect: `/payment/stripe`,
        successFlash: 'Logged'
    }),

    logout: (req, res, next) => {
        req.logout();
        req.flash('success', 'You have been logged out!');
        res.locals.redirect = '/users/login';
        next();
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

    show: (req, res, next) => {
        let userId = req.params.id;

        User.findById(userId)
            .then(user => {
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            });
    },

    showView: (req, res, next) => {
        res.render('users/show');
    },

    shoppingCartView: (req, res, next) => {
        let userId = req.params.id;

        console.log('This here is called!');

        User.findById(userId)
            .then(user => {
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error fetching shopping cart by user ID: ${error.message}`);
                next(error);
            });
    },

    shoppingCart: (req, res, next) => {
        res.render('users/shoppingcart');
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath !== undefined) res.redirect(redirectPath);
        else next();
    },
}
/**
 * First, define the public and secret
 * keys required for payment APIs to
 * work.
 * 
 * 1. Stripe (secret and public key)
 * @const
 * 
 * 2. Paypal (Client ID and client secret)
 * @const
 */
const stripe_secret_key = process.env.STRIPE_SECRET_KEY;
const stripe_public_key = process.env.STRIPE_PUBLIC_KEY;

const client_id = process.env.PAYPAL_CLIENT_ID;
const client_secret = process.env.PAYPAL_CLIENT_SECRET;

const bodyParser = require('body-parser')
const connectFlash = require('connect-flash');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const paypal = require('paypal-rest-sdk');
const Stripe = require('stripe')(stripe_secret_key);

const router = require('./routes/index');

paypal.configure({
    'mode': 'sandbox',
    'client_id': client_id,
    'client_secret': client_secret
});

const host = '127.0.0.1';
const port = process.env.PORT || 8000;

const dbURL = 'mongodb://localhost:27017';
const dbName = 'nodepayment';
const connection = mongoose.connection;

mongoose.connect(`${dbURL}/${dbName}`, {
    useNewUrlParser: true
});

connection.once('open', () => {
    console.log('Connected to the MongoDB database...');
});

const app = express();

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 400000
    },
    resave: false,
    saveUninitialized: false
}));
app.use(connectFlash());

app.use((req, res, next) => {
    res.locals.errors = req.flash("error");
    res.locals.successes = req.flash("success");
    next();
});

dotenv.config();

app.use(express.static('public'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

app.listen(port, () => {
    console.log(`The app is running on: ${host}:${port}`);
});
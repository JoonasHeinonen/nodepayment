/**
 * First, define the public and secret
 * keys required for payment APIs to
 * work.
 * 
 * 1. Stripe (secret and public key)
 * 
 * @const
 */
const stripe_secret_key = process.env.STRIPE_SECRET_KEY;
const stripe_public_key = process.env.STRIPE_PUBLIC_KEY;

const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const Stripe = require('stripe')(stripe_secret_key);

const host = '127.0.0.1';
const port = process.env.PORT || 8000;

const app = express();

const router = require('./routes/index');

dotenv.config();

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use('/', router);

app.listen(port, () => {
    console.log(`The app is running on: ${host}:${port}`);
});
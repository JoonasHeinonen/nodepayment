const express = require('express');
const dotenv = require('dotenv');
const Stripe = require('stripe');

const stripe = Stripe(`${process.env.stripe_secret_key}`);
const app = express();
const router = require('./routes/index');

const host = '127.0.0.1';
const port = process.env.PORT || 8000;

dotenv.config();

app.use('/', router);

app.listen(port, () => {
    console.log(`The app is running on: ${host}:${port}`);
});
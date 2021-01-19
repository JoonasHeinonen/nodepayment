const stripe_secret_key = process.env.STRIPE_SECRET_KEY;
const stripe_public_key = process.env.STRIPE_PUBLIC_KEY;


const express = require('express');
const stripe = require('stripe');
const dotenv = require('dotenv');
const router = express.Router();

const stripeController = require("../controllers/stripeController");

dotenv.config();

router.get('/', stripeController.indexView);
router.post('/charge', stripeController.chargeView);

module.exports = router;
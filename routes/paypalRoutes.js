const client_id = process.env.PAYPAL_CLIENT_ID;
const client_secret = process.env.PAYPAL_CLIENT_SECRET;

const express = require('express');
const dotenv = require('dotenv');
const router = express.Router();

const paypalController = require("../controllers/paypalController");

dotenv.config();

router.get('/', paypalController.indexView);
router.get('/buy', paypalController.buyView);
router.get('/success', paypalController.success);
router.get('/error', paypalController.error);

module.exports = router;
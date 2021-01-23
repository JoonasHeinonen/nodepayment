const express = require('express');
const router = express.Router();

const stripeRoutes = require('./stripeRoutes');
const paypalRoutes = require('./paypalRoutes');

router.use("/stripe", stripeRoutes);
router.use("/paypal", paypalRoutes);

module.exports = router;
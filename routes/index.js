const express = require('express');
const router = express.Router();

const stripeRoutes = require('./stripeRoutes');

router.use("/stripe", stripeRoutes);

module.exports = router;
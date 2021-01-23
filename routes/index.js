const express = require('express');
const router = express.Router();

const gatewayRoutes = require('./gatewayRoutes');
const userRoutes = require('./userRoutes');

router.use("/payment", gatewayRoutes);
router.use("/users", userRoutes);

module.exports = router;
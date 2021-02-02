const express = require('express');
const router = express.Router();

const homeRoutes = require('./homeRoutes');
const gatewayRoutes = require('./gatewayRoutes');
const userRoutes = require('./userRoutes');

router.use('/', homeRoutes);
router.use('/payment', gatewayRoutes);
router.use('/users', userRoutes);

module.exports = router;
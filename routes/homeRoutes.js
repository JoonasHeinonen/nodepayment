const express = require('express');
const router = express.Router();

const homeController = require("../controllers/homeController");

router.get('/', homeController.indexView);
router.get('/about', homeController.about);

module.exports = router;
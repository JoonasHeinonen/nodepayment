const express = require('express');
const router = express.Router();

const productsController = require("../controllers/productsController");

router.get('/', productsController.index, productsController.indexView);
router.get('/:id', productsController.show, productsController.showView);

module.exports = router;
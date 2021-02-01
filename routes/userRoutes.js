const express = require('express');
const router = express.Router();

const usersController = require("../controllers/usersController");

router.get('/', usersController.index, usersController.indexView);
router.get('/login', usersController.login);
router.post('/login', usersController.authenticate, usersController.redirectView);
router.get('/logout', usersController.logout, usersController.redirectView);
router.get('/signup', usersController.signup);
router.post('/create', usersController.create, usersController.redirectView);
router.get('/:id', usersController.show, usersController.showView);
router.get('/:id/shoppingcart', usersController.shoppingCart, usersController.shoppingCartView);

module.exports = router;

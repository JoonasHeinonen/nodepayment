const express = require('express');
const router = express.Router();

const usersController = require("../controllers/usersController");

router.get('/', usersController.indexView);
router.get('/login', usersController.login);
router.post('/login', usersController.authenticate, usersController.redirectView);
router.get('/signup', usersController.signup);
router.post('/create', usersController.create, usersController.redirectView);

module.exports = router;

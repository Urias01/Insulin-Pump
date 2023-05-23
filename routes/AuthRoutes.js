const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/login', AuthController.loginPost);
router.get('/login', AuthController.login);
router.post('/register', AuthController.registerUser);
router.get('/', AuthController.register);

module.exports = router;
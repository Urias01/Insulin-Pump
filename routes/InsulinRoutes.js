const express = require('express');
const router = express.Router();

const InsulinController = require('../controllers/InsulinController')
const checkAuth = require('../helpers/auth').checkAuth;

router.get('/', checkAuth, InsulinController.insulin);

module.exports = router;
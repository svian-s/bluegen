const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

router.post('/login', authController.login);
router.post('/register', authController.signUp);
router.post('/get_email', authController.getEmailByUsername)

module.exports = router;
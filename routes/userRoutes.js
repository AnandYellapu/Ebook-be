const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../utils/authMiddleware');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);


module.exports = router;
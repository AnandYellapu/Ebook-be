const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../utils/authMiddleware');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/update', authMiddleware, userController.updateProfile);


module.exports = router;
// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Middleware for user authentication may be needed

router.post('/add-to-cart', cartController.addToCart);

module.exports = router;

// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../utils/authMiddleware');

router.post('/create', orderController.createOrder);
router.post('/update-status', orderController.updateOrderStatus);
router.get('/:orderId', orderController.getOrderById);

module.exports = router;

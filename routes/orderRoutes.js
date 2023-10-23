// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
// const authMiddleware = require('../utils/authMiddleware');

router.post('/place-order', orderController.createOrder);
router.post('/update-status', orderController.updateOrderStatus);
router.get('/all-orders', orderController.getAllOrders);
router.get('/:orderId', orderController.getOrderById);

module.exports = router;

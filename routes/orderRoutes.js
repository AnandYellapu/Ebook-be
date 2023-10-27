// // routes/orderRoutes.js
// const express = require('express');
// const router = express.Router();
// const orderController = require('../controllers/orderController');
// const authMiddleware = require('../utils/authMiddleware');

// router.post('/place-order', orderController.createOrder);
// router.post('/update-status', orderController.updateOrderStatus);
// router.get('/all-orders', orderController.getAllOrders);
// router.get('/:orderId', orderController.getOrderById);


// module.exports = router;





const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../utils/authMiddleware');

router.post('/place-order', orderController.createOrder);
router.post('/update-status', orderController.updateOrderStatus);
router.get('/all-orders', orderController.getAllOrders);
router.get('/:orderId', orderController.getOrderById);
router.post('/send-order-details', orderController.sendOrderDetailsToEmail); // New route for sending order details via email

module.exports = router;

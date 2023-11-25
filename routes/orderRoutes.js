const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../utils/authMiddleware');


router.post('/place-order', orderController.createOrder);
router.post('/update-status', orderController.updateOrderStatus);
router.get('/all-orders', orderController.getAllOrders);
router.get('/:orderId', orderController.getOrderById);
router.delete('/:orderId', orderController.deleteOrder);
router.post('/send-order-details', orderController.sendOrderDetailsToEmail);
router.get('/user-orders/:userId', authMiddleware, orderController.getUserOrders);
router.post('/add-feedback', orderController.addFeedback);
router.get('/:orderId/book/:bookId/feedback', orderController.getOrderBookFeedback);

router.get('/orders/:orderId/books/:bookId/reviews', orderController.getBookReviews);



module.exports = router;




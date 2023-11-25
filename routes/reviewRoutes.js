const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');

// Define routes
router.get('/book/:bookId/reviews', reviewsController.getBookReviews);

module.exports = router;


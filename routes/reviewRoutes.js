// const express = require('express');
// const router = express.Router();
// const reviewController = require('../controllers/reviewController');

// router.post('/', reviewController.createReview);

// module.exports = router;




const express = require('express');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

// Define routes for creating and retrieving reviews for a specific order
router.post('/reviews/:orderId/review', reviewController.createReview);
router.get('/orders/:orderId/review', reviewController.getReviewsForOrder);

module.exports = router;
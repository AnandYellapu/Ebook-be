const Review = require('../models/Review');

// Create a new review
const createReview = async (req, res) => {
  const { userId, orderId, rating, review } = req.body;

  try {
    const newReview = await Review.create({ userId, orderId, rating, review });
    return res.status(201).json(newReview);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create review' });
  }
};

// Get reviews for a specific order
const getReviewsForOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const reviews = await Review.find({ orderId }).populate('userId', 'username');
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

module.exports = {
  createReview,
  getReviewsForOrder,
}

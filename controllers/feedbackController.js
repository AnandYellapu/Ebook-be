// feedbackController.js

const Order = require('../models/Order');

const getFeedbackByOrderIdAndBookId = async (req, res) => {
  try {
    const { orderId, bookId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const bookFeedback = order.books.find((book) => book.bookId.toString() === bookId);

    if (!bookFeedback) {
      return res.status(404).json({ error: 'Feedback not found for this book' });
    }

    const feedbackData = {
      rating: bookFeedback.rating,
      comments: bookFeedback.comments,
    };

    res.status(200).json(feedbackData);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports ={getFeedbackByOrderIdAndBookId}
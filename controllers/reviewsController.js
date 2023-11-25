
const Order = require('../models/Order');

const getBookReviews = async (req, res) => {
  const { bookId } = req.params;

  try {
    const ordersWithBook = await Order.find({
      'books.bookId': bookId,
      'books.rating': { $exists: true }, // Filter orders with ratings
    });

    const reviews = ordersWithBook.map((order) => {
      const book = order.books.find((book) => String(book.bookId) === bookId);
      return {
        orderId: order._id,
        rating: book.rating,
        comments: book.comments,
        createdAt: order.createdAt,
      };
    });

    res.json({ reviews });
  } catch (error) {
    console.error('Error fetching book reviews:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getBookReviews };
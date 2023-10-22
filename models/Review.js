// const mongoose = require('mongoose');

// const reviewSchema = new mongoose.Schema({
//   bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   rating: { type: Number, required: true },
//   reviewText: { type: String },
//   timestamp: { type: Date, default: Date.now },
// });

// const Review = mongoose.model('Review', reviewSchema);

// module.exports = Review;



const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // You should have a User model for user information
    required: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order', // Assuming you have an Order model for order information
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  books: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book', // Assuming you have a Book model
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comments: {
        type: String,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['placed', 'shipped', 'delivered'],
    default: 'placed',
  },
  paymentMethod: {
    type: String,
    enum: ['Card', 'PayOnDelivery'],
    required: true,
  },
  billingDetails: {
    name: { type: String },
    address: { type: String },
    pincode: { type: String },
    phone: { type: String },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  shippedAt: {
    type: Date,
  },
  deliveredAt: {
    type: Date,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

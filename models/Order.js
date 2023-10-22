// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  books: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book', // Assuming you have a Book model
        required: true,
      },
      
      title: { 
        type: String, 
        required: true 
      },

      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['placed', 'shipped', 'delivered'], // Add more statuses as needed
    default: 'placed',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

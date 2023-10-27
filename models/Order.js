// // models/Order.js
// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   books: [
//     {
//       bookId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Book', // Assuming you have a Book model
//         required: true,
//       },
      
//       title: { 
//         type: String, 
//         required: true 
//       },

//       quantity: {
//         type: Number,
//         required: true,
//       },
//       price: {
//         type: Number,
//         required: true,
//       },
//     },
//   ],
//   total: {
//     type: Number,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ['placed', 'shipped', 'delivered'], // Add more statuses as needed
//     default: 'placed',
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Order = mongoose.model('Order', orderSchema);

// module.exports = Order;



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
      price: {
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model for tracking users
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;


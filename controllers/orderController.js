// controllers/orderController.js
const Order = require('../models/Order');


const createOrder = async (req, res) => {
  try {
    const { cart, total , bookTitles} = req.body;

    const order = new Order({
      books: cart.map((book, index) => ({
        bookId: book._id,
        title: bookTitles[index],
        quantity: book.quantity,
        price: book.price,
      })),
      total,
    });

    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // Find the order by ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the order status
    order.status = status;
    await order.save();

    res.status(200).json({ status: order.status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: 'No orders found' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Find the order by ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
    createOrder,
    updateOrderStatus,
    getAllOrders,
    getOrderById,
};
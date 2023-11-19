// controllers/orderController.js
const Order = require('../models/Order');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const { isEmail } = require('validator');


const createOrder = async (req, res) => {
  try {
    const { cart, total, bookTitles, paymentMethod, billingDetails, userEmail, userId , shippedAt, deliveredAt } = req.body;

     // Validate the email address
if (!isEmail(userEmail)) {
  return res.status(400).json({ error: 'Invalid email address' });
}

const authToken = req.headers.authorization;
    
    if (!authToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const orderData = {
    
      books: cart.map((book, index) => ({
        bookId: book._id,
        title: bookTitles[index],
        quantity: book.quantity,
        price: book.price,
      })),
      total,
      paymentMethod,
      billingDetails,
      userId,
      shippedAt,
      deliveredAt,
    };

    const order = new Order(orderData);

    const savedOrder = await order.save();


    const mailOptions = {
      from: process.env.SMTP_USERNAME,
      to: userEmail, // Use the user's email obtained during checkout
      subject: 'Order Confirmation',
      html: `
        <html>
          <head>
          <style>
          
 body, h1, p {
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
}

.header {
  background-color: #4CAF50;
  color: #fff;
  padding: 10px;
  text-align: center;
}

h1 {
  font-size: 24px;
}

.order-details {
  padding: 20px;
  border: 1px solid #ddd;
  margin-top: 20px;
  background-color: #fff;
}

p {
  margin: 10px 0;
  font-size: 16px;
}

.order-details p {
  font-weight: bold;
}
</style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Order Confirmation</h1>
              </div>
              <div class="order-details">
                <p>Thank you for your order.</p>
                <p>Order ID: ${savedOrder._id}</p>
                <p>Title: ${orderData.books[0].title}</p>
                <p>Total: ₹${orderData.total}</p>
                <p>Payment Method: ${orderData.paymentMethod}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };
    

    // Send order details via email
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Replace with your email service
      auth: {
        user: process.env.SMTP_USERNAME, // Replace with your email
        pass: process.env.SMTP_PASSWORD, // Replace with your email password
      },
    });

   

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email not sent:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add the rest of the functions (updateOrderStatus, getAllOrders, getOrderById, addFeedback)

const sendOrderDetailsToEmail = async (req, res) => {
  try {
    const { orderId, userEmail } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Send order details via email
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Replace with your email service
      auth: {
        user: process.env.SMTP_USERNAME, // Replace with your email
        pass: process.env.SMTP_PASSWORD, // Replace with your email password
      },
    });

    const mailOptions = {
      from: SMTP_USERNAME,
      to: userEmail, // Use the user's email
      subject: 'Order Details',
      text: `Order details: ${JSON.stringify(order)}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email not sent:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(200).json({ message: 'Order details sent to email.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status, userId } = req.body;

    // Find the order by ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

  
  if (status === 'shipped') {
    if (order.status !== 'shipped') { // Check if it's not already 'shipped' to prevent overwriting
      order.status = 'shipped';
      order.shippedAt = new Date(); // Set the 'shippedAt' timestamp here
      await order.save();
    }
  } else if (status === 'delivered') {
    if (order.status === 'shipped') { // Check if it's already 'shipped' to update 'delivered'
      order.status = 'delivered';
      order.deliveredAt = new Date(); // Set the 'deliveredAt' timestamp here
      await order.save();
    }
  }



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

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Perform the deletion
    await Order.findByIdAndRemove(orderId);

    res.status(204).send(); // Respond with a 204 No Content status code on successful deletion.
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId; 
   
    const userOrders = await Order.find({ userId });

    res.status(200).json(userOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const addFeedback = async (req, res) => {
  try {
    const { orderId, bookId, rating, comments } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Find the book within the order using bookId
    const book = order.books.find((book) => book.bookId.toString() === bookId);

    if (!book) {
      return res.status(404).json({ error: 'Book not found in the order' });
    }

    // Check if the order has been delivered before allowing feedback
    if (order.status !== 'delivered') {
      return res.status(400).json({ error: 'Feedback can only be added for delivered orders' });
    }

    // Update the book with the provided feedback
    book.rating = rating;
    book.comments = comments;
    await order.save();

    res.status(200).json({ message: 'Feedback added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Get rating and comments for a specific book in an order
const getFeedbackDetails = async (req, res) => {
  try {
    const { orderId, bookId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const book = order.books.find((book) => book.bookId.toString() === bookId);

    if (!book) {
      return res.status(404).json({ error: 'Book not found in the order' });
    }

    const feedbackDetails = {
      rating: book.rating,
      comments: book.comments,
    };

    res.status(200).json(feedbackDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
    createOrder,
    sendOrderDetailsToEmail,
    updateOrderStatus,
    getAllOrders,
    getOrderById,
    deleteOrder,
    getUserOrders,
    addFeedback,
    getFeedbackDetails,
};
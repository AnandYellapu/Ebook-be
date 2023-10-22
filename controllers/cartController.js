// controllers/cartController.js
const Cart = require('../models/Cart');

const addToCart = async (req, res) => {
    const { bookId } = req.body;
    const userId = req.user.id; // Assuming you have user authentication middleware

    try {
      // Check if the item is already in the user's cart
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }

      const existingItem = cart.items.find((item) => item.bookId.equals(bookId));

      if (existingItem) {
        // If the item is already in the cart, increase the quantity
        existingItem.quantity += 1;
      } else {
        // If the item is not in the cart, add it
        cart.items.push({ bookId, quantity: 1 });
      }

      await cart.save();
      res.status(200).json({ message: 'Item added to cart successfully' });
    } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { 
    addToCart,
 };

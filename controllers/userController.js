const User = require('../models/User');
// const Profile = require('../models/Profile');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { username, email, password ,role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword, role });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { userId: user._id, username: user.username, email:user.email, role: user.role }, // Include 'role' in the payload
        process.env.JWT_SECRET,
        {
          expiresIn: '1h',
        }
      );
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getProfile = (req, res) => {
  const { userId, username, role } = req.user;
  // You can fetch additional user profile data from your database here
  res.json({ userId, username, role, additionalProfileData: '...' });
};


const updateProfile = async (req, res) => {
  const { userId } = req.user;
  const { username, email, role } = req.body;

  try {
    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's properties
    if (username) user.username = username;
    if (email) user.email = email;
    if (role) user.role = role;

    // Save the updated user
    await user.save();

    // Respond with the updated user
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
};
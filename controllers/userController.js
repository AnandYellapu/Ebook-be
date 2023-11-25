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

const getProfile = async (req, res) => {
  const { userId, username, role, profilePhotoUrl } = req.user;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Additional data retrieval logic, if needed
    // const additionalData = await retrieveAdditionalData(userId);

    res.json({
      userId,
      username,
      role,
      profilePhotoUrl: user.profilePhotoUrl,
      // additionalProfileData: additionalData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const updateProfile = async (req, res) => {
  const { userId } = req.user;
  const { username, email, role, profilePhotoUrl } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (role) user.role = role;
    if (profilePhotoUrl) user.profilePhotoUrl = profilePhotoUrl;

    await user.save();

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
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  console.log('Incoming Token:', token);

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Authorization token is required' });
  }
  console.log('Token before verification:', token);
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        // Handle token expiration
        return res.status(401).json({ message: 'Token has expired' });
      }
      // Handle other token verification errors
      return res.status(401).json({ message: 'Invalid token' });
    }

    console.log('Decoded Token:', decoded);
    
    req.user = decoded;
    req.userId = decoded.userId;
    req.username = decoded.username;
    req.email = decoded.email;
    req.role = decoded.role;
    next();
  });
};

module.exports = authMiddleware;
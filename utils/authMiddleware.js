const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  console.log('Incoming Token:', token);

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    req.user = decoded;
    req.userId = decoded.userId;
    req.username = decoded.username;
    req.role = decoded.role;
    next();
  });
};

module.exports = authMiddleware;

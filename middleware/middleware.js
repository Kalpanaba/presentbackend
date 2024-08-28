const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    console.log('Decoded JWT:', decoded);
    next();
  } catch (err) {
    console.error('JWT verification error:', err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

const roleMiddleware = (requiredRoles) => {
  return (req, res, next) => {
    console.log('Role Middleware:', requiredRoles);
    const userRole = req.user.role;
    if (!requiredRoles.includes(userRole)) {
      return res.status(403).json({ msg: 'Access denied' });
    }
    next();
  };
};



module.exports = { authMiddleware, roleMiddleware };

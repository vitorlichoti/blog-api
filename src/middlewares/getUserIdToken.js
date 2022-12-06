const jwt = require('jsonwebtoken');

module.exports = (token) => {
  const secret = process.env.JWT_SECRET || 'seusecretdetoken';

  return jwt.verify(token, secret);
};
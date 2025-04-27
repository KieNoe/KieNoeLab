const jwt = require('jsonwebtoken');
const config = require('../config/config').jwt;

exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.secret, { expiresIn: config.expiresIn });
};

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, config.secret);
  } catch (error) {
    return null;
  }
};
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const JWT_SECRET = "s2b$10$pc0UnwLHxgzpQ8AAptG48u1AJllT5I9CbcRjd3qSZk9oMXjc3R2ja";

const generateToken = (id) => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d',
  });
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (enteredPassword, hashedPassword) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

module.exports = { generateToken, hashPassword, comparePassword }; 
const { Users } = require('../db/usersModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const register = async (body) => {
  const { email, password, subscription } = body;

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await Users.create({
    email,
    password: hashPassword,
    subscription,
  });

  return result;
};

const login = async (user) => {
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });

  return token;
};

module.exports = {
  register,
  login,
};

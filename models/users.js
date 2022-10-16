const { Users } = require('../db/usersModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

const { sendEmail } = require('../sendgrid/helpers');

const { SECRET_KEY } = process.env;

const register = async (body) => {
  const { email, password, subscription } = body;

  const avatarURL = gravatar.url({ email });
  const hashPassword = await bcrypt.hash(password, 10);

  const verificationToken = nanoid();

  const result = await Users.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: 'Подтверждения email',
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}" > </a>`,
  };

  await sendEmail(mail);

  return result;
};

const login = async (user) => {
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
  await Users.findByIdAndUpdate(user._id, { token });

  return token;
};

const logout = async (user) => {
  const { _id } = user;

  const result = await Users.findByIdAndUpdate(_id, { token: '' });

  return result;
};

const getCurrent = async (user) => {
  return user;
};

const updateStatusUser = async (owner, subscription) => {
  const updateUser = await Users.findByIdAndUpdate(
    owner,
    { subscription },
    {
      new: true,
    }
  );

  return updateUser;
};

const updateAvatar = async (id, avatarURL) => {
  const updateAvatar = await Users.findByIdAndUpdate(
    id,
    { avatarURL },
    {
      new: true,
    }
  );

  return updateAvatar;
};

const verifyEmail = async (user) => {
  await Users.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
};

const verify = async (user) => {
  const { email, verificationToken } = user;

  const mail = {
    to: email,
    subject: 'Подтверждения email',
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}" > </a>`,
  };

  await sendEmail(mail);
};

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateStatusUser,
  updateAvatar,
  verifyEmail,
  verify,
};

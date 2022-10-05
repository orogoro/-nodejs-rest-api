const e = require('express');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const { Users } = require('../../db/usersModel');

const { register, login } = require('../../models/users');

const {
  registerValidation,
  loginValidation,
} = require('../../middlewares/validationMiddlewaresUsers');

router.post('/signup', registerValidation, async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await Users.findOne({ email });

    if (user) {
      return res.status(409).json({ message: 'Email in use' });
    }

    const newUser = await register(req.body);

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/login', loginValidation, async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Email or password is wrong' });
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    return res.status(401).json({ message: 'Email or password is wrong' });
  }

  const token = await login(user);

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});

module.exports = router;

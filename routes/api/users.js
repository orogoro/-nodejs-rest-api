const e = require('express');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs').promises;
const Jimp = require('jimp');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const { Users } = require('../../db/usersModel');

const {
  register,
  login,
  getCurrent,
  logout,
  updateStatusUser,
  updateAvatar,
} = require('../../models/users');

const { MiddlewaresUsers, auth, upload } = require('../../middlewares');

router.post(
  '/signup',
  MiddlewaresUsers.registerValidation,
  async (req, res, next) => {
    try {
      const { email } = req.body;

      const user = await Users.findOne({ email });

      if (user) {
        return res.status(409).json({ message: 'Email in use' });
      }

      const newUser = await register(req.body);
      console.log(newUser.avatarURL);

      res.status(201).json({
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
          avatarURL: newUser.avatarURL,
        },
      });
    } catch (error) {
      res.status(500).json({ error: e.message });
    }
  }
);

router.post(
  '/login',
  MiddlewaresUsers.loginValidation,
  async (req, res, next) => {
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
  }
);

router.get('/current', auth, async (req, res, next) => {
  const { email, subscription } = await getCurrent(req.user);

  res.status(200).json({
    user: {
      email,
      subscription,
    },
  });
});

router.get('/logout', auth, async (req, res, next) => {
  const user = await logout(req.user);

  if (!user) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  res.status(204);
});

router.patch(
  '/subscription',
  auth,
  MiddlewaresUsers.putchValidationSubscription,
  async (req, res, next) => {
    try {
      const { _id: owner } = req.user;
      const { subscription } = req.body;

      const newUser = await updateStatusUser(owner, subscription);

      if (!newUser) {
        return res.status(404).json({ message: 'Not found' });
      }

      res.status(200).json({
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
        },
      });
    } catch (error) {
      res.status(500).json({ error: e.message });
    }
  }
);

router.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  async (req, res, next) => {
    const { path: tempUpload, originalname } = req.file;
    const { _id: id } = req.user;
    const imageName = `${id}_${originalname}`;

    try {
      const img = await Jimp.read(tempUpload);
      await img
        .autocrop()
        .cover(
          250,
          250,
          Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE
        )
        .writeAsync(tempUpload);

      const resuldUpload = path.join(avatarsDir, imageName);
      await fs.rename(tempUpload, resuldUpload);
      const avatarURL = path.join('public', 'avatars', imageName);

      const newAvatar = await updateAvatar(id, avatarURL);
      res.status(200).json({
        user: {
          avatarURL: newAvatar.avatarURL,
        },
      });
    } catch (error) {
      await fs.unlink(tempUpload);
      res.status(500).json({ error: e.message });
    }
  }
);

module.exports = router;

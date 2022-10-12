const Joi = require('joi');

module.exports = {
  registerValidation: (req, res, next) => {
    const schema = Joi.object({
      password: Joi.string().required(),
      email: Joi.string().required(),
      subscription: Joi.string(),
      token: Joi.string(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({ message: 'missing required name field' });
    }
    next();
  },
  loginValidation: (req, res, next) => {
    const schema = Joi.object({
      password: Joi.string().required(),
      email: Joi.string().required(),
      subscription: Joi.string(),
      token: Joi.string(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({ message: 'missing required name field' });
    }
    next();
  },

  putchValidationSubscription: (req, res, next) => {
    const schema = Joi.object({
      subscription: Joi.string()
        .valid('starter', 'pro', 'business')
        .default('starter')
        .required(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({ message: 'missing field subscription' });
    }
    next();
  },

  // uploadValidationAvatars: (req, res, next) => {
  //   const schema = Joi.object({
  //     subscription: Joi.string()
  //       .valid('starter', 'pro', 'business')
  //       .default('starter')
  //       .required(),
  //   });

  //   const validationResult = schema.validate(req.body);

  //   if (validationResult.error) {
  //     return res.status(400).json({ message: 'missing field subscription' });
  //   }
  //   next();
  // },
};

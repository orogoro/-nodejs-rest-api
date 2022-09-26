const Joi = require('joi');

module.exports = {
  addPostValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        })
        .required(),
      phone: Joi.string().alphanum().min(7).max(10).required(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({ message: 'missing required name field' });
    }
    next();
  },

  addPutValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).optional(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        })
        .optional(),
      phone: Joi.string().alphanum().min(7).max(10).optional(),
    }).min(1);

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({ message: 'missing fields' });
    }
    next();
  },

  PutchValidationFavorite: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.bool().required(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({ message: 'missing field favorite' });
    }
    next();
  },
};

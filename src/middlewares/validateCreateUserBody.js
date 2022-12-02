// const Joi = require('joi');

// const validateBody = (body) => {
//   Joi.object({
//     displayName: Joi.string().min(8).alphanum().required()
// .messages({
//       'string.min': '"displayName" length must be at least 8 characters long',
//       'string.required': '"username" is required',
//     }),
//     password: Joi.string().min(5).required().messages({
//       'string.min': '"password" length must be 5 characters long',
//       'string.required': '"password" is required',
//     }),
//   }).validate(body);
// };

const re = /\S+@\S+\.\S+/;

const validateBody = (req, res, next) => {
  const { displayName, email, password } = req.body;

  if (displayName.length < 8) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  if (!re.test(email)) {
    return res.status(400).json({
      message: '"email" must be a valid email',
    });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({
      message: '"password" length must be at least 6 characters long',
    });
  }

  next();
};

module.exports = validateBody;
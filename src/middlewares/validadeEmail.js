const { User } = require('../models');

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findAll({ where: { email } });

  console.log(user);

  // if (email === user) {
  //   return res.status(409).json({ message: 'User already registered' });
  // }

  next();
};

module.exports = validateEmail;
const { User } = require('../models');

const getUserByEmail = async (email) => User.findOne({ where: { email } });

module.exports = {
  getUserByEmail,
};
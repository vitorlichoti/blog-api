const { User } = require('../models');

const getUserByEmail = async (email) => User.findOne({ where: { email } });

const create = async (displayName, email, password, image) => User.create({
  displayName, email, password, image,
});

module.exports = {
  getUserByEmail,
  create,
};
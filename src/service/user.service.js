const { User } = require('../models');

const findAllUsers = async () => User.findAll({ attributes: { exclude: ['password'] } });

const getUserByEmail = async (email) => User.findOne({ where: { email } });

const create = async (displayName, email, password, image) => User.create({
  displayName, email, password, image,
});

module.exports = {
  getUserByEmail,
  create,
  findAllUsers,
};
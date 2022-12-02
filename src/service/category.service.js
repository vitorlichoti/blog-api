const { Category } = require('../models');

const create = async (category) => Category.create({ name: category });

const getCategoryByName = (name) => Category.findOne({ where: { name } });

module.exports = {
  create,
  getCategoryByName,
};
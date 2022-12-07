const { Category } = require('../models');

const validadeCategoriesIfExist = async (req, res, next) => {
  const { categoryIds } = req.body;

  const result = await Category.findAll();
  const existentIds = result.every((e, i) => e.dataValues.id === categoryIds[i]);

  if (!existentIds) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  next();
};

module.exports = validadeCategoriesIfExist;
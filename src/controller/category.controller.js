const { create, getCategoryByName, findAllCategories } = require('../service/category.service');

const createCategorie = async (req, res) => {
  const { name } = req.body;

  try {
    await create(name);
    const category = await getCategoryByName(name);
    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getAllCategories = async (_req, res) => {
  try {
    const categories = await findAllCategories();
    return res.status(200).json(categories);
  } catch (_error) {
    return res.status(404).json({ message: 'categories not found' });
  }
};

module.exports = {
  createCategorie,
  getAllCategories,
};
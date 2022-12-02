const { create, getCategoryByName } = require('../service/category.service');

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

module.exports = {
  createCategorie,
};
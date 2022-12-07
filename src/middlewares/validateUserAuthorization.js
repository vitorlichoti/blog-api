const { BlogPost } = require('../models');
const getUserIdToken = require('./getUserIdToken');

const isAuthorizedOrNot = async (id, user) => {
  const { dataValues: { userId } } = await BlogPost.findByPk(Number(id));

  if (user === userId) return true;
  
  return false;
};

const validateUserAuthorization = async (req, res, next) => {
  const { id } = req.params;
  const token = req.header('Authorization');
  const { data: { userId } } = getUserIdToken(token);
  
  const test = await isAuthorizedOrNot(Number(id), userId);

  if (test) return next();

  return res.status(401).json({ message: 'Unauthorized user' });
};

module.exports = validateUserAuthorization;
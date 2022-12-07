const { BlogPost } = require('../models');
const getUserIdToken = require('./getUserIdToken');

const validateIsAuthorizateUser = async (req, res, next) => {
  const { id } = req.params;
  const token = req.header('Authorization');
  const { data: { userId } } = getUserIdToken(token);

  const [post] = await BlogPost.findAll({ where: { id } });

  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  if (post.dataValues.userId === userId) return next();

  return res.status(401).json({ message: 'Unauthorized user' });
};

module.exports = validateIsAuthorizateUser;
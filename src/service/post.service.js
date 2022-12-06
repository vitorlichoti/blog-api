const { BlogPost, User, Category } = require('../models');

const create = (title, content, userId) => BlogPost.create({
  title,
  content,
  userId,
  published: Date.now(),
  updated: Date.now(),
});

const findLastPostId = () => BlogPost.findAll({ order: [['id', 'DESC']], limit: 1 });

const findPostsUser = (id) => BlogPost.findAll({
  include: [{
        model: User,
        as: 'user',
        attributes: {
          exclude: ['password'],
        },
      },
    {
      model: Category,
      as: 'categories',
      attributes: {
        exclude: 'PostCategory',
      },
    }],
  where: { userId: id },
});

module.exports = {
  create,
  findLastPostId,
  findPostsUser,
};
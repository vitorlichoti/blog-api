const { Op } = require('sequelize');
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

const findPostById = (id) => BlogPost.findOne({
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
  where: { id },
});

const findPostByQuery = async (q) => {
  const post = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
  {
    model: Category,
    as: 'categories',
    attributes: { exclude: 'PostCategory' },
  }],
    where: {
      [Op.or]: [{ title: { [Op.like]: `%${q}%` } }, { content: { [Op.like]: `%${q}%` } }],
    },
  });

  return { type: null, message: post };
};

const updatePost = (id, title, content) => BlogPost.update({
  title,
  content,
  updated: Date.now(),
}, { where: { id } });

const remove = async (id) => {
  const removed = await BlogPost.destroy(
    { where: { id } },
  );

  return removed;
};

module.exports = {
  create,
  findLastPostId,
  findPostsUser,
  findPostById,
  updatePost,
  remove,
  findPostByQuery,
};
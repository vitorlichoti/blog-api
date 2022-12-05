const { BlogPost } = require('../models');

const create = (title, content, userId) => BlogPost.create({
  title,
  content,
  userId,
  published: Date.now(),
  updated: Date.now(),
});

const findLastPostId = () => BlogPost.findAll({ order: [['id', 'DESC']], limit: 1 });

module.exports = {
  create,
  findLastPostId,
};
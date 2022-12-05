const jwt = require('jsonwebtoken');
const { PostCategory } = require('../models');
const { create, findLastPostId } = require('../service/post.service');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const createPost = async (req, res) => {
  const token = req.header('Authorization');
  const { title, content, categoryIds } = req.body;

  const { data: { userId } } = jwt.verify(token, secret);
  
  try {
    const post = await create(title, content, userId);
    const lastPost = await findLastPostId();
    const postId = lastPost[0].dataValues.id;

    await categoryIds.map((e) => PostCategory.create({ postId, categoryId: e }));
    
    return res.status(201).json({
      id: postId,
      title: post.title,
      content: post.content,
      userId: post.userId,
    });
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

module.exports = {
  createPost,
};
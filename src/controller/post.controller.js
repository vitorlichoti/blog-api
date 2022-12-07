const jwt = require('jsonwebtoken');
const { PostCategory } = require('../models');
const { create, findLastPostId,
  findPostsUser, findPostById, updatePost } = require('../service/post.service');

const getUserIdtoken = require('../middlewares/getUserIdToken');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const createPost = async (req, res) => {
  const token = req.header('Authorization');
  const { title, content, categoryIds } = req.body;

  const { data: { userId } } = jwt.verify(token, secret);

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
};

const getUserPosts = async (req, res) => {
  const token = req.header('Authorization');

  const { data: { userId } } = getUserIdtoken(token);

  const userPosts = await findPostsUser(userId);

  if (!userPosts) return res.status(404).json({ message: 'Posts not found' });

  return res.status(200).json(userPosts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  const post = await findPostById(Number(id));

  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  return res.status(200).json(post);
};

const updatePostId = async (req, res) => {
  const { id } = req.params;

  const { title, content } = req.body;

  await updatePost(Number(id), title, content);
  const updatedPost = await findPostById(id);

  return res.status(200).json(updatedPost);
};

module.exports = {
  createPost,
  getUserPosts,
  getPostById,
  updatePostId,
};
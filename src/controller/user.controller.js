const jwt = require('jsonwebtoken');
const { getUserByEmail, create,
  findAllUsers, findUserById, remove } = require('../service/user.service');
const getUserIdToken = require('../middlewares/getUserIdToken');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);
  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid fields' }); 
  }

  const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);

  return res.status(200).json({ token });
};

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  try {
    await create(displayName, email, password, image);
    const user = await getUserByEmail(email);

    const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);
  
    return res.status(201).json({ token });
  } catch (_error) {
    return res.status(409).json({ message: 'User already registered' });
  }
};

const getUsers = async (_req, res) => {
  const users = await findAllUsers();

  if (users.length <= 0) return res.status(404).json({ message: 'Usuários não encontrados' });

  return res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await findUserById(Number(id));

  if (user) return res.status(200).json(user);

  return res.status(404).json({ message: 'User does not exist' });
};

const removeUser = async (req, res) => {
  const token = req.header('Authorization');

  const { data: { userId } } = getUserIdToken(token);

  await remove(userId);

  return res.status(204).json();
};

module.exports = {
  loginUser,
  createUser,
  getUsers,
  getUserById,
  removeUser,
};
const jwt = require('jsonwebtoken');
const { getUserByEmail, create } = require('../service/user.service');

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

module.exports = {
  loginUser,
  createUser,
};
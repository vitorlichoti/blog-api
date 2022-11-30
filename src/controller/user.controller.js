const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../service/user.service');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);
  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid fields' }); 
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);

  res.status(200).json({ token });
};

module.exports = {
  loginUser,
};
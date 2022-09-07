require('dotenv/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = require('../utils/prisma');
const JWT_SECRET = process.env.JWT_SECRET;
const { MyError, MY_ERRORS } = require('../utils/error');

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new MyError(MY_ERRORS.MISSING_BODY);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
    select: {
      id: true,
      username: true,
    },
  });

  res.status(200).json({ user: createdUser });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new MyError(MY_ERRORS.MISSING_BODY);
  }

  const foundUser = await prisma.user.findUnique({ where: { username } });

  if (!foundUser) {
    throw new MyError(MY_ERRORS.INVALID_USERNAME_PW);
  }

  const passwordsMatch = await bcrypt.compare(password, foundUser.password);

  if (!passwordsMatch) {
    throw new MyError(MY_ERRORS.INVALID_USERNAME_PW);
  }

  const token = jwt.sign({ id: foundUser.id, username }, JWT_SECRET);

  res.status(200).json({ data: token });
};

module.exports = {
  register,
  login,
};

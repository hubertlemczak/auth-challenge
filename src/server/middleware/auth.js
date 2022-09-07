const jwt = require('jsonwebtoken');
const { MyError, MY_ERRORS } = require('../utils/error');

const JWT_SECRET = process.env.JWT_SECRET;

const authUser = async (req, res, next) => {
  const token = req.get('authorization')?.split(' ')[1];

  if (!token) {
    throw new MyError(MY_ERRORS.UNAUTHORIZED);
  }

  const user = jwt.verify(token, JWT_SECRET);

  req.user = user;

  next();
};

module.exports = authUser;

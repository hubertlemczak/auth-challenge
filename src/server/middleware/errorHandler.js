const { Prisma } = require('@prisma/client');
const { JsonWebTokenError } = require('jsonwebtoken');
const { MyError, MY_ERRORS } = require('../utils/error');

const errorHandler = (err, _req, res, _next) => {
  console.error('[error handler]', err);
  if (err instanceof MyError) {
    if (err.message === MY_ERRORS.MISSING_BODY) {
      return res.status(400).json({ error: err.message });
    }

    if (err.message === MY_ERRORS.INVALID_USERNAME_PW) {
      return res.status(401).json({ error: err.message });
    }

    if (err.message === MY_ERRORS.UNAUTHORIZED) {
      return res.status(403).json({ error: err.message });
    }
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return res
        .status(409)
        .json({ error: `This ${err?.meta?.target || 'field'} already exists` });
    }
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(403).json({ error: MY_ERRORS.UNAUTHORIZED });
  }

  res.status(500).json({ error: 'Something went wrong' });
};

module.exports = errorHandler;

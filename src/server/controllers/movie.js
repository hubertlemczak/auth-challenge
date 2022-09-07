const { MyError, MY_ERRORS } = require('../utils/error');
const prisma = require('../utils/prisma');

const getAllMovies = async (req, res) => {
  const movies = await prisma.movie.findMany({
    where: { userId: req.user?.id },
  });

  res.json({ data: movies });
};

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;

  if (!title || !description || !runtimeMins) {
    throw new MyError(MY_ERRORS.MISSING_BODY);
  }

  const createdMovie = await prisma.movie.create({
    data: {
      title,
      description,
      runtimeMins,
      userId: req.user.id,
    },
  });

  res.json({ data: createdMovie });
};

module.exports = {
  getAllMovies,
  createMovie,
};

const express = require('express');
const { getAllMovies, createMovie } = require('../controllers/movie');
const authUser = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllMovies);
router.post('/', authUser, createMovie);

module.exports = router;

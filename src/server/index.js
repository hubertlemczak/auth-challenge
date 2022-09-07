require('dotenv').config();

const express = require('express');
require('express-async-errors');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usersRouter = require('./routers/user');
const errorHandler = require('./middleware/errorHandler');
app.use('/users', usersRouter);

const moviesRouter = require('./routers/movie');
const authUser = require('./middleware/auth');
app.use('/movies', authUser, moviesRouter);

app.get('*', (req, res) => {
  res.json({ ok: true });
});

app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`\n Server is running on http://localhost:${port}\n`);
});

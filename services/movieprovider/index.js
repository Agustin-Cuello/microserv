const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');
const { logger } = require('./middleware/logger');
const { movies } = require('./data/movies');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/api/movies', (req, res) => {
  res.json(movies);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Movie Provider Service listening on port ${PORT}`);
});
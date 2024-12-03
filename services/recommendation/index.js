const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');
const { logger } = require('./middleware/logger');
const { getRandomMovies } = require('./utils/movieUtils');

const app = express();
const PORT = process.env.PORT || 3500;

app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/api/recommendation', async (req, res, next) => {
  try {
    const count = 1;
    const response = await axios.get('http://movieprovider:4000/api/movies');
    const randomMovies = getRandomMovies(response.data, count);
    res.json(randomMovies);
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Random Movies Service listening on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errorHandler } = require('./middleware/errorHandler');
const { logger } = require('./middleware/logger');
//const { movies } = require('./data/movies');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(logger);


// MongoDB connection
mongoose.connect(process.env.MONGODB_URI);

// Movie Schema
const movieSchema = new mongoose.Schema({
  id: String,
  title: String,
  overview: String,
  poster_path: String,
  genre_ids: [Number]
});

const Movie = mongoose.model('Movie', movieSchema);


app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Movie Provider Service listening on port ${PORT}`);
});
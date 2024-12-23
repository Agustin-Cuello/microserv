function getRandomMovies(movies, count = 2) {
  const shuffled = [...movies].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

module.exports = { getRandomMovies };
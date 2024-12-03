// Wait for MongoDB to be ready
const waitForMongo = async () => {
  const maxRetries = 10;
  let retries = 0;
  while (retries < maxRetries) {
    try {
      const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      await client.close();
      break;
    } catch (err) {
      retries++;
      console.log(`Waiting for MongoDB... (${retries}/${maxRetries})`);
      await new Promise(res => setTimeout(res, 5000));
    }
  }
};

waitForMongo().then(() => {
  db.movies.insertMany([
    {
      id: "1",
      title: "The Matrix",
      description: "A computer programmer discovers a mysterious world of digital reality.",
      poster: "https://example.com/matrix.jpg",
      genre: ["Sci-Fi", "Action"],
      releaseYear: 1999
    },
    {
      id: "2",
      title: "Inception",
      description: "A thief enters people's dreams to steal their secrets.",
      poster: "https://example.com/inception.jpg",
      genre: ["Sci-Fi", "Action", "Thriller"],
      releaseYear: 2010
    },
    {
      id: "3",
      title: "The Shawshank Redemption",
      description: "A banker is sentenced to life in Shawshank State Penitentiary.",
      poster: "https://example.com/shawshank.jpg",
      genre: ["Drama"],
      releaseYear: 1994
    },
    {
      id: "4",
      title: "Pulp Fiction",
      description: "Various interconnected stories of criminals in Los Angeles.",
      poster: "https://example.com/pulp-fiction.jpg",
      genre: ["Crime", "Drama"],
      releaseYear: 1994
    },
    {
      id: "5",
      title: "The Dark Knight",
      description: "Batman faces his greatest challenge against the Joker.",
      poster: "https://example.com/dark-knight.jpg",
      genre: ["Action", "Crime", "Drama"],
      releaseYear: 2008
    },
    {
      id: "6",
      title: "Forrest Gump",
      description: "The life journey of a man who changes the world with his kindness.",
      poster: "https://example.com/forrest-gump.jpg",
      genre: ["Drama", "Romance"],
      releaseYear: 1994
    },
    {
      id: "7",
      title: "The Godfather",
      description: "The story of a powerful Italian-American crime family.",
      poster: "https://example.com/godfather.jpg",
      genre: ["Crime", "Drama"],
      releaseYear: 1972
    },
    {
      id: "8",
      title: "Interstellar",
      description: "Explorers travel through a wormhole in search of a new home for humanity.",
      poster: "https://example.com/interstellar.jpg",
      genre: ["Sci-Fi", "Adventure"],
      releaseYear: 2014
    }
  ]);
});
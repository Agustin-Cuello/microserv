const express = require('express');
const amqp = require('amqplib');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

let channel;

async function connectQueue() {
  try {
    let connection;
    for (let i = 0; i < 10; i++) { // Try connecting 10 times as a safety measure because docker-compose dependency
                                  // is not guaranteed to be ready straight away
      try {
        connection = await amqp.connect(process.env.RABBITMQ_URL);
        console.log("Successfully connected to RabbitMQ on attempt ", i + 1);
        break; // Exit loop if connection is successful
      } catch (error) {
        console.error(`Attempt ${i + 1} failed:`, error);
        if (i === 4) throw error; // Throw error after final attempt
          await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 1 second before retrying
      }
    }
    channel = await connection.createChannel();
    await channel.assertQueue('movie_history');
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}

connectQueue();

app.get('/record/:movieId', async (req, res) => {
  try {
    const movieId = req.params.movieId;
    console.log("Recording movie history for movie ID:", movieId);
    
    await channel.sendToQueue('movie_history', Buffer.from(JSON.stringify({ movieId })));
    res.status(200).json({ message: 'Movie history recorded' });
  } catch (error) {
    console.error('Error recording movie history:', error);
    res.status(500).json({ error: 'Failed to record movie history' });
  }
});

app.listen(port, () => {
  console.log(`History service listening at http://localhost:${port}`);
});
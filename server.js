const express = require('express');
const fs = require('fs/promises'); // Use fs.promises for promises-based file operations
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const dataFilePath = path.join(__dirname, 'data.json');

// Read jokes data from data.json
async function readJokesData() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Get a random joke
app.get('/random-joke', async (req, res) => {
  const jokes = await readJokesData();
  const randomIndex = Math.floor(Math.random() * jokes.length);
  const joke = jokes[randomIndex];
  res.json({ joke });
});

// Get a joke by index
app.get('/joke/:index', async (req, res) => {
  const index = req.params.index;
  const jokes = await readJokesData();

  if (index >= 0 && index < jokes.length) {
    res.json({ joke: jokes[index] });
  } else {
    res.status(404).json({ error: 'Joke not found' });
  }
});

// Get all jokes
app.get('/all-jokes', async (req, res) => {
  const jokes = await readJokesData();
  res.json({ jokes });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

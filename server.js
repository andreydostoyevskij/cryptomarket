const { API_KEY } = require('./config.js');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = 5000;

// Serve static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, '/templates')));

// Enable CORS for all routes
app.use(
  cors({
    origin: 'http://127.0.0.1:5500', // Your frontend origin
  })
);

// Route to serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Update to point to root index.html
});

// Backend route to fetch all cryptocurrencies
app.get('/api/cryptocurrencies/map', async (req, res) => {
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map', {
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
      },
    });
    res.json(response.data); // Send all cryptocurrency data to frontend
  } catch (error) {
    console.error('Error fetching all cryptocurrencies:', error.message);
    res.status(500).send('Error fetching cryptocurrency data.');
  }
});

// API endpoint to search cryptocurrencies by name or symbol
app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).send('Search query is required.');
  }

  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map', {
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
      },
    });

    // Filter cryptocurrencies based on the query
    const results = response.data.data.filter((crypto) =>
      crypto.name.toLowerCase().includes(query.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(query.toLowerCase())
    );

    res.json(results.slice(0, 10)); // Limit to 10 results
  } catch (error) {
    console.error('Error fetching cryptocurrency data for search:', error.message);
    res.status(500).send('Error fetching cryptocurrency data.');
  }
});

// Serve login.html dynamically
app.get('/login', (req, res) => {
  console.log('Login route hit');
  res.sendFile(path.join(__dirname, 'views/login.html'));
});

// Serve account.html dynamically
app.get('/account', (req, res) => {
  console.log('Account route hit');
  res.sendFile(path.join(__dirname, 'views/account.html')); // Account page
});

// Serve trading.html dynamically
app.get('/trading', (req, res) => {
  console.log('Trading route hit');
  res.sendFile(path.join(__dirname, 'views/trading.html')); // Trading page
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

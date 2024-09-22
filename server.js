const express = require('express');
const cors = require('cors'); // Import CORS
const path = require('path');
const app = express();
const port = 8080;

// Enable CORS for cross-origin requests
app.use(cors());

// Serve the shopping JSON file
app.get('/json/shopping.json', (req, res) => {
  const jsonFilePath = path.join('/Users/dheerajmendu/Desktop/json/shopping.json');
  res.sendFile(jsonFilePath, (err) => {
    if (err) {
      console.error("Error serving the shopping JSON file:", err);
      res.status(500).send('Error serving the shopping JSON file.');
    }
  });
});

// Serve the soccer JSON file
app.get('/json/soccer.json', (req, res) => {
  const jsonFilePath = path.join('/Users/dheerajmendu/Desktop/json/soccer.json');
  res.sendFile(jsonFilePath, (err) => {
    if (err) {
      console.error("Error serving the soccer JSON file:", err);
      res.status(500).send('Error serving the soccer JSON file.');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/json/shopping.json`);
  console.log(`Server running at http://localhost:${port}/json/soccer.json`);
});

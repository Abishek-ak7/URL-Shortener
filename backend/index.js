const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3001;

const url = 'mongodb+srv://sreeabishek215:ABISHEKabishek7.@cluster0.nq4tdbi.mongodb.net/';

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(bodyParser.json());

// Function to generate a random code with specified length
function generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomCode = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomCode += characters.charAt(randomIndex);
  }

  return randomCode;
}

// POST endpoint to handle user input
app.post('/submit', async (req, res) => {
    const userInput = req.body.userInput;
    console.log('Received user input:', userInput);
  
    // Connect to MongoDB
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  
    try {
      await client.connect();
      console.log('Connected to MongoDB');
  
      const db = client.db('URL');
  
      // Create collection if not exists
      const linksCollection = db.collection('links');
  
      // Check if the URL already exists in the database
      const existingLink = await linksCollection.findOne({ url: userInput });
  
      if (existingLink) {
        console.log('URL already exists in the database');
        return res.json({ shortUrl: `http://localhost:${port}/${existingLink.shortCode}` }); // Add return statement here
      }
  
      // Generate a random code with 6 characters
      const shortCode = generateRandomCode(6);
  
      // Insert the URL and its corresponding short code into the collection
      await linksCollection.insertOne({ url: userInput, shortCode });
  
      res.json({ shortUrl: `http://localhost:${port}/${shortCode}` });
    } catch (error) {
      console.error('Error connecting to MongoDB or processing input:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await client.close();
      console.log('Disconnected from MongoDB');
    }
  });
  
// GET endpoint to handle redirection from short URL to long URL
app.get('/:shortCode', async (req, res) => {
    const shortCode = req.params.shortCode;
  
    // Connect to MongoDB
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  
    try {
      await client.connect();
      console.log('Connected to MongoDB');
  
      const db = client.db('URL');
  
      // Find the URL corresponding to the short code
      const linksCollection = db.collection('links');
      const result = await linksCollection.findOne({ shortCode });
  
      if (result) {
        // Redirect to the long URL
        res.redirect(result.url);
      } else {
        // If short code not found, return a 404 Not Found response
        res.status(404).json({ error: 'Short URL not found' });
      }
    } catch (error) {
      console.error('Error connecting to MongoDB or processing redirection:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await client.close();
      console.log('Disconnected from MongoDB');
    }
  });  
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

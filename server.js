const path = require('path');
const express = require('express');
const OpenAI = require('openai');
require('dotenv').config();
const port = process.env.PORT || 5501;
const openai = new OpenAI({
    apiKey: process.env["OPENAI_KEY"],
});

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

app.post('/api/openai', async (req, res) => {
    try {
      const { message } = req.body;
  
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      });
  
      const responseMessage = response.choices[0]?.message?.content;
      
      res.json({ message: responseMessage });
    } catch (error) {
      console.error('Error communicating with OpenAI:', error);
      res.status(500).json({ error: 'Failed to communicate with OpenAI' });
    }
});

app.use(express.static(path.join(__dirname, "views"))); // Serve static files from the "views" directory
app.use(express.static(path.join(__dirname, "static"))); // Serve static files from the "static" directory

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
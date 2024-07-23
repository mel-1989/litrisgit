const express = require('express');
const path = require('path');
const app = express();
const port = 5501;

app.get('/words', (req, res) => {
    res.sendFile(path.join(__dirname, 'words.txt'));
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log('Server is running on port 5501');
});
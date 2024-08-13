const express = require('express');
const path = require('path');
const app = express();
const port = 5501;

app.use(express.static(path.join(__dirname, 'views'))); 
app.use(express.static(path.join(__dirname, 'static'))); 


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


app.listen(port, () => {
    console.log('Server is running on port ' + port);
});

const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());

// Serve the questions.json file
app.get('/questions.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'questions.json'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
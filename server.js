const express = require('express');
const path = require('path');

const app = express();
const PORT = 80;

// Serve static files from app folder
app.use(express.static(path.join(__dirname, 'app')));

// API route for todos (optional backend)
app.get('/api/todos', (req, res) => {
  res.json({ message: 'Todos API' });
});

app.listen(PORT, () => {
  console.log(`✓ Todo App running on port ${PORT} with New Relic monitoring`);
});

// server/app.js
const express = require('express');
const cors = require('cors');
const app = express();
const todoRoutes = require('./routes/todos');


// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/todos', todoRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('API is working');
});

module.exports = app;

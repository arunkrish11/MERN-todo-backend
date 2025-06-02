// server/app.js
const express = require("express");
const cors = require("cors");
const app = express();
const adminRoutes = require("./routes/adminRoute");
const todoRoutes = require("./routes/todosRoute");
const userRoutes = require("./routes/userRoute");

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/admin", adminRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/user", userRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("API is working");
});

module.exports = app;

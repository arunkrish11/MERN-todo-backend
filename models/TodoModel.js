const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  username: { type: String, required: true },
  toDo: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Todo", TodoSchema);

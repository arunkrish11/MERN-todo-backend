const Todo = require("../models/TodoModel");

module.exports = {
  getToDo: async (req, res) => {
    try {
      const username = req.user.username; // auth middleware must set this
      const todos = await Todo.find({ username }).sort({ createdAt: -1 });
      return todos;
    } catch (err) {
      console.error("Error fetching todos:", err);
      return res.status(500).json({ message: "Failed to fetch todos" });
    }
  },

  createToDo: async (req, res) => {
    const todo = new Todo({
      username: req.user.username,
      toDo: req.body.text,
    });
    try {
      const newTodo = await todo.save();
      res.status(201).json(newTodo);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  deleteToDo: async (req, res) => {
    try {
      await Todo.findByIdAndDelete(req.params.id);
      res.json({ message: "Todo deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  completedToDo: async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) return res.status(404).json({ message: "Todo not found" });

      todo.completed = !todo.completed;
      const updatedTodo = await todo.save();
      res.json(updatedTodo);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

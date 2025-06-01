const express = require("express");
const router = express.Router();
const ToDoController = require("../controllers/ToDoController");

// Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await ToDoController.getToDo();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Get todos error" });
  }
});

// Create a new todo
router.post("/", async (req, res) => {
  await ToDoController.createToDo(req, res);
});

// Toggle todo completed
router.patch("/:id", ToDoController.completedToDo);

// Delete todo
router.delete("/:id", ToDoController.deleteToDo);

module.exports = router;

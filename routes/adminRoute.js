const express = require("express");
const AdminController = require("../controllers/AdminController");
const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await AdminController.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Get users error" });
  }
});

module.exports = router;

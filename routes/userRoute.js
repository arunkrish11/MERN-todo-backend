const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const auth = require("../middleware/auth");

router.post("/signup", async (req, res) => {
  try {
    await UserController.userSignUp(req, res);
  } catch (error) {
    res.status(500).json({ error: "User signup error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    await UserController.userLogin(req, res);
  } catch (error) {
    res.status(500).json({ error: "User login error" });
  }
});

router.get("/details", auth, async (req, res) => {
  try {
    await UserController.getUser(req, res); // handles res itself
  } catch (err) {
    res.status(500).json({ err: "Get user error" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/", async (req, res) => {
  try {
    const users = await UserController.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ err: "Ger user error" });
  }
});

router.post("/signup", async (req, res) => {
  await UserController.userSignUp(req, res);
  console.log(req.body);
  // res.redirect('./todos')
});

router.post("/login", async (req, res) => {
  try {
    const user = await UserController.getUser(req, res);
    res.json(user);
  } catch (error) {
    res.status(500).json({error: "User login error" })
  }
});

module.exports = router;

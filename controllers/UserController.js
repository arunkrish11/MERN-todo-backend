const User = require("../models/userModel");

module.exports = {
  getUsers: async () => {
    const users = await User.find();
    return users;
  },
  userSignUp: async (req, res) => {
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  getUser: async (req, res)=> {
    const user = await User.find()
  }
};

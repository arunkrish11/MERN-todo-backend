const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  userSignUp: async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
      // Step 1: Check if username or email already exists
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        // Decide which field is duplicated
        let errorMessage = "Username or Email already exists";
        if (existingUser.username === username) {
          errorMessage = "Username already exists";
        } else if (existingUser.email === email) {
          errorMessage = "Email already exists";
        }
        return res.status(400).json({ message: errorMessage });
      }
      // Step 2: Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Step 3: Create the new user
      const newUser = new User({
        name,
        username,
        email,
        password: hashedPassword,
      });
      // Step 4: Save to DB
      const savedUser = await newUser.save();
      // Step 5: Create JWT token (optional but useful)
      const token = jwt.sign(
        { username: savedUser.username },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      // Step 6: Respond with token and user info
      res.status(201).json({
        token,
        user: {
          id: savedUser._id,
          username: savedUser.username,
          name: savedUser.name,
          email: savedUser.email,
        },
      });
    } catch (err) {
      console.error("Signup error:", err);
      res.status(500).json({ message: "Sign Up: Server error" });
    }
  },
  userLogin: async (req, res) => {
    const { username, password } = req.body;
    try {
      // Step 1: Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "User not exist" });
      }
      // Step 2: Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
      // Step 3: Create and send JWT token
      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res
        .status(200)
        .json({ token, user: { username: user.username, id: user._id } });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: "Log In: Server error" });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.user.username }).select(
        "-password"
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Get User: Server error" });
    }
  },
};

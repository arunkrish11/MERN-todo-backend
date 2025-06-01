const User = require("../models/userModel");

module.exports = {
  getUsers: async () => {
    const users = await User.find();
    return users;
  },
};

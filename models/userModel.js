const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  dateCreated: {type: Date, default:Date.now}
});

module.exports = mongoose.model("User", UserSchema)
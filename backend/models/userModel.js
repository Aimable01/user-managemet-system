const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, requiredL: true, unique: true },
});

const user = mongoose.model("user", userSchema);
module.exports = user;

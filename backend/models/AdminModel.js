const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, requiredL: true, unique: true },
  password: { type: String, required: true },
});

const admin = mongoose.model("admin", adminSchema);
module.exports = admin;

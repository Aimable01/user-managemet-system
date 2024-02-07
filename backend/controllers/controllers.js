const bcrypt = require("bcrypt");
const Admin = require("../models/AdminModel");
const User = require("../models/userModel");

const adminRegisterGet = (req, res) => {
  res.redirect("/admin/register");
};

const adminRegisterPost = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await new Admin({ name, email, password: hashedPassword });
    await admin.save();
    res.json(admin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const adminGet = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.json({ message: err.message });
  }
};

const adminLoginGet = (req, res) => {
  res.redirect("/admin/login");
};

const adminLoginPost = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.json({ message: "Please register as admin" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.json({ message: "invalid password" });

    req.session.adminId = admin._id;
    req.session.name = admin.name;
    res.json(admin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const dashGet = async (req, res) => {
  try {
    if (!req.session.adminId) {
      return res.json({ message: "please login as admin" });
    }
    res.status(200).json({ message: "protected route accessed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const userRegister = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await new User({ name, email });
    await user.save();
    res.json({ user, message: "saved now" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const usersGet = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const userGet = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) res.json({ message: "no user found" });
    res.json({ message: "returning user", user });
  } catch (error) {
    res.json({ error });
  }
};

const userUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.json({ message: "No user found" });

    const updated = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const userDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.json({ message: "no user found" });

    const userDelete = await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  adminLoginGet,
  adminLoginPost,
  adminRegisterGet,
  adminRegisterPost,
  dashGet,
  usersGet,
  userDelete,
  userRegister,
  userUpdate,
  adminGet,
  userGet,
};

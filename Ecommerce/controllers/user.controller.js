const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

// REGISTER
exports.registerUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email, isDeleted: false });
  if (user) return res.send("User already exists");

  let imagepath = "";
  if (req.file) {
    imagepath = `/uploads/${req.file.filename}`;
  }

  let hash = await bcrypt.hash(req.body.password, 10);

  const NewUser = await User.create({
    ...req.body,
    password: hash,
    image: imagepath,
  });

  res.send("Registered successfully", NewUser);
};

// LOGIN
exports.loginUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email, isDeleted: false });
  if (!user) return res.status(404).json({ message: "User not found" });

  let isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return res.send("Invalid credentials");

  let token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

  res.json({ message: "Logged in successfully", token });
};

// GET USERS
exports.getAllUser = async (req, res) => {
  let users = await User.find({ isDeleted: false });
  res.json(users);
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const { password } = req.body;
    let updateData = { ...req.body };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true }
    );

    return res.status(200).json({
      message: "Profile updated successfully",
      data: updatedUser
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating profile",
      error: error.message
    });
  }
};

// GET PROFILE
exports.getprofile = async (req, res) => {
  try {
    let userId = req.query.userId || req.user._id;
    let user = await User.findById(userId);

    if (user.isDeleted) return res.send("User already deleted");

    return res.json({
      message: "Fetch profile successfully",
      data: user
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching profile",
      error
    });
  }
};

// DELETE PROFILE
exports.deleteProfile = async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { isDeleted: true });
  res.json({ message: "Account deleted (soft)" });
};

// CHANGE PASSWORD
exports.changePassword = async (req, res) => {
  try {
    let { oldPassword, newPassword } = req.body;

    let user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    let match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(400).json({ message: "Old password incorrect" });

    let hash = await bcrypt.hash(newPassword, 10);
    user.password = hash;
    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (error) {
    res.status(500).json({
      message: "Error updating password",
      error: error.message
    });
  }
};
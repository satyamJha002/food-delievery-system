const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all the details" });
  }

  const usernameRegex = /^[a-zA-Z0-9]+$/;

  if (!usernameRegex.test(username)) {
    return res
      .status(400)
      .json({ success: false, message: "Username must be alphanumeric" });
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters long",
    });
  }

  const userExists = await User.findOne({ username });

  if (userExists) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }

  const user = await User.create({ username, password });

  if (user) {
    return res
      .status(200)
      .json({ success: true, message: "Register successfully" });
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Failed to register" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all the details" });
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  const isPasswordCorrect = await user.matchPassword(password);

  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid password" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  if (user) {
    res
      .status(200)
      .json({ success: true, message: "Login successfully", user, token });
  } else {
    res.status(400).json({ success: false, message: "Failed to login" });
  }
});

module.exports = { registerUser, loginUser };

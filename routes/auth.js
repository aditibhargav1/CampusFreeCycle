const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// Register
router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", async (req, res) => {
  await User.create(req.body);
  res.redirect("/login");
});

// Login
router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await user.comparePassword(req.body.password))) {
    return res.redirect("/login");
  }
  req.session.userId = user._id;
  res.redirect("/items");
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = router;

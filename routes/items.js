const express = require("express");
const router = express.Router();
const Item = require("../models/itemModel");
const { isLoggedIn, isOwner } = require("../middleware/auth");

// View all items
router.get("/", async (req, res) => {
  const items = await Item.find().populate("postedBy");
  res.render("items/index", { items });
});


// New item
router.get("/new", isLoggedIn, (req, res) => {
  res.render("items/new");
});

// Create item
router.post("/", isLoggedIn, async (req, res) => {
  await Item.create({
    ...req.body,
    postedBy: req.session.userId
  });
  res.redirect("/items");
});

// Edit
router.get("/:id/edit", isLoggedIn, isOwner(Item), async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.render("items/edit", { item });
});

// Update
router.post("/:id", isLoggedIn, isOwner(Item), async (req, res) => {
  await Item.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/items");
});

// Delete
router.post("/:id/delete", isLoggedIn, isOwner(Item), async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.redirect("/items");
});

// Like / Unlike Item
router.post("/:id/like", isLoggedIn, async (req, res) => {
  const item = await Item.findById(req.params.id);

  const userId = req.session.userId;

  if (item.likes.includes(userId)) {
    item.likes.pull(userId); // Unlike
  } else {
    item.likes.push(userId); // Like
  }

  await item.save();
  res.redirect("/items");
});


module.exports = router;

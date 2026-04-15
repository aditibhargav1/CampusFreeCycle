const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  condition: String,

  price: {
    type: Number,
    default: 0   // 0 = Free
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Item", itemSchema);

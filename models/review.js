const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, "Review comment is required."]
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Review", reviewSchema);

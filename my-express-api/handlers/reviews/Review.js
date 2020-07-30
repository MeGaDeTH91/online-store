const mongoose = require("mongoose");
const { Schema, model: Model } = mongoose;
const { String, ObjectId } = Schema.Types;

const reviewSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  reviewer: {
    type: ObjectId,
    ref: "User",
  },
  product: {
    type: ObjectId,
    ref: "Product",
  },
});

module.exports = new Model("Review", reviewSchema);

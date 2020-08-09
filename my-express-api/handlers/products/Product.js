const mongoose = require("mongoose");
const { Schema, model: Model } = mongoose;
const { String, ObjectId } = Schema.Types;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: ObjectId,
    ref: "Category",
  },
  productReviews: [
    {
      type: ObjectId,
      ref: "Review",
    },
  ],
}, { timestamps: { createdAt: 'created_at' } });

module.exports = new Model("Product", productSchema);

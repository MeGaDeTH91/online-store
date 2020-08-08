const mongoose = require("mongoose");
const { Schema, model: Model } = mongoose;
const { String, ObjectId } = Schema.Types;

const categorySchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  products: [
    {
      type: ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = new Model("Category", categorySchema);

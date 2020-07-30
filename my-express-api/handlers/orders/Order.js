const mongoose = require("mongoose");
const { Schema, model: Model } = mongoose;
const { String, ObjectId } = Schema.Types;

const orderSchema = new Schema({
  createdAt: {
    type: String,
    require: true,
  },
  buyer: {
    type: ObjectId,
    ref: "User",
  },
  products: [
    {
      type: ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = new Model("Order", orderSchema);

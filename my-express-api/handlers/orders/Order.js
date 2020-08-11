const mongoose = require("mongoose");
const { Schema, model: Model } = mongoose;
const { String, ObjectId } = Schema.Types;

const orderSchema = new Schema({
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
}, { timestamps: { createdAt: 'created_at' } });

module.exports = new Model("Order", orderSchema);

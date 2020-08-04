const mongoose = require("mongoose");
const { Schema, model: Model } = mongoose;
const { String, ObjectId, Boolean } = Schema.Types;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  isAdministrator: {
    type: Boolean,
    required: true,
    default: false,
  },
  orders: [
    {
      type: ObjectId,
      ref: "Order",
    },
  ],
  cart: [
    {
      type: ObjectId,
      ref: "Product",
    },
  ],
  reviews: [
    {
      type: ObjectId,
      ref: "Review",
    },
  ],
});

module.exports = new Model("User", userSchema);

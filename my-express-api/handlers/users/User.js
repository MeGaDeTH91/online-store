const mongoose = require("mongoose");
const { Schema, model: Model } = mongoose;
const { String, ObjectId, Boolean } = Schema.Types;
const bcrypt = require("bcrypt");
const saltRounds = 11;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
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
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
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

userSchema.methods = {
  passwordsMatch(password) {
    return bcrypt.compare(password, this.password);
  },
};

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        return next(err);
      }
      hashedPass = bcrypt.hash(this.password, salt, (err, hashedPass) => {
        if (err) {
          return next(err);
        }
        this.password = hashedPass;
        next();
      });
    });
    return;
  }
  next();
});

module.exports = new Model("User", userSchema);

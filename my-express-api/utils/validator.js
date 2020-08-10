const { body } = require("express-validator");

module.exports = {
  userValidation: [
    body("email", "Invalid email provided.").notEmpty().isEmail(),
    body("fullName", "Full name should be at least 2 characters long.")
      .notEmpty()
      .isLength({
        min: 2,
      }),
    body("password", "Password should be at least 3 characters long.")
      .notEmpty()
      .isLength({
        min: 3,
      }),
  ],
  productValidation: [
    body("title", "Title should be between 6 and 35 characters long.")
      .notEmpty()
      .isLength({
        min: 6,
        max: 35,
      }),
    body(
      "description",
      "Description should be between 10 and 250 characters long."
    )
      .notEmpty()
      .isLength({
        min: 10,
        max: 250,
      }),
    body("imageURL", "Invalid image URL.").notEmpty().isURL(),
    body("price", "Invalid price.")
      .notEmpty()
      .isNumeric()
      .custom((price) => price >= 0),
    body("quantity", "Invalid quantity.")
      .notEmpty()
      .isNumeric()
      .custom((quantity) => quantity >= 0),
  ],
  reviewValidator: [
    body("content", "Content should be at least 10 characters long.")
      .notEmpty()
      .isLength({
        min: 10,
      }),
    body(
      "content",
      "Content should be at least 10 characters long."
    ).notEmpty(),
  ],
  categoryValidation: [
    body("title", "Title should be between 6 and 35 characters long.")
      .notEmpty()
      .isLength({
        min: 6,
        max: 35,
      }),
  ],
};

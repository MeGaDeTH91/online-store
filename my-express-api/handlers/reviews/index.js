const Review = require("./Review");
const Product = require("../products/Product");
const User = require("../users/User");
const { validationResult } = require("express-validator");

module.exports = {
  post: {
    createReview(req, res, next) {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(401).send(`"${errors.array()[0].msg}"`);
      }

      const productId = req.query.id;
      const { content, reviewer } = req.body;

      Product.findById(productId)
        .lean()
        .then((fullProduct) => {
          if (!fullProduct) {
            return Promise.reject(new Error("No such product!"));
          }

          const product = productId;

          Review.create({
            content,
            reviewer,
            product,
          })
            .then((review) => {
              return Promise.all([
                Product.updateOne(
                  { _id: product },
                  { $push: { productReviews: review } }
                ),
                User.updateOne(
                  { _id: reviewer },
                  { $push: { reviews: review } }
                ),
              ]);
            })
            .then(([updatedProduct, updatedUser]) => {
              if (!updatedProduct || !updatedUser) {
                return Promise.reject(
                  new Error("Product was not removed successfully!")
                );
              }

              return res.status(200).send(updatedProduct);
            })
            .catch((err) => {
              return res.status(401).send(`"${err.message}"`);
            });
        })
        .catch((err) => {
          return res.status(409).send(`"${err.message}"`);
        });
    },
  },
};

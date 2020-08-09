const Review = require("./Review");
const Product = require("../products/Product");
const { validationResult } = require("express-validator");

module.exports = {
  get: {
    productReviews(req, res, next) {
      const playId = req.query.id;

      Product.findById(playId)
        .populate("productReviews")
        .lean()
        .then((product) => {
          if (product) {
            return res.send(product.productReviews.sort("-created_at"));
          }
          return Promise.reject(new Error("No such product!"));
        })
        .catch((err) => res.status(500).send(err.message));
    },
  },
  post: {
    createReview(req, res, next) {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(401).send(errors.array()[0].msg);
      }

      const productId = req.query.id;
      const { content } = req.body;

      Product.findById(productId)
        .lean()
        .then((fullProduct) => {
          if (!fullProduct) {
            return Promise.reject(new Error("No such product!"));
          }

          const product = productId;
          const reviewer = req.user._id;

          Review.create({
            content,
            reviewer,
            product,
          })
            .then((review) => {
              Product.updateOne(
                { _id: product },
                { $push: { productReviews: review } }
              ).then((updatedProduct) => {
                return res.status(200).send(updatedProduct);
              });
            })
            .catch((err) => {
              return res.status(401).send(err.message);
            });
        })
        .catch((err) => {
          return res.status(409).send(err.message);
        });
    },
  },
};

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
            return res.send(product.productReviews);
          }
          return res.status(404).send("No such product!");
        })
        .catch((err) => res.status(500).send(err.message));
    },
  },
  post: {
    createReview(req, res, next) {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(401).send(errors.array()[0].msg);
        return;
      }

      const playId = req.query.id;
      const { content, stars } = req.body;

      Product.findById(playId)
        .lean()
        .then((fullProduct) => {
          if (fullProduct) {
            const product = playId;
            const reviewer = req.user._id;

            Review.create({
              content,
              stars,
              reviewer,
              product,
            })
              .then((review) => {
                return Promise.resolve(
                  Product.updateOne(
                    { _id: product },
                    { $push: { productReviews: review } }
                  )
                );
              })
              .then((product) => {
                return res.send(product);
              })
              .catch((err) => {
                return res.status(401).send(err.message);
              });
          }

          return res.status(404).send("No such product!");
        })
        .catch((err) => {
          return res.status(500).send(err.message);
        });
    },
  },
};

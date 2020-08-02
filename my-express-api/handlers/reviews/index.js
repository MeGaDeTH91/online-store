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
          Review.find()
            .lean()
            .then((reviews) => {
              return res.send(reviews);
            })
            .catch((err) => res.status(500).send("Error"));
        })
        .catch((err) => res.status(500).send("Error"));
    },
  },
  post: {
    createReview(req, res, next) {
      const playId = req.params.id;
      const { content, stars } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(401).send(errors.array()[0].msg);
        return;
      }

      Product.findById(playId)
        .lean()
        .then((fullProduct) => {
          const product = fullProduct._id;
          const reviewer = req.user._id;

          Review.create({
            content,
            stars,
            reviewer,
            product,
          })
            .then((createdReview) => {
              return Promise.all([
                Product.updateOne({ _id: product }, { $push: { posts: createdReview } }),
                Review.findOne({ _id: createdReview._id }),
              ]).then(([modifiedObj, reviewObj]) => {
                res.send(reviewObj);;
              return res.send(reviewObj);
            })
            .catch((err) => {
              res.status(401).send(err.message);
              return;
            });
        })
        .catch((err) => {
          return res.status(404).send("No such product");
        });
    },
  },
};

const Product = require("./Product");
const { validationResult } = require("express-validator");

module.exports = {
  get: {
    allProducts(req, res, next) {
      Product.find()
        .lean()
        .then((products) => res.send(products))
        .catch((err) => res.status(500).send("Error"));
    },
    product(req, res, next) {
      Product.findById(req.query.id)
        .populate("usersFavorite")
        .populate("productReviews")
        .lean()
        .then((product) => {
          if (product) {
            return res.send(product);
          }
          return res.status(404).send("No such product!");
        })
        .catch((err) => res.status(500).send("Error"));
    },
  },
  post: {
    create(req, res, next) {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(401).send(errors.array()[0].msg);
      }

      const {
        title,
        description,
        imageUrl,
        price,
        quantity,
        category,
      } = req.body;

      Product.findOne({ title })
        .then((currentProduct) => {
          if (currentProduct) {
            return res.status(401).send("The given product already exists!");
          }

          Product.create({
            title,
            description,
            imageUrl,
            price,
            quantity,
            category,
          });
        })
        .then((createdProduct) => {
          return res.send(createdProduct);
        })
        .catch((err) => {
          return res.status(500).send(err.message);
        });
    },
  },
  put: {
    product(req, res, next) {
      const id = req.query.id;

      const errors = validationResult(req);

      const {
        title,
        description,
        imageUrl,
        price,
        quantity,
        category,
      } = req.body;

      if (!errors.isEmpty()) {
        res.status(401).send(errors.array()[0].msg);
        return;
      }

      Product.update(
        { _id: id },
        { title, description, imageUrl, price, quantity, category }
      )
        .then((updatedProduct) => res.send(updatedProduct))
        .catch(next);
    },
  },

  delete: {
    product(req, res, next) {
      const id = req.params.id;

      Product.deleteOne({ _id: id })
        .then((removedProduct) => res.send(removedProduct))
        .catch(next);
    },
  },
};

const Product = require("./Product");
const { validationResult } = require("express-validator");
const Category = require("../categories/Category");

module.exports = {
  get: {
    allProducts(req, res, next) {
      Product.find()
        .sort("-created_at")
        .populate("category")
        .lean()
        .then((products) => res.send(products))
        .catch((err) => res.status(500).send(`"Error"`));
    },
    product(req, res, next) {
      Product.findById(req.query.id)
        .populate("usersFavorite")
        .populate("category")
        .populate({
          path: "productReviews",
          sort: "-created_at",
          populate: {
            path: "reviewer",
            model: "User",
          },
        })
        .lean()
        .then((product) => {
          if (product) {
            return res.send(product);
          }
          return Promise.reject(new Error("Product not found!"));
        })
        .catch((err) => res.status(404).send(`"${err.message}"`));
    },
  },
  post: {
    create(req, res, next) {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(401).send(`"${errors.array()[0].msg}"`);
      }

      const {
        title,
        description,
        imageURL,
        price,
        quantity,
        category,
      } = req.body;

      Product.findOne({ title })
        .then((currentProduct) => {
          if (currentProduct) {
            return Promise.reject(
              new Error("The given product already exists!")
            );
          }

          return Product.create({
            title,
            description,
            imageURL,
            price,
            quantity,
            category,
          });
        })
        .then((createdProduct) => {
          if (!createdProduct) {
            return Promise.reject(
              new Error("Product was not created successfully!")
            );
          }

          Category.updateOne(
            { _id: category },
            { $push: { products: createdProduct._id } }
          ).then((category) => {
            return res.status(200).send(createdProduct);
          });
        })
        .catch((err) => {
          return res.status(401).send(`"${err.message}"`);
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
        imageURL,
        price,
        quantity,
        category,
      } = req.body;

      if (!errors.isEmpty()) {
        return res.status(401).send(`"${errors.array()[0].msg}"`);
      }

      Product.updateOne(
        { _id: id },
        { title, description, imageURL, price, quantity, category }
      )
        .then((updatedProduct) => res.send(updatedProduct))
        .catch((err) => {
          return res.status(401).send(`"${err.message}"`);
        });
    },
  },

  delete: {
    product(req, res, next) {
      const id = req.query.id;
      let categoryId = '';

      Product.findById(id)
        .lean()
        .then((currentProduct) => {
          if (!currentProduct) {
            return Promise.reject(new Error("No such product!"));
          }

          categoryId = currentProduct.category;

          return Promise.all([
            Product.deleteOne({ _id: id }),
            Category.updateOne({ _id: categoryId }, { $pull: { products: id } }),
          ]);
        })
        .then(([deletedProduct, removedElement]) => {
          if (!deletedProduct || !removedElement) {
            return Promise.reject(
              new Error("Product was not removed successfully!")
            );
          }

          return res.status(200).send(deletedProduct);
        })
        .catch((err) => {
          return res.status(401).send(`"${err.message}"`);
        });
    },
  },
};

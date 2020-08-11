const User = require("../users/User");
const Order = require("./Order");
const Product = require("../products/Product");
const async = require('async');

module.exports = {
  get: {
    userCart(req, res, next) {
      const userId = req.query.userId;

      User.findById(userId)
        .populate("cart")
        .lean()
        .then((user) => {
          if (user) {
            return res.status(200).send(user.cart);
          }
          return res.status(404).send(`"No such user!"`);
        })
        .catch((err) => res.status(500).send(`"${err.message}"`));
    },
    userOrders(req, res, next) {
      const userId = req.query.userId;

      User.findById(userId)
        .populate({
          path: "orders",
          limit: 10,
          populate: {
            path: "products",
            model: "Product",
          },
        })
        .lean()
        .then((user) => {
          if (user) {
            return res.send(user.orders);
          }
          return res.status(404).send(`"No such user!"`);
        })
        .catch((err) => res.status(500).send(`"${err.message}"`));
    },
  },
  post: {
    createReview(req, res, next) {
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
    createOrder(req, res, next) {
      const userId = req.query.userId;

      User.findById(userId)
        .populate("cart")
        .populate("orders")
        .lean()
        .then((user) => {
          if (!user) {
            return Promise.reject(new Error("No such user!"));
          }

          if (!user.cart) {
            return Promise.reject(new Error("No products in shopping cart!"));
          }

          const createdAt = (new Date() + "").slice(0, 24);

          Order.create({
            buyer: userId,
            products: user.cart,
          })
            .then((order) => {
              return Promise.all([
                async.eachSeries(user.cart, function updateObject (product, done) {
                  // Model.update(condition, doc, callback)
                  Product.updateOne(
                    { _id: product._id },
                    { $inc: { quantity: -1} },
                    done
                  );
              }, function allDone (err) {}),
                User.updateOne(
                  { _id: userId },
                  { $set: { cart: [] }, $push: { orders: order} }
                ),
              ]);
            })
            .then(([]) => {
              return res.status(200).send('"Successfully updated all entries!"');
            });
        })
        .catch((err) => res.status(500).send(`"${err.message}"`));
    },
    addToCart(req, res, next) {
      const productId = req.query.productId;
      const { userId } = req.body;

      Promise.all([
        Product.findById(productId).then((product) => {
          if (!product || product.quantity < 1) {
            return Promise.reject(new Error("No pieces of this product."));
          }
        }),
        User.updateOne({ _id: userId }, { $pull: { cart: productId } }),
      ])
        .then(([]) => {
          User.updateOne({ _id: userId }, { $push: { cart: productId } })
            .then((user) => {
              return res.status(200).send('"Success!"');
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        })
        .catch((err) => res.status(500).send(`"${err.message}"`));
    },
    removeFromCart(req, res, next) {
      const productId = req.query.productId;
      const { userId } = req.body;

      Promise.all([
        Product.findById(productId),
        User.updateOne({ _id: userId }, { $pull: { cart: productId } }),
      ])
        .then(([]) => {
          return res.status(200).send('"Success!"');
        })
        .catch((err) => res.status(500).send(`"${err.message}"`));
    },
  },
};

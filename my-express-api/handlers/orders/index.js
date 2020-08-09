const User = require("../users/User");
const Order = require("./Order");
const Product = require("../products/Product");

module.exports = {
  get: {
    userCart(req, res, next) {
      const userId = req.query.id;

      User.findById(userId)
        .populate("cart")
        .lean()
        .then((user) => {
          if (user) {
            return res.send(user.cart);
          }
          return res.status(404).send("No such user!");
        })
        .catch((err) => res.status(500).send(err.message));
    },
    userOrders(req, res, next) {
      const userId = req.query.id;

      User.findById(userId)
        .populate("orders")
        .lean()
        .then((user) => {
          if (user) {
            return res.send(user.orders);
          }
          return res.status(404).send("No such user!");
        })
        .catch((err) => res.status(500).send(err.message));
    },
  },
  post: {
    createOrder(req, res, next) {
      const userId = req.user._id;

      User.findById(userId)
        .populate("cart")
        .populate("orders")
        .then((user) => {
          if (!user) {
            Promise.reject(new Error("No such user!"));
          }

          if (!user.cart) {
            Promise.reject(new Error("No products in shopping cart!"));
          }

          const createdAt = (new Date() + "").slice(0, 24);

          Order.create({
            createdAt,
            buyer: userId,
            products: user.cart,
          }).then((order) => {
            user.cart.forEach((productId) => {
              Product.updateOne({ _id: productId }, { $inc: { quantity: -1 } }).then();
            });
            User.updateOne({ _id: userId }, {$set: {cart: [] }}).then();

            return res.status(200).send(order);
          });
        })
        .catch((err) => res.status(500).send(err.message));
    },
    addToCart(req, res, next) {
      const productId = req.query.productId;
      const userId = req.query.userId;

      console.log('ProductId: ', productId);
      console.log('userId: ', userId);

      User.updateOne({ _id: userId }, { $push: { cart: productId } }).then((updatedUser) => {
        console.log(updatedUser);
        return res.status(200).send(updatedUser);
      });
      
      User.findById(userId)
        .populate("cart")
        .then((user) => {
          if (!user) {
            Promise.reject(new Error("No such user!"));
          }

          Product.findById(productId)
            .then((product) => {
              
            })
            .catch((err) => res.status(500).send(err.message));
        })
        .catch((err) => res.status(500).send(err.message));
    },
  },
};

const User = require("./User");
const TokenBlacklist = require("../tokenBlacklist/TokenBlacklist");
const jwt = require("../../utils/jwt");
const { validationResult } = require("express-validator");
const { cookie } = require("../../config/config");

module.exports = {
  get: {
    allUsers(req, res, next) {
      User.find()
        .lean()
        .then((users) => res.send(users))
        .catch((err) => res.status(500).send(`"${err.message}"`));
    },
    user(req, res, next) {
      User.findById(req.query.id)
        .populate("orders")
        .populate('cart')
        .populate({
          path: "reviews",
          limit: 5,
          populate: {
            path: "product",
            model: "Product",
          },
        })
        .lean()
        .then((user) => res.send(user))
        .catch((err) => res.status(500).send(`"${err.message}"`));
    },
    verifyLogin(req, res, next) {
      const token = req.headers.authorization || "";

      Promise.all([jwt.verifyToken(token), TokenBlacklist.findOne({ token })])
        .then(([data, blacklistToken]) => {
          if (blacklistToken) {
            return Promise.reject(new Error("blacklisted token"));
          }

          User.findById(data.id).then((user) => {
            return res.send({
              status: true,
              user,
            });
          });
        })
        .catch((err) => {
          if (
            [
              "token expired",
              "blacklisted token",
              "jwt must be provided",
            ].includes(err.message)
          ) {
            return res.status(401).send(`"UNAUTHORIZED!"`);
          }

          return res.send({
            status: false,
          });
        });
    },
  },
  post: {
    login(req, res, next) {
      const { email, password } = req.body;

      User.findOne({
        email,
      })
        .then((user) => {
          if (!user) {
            return Promise.reject(new Error("Invalid credentials!"));
          }
          return Promise.all([user.passwordsMatch(password), user]);
        })
        .then(([match, user]) => {
          if (!match) {
            return Promise.reject(new Error("Invalid credentials!"));
          }

          const token = jwt.createToken({ id: user._id });
          return res.header("Authorization", token).send(user);
        })
        .catch((err) => {
          return res.status(401).send(`"${err.message}"`);
        });
    },
    logout(req, res, next) {
      const token = req.cookies[cookie];
      console.log("-".repeat(35));
      console.log(token);
      console.log("-".repeat(35));
      TokenBlacklist.create({ token })
        .then(() => {
          req.user = null;
          return res.clearCookie(cookie).send(`"Logged out successfully!"`);
        })
        .catch((err) => {
          return res.status(500).send(`"${err.message}"`);
        });
    },
    register(req, res, next) {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(401).send(`"${errors.array()[0].msg}"`);
      }

      const { email, fullName, phone, password, rePassword } = req.body;

      if (password !== rePassword) {
        return res.status(401).send(`"Passwords do not match!"`);
      }

      User.findOne({ email })
        .then((currentUser) => {
          if (currentUser) {
            return Promise.reject(new Error("The given email already exists!"));
          }

          return User.create({ email, fullName, phone, password });
        })
        .then((createdUser) => {
          const token = jwt.createToken({ id: createdUser._id });
          return res.header("Authorization", token).send(createdUser);
        })
        .catch((err) => {
          return res.status(409).send(`"${err.message}"`);
        });
    },
  },
  put: {
    user(req, res, next) {
      const userId = req.query.id;
      const { fullName, phone } = req.body;

      if (!fullName || fullName.length < 3) {
        return res.status(400).send('"Full name should be at least 3 characters long!"');
      }

      User.updateOne({ _id: userId }, { fullName, phone })
        .then((updatedUser) => res.send(updatedUser))
        .catch((err) => {
          return res.status(500).send(`"${err.message}"`);
        });
    },
    changeRole(req, res, next) {
      const userId = req.query.id;

      User.findById(userId)
        .then((user) => {
          if (!user) {
            return Promise.reject(new Error("No such user!"));
          }

          User.updateOne(
            { _id: userId },
            { isAdministrator: !user.isAdministrator }
          )
            .then((updatedUser) => res.send(updatedUser))
            .catch((err) => {
              return res.status(401).send(`"${err.message}"`);
            });
        })
        .catch((err) => {
          return res.status(401).send(`"${err.message}"`);
        });
    },
    changeStatus(req, res, next) {
      const userId = req.query.id;

      User.findById(userId)
        .then((user) => {
          if (!user) {
            return Promise.reject(new Error("No such user!"));
          }

          User.updateOne({ _id: userId }, { isActive: !user.isActive })
            .then((updatedUser) => res.send(updatedUser))
            .catch((err) => {
              return res.status(500).send(`"${err.message}"`);
            });
        })
        .catch((err) => {
          return res.status(401).send(`"${err.message}"`);
        });
    },
  },
  delete: {
    user(req, res, next) {
      const id = req.query.id;
      User.deleteOne({ _id: id })
        .then((removedUser) => res.send(removedUser))
        .catch((err) => {
          return res.status(500).send(`"${err.message}"`);
        });
    },
  },
};

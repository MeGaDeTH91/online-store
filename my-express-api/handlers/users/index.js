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
        .catch((err) => res.status(500).send(err.message));
    },
    user(req, res, next) {
      User.findById(req.query.id)
        .populate("orders")
        .populate("favorites")
        .populate("reviews")
        .lean()
        .then((user) => res.send(user))
        .catch((err) => res.status(500).send(err.message));
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
            return Promise.reject(new Error("Invalid password!"));
          }

          const token = jwt.createToken(user);
          return res.header("Authorization", token).send(user);
        })
        .catch((err) => {
          return res.status(401).send(err.message);
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
          return res.clearCookie(cookie).send("Logout successfully!");
        })
        .catch((err) => {
          return res.status(500).send(err.message);
        });
    },
    register(req, res, next) {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(401).send(errors.array()[0].msg);
      }

      const { email, fullName, phone, password, rePassword } = req.body;

      if (password !== rePassword) {
        return res.status(401).send("Passwords do not match!");
      }

      User.findOne({ email })
        .then((currentUser) => {
          if (currentUser) {
            return Promise.reject(new Error("The given email already exists!"));
          }

          return User.create({ email, fullName, phone, password });
        })
        .then((createdUser) => {
          const token = jwt.createToken(createdUser);
          return res.header("Authorization", token).send(createdUser);
        })
        .catch((err) => {
          return res.status(409).send(err.message);
        });
    },
  },
  put: {
    user(req, res, next) {
      const userId = req.query.id;
      const { fullName, phone } = req.body;

      User.updateOne({ _id: userId }, { fullName, phone })
        .then((updatedUser) => res.send(updatedUser))
        .catch((err) => {
          return res.status(500).send(err.message);
        });
    },
    changeRole(req, res, next) {
      const userId = req.query.id;

      User.findById(userId).then((user) => {
        if (!user) {
          Promise.reject(new Error("No such user!"));
        }

        User.updateOne({ _id: userId }, { isAdministrator: !user.isAdministrator })
          .then((updatedUser) => res.send(updatedUser))
          .catch((err) => {
            return res.status(500).send(err.message);
          });
      });
    },
  },
  delete: {
    user(req, res, next) {
      const id = req.query.id;
      User.deleteOne({ _id: id })
        .then((removedUser) => res.send(removedUser))
        .catch((err) => {
          return res.status(500).send(err.message);
        });
    },
  },
};

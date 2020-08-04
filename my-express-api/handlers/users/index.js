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
            throw new Error("Invalid credentials!");
          }
          return Promise.all([user.passwordsMatch(password), user]);
        })
        .then(([match, user]) => {
          if (!match) {
            res.status(401).send("Invalid password");
            return;
          }

          const token = jwt.createToken(user);

          res.header("Authorization", token).send(user);
        })
        .catch(next);
    },
    logout(req, res, next) {
      const token = req.cookies[cookie];
      console.log("-".repeat(35));
      console.log(token);
      console.log("-".repeat(35));
      TokenBlacklist.create({ token })
        .then(() => {
          req.user = null;
          res.clearCookie(cookie).send("Logout successfully!");
        })
        .catch(next);
    },
    register(req, res, next) {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(401).send(errors.array()[0].msg);
        return;
      }

      const { email, password, rePassword } = req.body;

      if (password !== rePassword) {
        res.status(401).send("Passwords do not match!");
        return;
      }

      User.findOne({ email })
        .then((currentUser) => {
          if (currentUser) {
            res.status(401).send("The given email is already used!");
            return;
          }
          return User.create({ email, password });
        })
        .then((createdUser) => {
          res.header("Authorization", token).send(createdUser);
        })
        .catch((err) => {
          res.status(401).send(err.messag);
          return;
        });
    },
  },
  put: {
    user(req, res, next) {
      const id = req.query.id;
      const { username, password } = req.body;
      models.User.update({ _id: id }, { username, password })
        .then((updatedUser) => res.send(updatedUser))
        .catch(next);
    },
    changeRole(req, res, next) {
      const id = req.query.id;
      const { username, password } = req.body;
      models.User.update({ _id: id }, { username, password })
        .then((updatedUser) => res.send(updatedUser))
        .catch(next);
    },
  },
  delete: {
    user(req, res, next) {
      const id = req.query.id;
      models.User.deleteOne({ _id: id })
        .then((removedUser) => res.send(removedUser))
        .catch(next);
    },
  },
};

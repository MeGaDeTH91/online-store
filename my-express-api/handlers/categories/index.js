const Category = require("./Category");
const { validationResult } = require("express-validator");

module.exports = {
  get: {
    all(req, res, next) {
      Category.find()
        .lean()
        .then((categories) => res.send(categories))
        .catch((err) => res.status(500).send(err.message));
    },
    category(req, res, next) {
      Category.findById(req.query.id)
        .populate("products")
        .lean()
        .then((category) => {
          if (category) {
            return res.send(category);
          }
          return Promise.reject(new Error("No such category!"));
        })
        .catch((err) => res.status(500).send(err.message));
    },
  },
  post: {
    create(req, res, next) {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(401).send(errors.array()[0].msg);
      }

      const { title } = req.body;

      Category.findOne({
        title,
      })
        .then((category) => {
          if (category) {
            return Promise.reject(new Error("Category already exists!"));
          }
          Category.create({ title })
          .then(category => res.status(200).send(category));
        })
        .catch((err) => res.status(408).send(err.message));
    },
  },
};

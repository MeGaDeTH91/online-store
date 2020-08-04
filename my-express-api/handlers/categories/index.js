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
    cagegory(req, res, next) {
      Category.findById(req.query.id)
        .populate("products")
        .lean()
        .then((category) => {
          if (category) {
            return res.send(category);
          }
          return res.status(404).send("No such category!");
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
            Promise.reject("Category already exists!");
          }
          return Category.create({ title });
        })
        .catch(next);
    },
  },
};

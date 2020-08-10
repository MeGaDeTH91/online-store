const Category = require("./Category");
const { validationResult } = require("express-validator");

module.exports = {
  get: {
    all(req, res, next) {
      Category.find()
        .lean()
        .then((categories) => res.send(categories))
        .catch((err) => res.status(500).send(`"${err.message}"`));
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
        .catch((err) => res.status(500).send(`"${err.message}"`));
    },
  },
  post: {
    create(req, res, next) {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(401).send(`"${errors.array()[0].msg}"`);
      }

      const { title, imageURL } = req.body;

      Category.findOne({
        title,
      })
        .then((category) => {
          if (category) {
            return Promise.reject(new Error("Category already exists!"));
          }
          Category.create({ title, imageURL })
          .then(category => res.status(200).send(category));
        })
        .catch((err) => res.status(408).send(`"${err.message}"`));
    },
  },
  put: {
    category(req, res, next) {
      const id = req.query.id;

      const errors = validationResult(req);

      const {
        title,
        imageURL,
      } = req.body;

      if (!errors.isEmpty()) {
        return res.status(401).send(`"${errors.array()[0].msg}"`);
      }

      Category.updateOne(
        { _id: id },
        { title, imageURL }
      )
        .then((updatedCategory) => res.send(updatedCategory))
        .catch((err) => {
          return res.status(401).send(`"${err.message}"`);
        });
    },
  },
};

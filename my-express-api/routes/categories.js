const router = require("express").Router();
const handler = require("../handlers/categories");
const { categoryValidation } = require("../utils/validator");

router.get("/all", handler.get.all);
router.get("/category", handler.get.category);

router.post("/create", categoryValidation, handler.post.create);

module.exports = router;

const router = require("express").Router();
const handler = require("../handlers/categories");
const { categoryValidation } = require("../utils/validator");
const authorizeAdmin = require("../utils/authorizeAdmin");

router.get("/all", handler.get.all);
router.get("/category", handler.get.category);

router.post("/create", authorizeAdmin(), categoryValidation, handler.post.create);

router.put("/category", authorizeAdmin(), categoryValidation, handler.put.category);

module.exports = router;

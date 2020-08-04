const router = require("express").Router();
const handler = require("../handlers/categories");
const { categoryValidation } = require("../utils/validator");
const authenticate = require("../utils/authenticate");
const authorizeAdmin = require("../utils/authorizeAdmin");

router.get("/all", handler.get.all);
router.get("/cagegory", handler.get.cagegory);

router.post("/create", authenticate(), authorizeAdmin(), categoryValidation, handler.post.create);

module.exports = router;

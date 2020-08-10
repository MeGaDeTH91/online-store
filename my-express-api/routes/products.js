const router = require("express").Router();
const handler = require("../handlers/products");
const { productValidation } = require("../utils/validator");
const authorizeAdmin = require("../utils/authorizeAdmin");

router.get("/all", handler.get.allProducts);
router.get("/product", handler.get.product);

router.post("/create", authorizeAdmin(), productValidation, handler.post.create);

router.put("/product", authorizeAdmin(), productValidation, handler.put.product);
router.delete("/product", authorizeAdmin(), handler.delete.product);

module.exports = router;

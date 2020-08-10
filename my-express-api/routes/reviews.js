const router = require("express").Router();
const handler = require("../handlers/reviews");
const { reviewValidator } = require("../utils/validator");
const authenticate = require("../utils/authenticate");

router.get("/productReviews", handler.get.productReviews);

router.post("/create", reviewValidator, handler.post.createReview);

module.exports = router;

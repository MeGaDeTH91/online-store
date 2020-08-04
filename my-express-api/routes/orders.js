const router = require("express").Router();
const handler = require("../handlers/orders");
const authenticate = require("../utils/authenticate");

router.get("/userCart", handler.get.userCart);
router.get("/userOrders", handler.get.userOrders);

router.post("/createOrder", handler.post.createOrder);
router.post("/addToCart", handler.post.addToCart);

module.exports = router;

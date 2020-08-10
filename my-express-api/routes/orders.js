const router = require("express").Router();
const handler = require("../handlers/orders");
const authenticate = require("../utils/authenticate");

router.get("/userCart", authenticate(), handler.get.userCart);
router.get("/userOrders", authenticate(), handler.get.userOrders);

router.post("/createOrder", authenticate(), handler.post.createOrder);
router.post("/addToCart", authenticate(), handler.post.addToCart);

module.exports = router;

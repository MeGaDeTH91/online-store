const router = require("express").Router();
const handler = require("../handlers/orders");
const authenticate = require("../utils/authenticate");

router.get("/user-cart", authenticate(), handler.get.userCart);
router.get("/user-orders", authenticate(), handler.get.userOrders);

router.post("/create-order", authenticate(), handler.post.createOrder);
router.post("/add-to-cart", authenticate(), handler.post.addToCart);
router.post("/remove-from-cart", authenticate(), handler.post.removeFromCart);

module.exports = router;

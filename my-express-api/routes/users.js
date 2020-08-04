const router = require("express").Router();
const handler = require("../handlers/users");
const { userValidation } = require("../utils/validator");
const authenticate = require("../utils/authenticate");
const authorizeAdmin = require("../utils/authorizeAdmin");
const guestAccess = require("../utils/guestAccess");

router.get("/allUsers", authorizeAdmin(), handler.get.allUsers);
router.get("/user", handler.get.user);

router.post("/login", guestAccess(), handler.post.login);
router.post("/logout", authenticate(), handler.post.logout);
router.post("/register", userValidation, handler.post.register);

router.put("/changeRole", authorizeAdmin(), handler.put.changeRole);
router.put("/user", userValidation, handler.put.user);
router.delete("/user", authenticate(), handler.delete.user);

module.exports = router;

const router = require("express").Router();
const handler = require("../handlers/users");
const { userValidation } = require("../utils/validator");
const authenticate = require("../utils/authenticate");
const guestAccess = require("../utils/guestAccess");

router.get('/all',  handler.get.allUsers);
router.get("/logout", authenticate(), handler.get.logout);

router.post("/login", guestAccess(), handler.post.login);
router.post("/register", userValidation, handler.post.register);

module.exports = router;

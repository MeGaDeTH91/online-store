const jwt = require("./jwt");
const User = require("../handlers/users/User");
const TokenBlacklist = require("../handlers/tokenBlacklist/TokenBlacklist");

module.exports = (justContinue = false) => {
  return function (req, res, next) {
    const token = req.headers.authorization || "";

    Promise.all([jwt.verifyToken(token), TokenBlacklist.findOne({ token })])
      .then(([data, blacklistToken]) => {
        if (blacklistToken) {
          return Promise.reject(new Error("blacklisted token"));
        }

        User.findById(data.id).then((user) => {
          req.user = user;
          next();
        });
      })
      .catch((err) => {
        if (justContinue) {
          next();
          return;
        }

        if (
          [
            "token expired",
            "blacklisted token",
            "jwt must be provided",
          ].includes(err.message)
        ) {
          res.status(401).send("UNAUTHORIZED!");
          return;
        }

        next(err);
      });
  };
};

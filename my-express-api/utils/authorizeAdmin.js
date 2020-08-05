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
          if (!user) {
            return Promise.reject(new Error("No such user!"));
          }

          if (!user.isAdministrator) {
            return Promise.reject(new Error("User not administrator"));
          }

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
            "user not administrator",
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

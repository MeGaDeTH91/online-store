const routes = require("../routes");

module.exports = (app) => {
  app.use("/api/users", routes.users);
  app.use("/api/products", routes.products);
  app.use("/api/categories", routes.categories);
  app.use("/api/reviews", routes.reviews);
  app.use("/api/orders", routes.orders);
};

import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/home";
import ErrorPage from "./pages/error";
import CreateProductPage from "./pages/products/create";
import CreateCategoryPage from "./pages/categories/create";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
import UserContext from "./Context";
import LogoutPage from "./pages/logout";
import CategoriesPage from "./pages/categories/all";

const StoreNavigation = () => {
  const context = useContext(UserContext);
  const userIsLogged = context.user.loggedIn;
  const admin = userIsLogged && context.user.isAdministrator;

  const authorizationSwitch = (requiredPrivilege, page, redirectRoute) => {
    return requiredPrivilege ? page : <Redirect to={`${redirectRoute}`} />;
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/categories/all" component={CategoriesPage} />

        <Route exact path="/products/create">
          {authorizationSwitch(admin, <CreateProductPage />, "/")}
        </Route>
        <Route exact path="/categories/create">
          {authorizationSwitch(admin, <CreateCategoryPage />, "/")}
        </Route>

        <Route exact path="/register">
          {authorizationSwitch(!userIsLogged, <RegisterPage />, "/")}
        </Route>
        <Route exact path="/login">
          {authorizationSwitch(!userIsLogged, <LoginPage />, "/")}
        </Route>

        <Route exact path="/logout">
          {authorizationSwitch(userIsLogged, <LogoutPage />, "/login")}
        </Route>
        <Route exact path="/profile/:userId">
          {authorizationSwitch(userIsLogged, <ProfilePage />, "/login")}
        </Route>
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default StoreNavigation;

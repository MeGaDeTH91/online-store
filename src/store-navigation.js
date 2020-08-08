import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/home";
import ErrorPage from "./pages/error";
import CreateProductPage from "./pages/products/create";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
import UserContext from "./Context";
import LogoutPage from "./pages/logout";

const StoreNavigation = () => {
  const context = useContext(UserContext);
  const loggedIn = context.user.loggedIn;
  const admin = loggedIn && context.user.isAdministrator;

  const authorizationSwitch = (requiredPrivilege, page, redirectRoute) => {
    return requiredPrivilege ? page : <Redirect to={`${redirectRoute}`} />;
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />

        <Route exact path="/products/create">
          {authorizationSwitch(admin, <CreateProductPage />, "/")}
        </Route>

        <Route exact path="/register">
          {authorizationSwitch(!loggedIn, <RegisterPage />, "/")}
        </Route>
        <Route exact path="/login">
          {authorizationSwitch(!loggedIn, <LoginPage />, "/")}
        </Route>

        <Route exact path="/logout">
          {authorizationSwitch(loggedIn, <LogoutPage />, "/login")}
        </Route>
        <Route exact path="/profile/:userId">
          {authorizationSwitch(loggedIn, <ProfilePage />, "/login")}
        </Route>
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default StoreNavigation;

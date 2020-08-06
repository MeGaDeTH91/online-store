import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import HomePage from './pages/home';
import ErrorPage from './pages/error';
import ShareThoughtsPage from "./pages/product";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
import UserContext from "./Context";
import LogoutPage from "./pages/logout";

const StoreNavigation = () => {
  const context = useContext(UserContext);
  const loggedIn = context.user.loggedIn;

  return (
    <BrowserRouter>
      <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/share">
            {loggedIn ? (<ShareThoughtsPage />) : (<Redirect to="/login" />)}
          </Route>
          <Route exact path="/register">
            {loggedIn ? (<Redirect to="/" />) : (<RegisterPage />)}
          </Route>
          <Route exact path="/login">
            {loggedIn ? (<Redirect to="/" />) : (<LoginPage />)}
          </Route>
          <Route exact path="/logout">
            {loggedIn ? (<LogoutPage />) : (<Redirect to="/" />)}
          </Route>
          <Route exact path="/profile/:userId">
            {loggedIn ? (<ProfilePage />) : (<Redirect to="/" />)}
          </Route>
          <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default StoreNavigation;

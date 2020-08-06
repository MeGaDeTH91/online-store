import React, { useState, useContext } from "react";
import UserContext from "../../Context";
import { Redirect } from "react-router-dom";

const LogoutPage = () => {
  const context = useContext(UserContext);

  context.logOut();

  return (
    <Redirect to="/"/>
  );
}

export default LogoutPage;

import React, { useContext, useEffect } from "react";
import UserContext from "../../UserContext";
import { Redirect } from "react-router-dom";

const LogoutPage = () => {
  const context = useContext(UserContext);
  
  useEffect(() => {
    context.logOut();
  })

  return (
    <Redirect to="/"/>
  );
}

export default LogoutPage;

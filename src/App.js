import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import NotificationContext from "./NotificationContext";
import getCookie from "./utils/getCookie";

const App = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const showMessage = (message, messageType) => {
    setStatus(true);
    setMessage(message);
    setMessageType(messageType);
  };

  const clearMessage = () => {
    setStatus(false);
    setMessage("");
    setMessageType("");
  };

  const logIn = (user) => {
    setUser({
      ...user,
      loggedIn: true,
    });
  };

  const logOut = () => {
    document.cookie =
      "x-auth-token=; expires = Thu, 01 Jan 1970 00:00:00 GMT";

    setUser({
      loggedIn: false,
    });
  };

  useEffect(() => {
    const token = getCookie("x-auth-token");

    if (!token) {
      logOut();
      setLoading(false);
      return;
    }
    fetch("http://localhost:8000/api/users/verify", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((promise) => {
        return promise.json();
      })
      .then((response) => {
        if (response.status) {
          logIn({
            id: response.user._id,
            email: response.user.email,
            isAdministrator: response.user.isAdministrator,
            isActive: response.user.isActive,
          });
        } else {
          logOut();
        }

        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        logIn,
        logOut,
      }}
    >
      <NotificationContext.Provider
        value={{ status, message, messageType, showMessage, clearMessage }}
      >
        {props.children}
      </NotificationContext.Provider>
    </UserContext.Provider>
  );
};

export default App;

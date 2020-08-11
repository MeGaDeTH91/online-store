import React, { useContext, useState, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import NotificationContext from "../../NotificationContext";
import { useHistory } from "react-router-dom";
import executeAuthGetRequest from "../../utils/executeAuthGETRequest";
import UserContext from "../../UserContext";
import ShoppingCartTable from "../../components/tables/shopping-cart";

const ShoppingCartPage = () => {
  const userContext = useContext(UserContext);
  const notifications = useContext(NotificationContext);
  const history = useHistory();

  const [user, setUser] = useState('');

  const getUser = async () => {
    await executeAuthGetRequest(
      `http://localhost:8000/api/users/user?id=${userContext.user.id}`,
      (userResponse) => {
        setUser(userResponse);
      },
      (error) => {
        notifications.showMessage(error, "danger");
        history.push("/users");
      }
    );
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return <PageLayout>Loading...</PageLayout>;
  }

  return (
    <PageLayout>
      <div className="container">
        <br />
        <h1>Your shopping cart</h1>
        <hr />
        <br />
        {user.cart && user.cart.length ? (
          <ShoppingCartTable products={user.cart} />
        ) : (
          <p>No products in your cart.</p>
        )}
      </div>
    </PageLayout>
  );
};

export default ShoppingCartPage;

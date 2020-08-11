import React, { useEffect, useState, useContext } from "react";
import PageLayout from "../../components/page-layout";
import { useHistory } from "react-router-dom";
import executeAuthGetRequest from "../../utils/executeAuthGETRequest";
import NotificationContext from "../../NotificationContext";
import UserContext from "../../UserContext";
import ListUserOrders from "../../components/user-orders/user-list";

const OrdersPage = () => {
  const notifications = useContext(NotificationContext);
  const userContext = useContext(UserContext);
  const history = useHistory();

  const [orders, setOrders] = useState([]);

  const getUserInfo = async () => {
    await executeAuthGetRequest(
      `http://localhost:8000/api/orders/user-orders?userId=${userContext.user.id}`,
      (ordersResponse) => {
        if (ordersResponse && ordersResponse.length) {
          setOrders(
            ordersResponse.sort((a, b) =>
              ("" + b.created_at).localeCompare("" + a.created_at)
            )
          );
        }
      },
      (error) => {
        notifications.showMessage(error, "danger");
        history.push("/");
      }
    );
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!orders) {
    return <PageLayout>Loading...</PageLayout>;
  }

  return (
    <PageLayout>
      <div className="container">
        <hr />
        <div>
          <h4 className="text-center">Orders history</h4>

          {orders && orders.length ? (
            <ListUserOrders orders={orders} />
          ) : (
            <p> There are no orders from you yet.</p>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default OrdersPage;

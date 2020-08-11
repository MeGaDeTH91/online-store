import React, { useContext } from "react";
import styles from "./index.module.css";
import styled from "styled-components";
import DeleteButton from "../../buttons/delete";
import executeAuthRequest from "../../../utils/executeAuthRequest";
import NotificationContext from "../../../NotificationContext";
import { useHistory } from "react-router-dom";
import formatPrice from "../../../utils/priceFormatter";
import UserContext from "../../../UserContext";

const ShoppingCartTableRow = ({ product, index }) => {
  const userContext = useContext(UserContext);
  const notifications = useContext(NotificationContext);
  const history = useHistory();

  const removeProduct = async () => {
    await executeAuthRequest(
      `http://localhost:8000/api/orders/remove-from-cart?productId=${product._id}`,
      "POST",
      {
        userId: userContext.user.id
      },
      (usersResponse) => {
        notifications.showMessage("Product removed from cart successfully!", "success");
      },
      (error) => {
        notifications.showMessage(error, "danger");
      }
    );

    history.push("/shopping-cart");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <tr className={styles.row}>
      <TD>{`${index + 1}.`}</TD>
      <TD>{product.title} <img src={product.imageURL} width="35px" height="35px" alt="Product"></img></TD>
      <TD>
        <DeleteButton title={'Remove product'} onClick={removeProduct} />
      </TD>
      <TD>{formatPrice(product.price)}</TD>
    </tr>
  );
};

const TD = styled.td`
  color: black;
  border: 3px black;
`;

export default ShoppingCartTableRow;

import React, { useContext } from "react";
import styles from "./index.module.css";
import styled from "styled-components";
import EditButton from "../../buttons/edit";
import DeleteButton from "../../buttons/delete";
import executeAuthRequest from "../../../utils/executeAuthRequest";
import NotificationContext from "../../../NotificationContext";
import { useHistory } from "react-router-dom";

const TableRow = ({ user, index }) => {
  const notifications = useContext(NotificationContext);
  const history = useHistory();

  const userIsAdmin = () => {
    return user.isAdministrator ? (
      <Checkbox disabled checked type="checkbox" />
    ) : (
      <Checkbox disabled type="checkbox" />
    );
  };

  const userIsActive = () => {
    return user.isActive ? (
      <Checkbox disabled checked type="checkbox" />
    ) : (
      <Checkbox disabled type="checkbox" />
    );
  };

  const roleButton = () => {
    return user.isAdministrator ? "Revoke" : "Make admin";
  };

  const statusButton = () => {
    return user.isActive ? "Ban" : "Unban";
  };

  const toggleRole = async () => {
    await executeAuthRequest(
      `http://localhost:8000/api/users/changeRole?id=${user._id}`,
      "PUT",
      {},
      (usersResponse) => {
        notifications.showMessage("User role changed successfully!", "success");
      },
      (error) => {
        notifications.showMessage(error, "danger");
      }
    );

    history.push("/users");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const toggleStatus = async () => {
    await executeAuthRequest(
      `http://localhost:8000/api/users/changeStatus?id=${user._id}`,
      "PUT",
      {},
      (usersResponse) => {
        notifications.showMessage(
          "User status changed successfully!",
          "success"
        );
      },
      (error) => {
        notifications.showMessage(error, "danger");
      }
    );

    history.push("/users");

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <tr className={styles.row}>
      <TD>{`${index + 1}.`}</TD>
      <TD>{user.email}</TD>
      <TD>{user.fullName}</TD>
      {user.phone ? <TD>{user.phone}</TD> : <TD>Not provided</TD>}
      <TD>{userIsActive()}</TD>
      <TD>{userIsAdmin()}</TD>
      <TD>
        <DeleteButton title={statusButton()} onClick={toggleStatus} />
        <EditButton title={roleButton()} onClick={toggleRole} />
      </TD>
    </tr>
  );
};

const Checkbox = styled.input`
  background-color: #fafafa;
  border: 1px solid #cacece;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
  padding: 9px;
  border-radius: 3px;
  display: inline-block;
  position: relative;
`;
const TD = styled.td`
  color: black;
  border: 3px black;
`;

export default TableRow;

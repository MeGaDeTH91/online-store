import React, { useContext } from "react";
import UserContext from "../../../UserContext";
import EditButton from "../edit";
import DeleteButton from "../delete";

const AdminButtonGroup = ({ title,  editFunc, deleteFunc }) => {
  const context = useContext(UserContext);

  const { user } = context;
    const userIsAdministrator = user && user.isAdministrator;

  return (
    <span>
      {userIsAdministrator ? <EditButton title={`Edit ${title}`} onClick={editFunc}></EditButton> : null}
      {userIsAdministrator ? <DeleteButton title={`Delete ${title}`} onClick={deleteFunc}></DeleteButton> : null}
    </span>
  );
};

export default AdminButtonGroup;

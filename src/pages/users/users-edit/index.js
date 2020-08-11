import React, { useContext, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import PageLayout from "../../../components/page-layout";
import Title from "../../../components/title";
import Input from "../../../components/input/active";
import { useHistory } from "react-router-dom";
import NotificationContext from "../../../NotificationContext";
import DisabledInput from "../../../components/input/disabled";
import SubmitButton from "../../../components/buttons/submit";
import executeAuthGetRequest from "../../../utils/executeAuthGETRequest";
import executeAuthRequest from "../../../utils/executeAuthRequest";
import UserContext from "../../../UserContext";

const EditUserPage = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const notifications = useContext(NotificationContext);
  const userContext = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!fullName) {
      notifications.showMessage(
        "Please provide full name.",
        "danger"
      );
      return;
    }

    await executeAuthRequest(
      `http://localhost:8000/api/users/user?id=${userContext.user.id}`,
      "PUT",
      {
        fullName,
        phone
      },
      (user) => {
        notifications.showMessage("User information updated successfully!", "success");
      },
      (error) => {
        notifications.showMessage(
          error,
          "danger"
        );
        
      }
    );
    history.push(`/profile-details`);
  };

  const getUser = useCallback(async () => {
    await executeAuthGetRequest(
      `http://localhost:8000/api/users/user?id=${userContext.user.id}`,
      (user) => {
        setEmail(user.email);
        setFullName(user.fullName);
        setPhone(user.phone);
      },
      (error) => {
        notifications.showMessage(error, "danger");
        history.push("/");
      }
    );
  }, [history, notifications, userContext.user]);

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = (e) => {
    e.preventDefault();

    history.goBack();
  };

  return (
    <PageLayout>
      <RegisterForm onSubmit={handleSubmit}>
        <Title title="Update user info" />
        <hr />
        <DisabledInput id="email" value={email || ''} label="Email"></DisabledInput>
        <Input
          id="fullName"
          value={fullName  || ''}
          label="Full Name"
          onChange={(e) => setFullName(e.target.value)}
        ></Input>
        <Input
          id="phone"
          value={phone  || ''}
          label="Phone"
          onChange={(e) => setPhone(e.target.value)}
        ></Input>
        <SubmitButton title="Update info" goBack={goBack} />
      </RegisterForm>
    </PageLayout>
  );
};

const RegisterForm = styled.form`
  width: 83%;
  display: inline-block;
  vertical-align: top;
`;

export default EditUserPage;

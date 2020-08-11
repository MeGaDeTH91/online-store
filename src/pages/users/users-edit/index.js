import React, { useContext, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import PageLayout from "../../../components/page-layout";
import Title from "../../../components/title";
import Input from "../../../components/input/active";
import { useHistory, useParams } from "react-router-dom";
import NotificationContext from "../../../NotificationContext";
import DisabledInput from "../../../components/input/disabled";
import SubmitButton from "../../../components/buttons/submit";
import executeAuthGetRequest from "../../../utils/executeAuthGETRequest";
import executeAuthRequest from "../../../utils/executeAuthRequest";

const EditUserPage = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const notifications = useContext(NotificationContext);
  const history = useHistory();
  const params = useParams();

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
      `http://localhost:8000/api/users/user?id=${params.id}`,
      "PUT",
      {
        fullName,
        phone
      },
      (product) => {
        notifications.showMessage("User information updated successfully!", "success");
        history.push("/");
      },
      (error) => {
        notifications.showMessage(
          error,
          "danger"
        );
        
      }
    );
    history.push(`/profile/${params.id}`);
  };

  const getUser = useCallback(async () => {
    await executeAuthGetRequest(
      `http://localhost:8000/api/users/user?id=${params.id}`,
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
  }, [history, notifications, params]);

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

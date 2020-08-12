import React, { useContext, useState } from "react";
import styled from "styled-components";
import PageLayout from "../../components/page-layout";
import Title from "../../components/title";
import Input from "../../components/input/active";
import authenticate from "../../utils/authenticate";
import UserContext from "../../UserContext";
import { useHistory } from "react-router-dom";
import NotificationContext from "../../NotificationContext";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const context = useContext(UserContext);
  const notifications = useContext(NotificationContext);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !fullName || !password || !rePassword) {
      notifications.showMessage('Email, full name, password and confirmation password should be more than 2 characters.', 'danger');
      return;
    }

    if (password !== rePassword) {
      notifications.showMessage('Passwords do not match.', 'danger');
      return;
    }

    await authenticate(
      "http://localhost:8000/api/users/register",
      {
        email,
        fullName,
        phone,
        password,
        rePassword
      },
      (user) => {
        console.log("Registered successfully!");

        context.logIn(user);
        history.push("/");
      },
      (error) => {
        console.log("Error", error);
        notifications.showMessage('Email, full name, password and confirmation password should be more than 2 characters.', 'danger');
      }
    );
  };

  return (
    <PageLayout>
      <RegisterForm onSubmit={handleSubmit}>
        <Title title="Register page" />
        <hr />
        <Input
          id="email"
          value={email}
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Input
          id="fullName"
          value={fullName}
          label="Full Name"
          onChange={(e) => setFullName(e.target.value)}
        ></Input>
        <Input
          id="phone"
          value={phone}
          label="Phone"
          onChange={(e) => setPhone(e.target.value)}
        ></Input>
        <Input
          type="password"
          id="password"
          value={password}
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <Input
          type="password"
          id="re-password"
          value={rePassword}
          label="Re-Password"
          onChange={(e) => setRePassword(e.target.value)}
        ></Input>
        <FormControlDiv>
          <FormButton type="submit">{"Register"}</FormButton>
        </FormControlDiv>
      </RegisterForm>
    </PageLayout>
  );
};

const RegisterForm = styled.form`
  width: 83%;
  display: inline-block;
  vertical-align: top;
`;
const FormButton = styled.button`
  background-color: #343a40;
  color: #b817a1;
  padding: 2%;
  width: auto;
  border-radius: 6px;
  display: block;
  margin: 0 auto;
  border: none;
  margin-top: 0.5%;
  border: 2px solid white;
  margin-bottom: 2%;

  &:hover {
    background-color: #17a2b8;
    border: 2px solid #234465;
    color: #b82c17;
    font-style: italic;
  }
`;

const FormControlDiv = styled.div`
  width: 30%;
  margin: 0 auto;
  padding: 1%;
  text-align: center;
`;

export default RegisterPage;

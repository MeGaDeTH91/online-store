import React, { useState, useContext } from "react";
import styled from "styled-components";
import PageLayout from "../../components/page-layout";
import Title from "../../components/title";
import Input from "../../components/input/active";
import authenticate from "../../utils/authenticate";
import UserContext from "../../UserContext";
import { useHistory } from "react-router-dom";
import NotificationContext from "../../NotificationContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userContext = useContext(UserContext);
  const notifications = useContext(NotificationContext);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      notifications.showMessage("Please provide email and password.", 'danger');
      return;
    }

    await authenticate(
      "http://localhost:8000/api/users/login",
      {
        email,
        password,
      },
      (user) => {
        console.log("Logged in successfully!");

        userContext.logIn(user);
        notifications.showMessage("Logged in successfully!", 'success');
        history.push("/");
      },
      (error) => {
        notifications.showMessage("Invalid credentials!", 'danger');
        history.push("/login");
      }
    );
  };

  return (
    <PageLayout>
      <LoginForm onSubmit={handleSubmit}>
        <Title title="Login page" />
        <hr />
        <Input
          id="email"
          value={email}
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Input
          type="password"
          id="password"
          value={password}
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <FormControlDiv>
          <FormButton type="submit">{"Login"}</FormButton>
        </FormControlDiv>
      </LoginForm>
    </PageLayout>
  );
};

const LoginForm = styled.form`
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

export default LoginPage;

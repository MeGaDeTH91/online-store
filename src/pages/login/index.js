import React, { useState, useContext } from "react";
import styled from "styled-components";
import PageLayout from "../../components/page-layout";
import Title from "../../components/title";
import Input from "../../components/input";
import authenticate from "../../utils/authenticate";
import UserContext from "../../Context";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const context = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      return;
    }

    await authenticate("http://localhost:9999/api/user/login", {
        username,
        password,
      }, (user) => {
        console.log("Logged in successfully!");

        context.logIn(user);
        history.push("/");
      },
      (error) => {
        console.log("Error", error);
      }
    );
  };

  return (
    <PageLayout>
      <LoginForm onSubmit={handleSubmit}>
        <Title title="Login page" />
        <Input
          id="username"
          value={username}
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
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
}

const LoginForm = styled.form`
  width: 83%;
  display: inline-block;
  vertical-align: top;
`;
const FormButton = styled.button`
  background-color: #234465;
  color: white;
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
    background-color: white;
    border: 2px solid #234465;
    color: #234465;
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

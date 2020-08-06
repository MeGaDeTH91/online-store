import React from "react";
import styled from "styled-components";

const Title = ({ title }) => {
  return <TitleStyle>{title}</TitleStyle>;
};

const TitleStyle = styled.h1`
  text-align: center;
  color: #234465;
  text-decoration: underline;
  margin-bottom: 2%;
`;

export default Title;

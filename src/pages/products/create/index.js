import React, { useState } from "react";
import styled from "styled-components";
import PageLayout from "../../../components/page-layout";
import Title from "../../../components/title";
import SubmitButton from "../../../components/button";
import getCookie from '../../../utils/getCookie';

const CreateProductPage = () => {
  const [publication, setPublication] = useState('');

  const handleSubmit = async () => {
    console.log(publication);
    await fetch('http://localhost:9999/api/origami', {
      method: 'POST',
      body: JSON.stringify({
        description: publication
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getCookie('x-auth-token')
      }
    })

    setPublication('');
    window.location.reload();
  }

  return (
    <PageLayout>
      <InputContainer>
        <div>
          <Title title="Share your thoughts..." />
          <TextAreaContainer value={publication} onChange={e => setPublication(e.target.value)} />
          <SubmitButton title="Post" onClick={handleSubmit} />
        </div>
      </InputContainer>

      <div>
        <H2>Last 3 posts on your wall</H2>
        {/* <Origami length={3} /> */}
      </div>
    </PageLayout>
  );
};

const InputContainer = styled.div`
  text-align: center;
  display: inline-block;
  padding: 0.5%;
  width: 83%;
`;

const TextAreaContainer = styled.textarea`
  width: 40%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  resize: none;
  padding: 2%;
  height: 10vh;
  font-style: italic;
  border-radius: 6px;
  border: 1px solid #234465;
  color: #234465;
`;

const H2 = styled.h2`
  color: #234465;
  text-decoration: underline;
`;

export default CreateProductPage;

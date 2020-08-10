import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import PageLayout from "../../../components/page-layout";
import Title from "../../../components/title";
import Input from "../../../components/input/active";
import UploadButton from "../../../components/upload-button";
import NotificationContext from "../../../NotificationContext";
import executeAuthRequest from "../../../utils/executeAuthRequest";

const CreateCategoryPage = () => {
  const history = useHistory();
  const notifications = useContext(NotificationContext);

  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState(null);

  const openWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "devpor11z",
        uploadPreset: "react-course",
      },
      (error, result) => {
        if (result.event === "success") {
          setImageURL(result.info.url);
        }
      }
    );

    widget.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !imageURL) {
      notifications.showMessage('Please provide product title and upload Image.', 'danger');
      return;
    }

    await executeAuthRequest("http://localhost:8000/api/categories/create", 
      "POST",
      {
        title,
        imageURL,
      },(product) => {

        notifications.showMessage("Product created successfully!", 'success');
        history.push("/");
      },
      (error) => {
        notifications.showMessage("Please provide different product title.", 'danger');
        history.push("/products/create");
      }
    );

    history.push("/categories/all");
  };

  return (
    <PageLayout>
      <CreateProductForm onSubmit={handleSubmit}>
        <Title title="Add category" />
        <hr />
        {imageURL ? (
          <img
            src={imageURL}
            width="50%"
            height="50%"
            alt="Product representation"
          />
        ) : null}
        <Input
          id="title"
          value={title}
          label="Title"
          onChange={(e) => setTitle(e.target.value)}
        ></Input>
        <UploadButton
          title="Upload Image"
          id="imageURL"
          label="Image URL"
          click={openWidget}
        />
        <FormControlDiv>
          <FormButton type="submit">{"Add category"}</FormButton>
        </FormControlDiv>
      </CreateProductForm>
    </PageLayout>
  );
};

const CreateProductForm = styled.form`
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

export default CreateCategoryPage;

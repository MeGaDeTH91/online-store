import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import PageLayout from "../../../components/page-layout";
import Title from "../../../components/title";
import Input from "../../../components/input";
import TextArea from "../../../components/textarea";
import getCookie from "../../../utils/getCookie";
import UploadButton from "../../../components/upload-button";
import CategoryDropdown from "../../../components/category-dropdown";

const CreateProductPage = () => {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [price, setPrice] = useState(0.0);
  const [quantity, setQuantity] = useState(0);
  const [categoryTitle, setCategoryTitle] = useState("Choose category");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

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

  const getCategories = useCallback(async () => {
    const response = await fetch(`http://localhost:8000/api/categories/all`);

    if (!response.ok) {
      history.push("/error");
    } else {
      const categories = await response.json();

      if (!categories) {
        history.push("/error");
      }

      setCategories(categories);
    }
  }, [history]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handleDropdownSelect = (categoryId, e) => {
    setCategory(categoryId);
    setCategoryTitle(e.target.textContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !imageURL) {
      return;
    }

    await fetch("http://localhost:8000/api/products/create", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        imageURL,
        price,
        quantity,
        category,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("x-auth-token"),
      },
    });

    history.push("/");
  };

  return (
    <PageLayout>
      <CreateProductForm onSubmit={handleSubmit}>
        <Title title="Add product" />
        <hr />
        {imageURL ? (
          <img
            src={imageURL}
            width="400"
            height="400"
            alt="Product representation"
          />
        ) : null}
        <Input
          id="title"
          value={title}
          label="Title"
          onChange={(e) => setTitle(e.target.value)}
        ></Input>
        <TextArea
          id="description"
          value={description}
          label="Description"
          onChange={(e) => setDescription(e.target.value)}
        ></TextArea>
        <UploadButton
          title="Upload Image"
          id="imageURL"
          label="Image URL"
          click={openWidget}
        />
        <Input
          type="number"
          id="price"
          value={price}
          label="Price"
          onChange={(e) => setPrice(e.target.value)}
        ></Input>
        <Input
          type="number"
          id="quantity"
          value={quantity}
          label="Quantity"
          onChange={(e) => setQuantity(e.target.value)}
        ></Input>
        <CategoryDropdown
          title={categoryTitle}
          categoriesList={categories}
          handleSelect={handleDropdownSelect}
        />
        <FormControlDiv>
          <FormButton type="submit">{"Add product"}</FormButton>
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

export default CreateProductPage;

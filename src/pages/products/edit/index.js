import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import PageLayout from "../../../components/page-layout";
import Title from "../../../components/title";
import Input from "../../../components/input/active";
import DisabledInput from "../../../components/input/disabled";
import TextArea from "../../../components/textarea";
import UploadButton from "../../../components/upload-button";
import NotificationContext from "../../../NotificationContext";
import executeAuthRequest from "../../../utils/executeAuthRequest";

const EditProductPage = () => {
  const history = useHistory();
  const params = useParams();
  const notifications = useContext(NotificationContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [price, setPrice] = useState(0.0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");

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

  const getProduct = useCallback(async () => {
    const response = await fetch(
      `http://localhost:8000/api/products/product?id=${params.id}`
    );

    if (!response.ok) {
      notifications.showMessage("Invalid productId.", "danger");
      history.push("/");
    } else {
      const product = await response.json();

      if (!product) {
        notifications.showMessage("No such product.", "danger");
        history.push("/");
      }

      setTitle(product.title);
      setDescription(product.description);
      setImageURL(product.imageURL);
      setPrice(product.price);
      setQuantity(product.quantity);
      setTitle(product.title);
      setCategory(product.category._id);
      setCategoryTitle(product.category.title);
    }
  }, [history, notifications, params]);

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !imageURL) {
      notifications.showMessage(
        "Please provide product title, description and upload Image.",
        "danger"
      );
      return;
    }

    await executeAuthRequest(
      `http://localhost:8000/api/products/product?id=${params.id}`,
      "PUT",
      {
        title,
        description,
        imageURL,
        price,
        quantity,
        category,
      },
      (product) => {
        notifications.showMessage("Product changed successfully!", "success");
        history.push("/");
      },
      (error) => {
        notifications.showMessage(
          error,
          "danger"
        );
        history.push(`/products/product-edit/${params.id}`);
      }
    );
  };

  return (
    <PageLayout>
      <CreateProductForm onSubmit={handleSubmit}>
        <Title title="Edit product" />
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
        <DisabledInput
          id="category"
          value={categoryTitle}
          label="Category"
        ></DisabledInput>
        <FormControlDiv>
          <FormButton type="submit">{"Change product"}</FormButton>
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

export default EditProductPage;

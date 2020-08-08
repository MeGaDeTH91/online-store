import React from "react";
import TextLink from "../text-link";
import SubmitButton from "../button";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const CardProduct = ({ productId, imageURL, title, price, category }) => {
  const history = useHistory();

  const onDetails = () => {
    history.push(`/products/product?id=${productId}`);
  };

  return (
    <Card>
      <CardImage src={imageURL} alt="Card image cap"></CardImage>
      <CardBody>
        <h4>{ title.length > 21 ? (title) : (<div> {title}<br /><br /></div>)}</h4>
        <hr />
        <CardParagraph>
          <TextLink
            title={category.title}
            href={`/categories/category?id=${category._id}`}
          ></TextLink>
        </CardParagraph>
        <h3>{price}lv.</h3>
      </CardBody>
      <CardFooter>
        <SubmitButton title="Details" onClick={onDetails}></SubmitButton>
      </CardFooter>
    </Card>
  );
};

const Card = styled.div`
  box-sizing: border-box;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  position: relative;
  min-width: 18rem;
  max-width: 18rem;
  margin-bottom: 1.5rem !important;
  display: flex;
  flex: 1 0 0%;
  flex-direction: column;
  margin-right: 15px;
  margin-bottom: 0;
  margin-left: 50px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 210px;
  object-fit: cover;
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);
  border-style: none;
  box-sizing: border-box;
`;

const CardBody = styled.div`
  webkit-box-flex: 1;
  ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1.25rem;
  word-wrap: break-word;
  box-sizing: border-box;
`;

const CardParagraph = styled.p`
  text-align: center;
  color: black;
  margin-bottom: 0;
  margin-top: 0;
  box-sizing: border-box;
`;

const CardFooter = styled.div`
  border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px);
  background-color: #dddddd;
  color: white;
  border-top: 1px solid #dddddd;
  margin: 0;
  padding: 0;
  font-size: medium;
  font-family: "Miltonian Tattoo", cursive;
`;

export default CardProduct;

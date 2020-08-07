import React, { Component } from "react";
import PageLayout from "../../components/page-layout";
import Title from "../../components/title";
import styled from "styled-components";

class HomePage extends Component {
  render() {
    return (
      <PageLayout>
        <div>
          <Title title="Products"></Title>
          <hr />
          <Container>
            <Row>
              <CardDeck>
                <Card>
                  <CardImage
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/250px-Angular_full_color_logo.svg.png"
                    alt="Card image cap"
                  ></CardImage>
                  <CardBody>
                    <h4>Angular</h4>
                    <CardParagraph>Lorem Ipsum</CardParagraph>
                  </CardBody>
                  <CardFooter>
                    <CardButton>Details</CardButton>
                    <CardButton>Details</CardButton>
                    <CardButton>Details</CardButton>
                  </CardFooter>
                </Card>

                <Card>
                  <CardImage
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/250px-Angular_full_color_logo.svg.png"
                    alt="Card image cap"
                  ></CardImage>
                  <CardBody>
                    <h4>Angular</h4>
                    <CardParagraph>Lorem Ipsum</CardParagraph>
                  </CardBody>
                  <CardFooter>
                    <CardButton>Details</CardButton>
                    <CardButton>Details</CardButton>
                    <CardButton>Details</CardButton>
                  </CardFooter>
                </Card>

                <Card>
                  <CardImage
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/250px-Angular_full_color_logo.svg.png"
                    alt="Card image cap"
                  ></CardImage>
                  <CardBody>
                    <h4>Angular</h4>
                    <CardParagraph>Lorem Ipsum</CardParagraph>
                  </CardBody>
                  <CardFooter>
                    <CardButton>Details</CardButton>
                    <CardButton>Details</CardButton>
                    <CardButton>Details</CardButton>
                  </CardFooter>
                </Card>

                <Card>
                  <CardImage
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/250px-Angular_full_color_logo.svg.png"
                    alt="Card image cap"
                  ></CardImage>
                  <CardBody>
                    <h4>Angular</h4>
                    <CardParagraph>Lorem Ipsum</CardParagraph>
                  </CardBody>
                  <CardFooter>
                    <CardButton>Details</CardButton>
                    <CardButton>Details</CardButton>
                    <CardButton>Details</CardButton>
                  </CardFooter>
                </Card>

                <Card>
                  <CardImage
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/250px-Angular_full_color_logo.svg.png"
                    alt="Card image cap"
                  ></CardImage>
                  <CardBody>
                    <h4>Angular</h4>
                    <CardParagraph>Lorem Ipsum</CardParagraph>
                  </CardBody>
                  <CardFooter>
                    <CardButton>Details</CardButton>
                    <CardButton>Details</CardButton>
                    <CardButton>Details</CardButton>
                  </CardFooter>
                </Card>
              </CardDeck>
            </Row>
          </Container>
        </div>
      </PageLayout>
    );
  }
}

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
  height: 15vw;
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

const CardButton = styled.button`
  background-color: #343a40;
  color: #b817a1;
  padding: 2%;
  width: auto;
  border-radius: 6px;
  display: block;
  margin: 0 auto;
  border: none;
  margin-top: 5.5%;
  border: 2px solid white;
  margin-bottom: 2%;
  display: inline-block;

  &:hover {
    background-color: #17a2b8;
    border: 2px solid #234465;
    color: #b82c17;
    font-style: italic;
  }
`;

const Container = styled.div`
margin: auto;
width: 100%;
padding: 10px;
`;

const Row = styled.div`
  webkit-box-pack: center !important;
  justify-content: center !important;
  flex-wrap: wrap;
  margin-right: 15px;
  margin-left: 115px;
  display: flex !important;
  box-sizing: border-box;
`;

const CardDeck = styled.div`
  flex-flow: row wrap;
  margin-right: -15px;
  margin-left: -15px;
  display: flex;
  box-sizing: border-box;
`;

export default HomePage;

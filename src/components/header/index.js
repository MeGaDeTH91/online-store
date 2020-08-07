import React, { useContext } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import getNavigationRoutes from "../../utils/routes";
import UserContext from "../../Context";
import styled from "styled-components";

const Header = () => {
  const context = useContext(UserContext);

  const { user } = context;

  const links = getNavigationRoutes(user);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/" variant="outline-info">
          <LeftSpan>React-</LeftSpan><RightSpan>store</RightSpan>
        </Navbar.Brand>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search Product..."
            className="mr-sm-2"
          />
          <Button variant="outline-info">Search</Button>
        </Form>

        <Nav className="ml-auto">
          {links.map((x) => {
            return (
              <Nav.Link key={x.title} href={x.link}>
                {x.title}
              </Nav.Link>
            );
          })}
        </Nav>
      </Navbar>
    </>
  );
};

const LeftSpan = styled.span`
  color: #17a2b8;
  font-size: larger;
`;

const RightSpan = styled.span`
  color: #b817a1;
  font-size: larger;
`;

export default Header;

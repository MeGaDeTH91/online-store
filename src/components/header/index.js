import React, { useContext } from "react";
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import Link from "../link";
import logo from "../../images/white-origami-bird.png";
import getNavigationRoutes from "../../utils/routes";
import UserContext from "../../Context";

const Header = () => {
  const context = useContext(UserContext);

  const { user } = context;

  const links = getNavigationRoutes(user);

  return (
    <>
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/" variant="outline-info">React-store</Navbar.Brand>
    <Form inline>
      <FormControl type="text" placeholder="Search Product..." className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
      
    <Nav className="ml-auto">
      {links.map((x) => {
        return <Nav.Link key={x.title} href={x.link}>{x.title}</Nav.Link>
      })}
    </Nav>
  </Navbar>
  </>
  )
};

export default Header;

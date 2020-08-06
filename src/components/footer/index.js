import React, { useContext } from "react";
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import Link from "../link";
import styles from "./index.module.css";
import logo from "../../images/blue-origami-bird-flipped.png";
import getNavigationRoutes from "../../utils/routes";
import UserContext from "../../Context";

const Footer = () => {
  const context = useContext(UserContext);
  const { user } = context;

  const links = getNavigationRoutes(user);

  return (
    <footer id="copyright" className={styles.container}>
      <p className={styles.copyright}>React-Store © 2020</p>
    </footer>
  );
}

export default Footer;

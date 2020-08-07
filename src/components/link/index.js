import React from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";

const LinkComponent = ({ title, href, type }) => {
  return (
    <Link to={href} className={styles[`btn-link`]}>
      {title}
    </Link>
  );
};

export default LinkComponent;

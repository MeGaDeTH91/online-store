import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import styles from "./index.module.css";

const PageLayout = (props) => {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles["inner-container"]}>{props.children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;

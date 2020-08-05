import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Aside from "../../components/aside";
import styles from "./index.module.css";

const PageLayout = (props) => {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.container}>
        <Aside />
        <div className={styles["inner-container"]}>
          {props.children}
          </div>
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;

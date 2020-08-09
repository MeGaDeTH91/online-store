import React, { useEffect } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import styles from "./index.module.css";
import Notification from "../notification";

const PageLayout = (props) => {
  const showNotification = () => {
    return <Notification />;
  };

  useEffect(() => {
    showNotification();
  }, []);
  return (
    <div>
      <Header />
      <div className={styles.container}>
        {showNotification()}
        <div className={styles["inner-container"]}>{props.children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;

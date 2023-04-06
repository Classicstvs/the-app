import { useState } from "react";

import Image from "next/image";

import Footer from "../footer/Footer";
import Header from "../header/Header";

import { GrClose } from "react-icons/gr";

import styles from "./Layout.module.css";

export default function Layout({ children }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setShowModal("");
  };

  return (
    <>
      <Header showModal={showModal} openModal={openModal} />
      {showModal && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modalWrapper}>
            <GrClose className={styles.closeBnt} onClick={closeModal} />
            <p>Coming Soon</p>
            <p>
              Our team is dedicated to providing the best viewing experience for
              our audience. We are constantly working to release new channels
              from all years, ensuring that our viewers have access to a diverse
              range of content. Additionally, we believe in rewarding our loyal
              viewers with fresh and engaging programming. So, stay tuned for
              more exciting updates as we continue to expand our offerings and
              provide the best content possible!
            </p>
            <button onClick={closeModal}>Go Back to 90s</button>
          </div>
        </div>
      )}
      {children}
      <Footer />
    </>
  );
}

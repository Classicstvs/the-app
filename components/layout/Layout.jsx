import { useState } from "react";

import Footer from "../footer/Footer";
import Header from "../header/Header";
import Subscribe from "../subscribe/Subscribe";

import { GrClose } from "react-icons/gr";

import styles from "./Layout.module.css";

export default function Layout({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [sub, setSub] = useState(false);

  const openModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setShowModal("");
  };

  const openSub =()=>{
    setSub(!sub)
  }

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
              range of content. Stay tuned for more exciting updates as we
              continue to expand our offerings and provide the best content
              possible!
            </p>
            <button onClick={closeModal}>Go Back to 90s</button>
          </div>
        </div>
      )}
      {children}
      {sub && <Subscribe/>}
      <Footer openSub={openSub}/>
    </>
  );
}

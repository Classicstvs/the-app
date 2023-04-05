import { useState } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";

import styles from './Layout.module.css'

export default function Layout({ children }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = () =>{
    setShowModal('')
  }


  return (
    <>
      <Header showModal={showModal} openModal={openModal} />
      {showModal && (
        <div className={styles.modalWrapper}>
          <p>Test Modal</p>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
      {children}
      <Footer />
 
    </>
  );
}

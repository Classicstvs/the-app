import { useState } from "react";

import styles from "./Subscribe.module.css";

import { collection, addDoc } from "@firebase/firestore";

import { db } from "../../lib/firebase";

import { MdArrowBackIosNew } from "react-icons/md";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(emailPattern)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!email) {
      setError("Please enter an email address.");
      return;
    }

    try {
      await addDoc(collection(db, "subscribers"), {
        email: email,
        date: new Date(),
      });
      setEmail("E-mail sent successfully!");
    } catch (error) {
      console.log("Error sending e-mail");
    }
  };

  //   const placeholder = !error ? "Type your e-mail..." : "Please enter a valid email."

  let placeholder;

  if (!error) {
    placeholder = "Type your e-mail...";
  } else if (error) {
    placeholder = "Please enter email address.";
  } else {
    placeholder = "E-mail sent successfully!";
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder={placeholder}
        />
        <button type="submit">
          <MdArrowBackIosNew />
        </button>
      </form>
    </div>
  );
}

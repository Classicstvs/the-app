import { useState } from "react";

import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";

export default function Header({ openModal}) {
  const router = useRouter();

  const handleModalClick = () => {
    openModal();
  };
  return (
    <header className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/logo.svg"
              width={222}
              height={62}
              alt="Classics TV LOGO"
            />
          </Link>
        </div>
        <nav className={styles.nav}>
          <Link
            className={router.pathname === "#" ? styles["activePath"] : ""}
            href="#"
            onClick={handleModalClick}
          >
            2000s TV
          
          </Link>

          <Link
            className={
              router.pathname === "/" || "/90s/" ? styles["activePath"] : ""
            }
            href="/"
          >
            90s
          </Link>

          <Link
            className={router.pathname === "#" ? styles["activePath"] : ""}
            href="#"
            onClick={handleModalClick}
          >
            80s
          </Link>

          <Link
            className={router.pathname === "#" ? styles["activePath"] : ""}
            href="#"
            onClick={handleModalClick}
          >
            70s
          </Link>

          <Link
            className={router.pathname === "#" ? styles["activePath"] : ""}
            href="#"
            onClick={handleModalClick}
          >
            60s
          </Link>

          <Link
            className={router.pathname === "#" ? styles["activePath"] : ""}
            href="#"
            onClick={handleModalClick}
          >
            50s
          </Link>
          <div className={styles.triangleUp}></div>
        </nav>
      </div>
    </header>
  );
}

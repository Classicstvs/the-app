import Link from "next/link";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerContainer}>
        <div>
          <p>Copyright © Classics TV 2023</p>
        </div>
        <div className={styles.footerMenu}>
          <ul>
            <li>
              <Link href='#'>Subscribe</Link>
            </li>
            <li>
              <Link href='/terms'>Terms and Conditions</Link>
            </li>
            <li>
              <Link href='/privacy'>Privacy Policy</Link>
            </li>
            <li>
              <Link href='/faq'>FAQ</Link>
            </li>
            <li>
              <Link href='/about'>About Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

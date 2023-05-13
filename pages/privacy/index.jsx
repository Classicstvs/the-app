import styles from "./Privacy.module.css";

import { NextSeo } from "next-seo";

import Donate from "@/components/donate/Donate";

const SEO = {
  title: "Classics TV | Privacy Policy",
  description: "",

  openGraph: {
    title: "Classics TV | Privacy Policy",
    description: "",
  },
};

export default function Privacy() {
  return (
    <main className={styles.container}>
      <Donate />
      <NextSeo {...SEO} />
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h1>Privacy Policy</h1>
          <p>
            The use of this website is subject to the following terms of use:
          </p>
          <h2>Cookies</h2>
          <p>We do not use &#39;cookies&#39; on classics.tv.</p>
          <p>
            Some of our business partners may use cookies on our site (for
            example, advertisers). However, we have no access to or control over
            these cookies.
          </p>
          <p>
            Collecting Data Google Analytics is a web analysis service provided
            by Google. Google utilizes the data collected to track and examine
            the use of classics.tv.
          </p>
        </div>
      </div>
    </main>
  );
}

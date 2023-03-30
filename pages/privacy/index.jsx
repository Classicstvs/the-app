import styles from "./Privacy.module.css";

export default function Privacy() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h1>Privacy Policy</h1>
          <p>
            The use of this website is subject to the following terms of use:
          </p>
          <h2>Cookies</h2>
          <p>We do not use "cookies" on classics.tv.</p>
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
    </div>
  );
}

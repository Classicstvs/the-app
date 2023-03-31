import styles from "./Terms.module.css";

export default function Terms() {
  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h1>Terms of Service</h1>
          <p>
            The use of this website is subject to the following terms of use:
          </p>
          <p>
            The content of the pages of this website is for your general
            information and use only. It is subject to change without notice.
            This website doen not use cookies to monitor browsing preferences.
          </p>
          <p>
            Neither we nor any third parties provide any warranty or guarantee
            as to the accuracy, timeliness, performance, completeness or
            suitability of the information and materials found or offered on
            this website for any particular purpose. You acknowledge that such
            information and materials may contain inaccuracies or errors and we
            expressly exclude liability for any such inaccuracies or errors to
            the fullest extent permitted by law.
          </p>
          <p>
            Your use of any information or materials on this website is entirely
            at your own risk, for which we shall not be liable. It shall be your
            own responsibility to ensure that any products, services or
            information available through this website meet your specific
            requirements.
          </p>
          <p>
            All trade marks reproduced in this website which are not the
            property of, or licensed to, the operator are acknowledged on the
            website.
          </p>
        </div>
      </div>
    </main>
  );
}

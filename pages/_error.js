import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "../styles/Error.module.css";
import { useEffect } from "react";

function Error({ statusCode }) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
        router.push('/')
    },50000000);

    return ()=> clearTimeout(timer)
  },[router]);

  return (
    <main>
      <div className={styles.wrapper}>
        <div className={styles.error}>
          <Image
            src="/icons/tv_blue.webp"
            alt="Error"
            width={667}
            height={667}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
        <p className={styles.errorNum}>{statusCode}</p>
        <div className={styles.errorMsg}>
          {statusCode ? (
            <p>
              Page not found! An error{" "}
              <span className={styles.span}>{statusCode}</span> occurred on
              server!
            </p>
          ) : (
            <p>An error occurred on client!</p>
          )}
        </div>
        <Link href="/" className={styles.btn}>
          <button className={styles.channelBtn}>
            <p>Go back</p>
          </button>
        </Link>
      </div>
    </main>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

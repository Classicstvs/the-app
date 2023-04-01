import Image from "next/image";

import styles from "./Tv.module.css";

export default function Tv({ changeSkinTwo }) {
  const skin1 = "/images/tv90.webp";

  return (
    <div className={styles.tvContainer}>
      <Image
        src={skin1}
        alt="Tv90"
        width={700}
        height={664}
        className={styles.tv}
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
      <div className={`${styles.blackScreen} ${styles.crtScanlines}`}></div>
      <Image
        src="/images/blob.svg"
        alt="Blob-Tv-Background"
        width={800}
        height={764}
        className={styles.blob}
        priority="low"
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
    </div>
  );
}

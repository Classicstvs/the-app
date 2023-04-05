import Image from "next/image";
import styles from "./CardsInfo.module.css";

export default function CardsInfo() {
  return (
    <section className={styles.cardsWrapper}>
      <div className={styles.card}>
        <Image
          src="/images/tv_left.webp"
          alt="Old TV Left Card"
          width={185}
          height={185}
        />
        <div className={styles.cardContent}>
          <h2>A wide variety of old TV channels</h2>
          <p>
            TV channels offer a diverse range of content catering to different
            interests and demographics. From news to sports, entertainment to
            education, there&#39;s something for everyone.
          </p>
        </div>
      </div>
      <div className={styles.card}>
        <Image
          src="/images/tv_right.webp"
          alt="Old TV Left Right"
          width={185}
          height={185}
        />
        <div className={styles.cardContent}>
          <h3>Fun and easy to use interface</h3>
          <p>
            Classics TV channels features a user-friendly interface that&#39;s both
            fun and easy to navigate. Enjoy your favorite classics with just a
            few clicks!
          </p>
        </div>
      </div>
    </section>
  );
}

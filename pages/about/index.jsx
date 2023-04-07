import Image from "next/image";

import styles from "./AbouUs.module.css";

export default function AboutUs() {
  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.contentAbout}>
          <h1>About Us</h1>
          <p>
            Once upon a time, there was a team of passionate developers who set
            out to create a website for watching old TV shows and classic TV
            channels. They spent countless hours researching and curating a
            collection of the best vintage content, carefully selecting shows
            and channels that would evoke nostalgia and transport viewers back
            in time.
          </p>
          <p>
            With a strong focus on user experience, the team designed a simple
            and intuitive interface that made it easy for users to find and
            watch their favorite shows. They used modern web technologies to
            ensure that the site was fast and responsive, while still
            maintaining the look and feel of classic TV.
          </p>
          <p>
            And the team? Well, they continued to innovate and improve, always
            staying true to their mission of bringing the magic of classic TV to
            a new generation of viewers.
          </p>
          <Image src="" alt="" />
        </div>
        <div className={styles.contentAbout}>
          <h2>Our Team:</h2>
        </div>
      </div>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";

import styles from "./AbouUs.module.css";

import { BsLinkedin } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

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
          <div className={styles.teamContainer}>
            <div className={styles.dev1}>
              <p>Viktor Andonov</p>
              <ul>
                <li>Front-End Developer</li>
                <li>Content Developer</li>
                <li>SEO and Digital Marketing</li>
                <li>
                  <Link href="" alt="Mail Me">
                    <MdEmail />
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.dev2}>
              <p>Yosif Georgiev</p>
              <ul>
                <li>Front-End Developer</li>
                <li>React Js Developer</li>
                <li>UI/UX Designer</li>
                <li>SEO</li>
                <li>
                  <Link
                    href="https://www.linkedin.com/in/yosif-georgiev-08829180/"
                    alt="Find Me in Linked In"
                    target="_blank"
                  >
                    <BsLinkedin />
                  </Link>
                  <Link href="mailto:iodesign@live.com" alt="Mail Me">
                    <MdEmail style={{fontSize:'22px'}}/>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

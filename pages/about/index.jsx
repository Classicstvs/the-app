import Image from "next/image";
import Link from "next/link";

import styles from "./AbouUs.module.css";

import { RiLinkedinBoxFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

import { NextSeo } from "next-seo";

import Donate from "@/components/donate/Donate";

const SEO = {
  title: "Classics TV | About Us",
  description: "",

  openGraph: {
    title: "Classics TV | About Us",
    description: "",
  },
};

export default function AboutUs() {
  const encMail = "dHZzLmNsYXNzaWNzQGdtYWlsLmNvbQ==";
  const teamMail = atob(encMail);

  const encYoMail = "aW9kZXNpZ25AbGl2ZS5jb20=";
  const yoMail = atob(encYoMail);

  const encVikMail = "dmlrdG9yMDk4MEBnbWFpbC5jb20=";
  const vikMail = atob(encVikMail);

  return (
    <main className={styles.container}>
      <Donate />
      <NextSeo {...SEO} />
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
          <p>
            Contact Us at:{" "}
            <span>
              <Link href={"mailto:" + teamMail} alt="Mail Us">
                tvs.classics@gmail.com
              </Link>
            </span>
          </p>
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
                  <Link href={"mailto:" + vikMail} alt="Mail Me">
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
                    <RiLinkedinBoxFill />
                  </Link>
                  <Link href={"mailto:" + yoMail} alt="Mail Me">
                    <MdEmail />
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

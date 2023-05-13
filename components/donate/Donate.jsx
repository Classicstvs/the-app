import styles from "./Donate.module.css";

import Image from "next/image";
import Link from "next/link";

import { BiCoffeeTogo } from "react-icons/bi";

export default function Donate() {
  return (
    <>
      <aside className={styles.container}>
        <Link href="https://bmc.link/classicstv" target="_blank">
          <div className={styles.coffee}>
            <Image
              src="/images/coffee.png"
              alt="Buy us a Coffee"
              width={150}
              height={180}
            />
          </div>
        </Link>
        <h5>Donate</h5>
      </aside>

      <aside className={styles.containerResponsive}>
        <div className={styles.coffeeTitle}>
          <Link href="https://bmc.link/classicstv" target="_blank">
            <h5>Donate</h5>
          </Link>
          <BiCoffeeTogo style={{ color: "#F6C964", fontSize: "13px" }} />
        </div>
      </aside>
    </>
  );
}

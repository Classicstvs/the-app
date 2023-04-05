import { useState } from "react";
import { useRouter } from "next/router";

import Image from "next/image";

import styles from "./Tv.module.css";

export default function Tv({ skin }) {
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState("/");

  const powerOn = () => {
    router.push("/90s/cartoons");
  };

  const powerOff = () => {
    setActiveRoute("/");
    router.push("/");
  };

  return (
    <div className={styles.tvContainer}>
      <Image
        useMap="#tv"
        src={!skin ? "/images/tv90.webp" : "/images/tv90black.webp"}
        alt="Tv90"
        width={700}
        height={664}
        className={styles.tv}
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
        key={activeRoute}
        draggable="false"
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
        draggable="false"
      />
      <map
        id="tv"
        name="tv"
        className={styles.mapArea}
        onClick={() => (router.pathname === "/" ? powerOn() : powerOff())}
      >
        <area
          shape="circle"
          coords="124,58,8"
          alt="TV Power ON/OFF Button"        
        />
      </map>
    </div>
  );
}

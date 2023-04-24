import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Image from "next/image";

import styles from "./Tv.module.css";

export default function Tv({ skin }) {
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState("/");
  const [tvImage, setTvImage] = useState();
  const [blobs, setBlobs] = useState();
  const [blackScreens, setBlackScreens] = useState();

useEffect(()=>{
  const tvImage80s = (
    <Image
      useMap="#tv"
      src={!skin ? "/images/tv80s.webp" : "/images/tv80s_red.webp"}
      alt="Tv90"
      width={866}
      height={568}
      className={styles.tv80s}
      style={{
        maxWidth: "100%",
        height: "auto",
      }}
      key={activeRoute}
      draggable="false"
      priority="high"
    />
  );

  const tvImage90s = (
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
      priority="high"
    />
  );

  if (router.pathname.startsWith("/") || router.pathname.startsWith("/90s")) {
    setTvImage(tvImage90s);
  }
  if (router.pathname.startsWith("/80s")) {
    setTvImage(tvImage80s);
  }
},[activeRoute, skin, router.pathname])

  useEffect(() => {
 
  }, []);

  useEffect(() => {
    if (router.pathname.startsWith("/") || router.pathname.startsWith("/90s")) {
      setBlobs("blob");
    }
    if (router.pathname.startsWith("/80s")) {
      setBlobs("blob80s");
    }
  }, [router]);

  useEffect(() => {
    if (router.pathname.startsWith("/") || router.pathname.startsWith("/90s")) {
      setBlackScreens("blackScreen");
    }
    if (router.pathname.startsWith("/80s")) {
      setBlackScreens("blackScreen80s");
    }
  }, [router]);

  const powerOn = () => {
    router.push("/90s/cartoons");
  };

  const powerOff = () => {
    setActiveRoute("/");
    router.push("/");
  };

  return (
    <div className={styles.tvContainer}>
      {tvImage}
      <div className={`${styles[blackScreens]} ${styles.crtScanlines}`}></div>
      <Image
        src="/images/blob.svg"
        alt="Blob-Tv-Background"
        width={800}
        height={764}
        className={styles[blobs]}
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
        <area shape="circle" coords="124,58,8" alt="TV Power ON/OFF Button" />
      </map>
    </div>
  );
}

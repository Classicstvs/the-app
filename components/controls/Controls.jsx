import Image from "next/image";

import cn from "classnames";

import styles from "./Controls.module.css";

import { FaPowerOff } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { ImVolumeDecrease } from "react-icons/im";
import { ImVolumeIncrease } from "react-icons/im";
import { BiFullscreen } from "react-icons/bi";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Controls({
  playPrev,
  playNext,
  videoIndex,
  increaseVolume,
  decreaseVolume,
  handleClickFullscreen,
  toggleSkin,
}) {
  const isVideoFirst = videoIndex === 0;

  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState("/");

  const powerOn = () => {
    setActiveRoute(router.push("/90s/cartoons"));
  };

  const powerOff = () => {
    setActiveRoute(router.push("/"));
  };

  useEffect(() => {
    setActiveRoute(router.pathname);
  }, [router.pathname]);

  return (
    <div className={styles.controls}>
      <div
        className={cn(styles.powerBtn, {
          [styles.isActive]: activeRoute && activeRoute !== "/",
        })}
        onClick={activeRoute === "/" ? powerOn : powerOff}
      >
        <FaPowerOff />
      </div>
      <div className={styles.channels}>
        <div
          className={styles.channelDown}
          onClick={!isVideoFirst ? playPrev : undefined}
        >
          <FaPlay />
        </div>
        <div className={styles.channelUp} onClick={playNext}>
          <FaPlay />
        </div>
        <label>
          <strong>CHANNEL</strong>
        </label>
      </div>
      <div className={styles.volume}>
        <div className={styles.volumeDown} onClick={decreaseVolume}>
          <ImVolumeDecrease />
        </div>
        <div className={styles.volumeUp} onClick={increaseVolume}>
          <ImVolumeIncrease />
        </div>
        <label>
          <strong>VOLUME</strong>
        </label>
      </div>
      <div className={styles.fullScreen} onClick={handleClickFullscreen}>
        <BiFullscreen />
      </div>
      <div className={styles.skins} onClick={toggleSkin}>
        {router.pathname === "/" ? (
          <Image
            src="/icons/tv_black.webp"
            alt="TV FAQ"
            width={47}
            height={47}
            style={{opacity:'0.3'}}
          />
        ) : (
          <Image
            src="/icons/tv_blue.webp"
            alt="TV FAQ"
            width={47}
            height={47}
          />
        )}
      </div>
    </div>
  );
}

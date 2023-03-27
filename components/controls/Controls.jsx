import Image from "next/image";

import styles from "./Controls.module.css";

import { FaPowerOff } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { ImVolumeDecrease } from "react-icons/im";
import { ImVolumeIncrease } from "react-icons/im";
import { BiFullscreen } from "react-icons/bi";

export default function Controls() {
  return (
    <div className={styles.controls}>
      <div className={styles.powerBtn}>
        <FaPowerOff />
      </div>
      <div className={styles.channels}>
        <div className={styles.channelDown}>
          <FaPlay />
        </div>
        <div className={styles.channelUp}>
          <FaPlay />
        </div>
        <label>CHANNEL</label>
      </div>
      <div className={styles.volume}>
        <div className={styles.volumeDown}>
          <ImVolumeDecrease />
        </div>
        <div className={styles.volumeUp}>
          <ImVolumeIncrease />
        </div>
        <label>VOLUME</label>
      </div>
      <div className={styles.fullScreen}>
        <BiFullscreen />
      </div>
      <div className={styles.skins}>
        <Image src="/icons/tv_blue.webp" alt="TV Skin" width={47} height={47} />
        <Image src="/icons/tv_grey.webp" alt="TV Skin" width={47} height={47} />
        <Image
          src="/icons/tv_black.webp"
          alt="TV Skin"
          width={47}
          height={47}
        />
      </div>
    </div>
  );
}

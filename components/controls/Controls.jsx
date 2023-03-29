import Image from "next/image";

import styles from "./Controls.module.css";

import { FaPowerOff } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { ImVolumeDecrease } from "react-icons/im";
import { ImVolumeIncrease } from "react-icons/im";
import { BiFullscreen } from "react-icons/bi";

export default function Controls({ playPrev, playNext, videoIndex, increaseVolume, decreaseVolume }) {
  const isVideoFirst = videoIndex === 0;

  return (
    <div className={styles.controls}>
      <div className={styles.powerBtn}>
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

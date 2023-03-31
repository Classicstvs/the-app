import styles from "./PlayInfo.module.css";

import data from "../../data/cartoons.json";

export default function PlayInfo({ title, jsonLength, titleTick, year }) {
  return (
    <div className={styles.playInfoContainer}>
      <p>{titleTick}</p>
      <h4>
        Now playing:<span> {title}</span>
      </h4>
      <p>Year: <span>{year}</span> </p>
      <h5>
        Available cartoon channels: <span>{jsonLength}</span>
      </h5>
      <p>
        Cartoon channels from the 90s were a treasure trove of classic animated
        shows. From Rugrats to Powerpuff Girls, they shaped a generation's
        childhoods with memorable characters and storylines that still hold up
        today.
      </p>
    </div>
  );
}

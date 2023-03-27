import styles from "./PlayInfo.module.css";

export default function PlayInfo() {
  return (
    <div className={styles.playInfoContainer}>
      <h4>Now playing:</h4>
      <h5>
        Available cartoon channels: <span>853</span>{" "}
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

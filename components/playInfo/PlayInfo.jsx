import styles from "./PlayInfo.module.css";

export default function PlayInfo({ title, jsonLength, year, channelInfo }) {
  return (
    <div className={styles.playInfoContainer}>
      {title ? (
        <h4>
          Now playing:<span> {title}</span>
        </h4>
      ) : (
        <h4>Loading TV Channel...</h4>
      )}
      {year ? (
        <p>
          Year: <span> {year}</span>
        </p>
      ) : (
        ""
      )}
      <h5>
        Available channels: <span>{jsonLength}</span>
      </h5>
      <p>{channelInfo}</p>
    </div>
  );
}

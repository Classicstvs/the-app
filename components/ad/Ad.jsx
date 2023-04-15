import styles from "./Ad.module.css";

import { Adsense } from "@ctrl/react-adsense";

export default function Ad() {


  return (
    <div className={styles.container}>
      <Adsense
        style={{ display: "block" }}
        client="ca-pub-4275984189085881"
        slot="3375378818"
        format="auto"
        responsive="true"
      />
    </div>
  );
}

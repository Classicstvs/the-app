import styles from "./Ad.module.css";

import { Adsense } from "@ctrl/react-adsense";

export default function Ad() {


  return (
    <div className={styles.container}>
      <Adsense
        style={{height:'164px' }}
        client="ca-pub-4803482388154607"
        slot="3375378818"
        // format="auto"
        responsive="true"
      />
    </div>
  );
}

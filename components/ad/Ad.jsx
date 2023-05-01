import { useEffect } from "react";

import styles from "./Ad.module.css";

// import { Adsense } from "@ctrl/react-adsense";

export default function Ad(props) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className={styles.container}>
      {/* <Adsense
        style={{height:'164px'}}
        client="ca-pub-4803482388154607"
        slot="2382819204"
        responsive="true"
      /> */}

      <ins
        className="adsbygoogle adbanner-customize"
        style={{
          display: "block",
          overflow: "hidden",
        }}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}
        {...props}
      />
    </div>
  );
}

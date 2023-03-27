import Tv from "../components/tv/Tv";
import Channels from "@/components/channels/Channels";
import Ad from "@/components/ad/Ad";

import styles from "@/styles/Home.module.css";

import {channels} from '../data/channelsList'
import Controls from "@/components/controls/Controls";

export default function Home() {
 
  return (
    <main className={styles.main}>
      <div className={styles.mainWrapper}>
        <div className={styles.leftSecton}>
          <Tv />
        </div>
        <div className={styles.rightSecton}>
          <Ad />
          <Channels channels={channels} />
          <Controls />
        </div>
      </div>
    </main>
  );
}

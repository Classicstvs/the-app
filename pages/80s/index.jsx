import Tv from "../../components/tv/Tv";
import Channels from "@/components/channels/Channels";
import Ad from "@/components/ad/Ad";

import styles from "../../styles/Home80s.module.css";

import { channels } from "../../data/channelsList";
import Controls from "@/components/controls/Controls";

import PageInfo from "@/components/pageInfo/PageInfo";
import CardsInfo from "@/components/cardsInfo/CardsInfo";
import { info80s } from "@/data/infos";

export default function Home80s() {
  return (
    <main className={styles.main}>
      <div className={styles.mainWrapper}>
        <div className={styles.leftSecton}>
          <Tv />
          <div className={styles.pageInfo}>
            <PageInfo years="80s" info={info80s} />
          </div>
        </div>
        <div className={styles.rightSecton}>
          <div className={styles.ad}>
            <Ad />
          </div>
          <div className={styles.channels}>
            <Channels channels={channels} />
          </div>
          <div className={styles.controls}>
            <Controls />
          </div>
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}

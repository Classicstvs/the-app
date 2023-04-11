import Tv from "../../components/tv/Tv";
import Channels from "@/components/channels/Channels";
import Ad from "@/components/ad/Ad";

import styles from "@/styles/Home.module.css";

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
          <PageInfo info={info80s} years="80s" />
        </div>
        <div className={styles.rightSecton}>
          <Ad />
          <Channels channels={channels} />
          <Controls />
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}

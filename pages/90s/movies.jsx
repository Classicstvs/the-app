import styles from "@/styles/Home.module.css";

import Tv from "../../components/tv/Tv";
import Channels from "../../components/channels/Channels";
import Ad from "../../components/ad/Ad";
import Controls from "../../components/controls/Controls";
import PlayInfo from "../../components/playInfo/PlayInfo";
import PageInfo from "../../components/pageInfo/PageInfo";
import CardsInfo from "../../components/cardsInfo/CardsInfo";

import {channels} from '../../data/channelsList'



export default function Movies() {
 

  return (
    <main className={styles.main}>
      <div className={styles.mainWrapper}>
        <div className={styles.leftSecton}>
          <Tv />
          <PageInfo />
        </div>
        <div className={styles.rightSecton}>
          <Ad />
          <Channels channels={channels} />
          <Controls />
          <PlayInfo />
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}

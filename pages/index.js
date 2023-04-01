import { useState } from "react";

import Tv from "../components/tv/Tv";
import Channels from "@/components/channels/Channels";
import Ad from "@/components/ad/Ad";

import styles from "@/styles/Home.module.css";

import { channels } from "../data/channelsList";
import Controls from "@/components/controls/Controls";
import PlayInfo from "@/components/playInfo/PlayInfo";
import PageInfo from "@/components/pageInfo/PageInfo";
import CardsInfo from "@/components/cardsInfo/CardsInfo";

export default function Home() {
  const [skin, setSkin] = useState(false);

  //Toggle skin
  const toggleSkin = () => {
    setSkin(!skin);
  };

  return (
    <main className={styles.main}>
      <div className={styles.mainWrapper}>
        <div className={styles.leftSecton}>
          <Tv skin={skin} />
          <PageInfo />
        </div>
        <div className={styles.rightSecton}>
          <Ad />
          <Channels channels={channels} />
          <Controls toggleSkin={toggleSkin} />
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}

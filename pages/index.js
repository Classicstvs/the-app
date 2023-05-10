import Tv from "../components/tv/Tv";
import Channels from "@/components/channels/Channels";
import Ad from "@/components/ad/Ad";

import styles from "@/styles/Home.module.css";

import { channels } from "../data/channelsList";
import Controls from "@/components/controls/Controls";

import PageInfo from "@/components/pageInfo/PageInfo";
import CardsInfo from "@/components/cardsInfo/CardsInfo";
import { info90s } from "@/data/infos";

import { NextSeo } from "next-seo";

const SEO = {
  title: "Classics TV | Best from 50s, 60s, 70s, 80s, 90s and 2000s Favourites TV Channels",
  description: "Step into the past and relive the golden ages of television. Explore classic TV channels from the 50s, 60s, 70s, 80s, 90s and 2000s, via Fun TV Simulator.",

  openGraph: {
    title: "Classics TV | Best from 50s, 60s, 70s, 80s, 90s and 2000s Favourites TV Channels",
    description: "Step into the past and relive the golden ages of television. Explore classic TV channels from the 50s, 60s, 70s, 80s, 90s and 2000s, via Fun TV Simulator.",
  },
};

export default function Home() {
  return (
    <main className={styles.main}>
      <NextSeo {...SEO} />
      <div className={styles.mainWrapper}>
        <div className={styles.leftSecton}>
          <Tv />
          <div className={styles.pageInfo}>
            <PageInfo years="90s" info={info90s} />
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

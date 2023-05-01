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
  title: "Classics TV | 90s Favourites TV Channels",
  description: "",

  openGraph: {
    title: "Classics TV | 90s Favourites TV Channels",
    description: "",
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
            <Ad
              data-ad-slot="2382819204"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
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

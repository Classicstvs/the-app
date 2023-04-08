import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import axios from "axios";

import { NextSeo } from "next-seo";

import styles from "../../styles/allChannels.module.css";

import Tv from "../../components/tv/Tv";
import Channels from "../../components/channels/Channels";
import Ad from "../../components/ad/Ad";
import Controls from "../../components/controls/Controls";
import PlayInfo from "../../components/playInfo/PlayInfo";
import PageInfo from "../../components/pageInfo/PageInfo";
import CardsInfo from "../../components/cardsInfo/CardsInfo";

import { channels } from "../../data/channelsList";
import adsJson from "../../data/ads.json";

export default function Ads() {
  const SEO = {
    title: "Classics TV  | 90s Commercials and Ads TV Channels",
    description: "",

    openGraph: {
      title: "Classics TV | 90s Commercials and Ads TV Channels",
      description: "",
    },
  };

  const router = useRouter();

  const jsonLength = adsJson.ads.length;

  const [videoIndex, setVideoIndex] = useState(0);
  // const [ads, setCatoons] = useState(adsJson.ads);
  const [title, setTitle] = useState("");

  const playNext = () => {
    setVideoIndex((prevIndex) => prevIndex + 1);

    const nextVideoId = ads[videoIndex + 1].videoId;
    const nextVideoTitle = ads[videoIndex + 1].title;

    router.push(
      `/90s/ads/${nextVideoId}?${encodeURIComponent(nextVideoTitle).replace(
        /%20/g,
        ""
      )}`
    );
  };

  // const playPrev = () => {
  //   setVideoIndex((prevIndex) => prevIndex - 1);
  // };

  useEffect(() => {
    const timer = setTimeout(() => {
      playNext();
    }, 2000);

    return () => clearTimeout(timer);
  }, [videoIndex]);

  return (
    <main className={styles.main}>
      <NextSeo {...SEO} />
      <div className={styles.mainWrapper}>
        <div className={styles.leftSecton}>
          <Image
            src="/images/noize.gif"
            alt="TV Noise"
            width={615}
            height={460}
            className={styles.noise}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
          <Tv />
          <PageInfo />
        </div>
        <div className={styles.rightSecton}>
          <Ad />
          <Channels channels={channels} />
          <Controls
            // playPrev={playPrev}
            playNext={playNext}
          />
          <PlayInfo
            jsonLength={jsonLength}
            channelInfo=""
          />
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}

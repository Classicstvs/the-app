import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import axios from "axios";

import { NextSeo } from "next-seo";

import styles from "../../styles/allChannels80s.module.css";

import Tv from "../../components/tv/Tv";
import Channels from "../../components/channels/Channels";
import Ad from "../../components/ad/Ad";
import Controls from "../../components/controls/Controls";
import PlayInfo from "../../components/playInfo/PlayInfo";
import PageInfo from "../../components/pageInfo/PageInfo";
import CardsInfo from "../../components/cardsInfo/CardsInfo";

import { channels80s } from "../../data/channelsList";
import adsJson from "../../data/ads.json";
import { info80s } from "@/data/infos";

export default function Ads({ ads }) {
  const SEO = {
    title: "Classics TV | 80s Commercials and Ads TV Channels",
    description: "",

    openGraph: {
      title: "Classics TV | 80s Commercials and Ads TV Channels",
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
      `/80s/ads/${nextVideoId}?${encodeURIComponent(nextVideoTitle).replace(
        /%20/g,
        ""
      )}`
    );
  };

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
            className={styles.noise80s}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
          <Tv />
          <div className={styles.pageInfo}>
          <PageInfo info={info80s} years="80s"/>
          </div>
        </div>
        <div className={styles.rightSecton}>
        <div className={styles.ad}>
          <Ad />
          </div>
          <div className={styles.channels}>
          <Channels channels={channels80s} />
          </div>
          <div className={styles.controls}>
          <Controls playNext={playNext} />
          </div>
          <div className={styles.playInfo}>
          <PlayInfo
            jsonLength={jsonLength}
            channelInfo=""
          />
          </div>
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}

export async function getServerSideProps() {
  const apiKey = process.env.API_KEY;
  const ads = adsJson.ads;

  const videoId = ads[0].videoId;
  const url = `https://www.youtube.com/watch?v=${videoId}`;

  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`
    );
    const title = response.data.items[0].snippet.title;
    const encodedTitle = encodeURIComponent(title).replace(/%20/g, "");
    const channelTitle = response.data.items[0].snippet.channelTitle;

    const SEO = {
      title: `Classics TV | ${channelTitle} ${title}`,
      description: "",
      openGraph: {
        title: `Classics TV | ${channelTitle} ${title}`,
        description: "",
      },
    };

    return {
      props: {
        ads,
        video: {
          url,
          title,
        },
        SEO,
        channelInfo: {
          title: channelTitle,
        },
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
}
